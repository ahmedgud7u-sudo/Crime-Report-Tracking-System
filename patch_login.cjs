const fs = require('fs');
let code = fs.readFileSync('src/components/LoginView.tsx', 'utf8');

const oldCode1 = `        if (matchingUser) {
          await onLogin(matchingUser);
          setIsLoggingIn(false);
          return;
        }`;

const newCode1 = `        if (matchingUser) {
          if (matchingUser.is_active === false) {
            setError('Your account has been deactivated. Please contact the administrator.');
            setIsLoggingIn(false);
            return;
          }
          await onLogin(matchingUser);
          setIsLoggingIn(false);
          return;
        }`;

code = code.replace(oldCode1, newCode1);

const oldCode2 = `      const matchingUser = users.find(u => u.email.toLowerCase() === searchEmail.toLowerCase());
      
      if (matchingUser) {
        await onLogin(matchingUser);
      } else {
        if (searchEmail.toLowerCase() !== 'admin@crts.gov.so' && users.length > 0) {
          await onLogin(users[0]); // Fallback for other demo accounts
        } else {
          setError('Invalid username or password. Access denied.');
        }
      }`;

const newCode2 = `      const matchingUser = users.find(u => u.email.toLowerCase() === searchEmail.toLowerCase());
      
      if (matchingUser) {
        if (matchingUser.is_active === false) {
          setError('Your account has been deactivated. Please contact the administrator.');
        } else {
          await onLogin(matchingUser);
        }
      } else {
        if (searchEmail.toLowerCase() !== 'admin@crts.gov.so' && users.length > 0) {
          const fallbackUser = users[0];
          if (fallbackUser.is_active === false) {
             setError('Your account has been deactivated. Please contact the administrator.');
          } else {
             await onLogin(fallbackUser); // Fallback for other demo accounts
          }
        } else {
          setError('Invalid username or password. Access denied.');
        }
      }`;

code = code.replace(oldCode2, newCode2);
fs.writeFileSync('src/components/LoginView.tsx', code);
