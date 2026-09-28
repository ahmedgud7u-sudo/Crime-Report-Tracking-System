const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

content = content.replace(
  "  created_at: string;\n}",
  "  created_at: string;\n  password?: string;\n}"
);

fs.writeFileSync('src/types.ts', content);
