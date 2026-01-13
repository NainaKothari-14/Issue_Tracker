import { useEffect, useState } from "react";
import api from "../api/api";

function UserList({ refreshTrigger }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data)).catch(() => {});
  }, [refreshTrigger]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
        <p className="text-sm text-slate-500 mt-1">{users.length} users</p>
      </div>

      <div className="divide-y divide-slate-100">
        {users.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">
            No users yet. Add your first team member!
          </div>
        ) : (
          users.map(user => (
            <div key={user.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900">{user.name}</div>
                <div className="text-sm text-slate-500">{user.email}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserList;