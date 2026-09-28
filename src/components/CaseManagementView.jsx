import React, { useState } from "react";
import {
  Briefcase,
  Search,
  Clock,
  FolderGit2,
  FileText,
  Plus,
  Lock,
  X,
  Send,
  UserCheck
} from "lucide-react";
export const CaseManagementView = ({
  cases,
  allUsers,
  currentUser,
  onUpdateStatus,
  onCreateCase,
  onAssignInvestigator,
  onAddNote,
  onAddEvidence,
  onDeleteCase,
  selectedCaseId,
  onClearSelectedCase,
  initialStatusFilter
}) => {
  const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);
  const [newCaseTitle, setNewCaseTitle] = useState("");
  const [newCaseSummary, setNewCaseSummary] = useState("");
  const [newCaseCategory, setNewCaseCategory] = useState("cat-1");
  const [newCasePriority, setNewCasePriority] = useState("medium");
  const [newCaseInvestigator, setNewCaseInvestigator] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter || "all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  React.useEffect(() => {
    if (initialStatusFilter) {
      setStatusFilter(initialStatusFilter);
    }
  }, [initialStatusFilter]);
  const [activeCase, setActiveCase] = useState(
    selectedCaseId ? cases.find((c) => c.id === selectedCaseId) || null : null
  );
  const [detailTab, setDetailTab] = useState("timeline");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatusValue, setNewStatusValue] = useState("Under Investigation");
  const [statusRemarks, setStatusRemarks] = useState("");
  const [showReassignModal, setShowReassignModal] = useState(false);
  const investigators = allUsers.filter((u) => u.role === "investigator" || u.role === "admin");
  const [selectedInvestigatorId, setSelectedInvestigatorId] = useState(investigators[0]?.id || "");
  const [noteType, setNoteType] = useState("interview");
  const [noteContent, setNoteContent] = useState("");
  const [isNoteConfidential, setIsNoteConfidential] = useState(false);
  const [showAddEvidenceModal, setShowAddEvidenceModal] = useState(false);
  const [evTitle, setEvTitle] = useState("");
  const [evType, setEvType] = useState("document");
  const [evDesc, setEvDesc] = useState("");
  const [evSec, setEvSec] = useState("standard");
  const [caseFullDetails, setCaseFullDetails] = useState(null);
  const loadCaseFullDetails = async (caseId) => {
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        headers: { "x-user-id": currentUser.id }
      });
      if (res.ok) {
        const data = await res.json();
        setCaseFullDetails(data);
      }
    } catch (err) {
      console.error("Failed to load case full details:", err);
    }
  };
  const handleSelectCase = (c) => {
    setActiveCase(c);
    setDetailTab("timeline");
    loadCaseFullDetails(c.id);
  };
  const handleCreateCaseSubmit = async (e) => {
    e.preventDefault();
    if (onCreateCase) {
      await onCreateCase({
        title: newCaseTitle,
        summary: newCaseSummary,
        category_id: newCaseCategory,
        priority: newCasePriority,
        assigned_investigator_id: newCaseInvestigator
      });
      setShowCreateCaseModal(false);
      setNewCaseTitle("");
      setNewCaseSummary("");
      setNewCaseCategory("cat-1");
      setNewCasePriority("medium");
      setNewCaseInvestigator("");
    }
  };
  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!activeCase) return;
    if (!statusRemarks) {
      alert("Mandatory Requirement: Please enter detailed remarks for this status update.");
      return;
    }
    try {
      await onUpdateStatus(activeCase.id, newStatusValue, statusRemarks);
      setShowStatusModal(false);
      setStatusRemarks("");
      loadCaseFullDetails(activeCase.id);
      setActiveCase({ ...activeCase, status: newStatusValue });
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };
  const handleReassignSubmit = async (e) => {
    e.preventDefault();
    if (!activeCase || !selectedInvestigatorId) return;
    try {
      await onAssignInvestigator(activeCase.id, selectedInvestigatorId);
      setShowReassignModal(false);
      loadCaseFullDetails(activeCase.id);
      const updatedInv = allUsers.find((u) => u.id === selectedInvestigatorId);
      if (updatedInv) {
        setActiveCase({ ...activeCase, assigned_investigator_name: updatedInv.name, assigned_investigator_id: updatedInv.id });
      }
    } catch (err) {
      alert("Failed to reassign investigator: " + err.message);
    }
  };
  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!activeCase || !noteContent) return;
    try {
      await onAddNote(activeCase.id, noteType, noteContent, isNoteConfidential);
      setNoteContent("");
      loadCaseFullDetails(activeCase.id);
    } catch (err) {
      alert("Failed to add note: " + err.message);
    }
  };
  const handleEvidenceSubmit = async (e) => {
    e.preventDefault();
    if (!activeCase || !evTitle) return;
    try {
      await onAddEvidence(activeCase.id, activeCase.case_number, evTitle, evType, evDesc, evSec);
      setShowAddEvidenceModal(false);
      setEvTitle("");
      setEvDesc("");
      loadCaseFullDetails(activeCase.id);
    } catch (err) {
      alert("Failed to add evidence: " + err.message);
    }
  };
  const filteredCases = cases.filter((c) => {
    const matchesSearch = c.case_number.toLowerCase().includes(searchTerm.toLowerCase()) || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.summary.toLowerCase().includes(searchTerm.toLowerCase()) || c.location.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = false;
    if (statusFilter === "all") {
      matchesStatus = true;
    } else if (statusFilter === "active_group") {
      matchesStatus = !["Closed", "Resolved"].includes(c.status);
    } else if (statusFilter === "closed_group") {
      matchesStatus = ["Resolved", "Closed"].includes(c.status);
    } else {
      matchesStatus = c.status === statusFilter;
    }
    const matchesPriority = priorityFilter === "all" || c.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Under Investigation":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Awaiting Evidence":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Under Review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Resolved":
      case "Closed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-800 ";
    }
  };
  return <div className="space-y-6">
      
      {
    /* Page Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">CID Case Management & Tracking</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track investigation lifecycle, review status histories, upload evidence, and manage notes.
          </p>
        </div>
        {(currentUser.role === "admin" || currentUser.role === "officer" || currentUser.role === "investigator") && <button
    onClick={() => setShowCreateCaseModal(true)}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm  transition-colors"
  >
            <Plus className="w-4 h-4" />
            Create New Case
          </button>}
      </div>

      {
    /* Search and Filters */
  }
      <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-none border-0 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
    type="text"
    placeholder="Search Case #, title, summary..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-lg text-xs text-slate-900 dark:text-white  focus:outline-none"
  />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600">Status:</span>
            <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="bg-slate-100 border-none rounded-lg text-xs py-1.5 px-2 text-slate-800"
  >
              <option value="all">All Statuses</option>
              <option value="active_group">Active Cases (Group)</option>
              <option value="closed_group">Resolved / Closed (Group)</option>
              <option value="Assigned">Assigned</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Awaiting Evidence">Awaiting Evidence</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600">Priority:</span>
            <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="bg-slate-100 border-none rounded-lg text-xs py-1.5 px-2 text-slate-800"
  >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {
    /* Cases Grid / Table */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.length === 0 ? <div className="col-span-full bg-white dark:bg-[#0f172a] p-8 rounded-xl  text-center flex flex-col items-center justify-center gap-3">
            <p className="text-slate-600 font-semibold text-sm">No CID cases match the current filter options.</p>
            <div className="bg-blue-50 border-blue-200 text-blue-800 p-4 rounded-lg text-left max-w-xl text-xs space-y-2">
              <p><strong>Fiiro gaar ah:</strong> Haddii kiiskaagu yahay tusaale <em>Under Investigation</em> ama <em>High Priority</em>, ma soo muuqan doono haddii aad <span className="font-semibold text-blue-900">Assigned</span> + <span className="font-semibold text-blue-900">Medium</span> ku filter-gareysay.</p>
              <p>Sidaa darteed marka hore isku day:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Status &rarr; <strong>All Statuses</strong></li>
                <li>Priority &rarr; <strong>All Priorities</strong></li>
              </ul>
              <p className="mt-2 text-[11px] text-blue-700">Haddii weli aysan waxba soo bixin, markaas system-kaaga CID case lama abuurin ama lama Assign-gareyn CID.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setPriorityFilter("all");
                setSearchTerm("");
              }}
              className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
            >
              Reset Filters / Muuji Dhamaan Kiisaska
            </button>
          </div> : filteredCases.map((c) => <div
    key={c.id}
    onClick={() => handleSelectCase(c)}
    className="bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow-none border-0 hover: hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
  >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-extrabold text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded border-blue-200">
                    {c.case_number}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusBadgeClass(c.status)}`}>
                    {c.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{c.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{c.summary}</p>

                <div className="mt-4 pt-3 border-slate-100 space-y-1 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="font-semibold text-slate-800">{c.category_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Investigator:</span>
                    <span className="font-semibold text-slate-800">{c.assigned_investigator_name || "Unassigned"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Station:</span>
                    <span className="text-slate-700">{c.police_station}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Date: {c.incident_date}</span>
                <span className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                  View Timeline & Docs →
                </span>
              </div>
            </div>)}
      </div>

      {
    /* --- CASE DETAIL DRAWER / MODAL --- */
  }
      {activeCase && <div className="fixed inset-0 bg-slate-900/60  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-4xl w-full max-h-[90vh] flex flex-col">
            
            {
    /* Modal Header */
  }
            <div className="p-5  bg-slate-900 text-white rounded-t-2xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded">
                    {activeCase.case_number}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusBadgeClass(activeCase.status)}`}>
                    {activeCase.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold mt-1 text-white">{activeCase.title}</h2>
              </div>
                <button type="button" onClick={() => setActiveCase(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {
    /* Sub Header Controls */
  }
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50  flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">LEAD INVESTIGATOR</span>
                  <span className="font-bold text-slate-900 dark:text-white">{activeCase.assigned_investigator_name || "Unassigned"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">POLICE STATION</span>
                  <span className="font-medium">{activeCase.police_station}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">INCIDENT DATE</span>
                  <span className="font-medium">{activeCase.incident_date}</span>
                </div>
              </div>

              {
    /* Action Buttons */
  }
              <div className="flex items-center gap-2">
                {currentUser.role !== "citizen" && <button
    onClick={() => setShowStatusModal(true)}
    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 "
  >
                  <Clock className="w-3.5 h-3.5" /> Update Status
                </button>}
                {(currentUser.role === "admin" || currentUser.role === "officer") && <button
    onClick={() => setShowReassignModal(true)}
    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg flex items-center gap-1.5"
  >
                    <UserCheck className="w-3.5 h-3.5" /> Reassign
                  </button>}
                {(currentUser.role === "admin" || currentUser.role === "officer") && onDeleteCase && <button
    onClick={async () => {
      if (window.confirm("Are you sure you want to delete this case? All evidence and notes will be permanently lost.")) {
        try {
          await onDeleteCase(activeCase.id);
          setActiveCase(null);
        } catch (err) {
          alert(err.message);
        }
      }
    }}
    className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg flex items-center gap-1.5"
  >
                    <X className="w-3.5 h-3.5" /> Delete Case
                  </button>}
              </div>
            </div>

            {
    /* Inner Tabs Navigation */
  }
            <div className="px-6  flex gap-6 bg-white dark:bg-[#0f172a]">
              <button
    onClick={() => setDetailTab("timeline")}
    className={`py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${detailTab === "timeline" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
  >
                <Clock className="w-4 h-4" /> Status History Timeline
              </button>
              <button
    onClick={() => setDetailTab("evidence")}
    className={`py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${detailTab === "evidence" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
  >
                <FolderGit2 className="w-4 h-4" /> Evidence ({caseFullDetails?.evidence?.length || 0})
              </button>
              <button
    onClick={() => setDetailTab("notes")}
    className={`py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${detailTab === "notes" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
  >
                <FileText className="w-4 h-4" /> Investigation Notes ({caseFullDetails?.notes?.length || 0})
              </button>
            </div>

            {
    /* Tab Content Body */
  }
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              
              {
    /* TAB 1: STATUS HISTORY TIMELINE */
  }
              {detailTab === "timeline" && <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg ">
                    <span className="font-bold text-slate-800 block mb-1">Case Scope Summary:</span>
                    <p className="text-slate-700 leading-relaxed">{activeCase.summary}</p>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-4">Audit Status Timeline</h3>
                  <p className="text-slate-500 text-[11px]">
                    Chronological immutable history of status transitions recorded for this case:
                  </p>

                  <div className="relative border-l-2 border-blue-500 pl-4 ml-2 space-y-6 pt-2">
                    {caseFullDetails?.status_history?.map((hist, index) => <div key={hist.id} className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
                        <div className="bg-white dark:bg-[#0f172a] p-3 rounded-xl shadow-none border-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">{hist.previous_status}</span>
                              <span className="text-slate-400">→</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">{hist.new_status}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {new Date(hist.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-slate-700 italic font-medium mt-1">"{hist.remarks}"</p>
                          <div className="text-[10px] text-slate-500 pt-1 border-slate-100 flex items-center justify-between">
                            <span>Logged By: <strong>{hist.updated_by_name}</strong> ({hist.updated_by_role})</span>
                            <span className="text-slate-400">ID: {hist.id}</span>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>}

              {
    /* TAB 2: EVIDENCE LOCKER */
  }
              {detailTab === "evidence" && <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Attached Physical & Digital Evidence</h3>
                      <p className="text-slate-500 text-[11px]">Chain of custody records for this case file</p>
                    </div>
                    {currentUser.role !== "citizen" && <button
    onClick={() => setShowAddEvidenceModal(true)}
    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 "
  >
                      <Plus className="w-3.5 h-3.5" /> Upload Evidence
                    </button>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {caseFullDetails?.evidence?.map((ev) => <div key={ev.id} className="p-3 bg-white dark:bg-[#0f172a] rounded-xl shadow-none border-0 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-600">{ev.evidence_number}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ev.security_level === "top_secret" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}`}>
                            {ev.security_level}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{ev.title}</h4>
                        <p className="text-slate-600 text-[11px]">{ev.description}</p>
                        <div className="text-[10px] text-slate-400 pt-2 border-slate-100 flex items-center justify-between">
                          <span>Collected by: {ev.collected_by} ({ev.collection_date})</span>
                          <span className="uppercase font-semibold text-slate-600">{ev.type}</span>
                        </div>
                      </div>)}
                  </div>
                </div>}

              {
    /* TAB 3: INVESTIGATION NOTES */
  }
              {detailTab === "notes" && <div className="space-y-4 text-xs">
                  {
    /* Add Note Form */
  }
                  {currentUser.role !== "citizen" && <form onSubmit={handleNoteSubmit} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl  space-y-3">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">Kudar Qoraal Baaris / Diiwaanka Wareysiga</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">Nooca Qoraalka</label>
                        <select
    value={noteType}
    onChange={(e) => setNoteType(e.target.value)}
    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg"
  >
                          <option value="interview">Wareysi Markhaati / Eedeysane</option>
                          <option value="forensic_finding">Natiijada Baarista Farsamada / Isgaarsiinta</option>
                          <option value="witness_statement">Bayaan Markhaati oo Rasmi ah</option>
                          <option value="action_taken">Tallaabada Booliisku Qaaday</option>
                          <option value="general">Qoraal Baaris Guud</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 pt-5">
                        <input
    type="checkbox"
    id="confidential"
    checked={isNoteConfidential}
    onChange={(e) => setIsNoteConfidential(e.target.checked)}
    className="rounded border-slate-300 text-blue-600"
  />
                        <label htmlFor="confidential" className="font-semibold text-slate-700 text-xs flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-amber-600" /> Mark as CID Confidential
                        </label>
                      </div>
                    </div>

                    <div>
                      <textarea
    rows={2}
    required
    placeholder="Geli bayaanka, qoraalka wareysiga, ama natiijada baarista..."
    value={noteContent}
    onChange={(e) => setNoteContent(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
                    </div>

                    <div className="flex justify-end">
                      <button
    type="submit"
    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5"
  >
                        <Send className="w-3.5 h-3.5" /> Save Note
                      </button>
                    </div>
                  </form>}

                  {
    /* Notes List */
  }
                  <div className="space-y-3">
                    {caseFullDetails?.notes?.map((n) => <div key={n.id} className="p-3 bg-white dark:bg-[#0f172a] rounded-xl shadow-none border-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white capitalize">{n.note_type.replace(/_/g, " ")}</span>
                            {n.is_confidential && <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Confidential
                              </span>}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(n.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-700 text-xs leading-relaxed">{n.content}</p>
                        <div className="text-[10px] text-slate-400 pt-1 border-slate-100">
                          Author: <strong className="text-slate-700">{n.author_name}</strong> ({n.author_role})
                        </div>
                      </div>)}
                  </div>
                </div>}

            </div>
          </div>
        </div>}

      {
    /* --- UPDATE STATUS MODAL --- */
  }
      {showStatusModal && activeCase && <div className="fixed inset-0 bg-slate-900/70  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between  pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" /> Update Case Status
              </h3>
                <button type="button" onClick={() => setShowStatusModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Update status for case <span className="font-bold text-blue-600">{activeCase.case_number}</span>. This action is permanently logged into the audit trail.
            </p>

            <form onSubmit={handleStatusSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">New Case Status *</label>
                <select
    value={newStatusValue}
    onChange={(e) => setNewStatusValue(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg font-semibold"
  >
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="Awaiting Evidence">Awaiting Evidence</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                  <option value="Reopened">Reopened</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Status Update Remarks (Mandatory) *</label>
                <textarea
    rows={3}
    required
    placeholder="Provide detailed explanation for this status update..."
    value={statusRemarks}
    onChange={(e) => setStatusRemarks(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
              </div>

              <div className="pt-3  flex items-center justify-end gap-2">
                <button
    type="button"
    onClick={() => setShowStatusModal(false)}
    className="px-4 py-2 bg-slate-100 border-none text-slate-700 rounded-lg font-semibold"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
  >
                  Record Status Change
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* --- ADD EVIDENCE MODAL --- */
  }
      {showAddEvidenceModal && activeCase && <div className="fixed inset-0 bg-slate-900/70  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between  pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-purple-600" /> Upload New Evidence Record
              </h3>
              <button type="button" onClick={() => setShowAddEvidenceModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEvidenceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Evidence Title *</label>
                <input
    type="text"
    required
    placeholder="e.g. CCTV Video Export / Fingerprint Analysis"
    value={evTitle}
    onChange={(e) => setEvTitle(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Evidence Type</label>
                  <select
    value={evType}
    onChange={(e) => setEvType(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  >
                    <option value="document">Document / PDF</option>
                    <option value="image">Image / Photo</option>
                    <option value="video">Video Recording</option>
                    <option value="audio">Audio Clip</option>
                    <option value="physical_record">Physical Item Record</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Security Level</label>
                  <select
    value={evSec}
    onChange={(e) => setEvSec(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  >
                    <option value="standard">Standard Access</option>
                    <option value="restricted">Restricted CID</option>
                    <option value="top_secret">Top Secret / Sealed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Collection & Custody Notes</label>
                <textarea
    rows={2}
    placeholder="Where gathered, collecting officer, chain of custody..."
    value={evDesc}
    onChange={(e) => setEvDesc(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
              </div>

              <div className="pt-3  flex items-center justify-end gap-2">
                <button
    type="button"
    onClick={() => setShowAddEvidenceModal(false)}
    className="px-4 py-2 bg-slate-100 border-none text-slate-700 rounded-lg font-semibold"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
  >
                  Save Evidence Record
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* --- REASSIGN INVESTIGATOR MODAL --- */
  }
      {showReassignModal && activeCase && <div className="fixed inset-0 bg-slate-900/70  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between  pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Reassign Investigator</h3>
              <button type="button" onClick={() => setShowReassignModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReassignSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select New Lead Investigator</label>
                <select
    value={selectedInvestigatorId}
    onChange={(e) => setSelectedInvestigatorId(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  >
                  {investigators.map((inv) => <option key={inv.id} value={inv.id}>
                      {inv.name} ({inv.badge_number || inv.role})
                    </option>)}
                </select>
              </div>

              <div className="pt-3  flex justify-end gap-2">
                <button
    type="button"
    onClick={() => setShowReassignModal(false)}
    className="px-3 py-1.5 bg-slate-100 border-none rounded text-slate-700"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-4 py-1.5 bg-blue-600 text-white rounded font-semibold"
  >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* --- CREATE CASE MODAL --- */
  }
      {showCreateCaseModal && <div className="fixed inset-0 bg-slate-900/70  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between  pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> Create New Case
              </h3>
              <button type="button" onClick={() => setShowCreateCaseModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCaseSubmit} className="space-y-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1 text-xs">Case Title *</label>
                <input
    required
    value={newCaseTitle}
    onChange={(e) => setNewCaseTitle(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg text-sm"
    placeholder="e.g. Operation Red Dawn"
  />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1 text-xs">Summary</label>
                <textarea
    value={newCaseSummary}
    onChange={(e) => setNewCaseSummary(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg h-20 resize-none text-sm"
    placeholder="Initial case briefing..."
  />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1 text-xs">Priority</label>
                  <select
    value={newCasePriority}
    onChange={(e) => setNewCasePriority(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg text-sm"
  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1 text-xs">Assign CID Investigator</label>
                  <select
    value={newCaseInvestigator}
    onChange={(e) => setNewCaseInvestigator(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg text-sm"
  >
                    <option value="">Unassigned</option>
                    {investigators.map((inv) => <option key={inv.id} value={inv.id}>{inv.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 ">
                <button
    type="button"
    onClick={() => setShowCreateCaseModal(false)}
    className="px-3 py-1.5 bg-slate-100 border-none rounded text-slate-700 text-sm font-semibold hover:bg-slate-50 dark:bg-slate-800/50"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold "
  >
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
