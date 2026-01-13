import { useState } from "react";
import Projects from "./components/Project";
import Issues from "./components/Issue";
import CreateProject from "./components/CreateProject";
import CreateIssue from "./components/CreateIssue";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState("projects");
  const [userRefreshTrigger, setUserRefreshTrigger] = useState(0);

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleIssueCreated = () => {
    // Trigger refresh of issues list
    setRefreshTrigger(prev => prev + 1);
  };

  const handleUserCreated = () => {
    setUserRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Issue Tracker</h1>
              <p className="text-slate-500 mt-1">Manage your projects and issues</p>
            </div>
            {activeTab === "projects" && (
              <button
                onClick={() => setShowCreateProject(!showCreateProject)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                activeTab === "projects"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Projects & Issues
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Team Members
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === "projects" ? (
          <>
            {/* Create Project Form */}
            {showCreateProject && (
              <div className="mb-6">
                <CreateProject 
                  onCreated={() => {
                    window.location.reload();
                  }} 
                />
              </div>
            )}

            {/* Two Column Layout */}
            <div className="flex gap-6">
              {/* Left Side - Projects List */}
              <div className="w-1/3">
                <Projects 
                  onSelect={handleProjectSelect}
                  selectedProject={selectedProject}
                />
              </div>

              {/* Right Side - Issues */}
              <div className="flex-1">
                {selectedProject ? (
                  <div className="space-y-6">
                    <CreateIssue 
                      projectId={selectedProject} 
                      onCreated={handleIssueCreated}
                    />
                    <Issues 
                      projectId={selectedProject}
                      refreshTrigger={refreshTrigger}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Project Selected</h3>
                    <p className="text-slate-500">Select a project from the left to view and manage its issues</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          // Users Tab
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CreateUser onCreated={handleUserCreated} />
            <UserList refreshTrigger={userRefreshTrigger} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;