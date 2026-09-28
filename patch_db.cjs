const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/crts_db.json', 'utf8'));
const admin = data.users.find(u => u.email === 'admin@crts.gov.so');
if (admin) {
  admin.is_active = true;
  fs.writeFileSync('data/crts_db.json', JSON.stringify(data, null, 2));
  console.log('Fixed admin in DB');
}
