import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Users,
  Tag,
  Search,
  Shield
} from "lucide-react";
export const Sidebar = ({
  activeTab,
  onSelectTab,
  userRole,
  newReportsCount,
  activeCasesCount
}) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "officer", "investigator", "citizen"]
    },
    {
      id: "reports",
      label: "Crime Reports",
      icon: FileText,
      badge: newReportsCount > 0 ? newReportsCount : void 0,
      badgeColor: "bg-blue-600 text-white",
      roles: ["admin", "officer", "investigator"]
    },
    {
      id: "cases",
      label: "Case Management",
      icon: Briefcase,
      badge: activeCasesCount > 0 ? activeCasesCount : void 0,
      badgeColor: "bg-blue-600 text-white",
      roles: ["admin", "officer", "investigator"]
    },
    {
      id: "analytics",
      label: "Reports & Analytics",
      icon: BarChart3,
      roles: ["admin", "officer", "investigator"]
    },
    {
      id: "public-tracker",
      label: "Public Case Tracker",
      icon: Search,
      roles: ["admin", "officer", "investigator", "citizen"]
    },
    {
      id: "audit-logs",
      label: "Audit Logs",
      icon: ShieldCheck,
      roles: ["admin", "officer", "investigator"]
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      roles: ["admin", "investigator"]
    },
    {
      id: "categories",
      label: "Crime Categories",
      icon: Tag,
      roles: ["admin"]
    }
  ];
  const allowedItems = menuItems.filter((item) => item.roles.includes(userRole));
  return <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      
      {
    /* Branding Logo Area */
  }
      <div className="h-16 flex items-center px-4 border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white leading-none">CRTS</span>
            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Crime Report Tracking System</span>
          </div>
        </div>
      </div>

      {
    /* Role Notice Banner */
  }
      <div className="p-4 border-slate-800 bg-slate-900/50">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
          Active Clearance
        </div>
        <p className="text-sm text-slate-300 font-medium">
          Role: <span className="font-bold text-white uppercase">{userRole}</span>
        </p>
      </div>

      {
    /* Main Navigation Links */
  }
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {allowedItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      id={`nav-item-${item.id}`}
      onClick={() => onSelectTab(item.id)}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-blue-600 text-white  shadow-blue-900/50" : item.highlight ? "text-blue-300 bg-blue-900/20 hover:bg-blue-900/40 border-blue-900/50" : "text-slate-400 hover:bg-slate-800/80 hover:text-white"}`}
    >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.highlight ? "text-blue-400" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== void 0 && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || "bg-slate-700 text-slate-200"}`}>
                  {item.badge}
                </span>}
            </button>;
  })}
      </nav>

      {
    /* Footer System Info Box */
  }
      <div className="p-4 m-3 bg-slate-800/50 rounded-xl border-slate-700/50 text-xs">
        <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 uppercase tracking-wide text-[10px]">
          <Shield className="w-3 h-3" />
          <span>Secure System</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          CRTS Core Database. All actions are audited.
        </p>
      </div>

    </aside>;
};
