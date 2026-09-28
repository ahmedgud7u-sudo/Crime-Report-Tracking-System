const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const registerEndpoint = `
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required fields.' });
  }

  const existingUsers = db.getUsers();
  if (existingUsers.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists.' });
  }

  const newUser = {
    id: 'USR-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    role: 'citizen',
    phone: phone || '',
    station_location: 'N/A',
    is_active: true,
    created_at: new Date().toISOString().split('T')[0]
  };

  db.data.users.push(newUser);
  res.status(201).json(newUser);
});
`;

code = code.replace("app.post('/api/auth/login'", registerEndpoint + "\napp.post('/api/auth/login'");

fs.writeFileSync('server.ts', code);
