const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  "  if (actingUser.role !== 'admin') {\n    return res.status(403).json({ error: 'Unauthorized. Admin access required.' });\n  }",
  "  if (actingUser.role !== 'admin' && actingUser.role !== 'investigator') {\n    return res.status(403).json({ error: 'Unauthorized. Admin or Investigator access required.' });\n  }"
);
content = content.replace(
  "  if (actingUser.role !== 'admin') {\n    return res.status(403).json({ error: 'Unauthorized. Admin access required.' });\n  }",
  "  if (actingUser.role !== 'admin' && actingUser.role !== 'investigator') {\n    return res.status(403).json({ error: 'Unauthorized. Admin or Investigator access required.' });\n  }"
);
content = content.replace(
  "  if (actingUser.role !== 'admin') {\n    return res.status(403).json({ error: 'Unauthorized. Admin access required.' });\n  }",
  "  if (actingUser.role !== 'admin' && actingUser.role !== 'investigator') {\n    return res.status(403).json({ error: 'Unauthorized. Admin or Investigator access required.' });\n  }"
);

fs.writeFileSync('server.ts', content);
