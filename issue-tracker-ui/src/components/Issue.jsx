import { useEffect, useState } from "react";
import api from "../api/api";
import UpdateIssueStatus from "./UpdateIssue";

function Issues({ projectId, refreshTrigger }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    api.get(`/issues/project/${projectId}`)
      .then(res => {
        console.log("Fetched issues:", res.data);
        setIssues(res.data);
      })
      .catch(err => {
        console.error("Error fetching issues:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId, refreshTrigger]);

  const handleStatusUpdated = (updatedIssue) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === updatedIssue.id ? { ...issue, status: updatedIssue.status } : issue
      )
    );
  };

  const toggleExpand = (issueId) => {
    setExpandedIssue(expandedIssue === issueId ? null : issueId);
  };

  if (!projectId) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900">Issues</h3>
        <p className="text-sm text-slate-500 mt-1">{issues.length} total issues</p>
      </div>

      {loading ? (
        <div className="px-6 py-12 text-center">
          <svg className="animate-spin h-8 w-8 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-500 mt-4">Loading issues...</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="px-6 py-12 text-center text-slate-500">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="font-medium text-slate-700">No issues yet</p>
          <p className="text-sm mt-1">Create your first issue above to get started!</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {issues.map(issue => (
            <div key={issue.id} className="hover:bg-slate-50 transition-colors">
              {/* Main Issue Row */}
              <div className="px-6 py-4">
                <div className="flex items-start gap-4">
                  {/* Left side - Issue info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <button
                        onClick={() => toggleExpand(issue.id)}
                        className="mt-1 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <svg 
                          className={`w-5 h-5 transition-transform ${expandedIssue === issue.id ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 text-base mb-2">
                          {issue.title}
                        </h4>
                        {issue.description && !expandedIssue && (
                          <p className="text-sm text-slate-500 line-clamp-2">
                            {issue.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* People info */}
                    <div className="flex items-center gap-6 ml-8">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Reporter:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {issue.Reporter?.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{issue.Reporter?.name || "Unassigned"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Assignee:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {issue.Assignee?.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{issue.Assignee?.name || "Unassigned"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Status */}
                  <div className="flex-shrink-0">
                    <UpdateIssueStatus 
                      issue={issue} 
                      onUpdated={handleStatusUpdated}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Description */}
              {expandedIssue === issue.id && issue.description && (
                <div className="px-6 pb-4 ml-8">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start gap-2 mb-2">
                      <svg className="w-4 h-4 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Description</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {issue.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Issues;