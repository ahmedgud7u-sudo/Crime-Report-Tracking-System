import { useState } from "react";
import { FolderGit2, Search, FileText, Calendar, User, Lock, ExternalLink } from "lucide-react";
export const EvidenceView = ({ evidenceList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredEvidence = evidenceList.filter(
    (ev) => ev.title.toLowerCase().includes(searchTerm.toLowerCase()) || ev.evidence_number.toLowerCase().includes(searchTerm.toLowerCase()) || ev.case_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-purple-600" />
            Evidence & Custody Locker
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse and manage all physical and digital evidence records securely.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-none border-0 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
    type="text"
    placeholder="Search evidence by title, ID, or case number..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full bg-slate-50  text-slate-900 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none  focus:ring-purple-500 focus:border-purple-500 transition-colors"
  />
        </div>
        <div className="text-sm font-semibold text-slate-500 bg-slate-50 px-4 py-2 rounded-lg ">
          Total Records: <span className="text-purple-600">{filteredEvidence.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-none border-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50  text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Evidence ID</th>
                <th className="p-4">Title & Type</th>
                <th className="p-4">Case Link</th>
                <th className="p-4">Collected By</th>
                <th className="p-4">Security Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredEvidence.length === 0 ? <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No evidence records found matching your search.
                  </td>
                </tr> : filteredEvidence.map((ev) => <tr key={ev.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{ev.evidence_number}</td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{ev.title}</div>
                      <div className="text-[11px] text-slate-500 capitalize flex items-center gap-1 mt-0.5">
                        <FileText className="w-3 h-3" /> {ev.type.replace("_", " ")}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold text-xs border-blue-100">
                        <ExternalLink className="w-3 h-3" />
                        {ev.case_number}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="flex items-center gap-1.5 text-xs">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {ev.collected_by}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs mt-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {ev.collection_date}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max ${ev.security_level === "top_secret" ? "bg-red-100 text-red-700 border-red-200" : ev.security_level === "restricted" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-slate-100 text-slate-700 "}`}>
                        {ev.security_level === "top_secret" && <Lock className="w-3 h-3" />}
                        {ev.security_level.replace("_", " ")}
                      </span>
                    </td>
                  </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
