import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { db } from "./src/db/store.js";
const app = express();
const PORT = Number(process.env.PORT || 3e3);
const HOST = process.env.HOST || "0.0.0.0";
app.use(express.json({ limit: "10mb" }));
function getActingUser(req) {
  const userId = req.headers["x-user-id"];
  if (userId) {
    const u = db.getUserById(userId);
    if (u) {
      if (u.email === "admin@crts.gov.so" && u.role !== "admin") {
        return { ...u, role: "admin" };
      }
      return u;
    }
  }
  const adminFallback = db.getUsers().find((u) => u.email === "admin@crts.gov.so" || u.role === "admin");
  if (adminFallback) {
    if (adminFallback.email === "admin@crts.gov.so" && adminFallback.role !== "admin") {
      return { ...adminFallback, role: "admin" };
    }
    return adminFallback;
  }
  return db.getUsers()[0];
}
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/api/auth/users", (req, res) => {
  res.json(db.getUsers());
});
app.post("/api/auth/register", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required fields." });
  }
  const existingUsers = db.getUsers();
  if (existingUsers.some((u) => u.email === email)) {
    return res.status(400).json({ error: "Email already exists." });
  }
  const newUser = {
    id: "USR-" + (/* @__PURE__ */ new Date()).getFullYear() + "-" + Math.floor(1e3 + Math.random() * 9e3),
    name,
    email,
    role: "citizen",
    phone: phone || "",
    station_location: "N/A",
    is_active: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  };
  db.getUsers().push(newUser);
  res.status(201).json(newUser);
});
app.post("/api/auth/login", (req, res) => {
  const { userId } = req.body;
  const user = db.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  db.addAuditLog({
    user_id: user.id,
    user_name: user.name,
    user_role: user.role,
    action: "User Login",
    module: "Authentication",
    description: `User ${user.name} (${user.role}) logged into CRTS`,
    ip_address: req.ip || "127.0.0.1"
  });
  res.json(user);
});
app.get("/api/users", (req, res) => {
  res.json(db.getUsers());
});
app.post("/api/users", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "investigator") {
    return res.status(403).json({ error: "Unauthorized. Admin or Investigator access required." });
  }
  const { name, email, password, badge_number, role, phone, station_location } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ error: "Name, Email, and Role are required fields." });
  }
  const newUser = db.createUser({
    name,
    email,
    badge_number,
    role,
    phone: phone || "",
    station_location: station_location || "General Headquarters",
    is_active: true,
    password: password || "123456"
  });
  db.addAuditLog({
    user_id: actingUser.id,
    user_name: actingUser.name,
    user_role: actingUser.role,
    action: "Create User",
    module: "Users",
    record_id: newUser.id,
    description: `Created new user account for ${newUser.name} (${newUser.role})`,
    ip_address: req.ip || "127.0.0.1"
  });
  res.status(201).json(newUser);
});
app.put("/api/users/:id", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "investigator") {
    return res.status(403).json({ error: "Unauthorized. Admin or Investigator access required." });
  }
  const updated = db.updateUser(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "User not found" });
  }
  db.addAuditLog({
    user_id: actingUser.id,
    user_name: actingUser.name,
    user_role: actingUser.role,
    action: "Update User",
    module: "Users",
    record_id: updated.id,
    description: `Updated profile details for user ${updated.name}`,
    ip_address: req.ip || "127.0.0.1"
  });
  res.json(updated);
});
app.delete("/api/users/:id", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "investigator") {
    return res.status(403).json({ error: "Unauthorized. Admin or Investigator access required." });
  }
  const success = db.deleteUser(req.params.id, actingUser);
  if (!success) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ success: true });
});
app.get("/api/categories", (req, res) => {
  res.json(db.getCategories());
});
app.post("/api/categories", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized. Admin access required." });
  }
  const { code, name, description, severity, default_priority } = req.body;
  if (!code || !name) {
    return res.status(400).json({ error: "Category code and name are required." });
  }
  const newCat = db.createCategory({
    code,
    name,
    description: description || "",
    severity: severity || "medium",
    default_priority: default_priority || "medium"
  });
  db.addAuditLog({
    user_id: actingUser.id,
    user_name: actingUser.name,
    user_role: actingUser.role,
    action: "Create Category",
    module: "Categories",
    record_id: newCat.id,
    description: `Created new crime category ${newCat.name} (${newCat.code})`,
    ip_address: req.ip || "127.0.0.1"
  });
  res.status(201).json(newCat);
});
app.delete("/api/categories/:id", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized. Admin access required." });
  }
  const success = db.deleteCategory(req.params.id, actingUser);
  if (!success) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json({ success: true });
});
app.get("/api/reports", (req, res) => {
  let reports = db.getReports();
  const search = (req.query.search || "").toLowerCase();
  const status = req.query.status;
  const category = req.query.category;
  if (search) {
    reports = reports.filter(
      (r) => r.report_number.toLowerCase().includes(search) || r.complainant_name.toLowerCase().includes(search) || r.description.toLowerCase().includes(search) || r.location_district.toLowerCase().includes(search) || r.police_station.toLowerCase().includes(search)
    );
  }
  if (status && status !== "all") {
    reports = reports.filter((r) => r.status === status);
  }
  if (category && category !== "all") {
    reports = reports.filter((r) => r.category_id === category);
  }
  res.json(reports);
});
app.delete("/api/categories/:id", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized. Admin access required." });
  }
  const success = db.deleteCategory(req.params.id, actingUser);
  if (!success) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json({ success: true });
});
app.get("/api/reports/:id", (req, res) => {
  const report = db.getReportById(req.params.id);
  if (!report) {
    return res.status(404).json({ error: "Report not found" });
  }
  res.json(report);
});
app.post("/api/reports", (req, res) => {
  const actingUser = getActingUser(req);
  const {
    complainant_name,
    complainant_phone,
    complainant_national_id,
    complainant_email,
    incident_date,
    incident_time,
    category_id,
    category_name,
    location_district,
    police_station,
    description,
    suspect_info,
    victim_info,
    priority
  } = req.body;
  if (!complainant_name || !incident_date || !category_id || !description || !location_district) {
    return res.status(400).json({ error: "Missing required report fields (complainant name, date, category, location, description)." });
  }
  const created = db.createReport({
    complainant_name,
    complainant_phone: complainant_phone || "",
    complainant_national_id: complainant_national_id || "",
    complainant_email: complainant_email || "",
    incident_date,
    incident_time: incident_time || "12:00",
    category_id,
    category_name: category_name || "General Offense",
    location_district,
    police_station: police_station || "Central HQ Station",
    description,
    suspect_info: suspect_info || "",
    victim_info: victim_info || "",
    priority: priority || "medium",
    created_by_id: actingUser.id,
    created_by_name: actingUser.name
  });
  res.status(201).json(created);
});
app.put("/api/reports/:id", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "officer") {
    return res.status(403).json({ error: "Unauthorized. Only Police Officers or Admins can update reports." });
  }
  const updated = db.updateReport(req.params.id, req.body, actingUser);
  if (!updated) {
    return res.status(404).json({ error: "Report not found" });
  }
  res.json(updated);
});
app.delete("/api/reports/:id", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "officer") {
    return res.status(403).json({ error: "Unauthorized. Only Police Officers or Admins can delete reports." });
  }
  const success = db.deleteReport(req.params.id, actingUser);
  if (!success) {
    return res.status(404).json({ error: "Report not found" });
  }
  res.status(200).json({ success: true });
});
app.post("/api/reports/:id/convert", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "officer") {
    return res.status(403).json({ error: "Unauthorized. Only Police Officers or Admins can convert reports to cases." });
  }
  const { assignedInvestigatorId, assignedOfficerId, summaryOverride, title, priority, evidence, notes, dateAssigned } = req.body;
  try {
    const newCase = db.createCaseFromReport(
      req.params.id,
      assignedInvestigatorId,
      assignedOfficerId || actingUser.id,
      actingUser,
      summaryOverride,
      title,
      priority,
      evidence,
      notes,
      dateAssigned
    );
    res.status(201).json(newCase);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to convert report into case" });
  }
});
app.get("/api/cases", (req, res) => {
  let cases = db.getCases();
  const search = (req.query.search || "").toLowerCase();
  const status = req.query.status;
  const priority = req.query.priority;
  const investigatorId = req.query.investigator;
  if (search) {
    cases = cases.filter(
      (c) => c.case_number.toLowerCase().includes(search) || c.title.toLowerCase().includes(search) || c.summary.toLowerCase().includes(search) || c.location.toLowerCase().includes(search) || c.police_station.toLowerCase().includes(search)
    );
  }
  if (status && status !== "all") {
    cases = cases.filter((c) => c.status === status);
  }
  if (priority && priority !== "all") {
    cases = cases.filter((c) => c.priority === priority);
  }
  if (investigatorId) {
    cases = cases.filter((c) => c.assigned_investigator_id === investigatorId);
  }
  res.json(cases);
});
app.post("/api/cases", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "officer" && actingUser.role !== "investigator") {
    return res.status(403).json({ error: "Unauthorized to create cases directly." });
  }
  const { title, summary, category_id, priority, assigned_investigator_id } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Case title is required." });
  }
  const newCase = db.createCaseDirectly({
    title,
    summary,
    category_id,
    priority,
    assigned_investigator_id
  }, actingUser);
  res.status(201).json(newCase);
});
app.get("/api/cases/:id", (req, res) => {
  const c = db.getCaseById(req.params.id);
  if (!c) {
    return res.status(404).json({ error: "Case not found" });
  }
  const history = db.getStatusHistory(c.id);
  const evidenceList = db.getEvidence(c.id);
  const notesList = db.getNotes(c.id);
  res.json({
    ...c,
    status_history: history,
    evidence: evidenceList,
    notes: notesList
  });
});
app.delete("/api/cases/:id", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "officer") {
    return res.status(403).json({ error: "Unauthorized. Only Police Officers or Admins can delete cases." });
  }
  const success = db.deleteCase(req.params.id, actingUser);
  if (!success) {
    return res.status(404).json({ error: "Case not found" });
  }
  res.status(200).json({ success: true });
});
app.post("/api/cases/:id/status", (req, res) => {
  const actingUser = getActingUser(req);
  const { newStatus, remarks } = req.body;
  if (!newStatus) {
    return res.status(400).json({ error: "newStatus is required." });
  }
  const updatedCase = db.updateCaseStatus(req.params.id, newStatus, actingUser, remarks || "");
  if (!updatedCase) {
    return res.status(404).json({ error: "Case not found" });
  }
  res.json(updatedCase);
});
app.post("/api/cases/:id/assign", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin" && actingUser.role !== "officer") {
    return res.status(403).json({ error: "Unauthorized to assign investigators." });
  }
  const { investigatorId } = req.body;
  if (!investigatorId) {
    return res.status(400).json({ error: "investigatorId is required" });
  }
  const updatedCase = db.assignCaseInvestigator(req.params.id, investigatorId, actingUser);
  if (!updatedCase) {
    return res.status(404).json({ error: "Case or Investigator not found" });
  }
  res.json(updatedCase);
});
app.get("/api/cases/:id/notes", (req, res) => {
  res.json(db.getNotes(req.params.id));
});
app.post("/api/cases/:id/notes", (req, res) => {
  const actingUser = getActingUser(req);
  const { note_type, content, is_confidential } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Note content is required." });
  }
  const createdNote = db.createNote({
    case_id: req.params.id,
    author_id: actingUser.id,
    author_name: actingUser.name,
    author_role: actingUser.role,
    note_type: note_type || "general",
    content,
    is_confidential: !!is_confidential
  }, actingUser);
  res.status(201).json(createdNote);
});
app.get("/api/evidence", (req, res) => {
  const caseId = req.query.caseId;
  res.json(db.getEvidence(caseId));
});
app.post("/api/evidence", (req, res) => {
  const actingUser = getActingUser(req);
  const {
    case_id,
    case_number,
    title,
    type,
    collection_date,
    collected_by,
    location_found,
    description,
    file_name,
    file_size,
    security_level
  } = req.body;
  if (!case_id || !title || !type) {
    return res.status(400).json({ error: "Case ID, Title, and Evidence Type are required." });
  }
  const newEv = db.createEvidence({
    case_id,
    case_number: case_number || "CASE-2026",
    title,
    type,
    collection_date: collection_date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    collected_by: collected_by || actingUser.name,
    location_found: location_found || "Site",
    description: description || "",
    file_name,
    file_size,
    security_level: security_level || "standard"
  }, actingUser);
  res.status(201).json(newEv);
});
app.get("/api/audit-logs", (req, res) => {
  let logs = db.getAuditLogs();
  const search = (req.query.search || "").toLowerCase();
  const moduleName = req.query.module;
  if (search) {
    logs = logs.filter(
      (l) => l.user_name.toLowerCase().includes(search) || l.description.toLowerCase().includes(search) || l.action.toLowerCase().includes(search)
    );
  }
  if (moduleName && moduleName !== "all") {
    logs = logs.filter((l) => l.module === moduleName);
  }
  res.json(logs);
});
app.get("/api/notifications", (req, res) => {
  const userId = req.query.userId;
  const role = req.query.role;
  res.json(db.getNotifications(userId, role));
});
app.post("/api/notifications/:id/read", (req, res) => {
  db.markNotificationAsRead(req.params.id);
  res.json({ success: true });
});
app.get("/api/statistics", (req, res) => {
  res.json(db.getDashboardStats());
});
app.post("/api/seed/reset", (req, res) => {
  const actingUser = getActingUser(req);
  if (actingUser.role !== "admin") {
    return res.status(403).json({ error: "Only Admin can reset system state" });
  }
  db.resetToSeed();
  res.json({ message: "System database successfully re-seeded with demo records." });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, HOST, () => {
    console.log(`Crime Report Tracking System (CRTS) server running on http://${HOST}:${PORT}`);
  });
}
startServer();
