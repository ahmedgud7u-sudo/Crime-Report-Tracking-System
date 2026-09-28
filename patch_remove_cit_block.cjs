const fs = require('fs');

let content = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const oldCheck = `      if (loginType === 'citizen') {
        const matchingUser = users.find(u => u.email === email && u.role === 'citizen');
        if (matchingUser) {
          if (matchingUser.is_active === false) {
            setError('Your account has been deactivated. Please contact the administrator.');
            setIsLoggingIn(false);
            return;
          }
          await onLogin(matchingUser);
          setIsLoggingIn(false);
          return;
        }
      }`;

content = content.replace(oldCheck, "");
fs.writeFileSync('src/components/LoginView.tsx', content);
