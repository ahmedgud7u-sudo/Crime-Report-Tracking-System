import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  FolderGit2,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Activity,
  X
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import { CrimeMap } from "./CrimeMap.jsx";
const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];
export const DashboardView = ({
  stats,
  onSelectTab,
  onViewReport,
  onViewCase,
  userRole
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  return <div className="space-y-6">
      
      {
    /* Header Title Section */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Dashboard & Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time operational summary of crime reports, active CID cases, evidence, and statistics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
    onClick={() => onSelectTab("reports")}
    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2  transition-colors"
  >
            <FileText className="w-4 h-4" /> Register Crime Report
          </button>
          <button
    onClick={() => onSelectTab("public-tracker")}
    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors bg-slate-100 border-none"
  >
            <Shield className="w-4 h-4 text-slate-500" /> Case Tracker
          </button>
        </div>
      </div>

      {
    /* Top Metric Cards Grid */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {
    /* Card 1: Total Reports */
  }
        <div
    onClick={() => onSelectTab("reports")}
    className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0 hover:shadow-none transition-all cursor-pointer group"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Crime Reports</span>
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.total_reports}</span>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border-amber-200">
              {stats.new_reports} New Unconverted
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>Total registered incidents in database</span>
          </p>
        </div>

        {
    /* Card 2: Active Investigations */
  }
        <div
    onClick={() => onSelectTab("cases", "active_group")}
    className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0 hover:shadow-none transition-all cursor-pointer group"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active CID Cases</span>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.active_investigations}</span>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border-blue-200">
              {stats.pending_cases} Pending Review
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>Cases under active investigation</span>
          </p>
        </div>

        {
    /* Card 3: Closed / Resolved */
  }
        <div
    onClick={() => onSelectTab("cases", "closed_group")}
    className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0 hover:shadow-none transition-all cursor-pointer group"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resolved / Closed</span>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.closed_cases}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border-emerald-200">
              Closed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>Successfully closed & prosecuted cases</span>
          </p>
        </div>

        {
    /* Card 4: Evidence Records */
  }
        <div
    onClick={() => onSelectTab("evidence")}
    className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0 hover:shadow-none transition-all cursor-pointer group"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Evidence Items</span>
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.total_evidence_records}</span>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border-purple-200">
              Chain of Custody
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span>Documents, video & physical records</span>
          </p>
        </div>

      </div>

      {
    /* Analytics Charts Row */
  }
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {
    /* Step 2: Crime Heat Maps (Khariidadda Dambiyada) */
  }
        <div className="bg-[#0f172a] p-5 rounded-xl border-slate-800  relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-900/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0f172a] to-[#0f172a]" />
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-sm">Crime Heat Map (Puntland)</h3>
              <p className="text-xs text-slate-400">Live regional incident distribution</p>
            </div>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
          </div>
          <div className="relative z-10 h-64 flex flex-col gap-3">
            {
    /* Simulated Heat Map List */
  }
            <div className="flex-1 bg-slate-900/50 rounded-lg p-3 border-slate-700/50 flex flex-col space-y-3 overflow-y-auto max-h-[260px] custom-scrollbar">
              {(() => {
    const puntlandCities = [
      "Garowe",
      "Galkayo",
      "Bosaso",
      "Qardho",
      "Galdogob",
      "Badhan",
      "Caluula",
      "Bandarbayla",
      "Iskushuban",
      "Ufayn",
      "Qandala",
      "Carmo",
      "Dhahar",
      "Xingalool",
      "Hadaaftimo",
      "Baran",
      "Taleex",
      "Dhoodida",
      "Dangorayo",
      "Eyl",
      "Burtinle",
      "Jariiban",
      "Garacad",
      "Hobyo",
      "Saaxo",
      "Godob-Jiraan",
      "Waaciye"
    ];
    const heatMapData = puntlandCities.map((city) => {
      const matched = stats.location_breakdown.filter((l) => l.station.toLowerCase().includes(city.toLowerCase()));
      const totalCount = matched.reduce((sum, item) => sum + item.count, 0);
      return { city, count: totalCount };
    });
    stats.location_breakdown.forEach((l) => {
      const isIncluded = puntlandCities.some((city) => l.station.toLowerCase().includes(city.toLowerCase()));
      if (!isIncluded && l.station) {
        let cleanStation = l.station.replace(" Police Station", "").replace(" District", "").replace(" Central Station", "");
        if (cleanStation.length > 20) cleanStation = cleanStation.substring(0, 20) + "...";
        if (!heatMapData.some((h) => h.city === cleanStation)) {
          heatMapData.push({ city: cleanStation, count: l.count });
        }
      }
    });
    heatMapData.sort((a, b) => b.count - a.count);
    const maxCrimes = Math.max(...heatMapData.map((l) => l.count), 1);
    return heatMapData.map((loc) => {
      const percentage = Math.min(loc.count / maxCrimes * 100, 100);
      let color = "bg-slate-700";
      let textColor = "text-slate-400";
      let label = "Nabad ah (0)";
      if (loc.count > 0) {
        color = "bg-emerald-500";
        textColor = "text-emerald-400";
        label = `Dambiyo yar (${loc.count})`;
        if (percentage >= 80 && loc.count > 3) {
          color = "bg-red-600";
          textColor = "text-red-500";
          label = `Dambiyo aad u badan (${loc.count})`;
        } else if (percentage >= 50 && loc.count > 1) {
          color = "bg-orange-500";
          textColor = "text-orange-400";
          label = `Dambiyo badan (${loc.count})`;
        } else if (percentage >= 25 && loc.count > 0) {
          color = "bg-yellow-400";
          textColor = "text-yellow-400";
          label = `Dambiyo dhexdhexaad (${loc.count})`;
        }
      }
      return <div key={loc.city} className="flex items-center justify-between shrink-0">
                      <span className="text-[11px] font-bold text-slate-300 w-[25%] truncate" title={loc.city}>{loc.city}</span>
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden mx-2">
                        <div className={`h-full ${color} rounded-full ${percentage >= 80 && loc.count > 0 ? "animate-pulse" : ""}`} style={{ width: loc.count === 0 ? "5%" : `${percentage}%` }} />
                      </div>
                      <span className={`text-[10px] font-bold ${textColor} whitespace-nowrap w-[40%] text-right`}>{label}</span>
                    </div>;
    });
  })()}
            </div>
            <button
    onClick={() => setIsMapOpen(true)}
    className="w-full text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-900/30 hover:bg-blue-900/50 py-2 rounded border-blue-800/50 transition-colors cursor-pointer"
  >
              Fur Khariidadda (Open Map)
            </button>
          </div>
        </div>

        {
    /* Chart 1: Crime Category Breakdown */
  }
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Crime Distribution</h3>
              <p className="text-xs text-slate-500">Breakdown of reported offenses</p>
            </div>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Real DB Data</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.cases_by_category} margin={{ top: 20, right: 30, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" interval={0} height={60} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {
    /* Chart 2: Monthly Trend */
  }
        <div className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Case Resolution Trend</h3>
              <p className="text-xs text-slate-500">Monthly progression of solved cases</p>
            </div>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthly_crime_data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="reports" name="Reports Filed" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                <Area type="monotone" dataKey="cases" name="CID Cases" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
                <Area type="monotone" dataKey="closed" name="Resolved" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {
    /* Lower Row: Recent Crime Reports Table & Live Status Timeline */
  }
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {
    /* Left 2 Cols: Recent Crime Reports */
  }
        <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] rounded-xl shadow-none border-0 overflow-hidden">
          <div className="p-4  flex items-center justify-between bg-slate-50 dark:bg-slate-800/50/50">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Recent Crime Reports</h3>
              <p className="text-xs text-slate-500">Latest complaints received across stations</p>
            </div>
            <button
    onClick={() => onSelectTab("reports")}
    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
  >
              View All Reports <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100/70 text-slate-700 uppercase font-bold text-[10px] tracking-wider ">
                <tr>
                  <th className="px-4 py-3">Report ID</th>
                  <th className="px-4 py-3">Complainant</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Station</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stats.recent_reports.map((rep) => <tr key={rep.id} className="hover:bg-slate-50 dark:bg-slate-800/50/80 transition-colors">
                    <td className="px-4 py-3 font-semibold text-blue-600">{rep.report_number}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{rep.complainant_name}</td>
                    <td className="px-4 py-3 text-slate-700">{rep.category_name}</td>
                    <td className="px-4 py-3 text-slate-500">{rep.police_station}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${rep.priority === "urgent" ? "bg-red-100 text-red-700" : rep.priority === "high" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                        {rep.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${rep.status === "converted_to_case" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"}`}>
                        {rep.status === "converted_to_case" ? "Case Created" : "New Report"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
    onClick={() => onViewReport(rep.id)}
    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-[11px]"
  >
                        Details
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>

        {
    /* Right 1 Col: Live Case Status Timeline */
  }
        <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-none border-0 p-4 flex flex-col">
          <div className=" pb-3 mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> Case Status Updates
            </h3>
            <p className="text-xs text-slate-500">Live progress logged by investigators</p>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-80 pr-1">
            {stats.recent_status_updates.map((update) => <div key={update.id} className="relative pl-4 border-l-2 border-blue-500 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{update.case_number}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(update.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                  <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-semibold">{update.previous_status}</span>
                  <span>→</span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px] font-bold">{update.new_status}</span>
                </div>
                <p className="text-slate-600 text-[11px] italic bg-slate-50 dark:bg-slate-800/50 p-2 rounded border-slate-100">
                  "{update.remarks}"
                </p>
                <div className="text-[10px] text-slate-500">
                  Updated by: <span className="font-medium text-slate-700">{update.updated_by_name}</span> ({update.updated_by_role})
                </div>
              </div>)}
          </div>

          <button
    onClick={() => onSelectTab("cases", "active_group")}
    className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs text-center border-none transition-colors"
  >
            Manage All Active Cases
          </button>
        </div>

      </div>

      {
    /* Interactive Map Modal */
  }
      {isMapOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-5xl h-[80vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Crime Heat Map (Puntland)
                </h2>
                <p className="text-sm text-slate-500 mt-1">Live regional incident distribution</p>
              </div>
              <button
    onClick={() => setIsMapOpen(false)}
    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 relative w-full h-full z-10">
              <CrimeMap locationBreakdown={stats.location_breakdown} />
            </div>
          </div>
        </div>}

    </div>;
};
