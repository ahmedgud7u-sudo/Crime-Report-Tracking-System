import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { DashboardView } from "./components/DashboardView.jsx";
import { EvidenceView } from "./components/EvidenceView.jsx";
import { CrimeReportsView } from "./components/CrimeReportsView.jsx";
import { CaseManagementView } from "./components/CaseManagementView.jsx";
import { ReportsAnalyticsView } from "./components/ReportsAnalyticsView.jsx";
import { AuditLogsView } from "./components/AuditLogsView.jsx";
import { UserManagementView } from "./components/UserManagementView.jsx";
import { CategoryManagementView } from "./components/CategoryManagementView.jsx";
import { PublicTrackerView } from "./components/PublicTrackerView.jsx";
import { ThesisTraceabilityView } from "./components/ThesisTraceabilityView.jsx";
import { LoginView } from "./components/LoginView.jsx";
export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [caseStatusFilter, setCaseStatusFilter] = useState("all");
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reports, setReports] = useState([]);
  const [cases, setCases] = useState([]);
  const [evidenceList, setEvidenceList] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(
    null
  );
  const [selectedReportId, setSelectedReportId] = useState(
    void 0
  );
  const [selectedCaseId, setSelectedCaseId] = useState(
    void 0
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const fetchAllData = async (userToUse) => {
    setIsLoading(true);
    try {
      const activeUser = userToUse || currentUser;
      const headers = {};
      if (activeUser) {
        headers["x-user-id"] = activeUser.id;
      }
      const [
        usersRes,
        catRes,
        repRes,
        caseRes,
        evRes,
        logRes,
        notifRes,
        statsRes
      ] = await Promise.all([
        fetch("/api/users", { headers }),
        fetch("/api/categories", { headers }),
        fetch("/api/reports", { headers }),
        fetch("/api/cases", { headers }),
        fetch("/api/evidence", { headers }),
        fetch("/api/audit-logs", { headers }),
        fetch("/api/notifications", { headers }),
        fetch("/api/statistics", { headers })
      ]);
      if (usersRes.ok) {
        const uData = await usersRes.json();
        setAllUsers(uData);
      }
      if (catRes.ok) setCategories(await catRes.json());
      if (repRes.ok) setReports(await repRes.json());
      if (caseRes.ok) setCases(await caseRes.json());
      if (evRes.ok) setEvidenceList(await evRes.json());
      if (logRes.ok) setAuditLogs(await logRes.json());
      if (notifRes.ok) setNotifications(await notifRes.json());
      if (statsRes.ok) setDashboardStats(await statsRes.json());
      setErrorMsg("");
    } catch (err) {
      console.error("Failed to load CRTS data:", err);
      setErrorMsg("Failed to connect to CRTS backend server. Retrying...");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);
  useEffect(() => {
    if (currentUser && allUsers.length > 0) {
      const updatedUser = allUsers.find((u) => u.id === currentUser.id);
      if (updatedUser && updatedUser.is_active === false) {
        alert("Your account has been deactivated. You will be logged out.");
        setCurrentUser(null);
      }
    }
  }, [allUsers, currentUser]);
  const handleSwitchUser = async (user) => {
    setCurrentUser(user);
    if (!user) return;
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id })
      });
      fetchAllData(user);
    } catch (err) {
      console.error("Failed to authenticate:", err);
    }
  };
  const handleResetData = async () => {
    if (!currentUser) return;
    if (confirm(
      "Are you sure you want to reset the CRTS database to initial thesis demo data?"
    )) {
      try {
        const res = await fetch("/api/seed/reset", {
          method: "POST",
          headers: { "x-user-id": currentUser.id }
        });
        if (res.ok) {
          alert("Database successfully reset to initial demo seed!");
          fetchAllData();
        } else {
          const err = await res.json();
          alert("Reset failed: " + err.error);
        }
      } catch (err) {
        alert("Error resetting data: " + err.message);
      }
    }
  };
  const handleCreateReport = async (reportData) => {
    if (!currentUser) return;
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify(reportData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit report");
    }
    await fetchAllData();
  };
  const handleConvertToCase = async (reportId, investigatorId, officerId, summary, title, priority, evidence, notes, dateAssigned) => {
    if (!currentUser) return;
    const res = await fetch(`/api/reports/${reportId}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify({
        assignedInvestigatorId: investigatorId,
        assignedOfficerId: officerId,
        summaryOverride: summary,
        title,
        priority,
        evidence,
        notes,
        dateAssigned
      })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to convert report to case");
    }
    await fetchAllData();
  };
  const handleUpdateReport = async (reportId, updates) => {
    if (!currentUser) return;
    const res = await fetch(`/api/reports/${reportId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update report");
    }
    await fetchAllData();
  };
  const handleDeleteReport = async (reportId) => {
    if (!currentUser) return;
    const res = await fetch(`/api/reports/${reportId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete report");
    }
    await fetchAllData();
  };
  const handleDeleteCase = async (caseId) => {
    if (!currentUser) return;
    const res = await fetch(`/api/cases/${caseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete case");
    }
    await fetchAllData();
  };
  const handleCreateCase = async (caseData) => {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUser.id
        },
        body: JSON.stringify(caseData)
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to create case");
      }
      await fetchAllData();
    } catch (err) {
      alert("Error creating case: " + err.message);
    }
  };
  const handleUpdateCaseStatus = async (caseId, newStatus, remarks) => {
    if (!currentUser) return;
    const res = await fetch(`/api/cases/${caseId}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify({ newStatus, remarks })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update case status");
    }
    await fetchAllData();
  };
  const handleAssignInvestigator = async (caseId, investigatorId) => {
    if (!currentUser) return;
    const res = await fetch(`/api/cases/${caseId}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify({ investigatorId })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to reassign investigator");
    }
    await fetchAllData();
  };
  const handleAddNote = async (caseId, noteType, content, isConfidential) => {
    if (!currentUser) return;
    const res = await fetch(`/api/cases/${caseId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify({
        note_type: noteType,
        content,
        is_confidential: isConfidential
      })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to add note");
    }
    await fetchAllData();
  };
  const handleAddEvidence = async (caseId, caseNumber, title, type, description, securityLevel) => {
    if (!currentUser) return;
    const res = await fetch("/api/evidence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify({
        case_id: caseId,
        case_number: caseNumber,
        title,
        type,
        description,
        security_level: securityLevel
      })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to add evidence");
    }
    await fetchAllData();
  };
  const handleRegisterCitizen = async (userData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const newUser = await res.json();
        setAllUsers((prev) => [...prev, newUser]);
        setCurrentUser(newUser);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to register");
      }
    } catch (err) {
      console.error(err);
      alert("Error registering");
    }
  };
  const handleCreateUser = async (userData) => {
    if (!currentUser) return;
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify(userData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create user");
    }
    await fetchAllData();
  };
  const handleDeleteUser = async (id) => {
    if (!currentUser) return;
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete user");
    }
    await fetchAllData();
  };
  const handleUpdateUser = async (id, updates) => {
    if (!currentUser) return;
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update user");
    }
    await fetchAllData();
  };
  const handleCreateCategory = async (categoryData) => {
    if (!currentUser) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": currentUser.id
      },
      body: JSON.stringify(categoryData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create category");
    }
    await fetchAllData();
  };
  const handleDeleteCategory = async (categoryId) => {
    if (!currentUser) return;
    const res = await fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "x-user-id": currentUser.id
      }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete category");
    }
    await fetchAllData();
  };
  if (isLoading || !dashboardStats) {
    return <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />

        <h2 className="text-lg font-bold">
          Crime Report Tracking System (CRTS)
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Initializing database & loading law enforcement records...
        </p>
      </div>;
  }
  if (!currentUser) {
    return <LoginView
      users={allUsers}
      onLogin={handleSwitchUser}
      onRegister={handleRegisterCitizen}
      stats={dashboardStats}
    />;
  }
  const newReportsCount = reports.filter(
    (r) => r.status === "submitted"
  ).length;
  const activeCasesCount = cases.filter(
    (c) => c.status !== "Closed" && c.status !== "Resolved"
  ).length;
  return <div className="min-h-screen flex font-sans text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#03091A] overflow-hidden">
      {
    /* Sidebar Navigation - Full height on the left */
  }

      <Sidebar
    activeTab={activeTab}
    onSelectTab={(tab) => {
      setActiveTab(tab);
      setSelectedReportId(void 0);
      setSelectedCaseId(void 0);
    }}
    userRole={currentUser.role}
    newReportsCount={newReportsCount}
    activeCasesCount={activeCasesCount}
  />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {
    /* Top Bar - Above main content */
  }

        <Navbar
    currentUser={currentUser}
    allUsers={allUsers}
    onSwitchUser={handleSwitchUser}
    onOpenSearch={() => setActiveTab("public-tracker")}
    notifications={notifications}
    onSelectTab={setActiveTab}
    onResetData={() => {
    }}
  />

        {
    /* Main Workspace Area */
  }

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardView
    stats={dashboardStats}
    onSelectTab={(tab, filter) => {
      if (filter) setCaseStatusFilter(filter);
      setActiveTab(tab);
    }}
    onViewReport={(id) => {
      setSelectedReportId(id);
      setActiveTab("reports");
    }}
    onViewCase={(id) => {
      setSelectedCaseId(id);
      setActiveTab("cases");
    }}
    userRole={currentUser.role}
  />}

          {activeTab === "reports" && <CrimeReportsView
    reports={reports}
    categories={categories}
    allUsers={allUsers}
    currentUser={currentUser}
    onCreateReport={handleCreateReport}
    onUpdateReport={handleUpdateReport}
    onConvertToCase={handleConvertToCase}
    onDeleteReport={handleDeleteReport}
    selectedReportId={selectedReportId}
    onClearSelectedReport={() => setSelectedReportId(void 0)}
  />}

          {activeTab === "cases" && <CaseManagementView
    cases={cases}
    initialStatusFilter={caseStatusFilter}
    allUsers={allUsers}
    currentUser={currentUser}
    onUpdateStatus={handleUpdateCaseStatus}
    onCreateCase={handleCreateCase}
    onAssignInvestigator={handleAssignInvestigator}
    onAddNote={handleAddNote}
    onAddEvidence={handleAddEvidence}
    onDeleteCase={handleDeleteCase}
    selectedCaseId={selectedCaseId}
    onClearSelectedCase={() => setSelectedCaseId(void 0)}
  />}

          {activeTab === "evidence" && <EvidenceView evidenceList={evidenceList} />}

          {activeTab === "analytics" && <ReportsAnalyticsView
    stats={dashboardStats}
    reports={reports}
    cases={cases}
    onSelectTab={(tab, filter) => {
      if (filter) setCaseStatusFilter(filter);
      setActiveTab(tab);
    }}
  />}

          {activeTab === "public-tracker" && <PublicTrackerView
    reports={reports}
    cases={cases}
  />}

          {activeTab === "audit-logs" && <AuditLogsView logs={auditLogs} />}

          {activeTab === "users" && (currentUser.role === "admin" || currentUser.role === "investigator") && <UserManagementView
    users={allUsers}
    onCreateUser={handleCreateUser}
    onUpdateUser={handleUpdateUser}
    onDeleteUser={handleDeleteUser}
  />}

          {activeTab === "categories" && currentUser.role === "admin" && <CategoryManagementView
    categories={categories}
    onCreateCategory={handleCreateCategory}
  />}

          {activeTab === "thesis-matrix" && <ThesisTraceabilityView />}
        </main>
      </div>
    </div>;
}
