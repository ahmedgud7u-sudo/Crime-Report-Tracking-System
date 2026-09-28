const fs = require('fs');
let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

const oldSubmit = `        await onUpdateUser(editingUserId, {
          name,
          email,
          badge_number: badgeNumber,
          role,
          phone,
          station_location: stationLocation
        });`;

const newSubmit = `        await onUpdateUser(editingUserId, {
          name,
          email,
          ...(password ? { password } : {}),
          badge_number: badgeNumber,
          role,
          phone,
          station_location: stationLocation
        });`;

content = content.replace(oldSubmit, newSubmit);
fs.writeFileSync('src/components/UserManagementView.tsx', content);
