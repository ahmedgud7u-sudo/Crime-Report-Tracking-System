const fs = require('fs');
let code = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

code = code.replace("roles: ['admin', 'officer', 'investigator']", "roles: ['admin', 'officer', 'investigator', 'citizen']"); // dashboard
code = code.replace("roles: ['admin', 'officer', 'investigator']", "roles: ['admin', 'officer', 'investigator']"); // second one is reports (don't add)
// Instead of blind replaces, let's just do it directly.
