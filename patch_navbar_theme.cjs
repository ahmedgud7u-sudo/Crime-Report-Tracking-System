const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Add Sun/Moon icons to import
code = code.replace("LogOut", "LogOut,\n  Sun,\n  Moon");

// Add theme state and toggle function
const themeLogic = `  const [showProfileModal, setShowProfileModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize theme on mount
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
`;
code = code.replace("const [showProfileModal, setShowProfileModal] = useState(false);", themeLogic);

// Add the button next to notifications
const buttonHtml = `        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
        </button>

        {/* Notifications Center */}`;
code = code.replace("{/* Notifications Center */}", buttonHtml);

// Add some dark classes to Navbar
code = code.replace('className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10"', 'className="h-16 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-10"');
code = code.replace('text-slate-900', 'text-slate-900 dark:text-white').replace('text-slate-900', 'text-slate-900 dark:text-white');

fs.writeFileSync('src/components/Navbar.tsx', code);
