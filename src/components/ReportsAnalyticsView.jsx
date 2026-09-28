import { useState } from "react";
import {
  Printer,
  Download
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";
const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];
export const ReportsAnalyticsView = ({
  stats,
  reports,
  cases,
  onSelectTab
}) => {
  const [dateRange, setDateRange] = useState("monthly");
  const [stationFilter, setStationFilter] = useState("all");
  const handlePrintReport = () => {
    window.print();
  };
  const handleExportCSV = () => {
    const csvRows = [];
    csvRows.push(["Case Number", "Title", "Category", "Station", "Priority", "Status", "Incident Date"]);
    cases.forEach((c) => {
      csvRows.push([
        c.case_number,
        `"${c.title.replace(/"/g, '""')}"`,
        c.category_name,
        c.police_station,
        c.priority,
        c.status,
        c.incident_date
      ]);
    });
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CRTS_Crime_Statistics_Report_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <div className="space-y-6 print:space-y-4 print:p-0">
      
      {
    /* Top Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4  print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Crime Statistics & Analytical Reports</h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate executive summaries, police workload distributions, and thesis defense reporting data.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
    onClick={handleExportCSV}
    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs flex items-center gap-1.5 bg-slate-100 border-none"
  >
            <Download className="w-4 h-4 text-slate-600" /> Export CSV Data
          </button>
          <button
    onClick={handlePrintReport}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 "
  >
            <Printer className="w-4 h-4" /> Print / Export PDF
          </button>
        </div>
      </div>

      {
    /* Official Police Document Header for Print View */
  }
      <div className="hidden print:block text-center border-b-2 border-slate-900 pb-4 mb-4">
        <h1 className="text-xl font-extrabold uppercase tracking-widest text-slate-900 dark:text-white">
          PUNTLAND STATE POLICE FORCE - CID HEADQUARTERS
        </h1>
        <h2 className="text-sm font-bold text-slate-700 mt-1">
          OFFICIAL CRIME STATISTICS & CASE RESOLUTION REPORT
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Generated via Crime Report Tracking System (CRTS) | Date: {(/* @__PURE__ */ new Date()).toLocaleDateString()}
        </p>
      </div>

      {
    /* Summary Highlight Metrics */
  }
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
    onClick={() => onSelectTab("reports")}
    className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-none border-0 transition-shadow cursor-pointer text-center"
  >
          <span className="text-xs font-semibold text-slate-500 block">TOTAL INCIDENTS</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">{stats.total_reports}</span>
          <span className="text-[10px] text-blue-600 font-medium">Logged in CRTS</span>
        </div>
        <div
    onClick={() => onSelectTab("cases", "active_group")}
    className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-none border-0 transition-shadow cursor-pointer text-center"
  >
          <span className="text-xs font-semibold text-slate-500 block">ACTIVE CASES</span>
          <span className="text-2xl font-extrabold text-amber-600 mt-1 block">{stats.active_investigations}</span>
          <span className="text-[10px] text-slate-500 font-medium">Under CID Investigation</span>
        </div>
        <div
    onClick={() => onSelectTab("cases", "closed_group")}
    className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-none border-0 transition-shadow cursor-pointer text-center"
  >
          <span className="text-xs font-semibold text-slate-500 block">RESOLVED & CLOSED</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">{stats.closed_cases}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Prosecuted / Solved</span>
        </div>
        <div
    onClick={() => onSelectTab("evidence")}
    className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-none border-0 transition-shadow cursor-pointer text-center"
  >
          <span className="text-xs font-semibold text-slate-500 block">EVIDENCE COLLECTED</span>
          <span className="text-2xl font-extrabold text-purple-600 mt-1 block">{stats.total_evidence_records}</span>
          <span className="text-[10px] text-purple-600 font-medium">Recorded in Locker</span>
        </div>
      </div>

      {
    /* Charts Section */
  }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-2">
        
        {
    /* Category Breakdown Bar Chart */
  }
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Crime Incidents by Category</h3>
          <p className="text-xs text-slate-500 mb-4">Total case load breakdown across categories</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.cases_by_category} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {
    /* Police Station Distribution */
  }
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Case Distribution by Police Station</h3>
          <p className="text-xs text-slate-500 mb-4">Jurisdiction station workload comparison</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
    data={stats.location_breakdown}
    cx="50%"
    cy="50%"
    outerRadius={80}
    dataKey="count"
    nameKey="station"
    label={({ station, count }) => `${station}: ${count}`}
  >
                  {stats.location_breakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {
    /* Full Detailed Cases Table for Defense Review */
  }
      <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-none border-0 p-5 space-y-3">
        <div className="flex items-center justify-between  pb-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Case Ledger Summary</h3>
            <p className="text-xs text-slate-500">Comprehensive snapshot of recorded case files</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {cases.length} Total Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 uppercase text-[10px] font-bold text-slate-700 ">
              <tr>
                <th className="p-2.5">Case Number</th>
                <th className="p-2.5">Title</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Station</th>
                <th className="p-2.5">Investigator</th>
                <th className="p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cases.map((c) => <tr key={c.id}>
                  <td className="p-2.5 font-bold text-blue-600">{c.case_number}</td>
                  <td className="p-2.5 font-semibold text-slate-900 dark:text-white">{c.title}</td>
                  <td className="p-2.5 text-slate-700">{c.category_name}</td>
                  <td className="p-2.5 text-slate-600">{c.police_station}</td>
                  <td className="p-2.5 text-slate-800">{c.assigned_investigator_name || "Unassigned"}</td>
                  <td className="p-2.5 font-bold">{c.status}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

    </div>;
};
