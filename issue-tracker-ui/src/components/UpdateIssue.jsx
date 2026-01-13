import { useState } from "react";
import api from "../api/api";

function UpdateIssueStatus({ issue, onUpdated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const statuses = [
    { value: "OPEN", label: "Open", color: "blue" },
    { value: "IN PROGRESS", label: "In Progress", color: "amber" },
    { value: "RESOLVED", label: "Resolved", color: "emerald" },
    { value: "CLOSED", label: "Closed", color: "emerald" }
  ];

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const res = await api.patch(`/issues/${issue.id}/status`, {
        status: newStatus
      });
      onUpdated(res.data);
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      "in progress": "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      closed: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      resolved: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
    };
    return colors[status?.toLowerCase()] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  const getStatusDot = (status) => {
    const colors = {
      open: "bg-blue-500",
      "in progress": "bg-amber-500",
      closed: "bg-emerald-500",
      resolved: "bg-emerald-500"
    };
    return colors[status?.toLowerCase()] || "bg-slate-500";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${getStatusColor(issue.status)} ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(issue.status)}`}></span>
        {issue.status}
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
            {statuses.map(status => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                disabled={loading || issue.status === status.value}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 ${
                  issue.status === status.value ? 'bg-slate-100 font-semibold' : ''
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className={`w-2 h-2 rounded-full bg-${status.color}-500`}></span>
                {status.label}
                {issue.status === status.value && (
                  <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateIssueStatus;