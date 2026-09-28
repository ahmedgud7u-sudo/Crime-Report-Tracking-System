import React, { useState } from "react";
import {
  User as UserIcon,
  Bell,
  Search,
  LogOut,
  Sun,
  Moon,
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Shield
} from "lucide-react";
export const Navbar = ({
  currentUser,
  allUsers,
  onSwitchUser,
  onOpenSearch,
  notifications,
  onSelectTab,
  onResetData
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const [imgErrorSmall, setImgErrorSmall] = useState(false);
  const [imgErrorLarge, setImgErrorLarge] = useState(false);
  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const handleLogout = () => {
    onSwitchUser(null);
  };
  return <header className="bg-white  sticky top-0 z-40 h-16 flex items-center px-6 justify-between">
      
      {
    /* Left: Search Bar */
  }
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
    type="text"
    className="block w-full pl-10 pr-3 py-2  rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white  focus:border-blue-500 sm:text-sm transition-colors"
    placeholder="Search anything..."
    onClick={onOpenSearch}
  />
        </div>
      </div>

      {
    /* Right Actions */
  }
      <div className="flex items-center gap-6 ml-4">
        
                {
    /* Theme Toggle */
  }
        <button
    onClick={toggleTheme}
    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
    title="Toggle Theme"
  >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
        </button>

        {
    /* Notifications Center */
  }
        <div className="relative">
          <button
    id="notifications-btn"
    onClick={() => setShowNotifMenu(!showNotifMenu)}
    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative"
    title="Notifications"
  >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />}
          </button>

          {showNotifMenu && <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl   py-2 z-50">
              <div className="px-4 py-3 border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white dark:text-white uppercase tracking-wider">Notifications</h4>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  {notifications.length} Total
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 text-slate-800">
                {notifications.length === 0 ? <p className="p-4 text-center text-xs text-slate-500 font-medium">No active notifications.</p> : notifications.map((n) => <div key={n.id} className="p-3 hover:bg-slate-50 text-xs transition-colors">
                      <div className="font-bold text-slate-900">{n.title}</div>
                      <p className="text-slate-600 text-[11px] mt-1">{n.message}</p>
                      <span className="text-[10px] text-slate-400 font-medium mt-1.5 block">
                        {new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>)}
              </div>
            </div>}
        </div>

        {
    /* User Info */
  }
        <button
    onClick={() => setShowProfileModal(true)}
    className="flex items-center gap-3 pl-6 border-l  hover:bg-slate-50 p-2 -my-2 rounded-lg transition-colors cursor-pointer text-left"
  >
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
            {currentUser.profileImage && !imgErrorSmall ? <img
    src={currentUser.profileImage}
    alt={currentUser.name}
    className="w-full h-full object-cover"
    onError={() => setImgErrorSmall(true)}
  /> : <UserIcon className="w-5 h-5 text-blue-700" />}
          </div>
          <div className="hidden lg:block">
            <div className="font-bold text-slate-900 text-sm leading-none">{currentUser.name}</div>
            <div className="text-[11px] text-slate-500 font-medium capitalize mt-1">{currentUser.role.replace("_", " ")}</div>
          </div>
        </button>
      </div>

      {
    /* Profile Modal */
  }
      {showProfileModal && <div className="fixed inset-0 bg-slate-900/50  flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl  w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {
    /* Header / Banner */
  }
            <div className="relative h-32 bg-gradient-to-r from-blue-700 to-indigo-800">
               <button
    onClick={() => setShowProfileModal(false)}
    className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1.5 transition-colors"
  >
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            {
    /* Profile Content */
  }
            <div className="px-6 pb-6">
              <div className="flex items-end -mt-12 mb-4 relative z-10">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden  shrink-0">
                  {currentUser.profileImage && !imgErrorLarge ? <img
    src={currentUser.profileImage}
    alt={currentUser.name}
    className="w-full h-full object-cover"
    onError={() => setImgErrorLarge(true)}
  /> : <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="w-10 h-10 text-blue-700" />
                    </div>}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-black text-slate-900">{currentUser.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                   <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                     {currentUser.role.replace("_", " ")}
                   </span>
                   {currentUser.badge_number && <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                       <Shield className="w-4 h-4" /> {currentUser.badge_number}
                     </span>}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border-slate-100">
                    <Mail className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</div>
                    <div className="font-semibold text-slate-900">{currentUser.email || "N/A"}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border-slate-100">
                    <Phone className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</div>
                    <div className="font-semibold text-slate-900">{currentUser.phone || "N/A"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border-slate-100">
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Station / Location</div>
                    <div className="font-semibold text-slate-900">{currentUser.station_location || "N/A"}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border-slate-100">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Status</div>
                    <div className="font-bold text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Active
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-5 border-slate-100 flex justify-end">
                <button
    onClick={() => {
      setShowProfileModal(false);
      handleLogout();
    }}
    className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 "
  >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>}
    </header>;
};
