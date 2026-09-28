import fs from "fs";
import path from "path";
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "crts_db.json");
function getInitialData() {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const todayDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const categories = [
    {
      id: "cat-1",
      code: "CR-THFT",
      name: "Xatooyo & Boob",
      description: "Unlawful taking of personal property belonging to another.",
      severity: "medium",
      default_priority: "medium",
      created_at: now
    },
    {
      id: "cat-2",
      code: "CR-ROBB",
      name: "Dhac Hubaysan",
      description: "Theft using dangerous weapon or deadly force.",
      severity: "critical",
      default_priority: "urgent",
      created_at: now
    },
    {
      id: "cat-3",
      code: "CR-FRAD",
      name: "Khiyaano Internet & Maaliyadeed",
      description: "Unauthorized financial transactions, identity theft, or mobile money fraud.",
      severity: "high",
      default_priority: "high",
      created_at: now
    },
    {
      id: "cat-4",
      code: "CR-ASLT",
      name: "Weerar Jireed",
      description: "Inflicting bodily harm or violent physical attack against an individual.",
      severity: "high",
      default_priority: "high",
      created_at: now
    },
    {
      id: "cat-5",
      code: "CR-BURG",
      name: "Jabsashada Goobaha Ganacsiga",
      description: "Unlawful breaking and entry into business premises with intent to steal.",
      severity: "medium",
      default_priority: "medium",
      created_at: now
    },
    {
      id: "cat-6",
      code: "CR-NARCO",
      name: "Maandooriye & Tahriibin",
      description: "Illegal possession, transport, or distribution of illicit substances.",
      severity: "high",
      default_priority: "high",
      created_at: now
    },
    {
      id: "cat-7",
      code: "CR-DOMV",
      name: "Rabshadaha Qoyska",
      description: "Violent or abusive behavior within a domestic setting.",
      severity: "medium",
      default_priority: "high",
      created_at: now
    }
  ];
  const users = [
    {
      id: "usr-admin",
      name: "Gen. Ahmed Abdi Jamac",
      email: "admin@crts.gov.so",
      badge_number: "PNT-001",
      role: "admin",
      phone: "+252 90 7712345",
      station_location: "Garowe Police HQ",
      is_active: true,
      created_at: now
    },
    {
      id: "usr-officer1",
      name: "Hawa Ali Samantar",
      email: "farah.ali@crts.gov.so",
      badge_number: "PNT-114",
      role: "officer",
      phone: "+252 90 7723456",
      station_location: "Bosaso Central Station",
      is_active: true,
      created_at: now
    },
    {
      id: "usr-investigator1",
      name: "CID Investigator",
      email: "cid@crts.gov.so",
      badge_number: "PNT-CID-01",
      role: "investigator",
      phone: "+252 90 7734567",
      station_location: "Garowe CID HQ",
      is_active: true,
      created_at: now
    },
    {
      id: "usr-citizen1",
      name: "Citizen Public",
      email: "citizen@crts.gov.so",
      badge_number: "",
      role: "citizen",
      phone: "+252 90 7745678",
      station_location: "",
      is_active: true,
      created_at: now
    }
  ];
  const reports = [];
  const cases = [];
  const case_status_history = [];
  const evidence = [];
  const notes = [];
  const audit_logs = [];
  const notifications = [];
  return {
    users,
    categories,
    reports,
    cases,
    case_status_history,
    evidence,
    notes,
    audit_logs,
    notifications
  };
}
export class DBStore {
  data;
  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }
  ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }
  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.error("Failed to parse DB file, resetting to initial seed:", err);
    }
    const init = getInitialData();
    this.saveData(init);
    return init;
  }
  saveData(dataToSave) {
    if (dataToSave) {
      this.data = dataToSave;
    }
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to write DB file:", err);
    }
  }
  resetToSeed() {
    const init = getInitialData();
    this.saveData(init);
    return init;
  }
  // --- Users ---
  getUsers() {
    return this.data.users;
  }
  getUserById(id) {
    return this.data.users.find((u) => u.id === id);
  }
  createUser(user) {
    const newUser = {
      ...user,
      id: "usr-" + Date.now(),
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.data.users.unshift(newUser);
    this.saveData();
    return newUser;
  }
  updateUser(id, updates) {
    const idx = this.data.users.findIndex((u) => u.id === id);
    if (idx === -1) return void 0;
    if (this.data.users[idx].email === "admin@crts.gov.so" && updates.is_active === false) {
      delete updates.is_active;
    }
    this.data.users[idx] = { ...this.data.users[idx], ...updates };
    this.saveData();
    return this.data.users[idx];
  }
  deleteUser(id, actingUser) {
    const userToDelete = this.data.users.find((u) => u.id === id);
    if (userToDelete?.email === "admin@crts.gov.so") return false;
    const initialLength = this.data.users.length;
    this.data.users = this.data.users.filter((u) => u.id !== id);
    if (this.data.users.length < initialLength) {
      this.addAuditLog({
        user_id: actingUser.id,
        user_name: actingUser.name,
        user_role: actingUser.role,
        action: "Delete User",
        module: "Users",
        record_id: id,
        description: `Deleted user with ID ${id}`,
        ip_address: "127.0.0.1"
      });
      this.saveData();
      return true;
    }
    return false;
  }
  // --- Categories ---
  getCategories() {
    return this.data.categories;
  }
  deleteCategory(id, actingUser) {
    const initialLength = this.data.categories.length;
    this.data.categories = this.data.categories.filter((c) => c.id !== id);
    if (this.data.categories.length < initialLength) {
      this.addAuditLog({
        user_id: actingUser.id,
        user_name: actingUser.name,
        user_role: actingUser.role,
        action: "Delete Category",
        module: "Settings",
        record_id: id,
        description: `Deleted crime category with ID ${id}`,
        ip_address: "127.0.0.1"
      });
      this.saveData();
      return true;
    }
    return false;
  }
  createCategory(cat) {
    const newCat = {
      ...cat,
      id: "cat-" + Date.now(),
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.data.categories.push(newCat);
    this.saveData();
    return newCat;
  }
  // --- Reports ---
  getReports() {
    return this.data.reports;
  }
  getReportById(id) {
    return this.data.reports.find((r) => r.id === id || r.report_number === id);
  }
  deleteReport(id, actingUser) {
    const initialLength = this.data.reports.length;
    this.data.reports = this.data.reports.filter((r) => r.id !== id);
    if (this.data.reports.length < initialLength) {
      this.addAuditLog({
        user_id: actingUser.id,
        user_name: actingUser.name,
        user_role: actingUser.role,
        action: "Delete Report",
        module: "Reports",
        record_id: id,
        description: `Deleted crime report with ID ${id}`,
        ip_address: "127.0.0.1"
      });
      this.saveData();
      return true;
    }
    return false;
  }
  createReport(reportData) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const repCount = this.data.reports.length + 1;
    const reportNum = `REP-2026-${String(repCount).padStart(4, "0")}`;
    const newReport = {
      ...reportData,
      id: "rep-" + Date.now(),
      report_number: reportNum,
      status: "submitted",
      created_at: now,
      updated_at: now
    };
    this.data.reports.unshift(newReport);
    this.addAuditLog({
      user_id: reportData.created_by_id || "anonymous",
      user_name: reportData.created_by_name || reportData.complainant_name,
      user_role: "citizen",
      action: "Submit Crime Report",
      module: "Reports",
      record_id: newReport.id,
      description: `Submitted new crime report ${newReport.report_number} (${newReport.category_name})`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return newReport;
  }
  updateReport(id, updates, actingUser) {
    const idx = this.data.reports.findIndex((r) => r.id === id);
    if (idx === -1) return void 0;
    this.data.reports[idx] = { ...this.data.reports[idx], ...updates, updated_at: (/* @__PURE__ */ new Date()).toISOString() };
    this.addAuditLog({
      user_id: actingUser.id,
      user_name: actingUser.name,
      user_role: actingUser.role,
      action: "Update Report",
      module: "Reports",
      record_id: id,
      description: `Updated crime report with ID ${id}`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return this.data.reports[idx];
  }
  updateReportStatus(id, status, caseId) {
    const idx = this.data.reports.findIndex((r) => r.id === id);
    if (idx === -1) return void 0;
    this.data.reports[idx].status = status;
    if (caseId) {
      this.data.reports[idx].converted_to_case_id = caseId;
    }
    this.data.reports[idx].updated_at = (/* @__PURE__ */ new Date()).toISOString();
    this.saveData();
    return this.data.reports[idx];
  }
  // --- Cases ---
  getCases() {
    return this.data.cases;
  }
  getCaseById(id) {
    return this.data.cases.find((c) => c.id === id || c.case_number === id);
  }
  deleteCase(id, actingUser) {
    const initialLength = this.data.cases.length;
    this.data.cases = this.data.cases.filter((c) => c.id !== id);
    if (this.data.cases.length < initialLength) {
      this.addAuditLog({
        user_id: actingUser.id,
        user_name: actingUser.name,
        user_role: actingUser.role,
        action: "Delete Case",
        module: "Cases",
        record_id: id,
        description: `Deleted case with ID ${id}`,
        ip_address: "127.0.0.1"
      });
      this.saveData();
      return true;
    }
    return false;
  }
  createCaseDirectly(caseData, actingUser) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const caseCount = this.data.cases.length + 1;
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const newCaseNumber = `CR-${year}-${caseCount.toString().padStart(4, "0")}`;
    const investigator = caseData.assigned_investigator_id ? this.getUserById(caseData.assigned_investigator_id) : void 0;
    const category = caseData.category_id ? this.getCategories().find((c) => c.id === caseData.category_id) : void 0;
    const newCase = {
      id: "case-" + Date.now(),
      case_number: newCaseNumber,
      title: caseData.title || "Untitled Case",
      summary: caseData.summary || "",
      status: "Assigned",
      priority: caseData.priority || "medium",
      category_id: category?.id || "cat-1",
      category_name: category?.name || "General",
      assigned_investigator_id: investigator?.id || "",
      assigned_investigator_name: investigator?.name || "",
      assigned_officer_id: actingUser.id,
      assigned_officer_name: actingUser.name,
      police_station: caseData.police_station || actingUser.station_location,
      incident_date: now,
      location: caseData.police_station || actingUser.station_location,
      created_at: now,
      updated_at: now
    };
    this.data.cases.unshift(newCase);
    this.data.case_status_history.unshift({
      id: "csh-" + Date.now(),
      case_id: newCase.id,
      case_number: newCase.case_number,
      previous_status: "Reported",
      new_status: "Assigned",
      updated_by_id: actingUser.id,
      updated_by_name: actingUser.name,
      updated_by_role: actingUser.role,
      remarks: `Direct case created by ${actingUser.name}`,
      created_at: now
    });
    if (investigator) {
      this.data.notifications.unshift({
        id: "notif-" + Date.now(),
        target_user_id: investigator.id,
        target_role: "investigator",
        title: "New Case Assignment",
        message: `You have been assigned as lead investigator for ${newCase.case_number}: ${newCase.title}`,
        link: `/cases/${newCase.id}`,
        is_read: false,
        created_at: now
      });
    }
    this.addAuditLog({
      user_id: actingUser.id,
      user_name: actingUser.name,
      user_role: actingUser.role,
      action: "Create Case",
      module: "Cases",
      record_id: newCase.id,
      description: `Created case ${newCase.case_number} directly`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return newCase;
  }
  createCaseFromReport(reportId, assignedInvestigatorId, assignedOfficerId, actingUser, summaryOverride, titleOverride, priorityOverride, evidenceText, notesText, dateAssigned) {
    const report = this.getReportById(reportId);
    if (!report) throw new Error("Report not found");
    const investigator = this.getUserById(assignedInvestigatorId);
    const officer = this.getUserById(assignedOfficerId);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const creationDate = dateAssigned ? new Date(dateAssigned).toISOString() : now;
    const caseCount = this.data.cases.length + 100;
    const caseNum = `PNT-${String(caseCount).padStart(3, "0")}`;
    const newCase = {
      id: "case-" + Date.now(),
      case_number: caseNum,
      report_id: report.id,
      report_number: report.report_number,
      title: titleOverride || `${report.category_name} at ${report.location_district}`,
      category_id: report.category_id,
      category_name: report.category_name,
      incident_date: report.incident_date,
      location: report.location_district,
      police_station: report.police_station,
      priority: priorityOverride || report.priority,
      status: "Assigned",
      assigned_investigator_id: investigator?.id,
      assigned_investigator_name: investigator?.name,
      assigned_officer_id: officer?.id,
      assigned_officer_name: officer?.name,
      summary: summaryOverride || report.description,
      created_at: creationDate,
      updated_at: creationDate
    };
    this.data.cases.unshift(newCase);
    this.updateReportStatus(report.id, "converted_to_case", newCase.id);
    if (evidenceText) {
      this.data.evidence.unshift({
        id: "ev-" + Date.now(),
        evidence_number: `EV-${caseNum}-01`,
        case_id: newCase.id,
        case_number: newCase.case_number,
        title: "Initial Evidence",
        type: "document",
        collection_date: creationDate.split("T")[0],
        collected_by: actingUser.name,
        location_found: report.location_district,
        description: evidenceText,
        security_level: "standard",
        created_at: creationDate
      });
    }
    if (notesText) {
      this.data.notes.unshift({
        id: "note-" + Date.now(),
        case_id: newCase.id,
        author_id: actingUser.id,
        author_name: actingUser.name,
        author_role: actingUser.role,
        note_type: "general",
        content: notesText,
        is_confidential: false,
        created_at: creationDate
      });
    }
    this.data.case_status_history.unshift({
      id: "hist-" + Date.now(),
      case_id: newCase.id,
      case_number: newCase.case_number,
      previous_status: "Reported",
      new_status: "Assigned",
      updated_by_id: actingUser.id,
      updated_by_name: actingUser.name,
      updated_by_role: actingUser.role,
      remarks: `Case created from report ${report.report_number} and assigned to ${investigator?.name || "CID"}`,
      created_at: now
    });
    if (investigator) {
      this.data.notifications.unshift({
        id: "notif-" + Date.now(),
        target_user_id: investigator.id,
        target_role: "investigator",
        title: "New Case Assignment",
        message: `You have been assigned as lead investigator for ${newCase.case_number}: ${newCase.title}`,
        link: `/cases/${newCase.id}`,
        is_read: false,
        created_at: now
      });
    }
    this.addAuditLog({
      user_id: actingUser.id,
      user_name: actingUser.name,
      user_role: actingUser.role,
      action: "Convert Report to Case",
      module: "Cases",
      record_id: newCase.id,
      description: `Converted report ${report.report_number} into case ${newCase.case_number}`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return newCase;
  }
  updateCaseStatus(caseId, newStatus, actingUser, remarks) {
    const c = this.getCaseById(caseId);
    if (!c) return void 0;
    const previousStatus = c.status;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    c.status = newStatus;
    c.updated_at = now;
    if (newStatus === "Closed" || newStatus === "Resolved") {
      c.closed_at = now;
      c.closed_reason = remarks;
    }
    this.data.case_status_history.unshift({
      id: "hist-" + Date.now(),
      case_id: c.id,
      case_number: c.case_number,
      previous_status: previousStatus,
      new_status: newStatus,
      updated_by_id: actingUser.id,
      updated_by_name: actingUser.name,
      updated_by_role: actingUser.role,
      remarks: remarks || `Status changed from ${previousStatus} to ${newStatus}`,
      created_at: now
    });
    this.addAuditLog({
      user_id: actingUser.id,
      user_name: actingUser.name,
      user_role: actingUser.role,
      action: "Update Case Status",
      module: "Cases",
      record_id: c.id,
      description: `Updated status of ${c.case_number} from ${previousStatus} to ${newStatus}`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return c;
  }
  assignCaseInvestigator(caseId, investigatorId, actingUser) {
    const c = this.getCaseById(caseId);
    if (!c) return void 0;
    const inv = this.getUserById(investigatorId);
    if (!inv) return void 0;
    c.assigned_investigator_id = inv.id;
    c.assigned_investigator_name = inv.name;
    c.updated_at = (/* @__PURE__ */ new Date()).toISOString();
    this.addAuditLog({
      user_id: actingUser.id,
      user_name: actingUser.name,
      user_role: actingUser.role,
      action: "Reassign Investigator",
      module: "Cases",
      record_id: c.id,
      description: `Reassigned case ${c.case_number} to investigator ${inv.name}`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return c;
  }
  getStatusHistory(caseId) {
    if (caseId) {
      return this.data.case_status_history.filter((h) => h.case_id === caseId);
    }
    return this.data.case_status_history;
  }
  // --- Evidence ---
  getEvidence(caseId) {
    if (caseId) {
      return this.data.evidence.filter((e) => e.case_id === caseId);
    }
    return this.data.evidence;
  }
  createEvidence(evData, actingUser) {
    const count = this.data.evidence.length + 10;
    const evidNum = `EVID-2026-${String(count).padStart(3, "0")}`;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newEv = {
      ...evData,
      id: "evid-" + Date.now(),
      evidence_number: evidNum,
      created_at: now
    };
    this.data.evidence.unshift(newEv);
    this.addAuditLog({
      user_id: actingUser.id,
      user_name: actingUser.name,
      user_role: actingUser.role,
      action: "Add Evidence",
      module: "Evidence",
      record_id: newEv.id,
      description: `Added evidence record ${newEv.evidence_number} (${newEv.title}) for case ${newEv.case_number}`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return newEv;
  }
  // --- Investigation Notes ---
  getNotes(caseId) {
    return this.data.notes.filter((n) => n.case_id === caseId);
  }
  createNote(noteData, actingUser) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newNote = {
      ...noteData,
      id: "note-" + Date.now(),
      created_at: now
    };
    this.data.notes.unshift(newNote);
    this.addAuditLog({
      user_id: actingUser.id,
      user_name: actingUser.name,
      user_role: actingUser.role,
      action: "Add Investigation Note",
      module: "Cases",
      record_id: noteData.case_id,
      description: `Added ${noteData.note_type} note to case`,
      ip_address: "127.0.0.1"
    });
    this.saveData();
    return newNote;
  }
  // --- Audit Logs ---
  getAuditLogs() {
    return this.data.audit_logs;
  }
  addAuditLog(log) {
    const newLog = {
      ...log,
      id: "log-" + Date.now(),
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.data.audit_logs.unshift(newLog);
    if (this.data.audit_logs.length > 200) {
      this.data.audit_logs = this.data.audit_logs.slice(0, 200);
    }
    this.saveData();
    return newLog;
  }
  // --- Notifications ---
  getNotifications(userId, role) {
    return this.data.notifications.filter((n) => {
      if (userId && n.target_user_id === userId) return true;
      if (role && n.target_role === role) return true;
      return !n.target_user_id && !n.target_role;
    });
  }
  markNotificationAsRead(id) {
    const notif = this.data.notifications.find((n) => n.id === id);
    if (notif) {
      notif.is_read = true;
      this.saveData();
    }
  }
  // --- Dashboard Aggregated Statistics ---
  getDashboardStats() {
    const total_reports = this.data.reports.length;
    const new_reports = this.data.reports.filter((r) => r.status === "submitted").length;
    const pending_cases = this.data.cases.filter((c) => c.status === "Pending" || c.status === "Assigned").length;
    const active_investigations = this.data.cases.filter((c) => c.status !== "Closed" && c.status !== "Resolved").length;
    const closed_cases = this.data.cases.filter((c) => c.status === "Closed" || c.status === "Resolved").length;
    const total_evidence_records = this.data.evidence.length;
    const total_users = this.data.users.length;
    const catMap = {};
    this.data.reports.forEach((c) => {
      catMap[c.category_name] = (catMap[c.category_name] || 0) + 1;
    });
    const cases_by_category = Object.entries(catMap).map(([name, count]) => ({ name, count }));
    const statusMap = {};
    this.data.reports.forEach((c) => {
      statusMap[c.status] = (statusMap[c.status] || 0) + 1;
    });
    const cases_by_status = Object.entries(statusMap).map(([name, count]) => ({ name, count }));
    const stationMap = {};
    this.data.reports.forEach((c) => {
      stationMap[c.police_station] = (stationMap[c.police_station] || 0) + 1;
    });
    const location_breakdown = Object.entries(stationMap).map(([station, count]) => ({ station, count }));
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap = /* @__PURE__ */ new Map();
    for (let i = 4; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth();
      const y = d.getFullYear();
      const key = `${y}-${String(m + 1).padStart(2, "0")}`;
      monthlyMap.set(key, { month: monthNames[m], reports: 0, cases: 0, closed: 0 });
    }
    const getMonthKey = (dateStr) => {
      try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return null;
        return {
          key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
          name: monthNames[d.getMonth()]
        };
      } catch {
        return null;
      }
    };
    this.data.reports.forEach((r) => {
      const parsed = getMonthKey(r.created_at);
      if (parsed) {
        if (!monthlyMap.has(parsed.key)) monthlyMap.set(parsed.key, { month: parsed.name, reports: 0, cases: 0, closed: 0 });
        monthlyMap.get(parsed.key).reports += 1;
      }
    });
    this.data.cases.forEach((c) => {
      const parsed = getMonthKey(c.created_at);
      if (parsed) {
        if (!monthlyMap.has(parsed.key)) monthlyMap.set(parsed.key, { month: parsed.name, reports: 0, cases: 0, closed: 0 });
        const record = monthlyMap.get(parsed.key);
        record.cases += 1;
        if (c.status === "Closed" || c.status === "Resolved") record.closed += 1;
      }
    });
    const monthly_crime_data = Array.from(monthlyMap.keys()).sort().map((k) => monthlyMap.get(k));
    return {
      total_reports,
      new_reports,
      pending_cases,
      active_investigations,
      closed_cases,
      total_evidence_records,
      total_users,
      cases_by_category,
      cases_by_status,
      monthly_crime_data,
      location_breakdown,
      recent_reports: this.data.reports.slice(0, 5),
      recent_status_updates: this.data.case_status_history.slice(0, 5)
    };
  }
}
export const db = new DBStore();
