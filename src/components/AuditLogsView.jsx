import { useState } from "react";
import { Search } from "lucide-react";
export const AuditLogsView = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const filtered = logs.filter((l) => {
    const matchesSearch = l.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || l.description.toLowerCase().includes(searchTerm.toLowerCase()) || l.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === "all" || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });
  return <div className="space-y-6">
      
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Audit & Activity Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Immutable audit record of all user logins, report submissions, status modifications, and evidence uploads.
          </p>
        </div>
      </div>

      {
    /* Filter and Search */
  }
      <div className="bg-white p-4 rounded-xl   flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
    type="text"
    placeholder="Search user, action, description..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-lg text-xs text-slate-900  focus:outline-none"
  />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-600">Module:</span>
          <select
    value={moduleFilter}
    onChange={(e) => setModuleFilter(e.target.value)}
    className="bg-slate-100 border-none rounded-lg text-xs py-1.5 px-2 text-slate-800"
  >
            <option value="all">All Modules</option>
            <option value="Authentication">Authentication</option>
            <option value="Reports">Reports</option>
            <option value="Cases">Cases</option>
            <option value="Evidence">Evidence</option>
            <option value="Users">Users</option>
          </select>
        </div>
      </div>

      {
    /* Audit Logs Table */
  }
      <div className="bg-white rounded-xl   overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 uppercase text-[10px] font-bold text-slate-700 ">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Module</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
              {filtered.map((l) => <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 text-slate-500 font-sans">{new Date(l.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 font-sans font-bold text-slate-900">
                    <div>{l.user_name}</div>
                    <div className="text-[10px] text-slate-400 capitalize font-normal">{l.user_role}</div>
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold ">
                      {l.module}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-700 font-sans">{l.action}</td>
                  <td className="px-4 py-3 text-slate-800 font-sans max-w-xs">{l.description}</td>
                  <td className="px-4 py-3 text-slate-400">{l.ip_address}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

    </div>;
};
