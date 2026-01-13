import { useEffect, useState } from "react";
import api from "../api/api";

function Projects({ onSelect, selectedProject }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Projects</h2>
      <p className="text-sm text-slate-500 mb-4">{projects.length} projects</p>
      
      <div className="space-y-2">
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              selectedProject === p.id
                ? 'bg-blue-50 border-2 border-blue-400 text-blue-700'
                : 'bg-slate-50 border-2 border-transparent hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="font-medium">{p.name}</span>
            {selectedProject === p.id && (
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Projects;