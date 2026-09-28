const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace('className="min-h-screen flex font-sans text-slate-800 bg-slate-50 overflow-hidden"', 'className="min-h-screen flex font-sans text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#03091A] overflow-hidden"');

fs.writeFileSync('src/App.tsx', code);
