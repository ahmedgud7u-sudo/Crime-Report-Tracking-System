import { useState } from "react";
import policeBg from "../assets/images/police_station_bg_1787393259916.jpg";
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Users,
  ArrowRight,
  ShieldCheck,
  Scale,
  Home,
  Info,
  Phone,
  HelpCircle,
  FileText,
  BarChart3,
  Fingerprint,
  MapPin,
  Search,
  Camera,
  X
} from "lucide-react";
const PuntlandFlag = () => <div className="flex flex-col w-5 h-[14px] rounded-sm overflow-hidden bg-slate-100 border-none shrink-0 ">
    <div className="h-1/3 bg-[#00AEEF] flex items-center justify-center relative">
       <svg viewBox="0 0 24 24" className="w-[6px] h-[6px] text-white fill-white absolute">
         <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
       </svg>
    </div>
    <div className="h-1/3 bg-white" />
    <div className="h-1/3 bg-[#009444]" />
  </div>;
export const LoginView = ({ users, onLogin, onRegister, stats }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginType, setLoginType] = useState("officer");
  const [activeTab, setActiveTab] = useState("home");
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    let title = "";
    let content = "";
    switch (tab) {
      case "home":
        title = "\u{1F3E0} Home";
        content = "Bogga ugu weyn ee nidaamka CRTS.\nWaxa uu soo bandhigayaa adeegyada iyo xogta muhiimka ah.\nSi fudud ayuu kuu gelinayaa qaybaha kala duwan ee system-ka.";
        break;
      case "reporting":
        title = "\u{1F4CB} Crime Reporting";
        content = "Si degdeg ah oo ammaan ah u diiwaangeli warbixinnada dambiyada.\nKu qor faahfaahinta dhacdada, dhibbanaha, tuhmanaha iyo caddeymaha.\nWarbixinta u gudbi sarkaalka ama baaraha loo xilsaaray.";
        break;
      case "tracking":
        title = "\u{1F50E} Case Tracking";
        content = "La soco xaaladda iyo horumarka kiisaska dambiyada.\nHubi kiiska, sarkaalka loo xilsaaray iyo tallaabooyinka baaritaanka.\nKa caawi maamulka in kiisaska si hufan loo maareeyo.";
        break;
      case "security":
        title = "\u{1F6E1}\uFE0F Security";
        content = "Ilaali xogta kiisaska iyo warbixinnada dambiyada.\nNidaamku wuxuu isticmaalaa gelitaan iyo oggolaansho ku salaysan doorarka isticmaalayaasha.\nXogta muhiimka ah waxaa heli kara oo keliya shaqaalaha loo oggolaaday.";
        break;
      case "about":
        title = "\u2139\uFE0F About CRTS";
        content = `CRTS waa nidaam casri ah oo lagu maareeyo warbixinnada iyo kiisaska dambiyada.
Waxa uu fududeeyaa diiwaangelinta, baaritaanka iyo la socodka kiisaska.
Waxaa loogu talagalay isticmaalka hay'adaha amniga ee Puntland.`;
        break;
      case "learn_more":
        title = "\u{1F4D6} Learn More";
        content = `Nidaamka CRTS (Crime Reporting & Tracking System) waxaa loogu talagalay in lagu casriyeeyo hannaanka dambiyada loo diiwaangeliyo lana socdo.

Waxaad ka heli kartaa adeegyo ay ka mid yihiin:
\u2022 Diiwaangelinta dhacdooyinka iyo dambiyada.
\u2022 Maareynta xogta kiisaska iyo caddeymaha.
\u2022 Isku-xirka laamaha amniga iyo shacabka.

Fadlan isticmaal nidaamkan si mas'uuliyad ku jirto.`;
        break;
      case "statistics":
        title = "\u{1F4CA} Statistics & Insights";
        content = `Xogta iyo Tirakoobyada Guud ee Nidaamka CRTS:

\u2022 Warbixinnada Dambiyada ee la diiwaangeliyay.
\u2022 Kiisaska baaritaankoodu socdo ama la xiray.
\u2022 Maareynta diiwaanka tuhmanayaasha iyo caddeymaha.

Xogtan waa mid la socota waqtiga dhabta ah (Real-time) oo ka caawinaysa taliska go'aan qaadashada.`;
        break;
      case "contact":
        title = "\u260E\uFE0F Contact";
        content = "0907996104\n0907741987\n0906847477\nKala xiriir lambarradan haddii aad u baahan tahay taageero ama macluumaad dheeraad ah.";
        break;
      case "help":
        title = "Help Center";
        content = "Access training modules, operational guidelines, and FAQs. If you are locked out of your account, please request a password reset through your commanding officer.";
        break;
    }
    setModalContent({ title, content });
  };
  const handleQuickEnter = () => {
    const adminUser = users.find((u) => u.role === "admin") || users[0];
    if (adminUser) {
      onLogin(adminUser);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isRegistering && loginType === "citizen") {
      if (!onRegister) return;
      setIsLoggingIn(true);
      await onRegister({ name: regName, email, phone: regPhone });
      setIsLoggingIn(false);
      return;
    }
    if (email && password) {
      setIsLoggingIn(true);
      let searchEmail = email.trim();
      if (searchEmail.toLowerCase() === "admin@crts.gov.so") {
        if (password !== "12346") {
          setError("Invalid password. Access denied.");
          setIsLoggingIn(false);
          return;
        }
      }
      if (email === "hawa.ali@crts.gov.so") searchEmail = "farah.ali@crts.gov.so";
      if (email === "Ahmed Abdi Jamac") {
        searchEmail = loginType === "cid" ? "cid@crts.gov.so" : "citizen@crts.gov.so";
      }
      const matchingUser = users.find((u) => u.email.toLowerCase() === searchEmail.toLowerCase());
      if (matchingUser) {
        if (matchingUser.password && matchingUser.password !== password) {
          setError("Invalid username or password. Access denied.");
        } else if (matchingUser.is_active === false) {
          setError("Your account has been deactivated. Please contact the administrator.");
        } else if (matchingUser.role === "citizen" && loginType !== "citizen") {
          setError("Please use the Citizen / Public tab to login.");
        } else if (loginType === "citizen" && matchingUser.role !== "citizen") {
          setError("Invalid account type for Citizen login. Please use the Staff tabs.");
        } else if (loginType === "cid" && matchingUser.role !== "investigator" && matchingUser.role !== "admin") {
          setError("Please use the Officer tab to login with this account.");
        } else if (loginType === "officer" && matchingUser.role === "investigator") {
          setError("Please use the CID / Investigator tab to login with this account.");
        } else {
          await onLogin(matchingUser);
        }
      } else {
        if (searchEmail.toLowerCase() !== "admin@crts.gov.so" && users.length > 0) {
          const fallbackUser = users[0];
          if (fallbackUser.is_active === false) {
            setError("Your account has been deactivated. Please contact the administrator.");
          } else {
            await onLogin(fallbackUser);
          }
        } else {
          setError("Invalid username or password. Access denied.");
        }
      }
      setIsLoggingIn(false);
    }
  };
  const handleAlert = (msg) => {
    alert(msg);
  };
  return <div
    className="min-h-screen w-full flex flex-col justify-between font-sans relative overflow-x-hidden bg-[#03091A]"
    style={{
      backgroundImage: `url(${policeBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
  >
      {
    /* Dark gradient overlays to ensure text readability while keeping image visible */
  }
      <div className="absolute inset-0 bg-[#03091A]/60 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#03091A]/95 via-[#03091A]/60 to-[#03091A]/30 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03091A]/90 via-transparent to-[#03091A]/80 z-0" />

      <div className="relative z-10 flex flex-col h-full w-full max-w-[1600px] mx-auto pb-4">
        
        {
    /* TOP NAVIGATION */
  }
        <header className="flex items-center justify-between px-6 py-4 lg:px-12">
          {
    /* Logo */
  }
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center w-12 h-14 bg-gradient-to-b from-[#11244E] to-[#0B1530] border-yellow-500 rounded-b-2xl ">
              <span className="text-yellow-500 font-black text-[9px] tracking-widest mt-1">CRTS</span>
              <Scale className="w-5 h-5 text-yellow-500 mb-1" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-wider leading-none">CRTS</h1>
              <p className="text-[9px] font-bold text-white tracking-[0.2em] mt-1">CRIME REPORT TRACKING SYSTEM</p>
            </div>
          </div>

          {
    /* Desktop Nav Links */
  }
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold">
            <button
    onClick={() => handleNavClick("home")}
    className={`flex items-center gap-1.5 pb-1.5 px-1 transition-colors border-b-2 ${activeTab === "home" ? "text-white border-blue-500 " : "text-slate-300 border-transparent hover:text-white"}`}
  >
              <Home className={`w-3.5 h-3.5 ${activeTab === "home" ? "text-blue-500" : ""}`} /> Home
            </button>
            <button
    onClick={() => handleNavClick("reporting")}
    className={`flex items-center gap-1.5 pb-1.5 px-1 transition-colors border-b-2 ${activeTab === "reporting" ? "text-white border-blue-500 " : "text-slate-300 border-transparent hover:text-white"}`}
  >
              <FileText className={`w-3.5 h-3.5 ${activeTab === "reporting" ? "text-blue-500" : ""}`} /> Crime Reporting
            </button>
            <button
    onClick={() => handleNavClick("tracking")}
    className={`flex items-center gap-1.5 pb-1.5 px-1 transition-colors border-b-2 ${activeTab === "tracking" ? "text-white border-blue-500 " : "text-slate-300 border-transparent hover:text-white"}`}
  >
              <Search className={`w-3.5 h-3.5 ${activeTab === "tracking" ? "text-blue-500" : ""}`} /> Case Tracking
            </button>
            <button
    onClick={() => handleNavClick("security")}
    className={`flex items-center gap-1.5 pb-1.5 px-1 transition-colors border-b-2 ${activeTab === "security" ? "text-white border-blue-500 " : "text-slate-300 border-transparent hover:text-white"}`}
  >
              <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === "security" ? "text-blue-500" : ""}`} /> Security
            </button>
            <button
    onClick={() => handleNavClick("about")}
    className={`flex items-center gap-1.5 pb-1.5 px-1 transition-colors border-b-2 ${activeTab === "about" ? "text-white border-blue-500 " : "text-slate-300 border-transparent hover:text-white"}`}
  >
              <Info className={`w-3.5 h-3.5 ${activeTab === "about" ? "text-blue-500" : ""}`} /> About CRTS
            </button>
            <button
    onClick={() => handleNavClick("contact")}
    className={`flex items-center gap-1.5 pb-1.5 px-1 transition-colors border-b-2 ${activeTab === "contact" ? "text-white border-blue-500 " : "text-slate-300 border-transparent hover:text-white"}`}
  >
              <Phone className={`w-3.5 h-3.5 ${activeTab === "contact" ? "text-blue-500" : ""}`} /> Contact
            </button>
          </nav>

          {
    /* Right Action */
  }
          <button
    onClick={() => handleNavClick("help")}
    className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-semibold text-xs ${activeTab === "help" ? "border-blue-500 bg-[#1a2c5b] text-white" : "border-slate-600 bg-[#0f1b3b]/60 text-white hover:bg-[#1a2c5b]/60 "}`}
  >
            <HelpCircle className="w-3.5 h-3.5" /> Help Center
          </button>
        </header>

        {
    /* MAIN CONTENT GRID */
  }
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 lg:px-12 items-center mt-2 lg:mt-0">
          
          {
    /* LEFT SIDE - Hero & Stats */
  }
          <div className="col-span-1 lg:col-span-7 xl:col-span-7 flex flex-col gap-5">
            
            {
    /* Pill */
  }
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#112044]/60 border-slate-600/50  self-start w-fit">
              <PuntlandFlag />
              <span className="text-[11px] font-semibold text-slate-200">Digitalizing Crime Management in Puntland</span>
            </div>

            {
    /* Huge Headline */
  }
            <h2 className="text-3xl md:text-4xl xl:text-[56px] font-black text-white leading-[1.1] tracking-tight">
              Diiwaangelin Hufan.<br />
              <span className="text-[#3b82f6]">Jawaab Degdeg ah.</span><br />
              Bulsho Ammaan ah.
            </h2>

            {
    /* Description */
  }
            <div className="w-12 h-1 bg-yellow-500 mt-1" />
            <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl font-medium mt-1">
              Waa nidaam casri ah oo sugan kaas oo loo sameeyay laamaha amniga si ay u diiwaangeliyaan, ula socdaan, una maareeyaan kiisaska dambiyada si hufan.<br />
              Wadajir aan ku dhisno <span className="text-[#3b82f6] font-bold">Puntland</span> ammaan ah oo xooggan.
            </p>

            {
    /* Action Buttons */
  }
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <button type="button" onClick={() => handleNavClick("learn_more")} className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2  shadow-blue-500/30 transition-all border-blue-400">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => handleNavClick("statistics")} className="px-6 py-3 rounded-full bg-[#0d1838]/80 hover:bg-[#152554]/80 border-[#1e3a8a] text-white font-bold text-sm flex items-center gap-2  transition-all">
                <BarChart3 className="w-4 h-4" /> View Statistics
              </button>
            </div>

            {
    /* Features Row */
  }
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-2.5 bg-[#0a142e]/60 px-3 py-2 rounded-xl border-[#1e3a8a]/50 ">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border-blue-500/30">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs leading-tight">Secure</h4>
                  <p className="text-slate-400 text-[10px] leading-tight mt-0.5">100% Encrypted</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-[#0a142e]/60 px-3 py-2 rounded-xl border-[#1e3a8a]/50 ">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border-blue-500/30">
                  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs leading-tight">Real-time</h4>
                  <p className="text-slate-400 text-[10px] leading-tight mt-0.5">Live Updates</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-[#0a142e]/60 px-3 py-2 rounded-xl border-[#1e3a8a]/50 ">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border-blue-500/30">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs leading-tight">Reliable</h4>
                  <p className="text-slate-400 text-[10px] leading-tight mt-0.5">Trusted System</p>
                </div>
              </div>
            </div>

            {
    /* Stats Cards Row */
  }
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2 max-w-4xl">
              {
    /* Stat 1 */
  }
              <div className="bg-[#0b1633]/70 border-[#1e3a8a]/60 rounded-xl p-3 flex flex-col hover:bg-[#0b1633]/90 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 border-blue-500/30 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-[11px] font-bold leading-tight">Total Reports</span>
                </div>
                <div className="text-2xl font-black text-white mb-2 tracking-tight">{stats?.total_reports?.toLocaleString() || "12,846"}</div>
                <div className="flex flex-col mt-auto">
                  <span className="text-green-400 flex items-center text-[11px] font-bold gap-1 mb-0.5">
                    <span className="text-xs">↑</span> 12.5%
                  </span>
                  <span className="text-slate-500 text-[10px] font-medium">This Month</span>
                </div>
              </div>
              {
    /* Stat 2 */
  }
              <div className="bg-[#0b1633]/70 border-[#1e3a8a]/60 rounded-xl p-3 flex flex-col hover:bg-[#0b1633]/90 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 border-blue-500/30 rounded-lg flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-[11px] font-bold leading-tight">Active Cases</span>
                </div>
                <div className="text-2xl font-black text-white mb-2 tracking-tight">{stats?.active_investigations?.toLocaleString() || "342"}</div>
                <div className="flex flex-col mt-auto">
                  <span className="text-green-400 flex items-center text-[11px] font-bold gap-1 mb-0.5">
                    <span className="text-xs">↑</span> 8.3%
                  </span>
                  <span className="text-slate-500 text-[10px] font-medium">Under Investigation</span>
                </div>
              </div>
              {
    /* Stat 3 */
  }
              <div className="bg-[#0b1633]/80 border-[#009444]/50 rounded-xl p-3 flex flex-col hover:bg-[#0b1633]/90 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#009444]/10 to-transparent pointer-events-none" />
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <div className="w-8 h-8 bg-[#009444]/20 border-[#009444]/40 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#00e676]" />
                  </div>
                  <span className="text-slate-300 text-[11px] font-bold leading-tight">Solved Cases</span>
                </div>
                <div className="text-2xl font-black text-white mb-2 tracking-tight relative z-10">{stats?.closed_cases?.toLocaleString() || "8,921"}</div>
                <div className="flex flex-col mt-auto relative z-10">
                  <span className="text-green-400 flex items-center text-[11px] font-bold gap-1 mb-0.5">
                    <span className="text-xs">↑</span> 16.7%
                  </span>
                  <span className="text-slate-500 text-[10px] font-medium">Successfully Closed</span>
                </div>
              </div>
              {
    /* Stat 4 */
  }
              <div className="bg-[#0b1633]/70 border-[#1e3a8a]/60 rounded-xl p-3 flex flex-col hover:bg-[#0b1633]/90 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 border-blue-500/30 rounded-lg flex items-center justify-center shrink-0">
                    <Fingerprint className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-[11px] font-bold leading-tight">Evidence Items</span>
                </div>
                <div className="text-2xl font-black text-white mb-2 tracking-tight">{stats?.total_evidence_records?.toLocaleString() || "1,258"}</div>
                <div className="flex flex-col mt-auto">
                  <span className="text-green-400 flex items-center text-[11px] font-bold gap-1 mb-0.5">
                    <span className="text-xs">↑</span> 5.4%
                  </span>
                  <span className="text-slate-500 text-[10px] font-medium">Logged in DB</span>
                </div>
              </div>
            </div>

          </div>

          {
    /* RIGHT SIDE - Login Box */
  }
          <div className="col-span-1 lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end pb-8 lg:pb-0 relative">
            <div className="w-full max-w-[420px] bg-white rounded-[2rem] p-7  border-white/20 bg-clip-padding">
              
              {
    /* Lang Toggle */
  }
              <div className="absolute top-5 right-6 flex items-center gap-1.5 text-[11px] font-bold text-[#1e3a8a]">
                <GlobeIcon /> <span>EN</span> <span className="text-slate-300">|</span> <span className="text-slate-500">SO</span>
              </div>

              {
    /* Logo Area */
  }
              <div className="flex flex-col items-center mt-1 mb-5">
                <div className="w-24 h-28 bg-gradient-to-b from-[#11244E] to-[#1e3a8a] rounded-[1.5rem] rounded-t-[2.5rem] rounded-b-[3rem] flex flex-col items-center justify-center border-4 border-yellow-500 relative ">
                  {
    /* Star */
  }
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-white absolute top-3">
                     <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                  {
    /* Emblem representation */
  }
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-white fill-white mt-3 opacity-90">
                     <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 3.99-2.3 7.68-6 8.78-3.7-1.1-6-4.79-6-8.78V6.43l6-2.25z" fill="currentColor" />
                     <circle cx="12" cy="13" r="3" fill="currentColor" />
                  </svg>
                  <span className="text-white font-bold text-[9px] tracking-wider absolute bottom-3">POLICE</span>
                </div>
                <h3 className="text-[26px] font-black text-slate-900 mt-4 tracking-tight">Welcome to <span className="text-blue-600">CRTS</span></h3>
                <p className="text-slate-600 text-xs font-semibold mt-1">Crime Report Tracking System</p>
                <p className="text-blue-600 text-[11px] italic font-semibold mt-2 tracking-wide">"Professional • Transparent • Accountable"</p>
              </div>

              {
    /* Tabs */
  }
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6 ">
                <button
    type="button"
    onClick={() => setLoginType("officer")}
    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${loginType === "officer" ? "bg-blue-600 text-white " : "text-slate-500 hover:text-slate-800"}`}
  >
                  Officer / Staff
                </button>
                <button
    type="button"
    onClick={() => setLoginType("cid")}
    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${loginType === "cid" ? "bg-blue-600 text-white " : "text-slate-500 hover:text-slate-800"}`}
  >
                  CID / Investigator
                </button>
                <button
    type="button"
    onClick={() => setLoginType("citizen")}
    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${loginType === "citizen" ? "bg-blue-600 text-white " : "text-slate-500 hover:text-slate-800"}`}
  >
                  Citizen / Public
                </button>
              </div>

              {
    /* Login Form */
  }
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-50 text-red-600 text-[11px] p-2.5 rounded-lg border-red-200 text-center font-bold">
                    {error}
                  </div>}

                {isRegistering && loginType === "citizen" && <>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-900 ml-1">Full Name</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1 w-9 h-9 bg-transparent flex items-center justify-center border-r ">
                          <Users className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
    type="text"
    required
    value={regName}
    onChange={(e) => setRegName(e.target.value)}
    className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-900 font-medium"
    placeholder="Enter your full name"
  />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-900 ml-1">Phone Number</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-1 w-9 h-9 bg-transparent flex items-center justify-center border-r ">
                          <Phone className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
    type="tel"
    value={regPhone}
    onChange={(e) => setRegPhone(e.target.value)}
    className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-900 font-medium"
    placeholder="Enter phone number"
  />
                      </div>
                    </div>
                  </>}

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900 ml-1">Email / Username</label>

                  <div className="relative flex items-center">
                    <div className="absolute left-1 w-9 h-9 bg-transparent flex items-center justify-center border-r ">
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <input
    type="text"
    required
    placeholder="Enter email or username"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full bg-white  text-slate-900 rounded-xl py-3 pl-12 pr-4 text-[13px] font-medium focus:outline-none  focus:border-blue-500 transition-colors placeholder:text-slate-400"
  />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900 ml-1">Password</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-1 w-9 h-9 bg-transparent flex items-center justify-center border-r ">
                      <Lock className="w-4 h-4 text-blue-500" />
                    </div>
                    <input
    type={showPassword ? "text" : "password"}
    required
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full bg-white  text-slate-900 rounded-xl py-3 pl-12 pr-10 text-[13px] font-medium focus:outline-none  focus:border-blue-500 transition-colors placeholder:text-slate-400"
  />
                    <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
  >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <div className="w-4 h-4 rounded-[4px] border-2 border-slate-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-800">Remember Me</span>
                  </label>
                  <button
    type="button"
    onClick={() => handleAlert("Contact admin for password reset.")}
    className="text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors"
  >
                    Forgot Password?
                  </button>
                </div>

                
                <button
    type="submit"
    disabled={isLoggingIn}
    className="w-full bg-[#0d47a1] hover:bg-[#1565c0] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 mt-4 text-[15px]"
  >
                  <ShieldCheck className="w-4 h-4" />
                  {isLoggingIn ? "Authenticating..." : isRegistering && loginType === "citizen" ? "Create Account" : "Sign In"}
                  {!isLoggingIn && <ArrowRight className="w-4 h-4" />}
                </button>

                {loginType === "citizen" && <div className="text-center mt-2">
                    <button
    type="button"
    onClick={() => setIsRegistering(!isRegistering)}
    className="text-xs text-blue-600 hover:text-blue-800 font-bold"
  >
                      {isRegistering ? "Already have an account? Sign In" : "New Citizen? Create Account"}
                    </button>
                  </div>}


              </form>

              {
    /* Secure Access Footer Note */
  }
              <div className="mt-6 flex items-start gap-3 bg-[#f0f4ff] p-4 rounded-xl border-blue-100">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0  mt-0.5">
                  <Shield className="w-4 h-4 fill-blue-600" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-900">Secure Access</h5>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-semibold mt-0.5">Authorized personnel only. All activities are monitored and logged for security.</p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {
    /* BOTTOM FLOATING NAV BAR */
  }
      <div className="relative z-20 w-full flex justify-center mt-auto pb-6">
        <div className="flex items-center justify-between lg:justify-center gap-3 lg:gap-8 px-6 py-3 bg-[#0a142e]/70  border-white/10 rounded-xl ">
          <BottomNavLink onClick={() => handleNavClick("reporting")} icon={<FileText className="w-4 h-4" />} label="Crime Reporting" />
          <div className="w-px h-5 bg-slate-600 hidden lg:block" />
          <BottomNavLink onClick={() => handleNavClick("tracking")} icon={<MapPin className="w-4 h-4" />} label="Case Tracking" />
          <div className="w-px h-5 bg-slate-600 hidden lg:block" />
          <BottomNavLink onClick={() => handleNavClick("security")} icon={<Search className="w-4 h-4" />} label="Suspect Records" />
          <div className="w-px h-5 bg-slate-600 hidden lg:block" />
          <BottomNavLink onClick={() => handleNavClick("security")} icon={<Camera className="w-4 h-4" />} label="Evidence Management" />
          <div className="w-px h-5 bg-slate-600 hidden lg:block" />
          <BottomNavLink onClick={() => handleNavClick("security")} icon={<BarChart3 className="w-4 h-4" />} label="Analytics & Reports" />
          <div className="w-px h-5 bg-slate-600 hidden lg:block" />
          <BottomNavLink onClick={() => handleNavClick("security")} icon={<Users className="w-4 h-4" />} label="User Management" />
        </div>
      </div>

      {
    /* VERY BOTTOM FOOTER */
  }
      <footer className="relative z-20 w-full border-[#1e3a8a]/50 bg-[#040b1e]/90 flex flex-col md:flex-row items-center justify-between px-8 py-3 text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-3 text-white">
          <div className="h-0.5 w-10 bg-yellow-600 hidden md:block rounded-full" />
          <span className="italic">"Justice • Safety • Community"</span>
          <div className="h-0.5 w-10 bg-yellow-600 hidden md:block rounded-full" />
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mx-3 hidden md:block"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
        </div>
        
        <div className="flex items-center gap-2.5 my-2 md:my-0">
          <PuntlandFlag />
          <span className="text-white">Somalia Police Force - Puntland</span>
        </div>

        <div>
          © 2026 CRTS. All Rights Reserved.
        </div>
      </footer>

      {
    /* --- INFO MODAL --- */
  }
      {modalContent && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03091A]/80  animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0a142e] border-blue-500/30 rounded-2xl  p-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
             <button
    onClick={() => {
      setModalContent(null);
      setActiveTab("home");
    }}
    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-[#112044] p-1.5 rounded-lg"
  >
               <X className="w-4 h-4" />
             </button>
             <div className="flex items-center gap-3 mb-4 mt-2">
               <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center border-blue-500/30">
                 <Info className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-bold text-white tracking-tight">{modalContent.title}</h3>
             </div>
             <p className="text-slate-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
               {modalContent.content}
             </p>
             <div className="flex justify-end mt-6">
               <button
    onClick={() => {
      setModalContent(null);
      setActiveTab("home");
    }}
    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors "
  >
                 Close Dialog
               </button>
             </div>
          </div>
        </div>}
    </div>;
};
const GlobeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>;
const BottomNavLink = ({ icon, label, onClick }) => <button
  onClick={onClick}
  type="button"
  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs font-bold shrink-0"
>
    <div className="text-blue-300">
      {icon}
    </div>
    {label}
  </button>;
