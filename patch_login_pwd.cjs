const fs = require('fs');

let content = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const oldCheck = `      if (matchingUser) {
        if (matchingUser.is_active === false) {
          setError('Your account has been deactivated. Please contact the administrator.');
        } else {
          await onLogin(matchingUser);
        }
      } else {`;

const newCheck = `      if (matchingUser) {
        if (matchingUser.password && matchingUser.password !== password) {
          setError('Invalid username or password. Access denied.');
        } else if (matchingUser.is_active === false) {
          setError('Your account has been deactivated. Please contact the administrator.');
        } else {
          await onLogin(matchingUser);
        }
      } else {`;

content = content.replace(oldCheck, newCheck);

fs.writeFileSync('src/components/LoginView.tsx', content);
