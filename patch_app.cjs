const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const newUseEffect = `  useEffect(() => {
    fetchAllData();
  }, []);

  // Check if current user gets deactivated
  useEffect(() => {
    if (currentUser && allUsers.length > 0) {
      const updatedUser = allUsers.find(u => u.id === currentUser.id);
      if (updatedUser && updatedUser.is_active === false) {
        alert('Your account has been deactivated. You will be logged out.');
        setCurrentUser(null);
      }
    }
  }, [allUsers, currentUser]);`;

code = code.replace(`  useEffect(() => {
    fetchAllData();
  }, []);`, newUseEffect);

fs.writeFileSync('src/App.tsx', code);
