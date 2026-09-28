const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  "const { name, email, badge_number, role, phone, station_location } = req.body;",
  "const { name, email, password, badge_number, role, phone, station_location } = req.body;"
);

content = content.replace(
  "    is_active: true\n  });",
  "    is_active: true,\n    password: password || '123456'\n  });"
);

// We should also patch the mock data in db/store.ts if necessary, but we don't need to as long as we can login with newly created users.
fs.writeFileSync('server.ts', content);
