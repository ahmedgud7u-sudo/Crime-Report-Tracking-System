const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

code = code.replace(
  /placeholder=\{\s*loginType === 'officer' \? 'Enter email or username' :\s*loginType === 'cid' \? 'Enter email or username' :\s*'Enter email or username'\s*\}/,
  "placeholder=\"Enter email or username\""
);

fs.writeFileSync('src/components/LoginView.tsx', code);
