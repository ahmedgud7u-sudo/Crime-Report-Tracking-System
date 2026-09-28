const fs = require('fs');

const files = [
  'src/components/CrimeReportsView.tsx',
  'src/components/CaseManagementView.tsx',
  'src/components/UserManagementView.tsx',
  'src/components/ReportsAnalyticsView.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    code = code.replaceAll('bg-white', 'bg-white dark:bg-[#0f172a]');
    code = code.replaceAll('text-slate-900', 'text-slate-900 dark:text-white');
    code = code.replaceAll('bg-slate-50', 'bg-slate-50 dark:bg-slate-800/50');
    fs.writeFileSync(file, code);
  }
}
