const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

code = code.replaceAll('bg-white', 'bg-white dark:bg-[#0f172a]');
code = code.replaceAll('text-slate-900', 'text-slate-900 dark:text-white');
code = code.replaceAll('bg-slate-50', 'bg-slate-50 dark:bg-slate-800/50');

fs.writeFileSync('src/components/DashboardView.tsx', code);
