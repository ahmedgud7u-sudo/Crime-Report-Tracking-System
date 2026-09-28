import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  AlertCircle,
  X,
  Briefcase,
  Eye,
  ShieldAlert
} from "lucide-react";
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
].sort();
export const CrimeReportsView = ({
  reports,
  categories,
  allUsers,
  currentUser,
  onCreateReport,
  onUpdateReport,
  onConvertToCase,
  onDeleteReport,
  selectedReportId,
  onClearSelectedReport
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [viewingReport, setViewingReport] = useState(
    selectedReportId ? reports.find((r) => r.id === selectedReportId) || null : null
  );
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [complainantName, setComplainantName] = useState("");
  const [complainantPhone, setComplainantPhone] = useState("");
  const [complainantNationalId, setComplainantNationalId] = useState("");
  const [incidentDate, setIncidentDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [incidentTime, setIncidentTime] = useState("14:00");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [locationDistrict, setLocationDistrict] = useState("Garowe");
  const [policeStation, setPoliceStation] = useState("Garowe Police Station");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [suspectInfo, setSuspectInfo] = useState("");
  const [suspectImage, setSuspectImage] = useState(null);
  const [victimInfo, setVictimInfo] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const investigators = allUsers.filter((u) => u.role === "investigator" || u.role === "admin");
  const officers = allUsers.filter((u) => u.role === "officer" || u.role === "admin");
  const [selectedInvestigatorId, setSelectedInvestigatorId] = useState(investigators[0]?.id || "");
  const [selectedOfficerId, setSelectedOfficerId] = useState(currentUser.id);
  const [caseSummary, setCaseSummary] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [casePriority, setCasePriority] = useState("medium");
  const [caseEvidence, setCaseEvidence] = useState("");
  const [caseNotes, setCaseNotes] = useState("");
  const [caseDateAssigned, setCaseDateAssigned] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.report_number.toLowerCase().includes(searchTerm.toLowerCase()) || r.complainant_name.toLowerCase().includes(searchTerm.toLowerCase()) || r.location_district.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === "all" || r.category_id === categoryFilter;
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSuspectImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!complainantName || !incidentDate || !categoryId || !description || !locationDistrict) {
      setFormError("Please fill out all mandatory fields (Complainant Name, Date, Category, Location, Description).");
      return;
    }
    setFormError("");
    setIsSubmitting(true);
    try {
      const selectedCatObj = categories.find((c) => c.id === categoryId);
      await onCreateReport({
        complainant_name: complainantName,
        complainant_phone: complainantPhone,
        complainant_national_id: complainantNationalId,
        incident_date: incidentDate,
        incident_time: incidentTime,
        category_id: categoryId,
        category_name: selectedCatObj?.name || "Offense",
        location_district: locationDistrict,
        police_station: policeStation,
        description,
        suspect_info: suspectInfo,
        suspect_image: suspectImage || void 0,
        victim_info: victimInfo,
        priority
      });
      setShowCreateModal(false);
      setComplainantName("");
      setComplainantPhone("");
      setComplainantNationalId("");
      setDescription("");
      setSuspectInfo("");
      setSuspectImage(null);
      setVictimInfo("");
    } catch (err) {
      setFormError(err.message || "Failed to submit crime report");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingReport || !onUpdateReport) return;
    if (!complainantName || !incidentDate || !categoryId || !description || !locationDistrict) {
      setFormError("Please fill out all mandatory fields.");
      return;
    }
    setFormError("");
    setIsSubmitting(true);
    try {
      const selectedCatObj = categories.find((c) => c.id === categoryId);
      await onUpdateReport(editingReport.id, {
        complainant_name: complainantName,
        complainant_phone: complainantPhone,
        complainant_national_id: complainantNationalId,
        incident_date: incidentDate,
        incident_time: incidentTime,
        category_id: categoryId,
        category_name: selectedCatObj?.name || editingReport.category_name,
        location_district: locationDistrict,
        police_station: policeStation,
        priority,
        description,
        suspect_info: suspectInfo,
        suspect_image: suspectImage || void 0,
        victim_info: victimInfo
      });
      setShowEditModal(false);
      setEditingReport(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const openEditModal = (report) => {
    setEditingReport(report);
    setComplainantName(report.complainant_name);
    setComplainantPhone(report.complainant_phone || "");
    setComplainantNationalId(report.complainant_national_id || "");
    setIncidentDate(report.incident_date);
    setIncidentTime(report.incident_time || "");
    setCategoryId(report.category_id);
    setLocationDistrict(report.location_district);
    setPoliceStation(report.police_station || "");
    setPriority(report.priority);
    setDescription(report.description);
    setSuspectInfo(report.suspect_info || "");
    setSuspectImage(report.suspect_image || null);
    setVictimInfo(report.victim_info || "");
    setFormError("");
    setShowEditModal(true);
  };
  const handleConvertSubmit = async (e) => {
    e.preventDefault();
    if (!viewingReport) return;
    try {
      await onConvertToCase(
        viewingReport.id,
        selectedInvestigatorId,
        selectedOfficerId,
        caseSummary || viewingReport.description,
        caseTitle || `${viewingReport.category_name} at ${viewingReport.location_district}`,
        casePriority,
        caseEvidence,
        caseNotes,
        caseDateAssigned
      );
      setShowConvertModal(false);
      setViewingReport(null);
    } catch (err) {
      alert("Error converting to case: " + err.message);
    }
  };
  return <div className="space-y-6">
      
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Crime Reports Registry</h1>
          <p className="text-sm text-slate-500 mt-1">
            Register new complaints, review incoming police incident reports, and assign to CID case files.
          </p>
        </div>
        <button
    onClick={() => setShowCreateModal(true)}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-2  transition-colors"
  >
          <Plus className="w-4 h-4" /> Register Crime Report
        </button>
      </div>

      {
    /* Filter and Search Bar */
  }
      <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-none border-0 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {
    /* Search */
  }
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
    type="text"
    placeholder="Search Report #, complainant, location..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-lg text-xs text-slate-900 dark:text-white  focus:outline-none"
  />
        </div>

        {
    /* Filters */
  }
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Category:</span>
            <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="bg-slate-100 border-none rounded-lg text-xs py-1.5 px-2 text-slate-800"
  >
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600">Status:</span>
            <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="bg-slate-100 border-none rounded-lg text-xs py-1.5 px-2 text-slate-800"
  >
              <option value="all">All Statuses</option>
              <option value="submitted">New / Unconverted</option>
              <option value="converted_to_case">Converted to Case</option>
            </select>
          </div>
        </div>

      </div>

      {
    /* Reports Table */
  }
      <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-none border-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider ">
              <tr>
                <th className="px-4 py-3">Report ID</th>
                <th className="px-4 py-3">Complainant</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Incident Date</th>
                <th className="px-4 py-3">Location / Station</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredReports.length === 0 ? <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                    No crime reports found matching criteria.
                  </td>
                </tr> : filteredReports.map((rep) => <tr key={rep.id} className="hover:bg-slate-50 dark:bg-slate-800/50/80 transition-colors">
                    <td className="px-4 py-3 font-bold text-blue-600">{rep.report_number}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{rep.complainant_name}</div>
                      <div className="text-[10px] text-slate-400">{rep.complainant_phone || "No phone"}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-800 font-medium">{rep.category_name}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{rep.incident_date}</div>
                      <div className="text-[10px] text-slate-400">{rep.incident_time}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{rep.location_district}</div>
                      <div className="text-[10px] text-slate-400">{rep.police_station}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${rep.priority === "urgent" ? "bg-red-100 text-red-700" : rep.priority === "high" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                        {rep.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${rep.status === "converted_to_case" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-emerald-100 text-emerald-800 border-emerald-200"}`}>
                        {rep.status === "converted_to_case" ? "Case Created" : "New Report"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
    onClick={() => setViewingReport(rep)}
    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-[11px] inline-flex items-center gap-1 transition-colors"
  >
                        <Eye className="w-3 h-3" /> Details
                      </button>
                      {(currentUser.role === "admin" || currentUser.role === "officer") && onUpdateReport && <button
    onClick={() => openEditModal(rep)}
    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded font-medium text-[11px] inline-flex items-center gap-1 transition-colors border-blue-100"
  >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          Update
                        </button>}
                      {(currentUser.role === "admin" || currentUser.role === "officer") && onDeleteReport && <button
    onClick={() => setReportToDelete(rep)}
    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-[11px] inline-flex items-center gap-1 transition-colors border-red-100"
  >
                          <X className="w-3 h-3" /> Delete
                        </button>}
                    </td>
                  </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {
    /* --- CREATE CRIME REPORT MODAL --- */
  }
      {showCreateModal && <div className="fixed inset-0 bg-slate-900/60  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5  flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base">Register New Crime Incident Report</h3>
              </div>
              <button
    type="button"
    onClick={() => setShowCreateModal(false)}
    className="text-slate-400 hover:text-white p-1"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              {formError && <div className="p-3 bg-red-50 border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>}

              {
    /* Complainant Section */
  }
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl  space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Complainant / Reporter Info</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Full Name *</label>
                    <input
    type="text"
    required
    value={complainantName}
    onChange={(e) => setComplainantName(e.target.value)}
    placeholder="e.g. Jama Mohamed Warsame"
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phone Number</label>
                    <input
    type="text"
    value={complainantPhone}
    onChange={(e) => setComplainantPhone(e.target.value)}
    placeholder="+252 90..."
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                  </div>

                </div>
              </div>

              {
    /* Incident Details Section */
  }
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Crime Category *</label>
                  <select
    value={categoryId}
    onChange={(e) => setCategoryId(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  >
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Incident Date *</label>
                  <input
    type="date"
    required
    value={incidentDate}
    onChange={(e) => setIncidentDate(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Incident Time</label>
                  <input
    type="time"
    value={incidentTime}
    onChange={(e) => setIncidentTime(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">District / Location *</label>
                  <select
    required
    value={locationDistrict}
    onChange={(e) => {
      setLocationDistrict(e.target.value);
      if (e.target.value && !policeStation.includes(e.target.value)) {
        setPoliceStation(e.target.value + " Police Station");
      }
    }}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  >
                    <option value="" disabled>Dooro Degmada/Deegaanka</option>
                    {puntlandCities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Police Station Jurisdiction</label>
                  <input
    type="text"
    value={policeStation}
    onChange={(e) => setPoliceStation(e.target.value)}
    placeholder="e.g. Bosaso Central Station"
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Priority Level</label>
                  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Faahfaahinta Dhacdada *</label>
                <textarea
    rows={3}
    required
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Qoraal faahfaahsan oo ku saabsan sida ay dhacdadu u dhacday..."
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg text-xs"
  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Xogta Eedeysanaha (Haddii la yaqaan)</label>
                    <textarea
    rows={2}
    value={suspectInfo}
    onChange={(e) => setSuspectInfo(e.target.value)}
    placeholder="Magaca, tilmaamaha jirka, xogta gaariga..."
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                  </div>

                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Xogta Dhibanaha / Dhaawaca</label>
                  <textarea
    rows={2}
    value={victimInfo}
    onChange={(e) => setVictimInfo(e.target.value)}
    placeholder="Dhaawacyada gaaray, qiimaha hantida luntay..."
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
              </div>

              <div className="pt-3  flex items-center justify-end gap-2">
                <button
    type="button"
    onClick={() => setShowCreateModal(false)}
    className="px-4 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
  >
                  Cancel
                </button>
                <button
    type="submit"
    disabled={isSubmitting}
    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5"
  >
                  {isSubmitting ? "Registering..." : "Save & Register Report"}
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* Edit User Modal */
  }
      {showEditModal && <div className="fixed inset-0 bg-slate-900/60  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5  flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base">Update Crime Incident Report</h3>
              </div>
              <button
    type="button"
    onClick={() => setShowEditModal(false)}
    className="text-slate-400 hover:text-white p-1"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              {formError && <div className="p-3 bg-red-50 border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>}

              {
    /* Complainant Section */
  }
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl  space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Complainant / Reporter Info</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Full Name *</label>
                    <input
    type="text"
    required
    value={complainantName}
    onChange={(e) => setComplainantName(e.target.value)}
    placeholder="e.g. Jama Mohamed Warsame"
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phone Number</label>
                    <input
    type="text"
    value={complainantPhone}
    onChange={(e) => setComplainantPhone(e.target.value)}
    placeholder="+252 90..."
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                  </div>

                </div>
              </div>

              {
    /* Incident Details Section */
  }
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Crime Category *</label>
                  <select
    value={categoryId}
    onChange={(e) => setCategoryId(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  >
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Incident Date *</label>
                  <input
    type="date"
    required
    value={incidentDate}
    onChange={(e) => setIncidentDate(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Incident Time</label>
                  <input
    type="time"
    value={incidentTime}
    onChange={(e) => setIncidentTime(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">District / Location *</label>
                  <select
    required
    value={locationDistrict}
    onChange={(e) => {
      setLocationDistrict(e.target.value);
      if (e.target.value && !policeStation.includes(e.target.value)) {
        setPoliceStation(e.target.value + " Police Station");
      }
    }}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  >
                    <option value="" disabled>Dooro Degmada/Deegaanka</option>
                    {puntlandCities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Police Station Jurisdiction</label>
                  <input
    type="text"
    value={policeStation}
    onChange={(e) => setPoliceStation(e.target.value)}
    placeholder="e.g. Bosaso Central Station"
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Priority Level</label>
                  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">Faahfaahinta Dhacdada *</label>
                <textarea
    rows={3}
    required
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Qoraal faahfaahsan oo ku saabsan sida ay dhacdadu u dhacday..."
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg text-xs"
  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Xogta Eedeysanaha (Haddii la yaqaan)</label>
                    <textarea
    rows={2}
    value={suspectInfo}
    onChange={(e) => setSuspectInfo(e.target.value)}
    placeholder="Magaca, tilmaamaha jirka, xogta gaariga..."
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                  </div>

                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">Xogta Dhibanaha / Dhaawaca</label>
                  <textarea
    rows={2}
    value={victimInfo}
    onChange={(e) => setVictimInfo(e.target.value)}
    placeholder="Dhaawacyada gaaray, qiimaha hantida luntay..."
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
  />
                </div>
              </div>

              <div className="pt-3  flex items-center justify-end gap-2">
                <button
    type="button"
    onClick={() => setShowEditModal(false)}
    className="px-4 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
  >
                  Cancel
                </button>
                <button
    type="submit"
    disabled={isSubmitting}
    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5"
  >
                  {isSubmitting ? "Registering..." : "Update Report"}
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* --- VIEW REPORT DETAIL MODAL --- */
  }
      {viewingReport && <div className="fixed inset-0 bg-slate-900/60  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5  flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-900/50 px-2 py-0.5 rounded">
                  {viewingReport.report_number}
                </span>
                <h3 className="font-bold text-base mt-1">{viewingReport.category_name}</h3>
              </div>
              <button
    onClick={() => setViewingReport(null)}
    className="text-slate-400 hover:text-white p-1"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              
              {
    /* Top Banner Status */
  }
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl ">
                <div>
                  <span className="text-slate-500">Report Status:</span>
                  <span className="ml-2 font-bold capitalize text-slate-800">
                    {viewingReport.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Priority:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded font-bold uppercase text-[10px] ${viewingReport.priority === "urgent" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                    {viewingReport.priority}
                  </span>
                </div>
              </div>

              {
    /* Complainant Info */
  }
              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border-slate-100">
                <div>
                  <span className="text-slate-500 block text-[10px]">COMPLAINANT</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{viewingReport.complainant_name}</span>
                  <div className="text-slate-600 mt-0.5">{viewingReport.complainant_phone || "No phone provided"}</div>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">NATIONAL ID / PASSPORT</span>
                  <span className="font-semibold text-slate-800">{viewingReport.complainant_national_id || "Not recorded"}</span>
                </div>
              </div>

              {
    /* Incident Details */
  }
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded border-slate-100">
                  <span className="text-slate-400 block text-[10px]">INCIDENT DATE/TIME</span>
                  <span className="font-semibold text-slate-800">{viewingReport.incident_date} at {viewingReport.incident_time}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded border-slate-100">
                  <span className="text-slate-400 block text-[10px]">LOCATION</span>
                  <span className="font-semibold text-slate-800">{viewingReport.location_district}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded border-slate-100">
                  <span className="text-slate-400 block text-[10px]">POLICE STATION</span>
                  <span className="font-semibold text-slate-800">{viewingReport.police_station}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Narrative Description:</span>
                <p className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg  text-slate-700 leading-relaxed">
                  {viewingReport.description}
                </p>
              </div>

              {viewingReport.suspect_info && <div>
                  <span className="font-bold text-slate-800 block mb-1">Suspect Description:</span>
                  <div className="p-2.5 bg-amber-50/60 rounded border-amber-200/60 text-slate-700">
                    <p>{viewingReport.suspect_info}</p>
                    {viewingReport.suspect_image && <img src={viewingReport.suspect_image} alt="Suspect Image" className="mt-3 max-h-48 rounded-lg shadow-none border-0 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setPreviewImage(viewingReport.suspect_image)} />}
                  </div>
                </div>}

              {
    /* Action Buttons */
  }
              <div className="pt-4  flex items-center justify-between">
                <button
    onClick={() => setViewingReport(null)}
    className="px-4 py-2 bg-slate-100 border-none text-slate-700 rounded-lg font-semibold hover:bg-slate-100"
  >
                  Close
                </button>

                {viewingReport.status === "submitted" && (currentUser.role === "admin" || currentUser.role === "officer") && <button
    onClick={() => {
      setCaseTitle(`${viewingReport.category_name} at ${viewingReport.location_district}`);
      setCaseSummary(viewingReport.description);
      setCasePriority(viewingReport.priority);
      setCaseEvidence("");
      setCaseNotes("");
      setCaseDateAssigned((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
      setShowConvertModal(true);
    }}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 "
  >
                    <Briefcase className="w-4 h-4" /> ➕ Assign Case to CID
                  </button>}
                {(currentUser.role === "admin" || currentUser.role === "officer") && onDeleteReport && <button
    onClick={() => setReportToDelete(viewingReport)}
    className="px-4 py-2 bg-red-50 border-red-100 hover:bg-red-100 text-red-600 font-semibold rounded-lg flex items-center gap-2 "
  >
                    <X className="w-4 h-4" /> Delete Report
                  </button>}

                {viewingReport.status === "converted_to_case" && <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded border-blue-200">
                    Active Case Assigned ({viewingReport.converted_to_case_id})
                  </span>}
              </div>

            </div>
          </div>
        </div>}

      {
    /* --- CONVERT TO CASE MODAL --- */
  }
      {showConvertModal && viewingReport && <div className="fixed inset-0 bg-slate-900/70  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between  pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> Convert Report to Case File
              </h3>
              <button type="button" onClick={() => setShowConvertModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Converting report <span className="font-bold text-blue-600">{viewingReport.report_number}</span> into an official active investigation case.
            </p>

            <form onSubmit={handleConvertSubmit} className="space-y-3 text-xs max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Case Number</label>
                  <input disabled value="Auto-Generated" className="w-full px-3 py-2 bg-slate-100 bg-slate-100 border-none rounded-lg text-slate-500 font-mono" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Crime Type</label>
                  <input disabled value={viewingReport.category_name} className="w-full px-3 py-2 bg-slate-100 bg-slate-100 border-none rounded-lg text-slate-500 font-semibold" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Case Title</label>
                <input required value={caseTitle} onChange={(e) => setCaseTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg" />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Case Summary</label>
                <textarea rows={2} required value={caseSummary} onChange={(e) => setCaseSummary(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Complainant / Victim</label>
                  <input disabled value={viewingReport.complainant_name} className="w-full px-3 py-2 bg-slate-100 bg-slate-100 border-none rounded-lg text-slate-500" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Suspect (If known)</label>
                  <input disabled value={viewingReport.suspect_info || "Unknown"} className="w-full px-3 py-2 bg-slate-100 bg-slate-100 border-none rounded-lg text-slate-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assign Lead CID Investigator *</label>
                  <select required value={selectedInvestigatorId} onChange={(e) => setSelectedInvestigatorId(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg">
                    {investigators.map((inv) => <option key={inv.id} value={inv.id}>{inv.name} ({inv.badge_number})</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                  <select value={casePriority} onChange={(e) => setCasePriority(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date Assigned</label>
                  <input type="date" required value={caseDateAssigned} onChange={(e) => setCaseDateAssigned(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned Desk Officer</label>
                  <select value={selectedOfficerId} onChange={(e) => setSelectedOfficerId(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg">
                    {officers.map((off) => <option key={off.id} value={off.id}>{off.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Initial Evidence</label>
                <textarea rows={2} value={caseEvidence} onChange={(e) => setCaseEvidence(e.target.value)} placeholder="Caddeymaha kiiska..." className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg" />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Notes</label>
                <textarea rows={2} value={caseNotes} onChange={(e) => setCaseNotes(e.target.value)} placeholder="Qoraallo dheeraad ah..." className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg" />
              </div>

              <div className="pt-3  flex items-center justify-end gap-2 sticky bottom-0 bg-white dark:bg-[#0f172a]">
                <button type="button" onClick={() => setShowConvertModal(false)} className="px-4 py-2 bg-slate-100 border-none text-slate-700 rounded-lg font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Submit / Assign to CID
                </button>
              </div>
            </form>
          </div>
        </div>}

      {reportToDelete && <div className="fixed inset-0 bg-slate-900/60  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl  max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Report</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete this report? This action cannot be undone.</p>
            {formError && <div className="mb-4 p-2 bg-red-50 text-red-600 text-xs rounded border-red-200">
                {formError}
              </div>}
            <div className="flex items-center justify-center gap-3">
              <button
    onClick={() => {
      setReportToDelete(null);
      setFormError("");
    }}
    className="px-4 py-2 bg-slate-100 border-none rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:bg-slate-800/50"
  >
                Cancel
              </button>
              <button
    onClick={async () => {
      if (!onDeleteReport) return;
      try {
        await onDeleteReport(reportToDelete.id);
        if (viewingReport?.id === reportToDelete.id) {
          setViewingReport(null);
        }
        setReportToDelete(null);
        setFormError("");
      } catch (err) {
        setFormError(err.message);
      }
    }}
    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
  >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>}


      {previewImage && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Fullscreen preview" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
          <button type="button" onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 text-white hover:text-red-500 bg-slate-800 p-2 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>}
    </div>;
};
