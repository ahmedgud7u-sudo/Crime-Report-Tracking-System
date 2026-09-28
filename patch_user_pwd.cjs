const fs = require('fs');

let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

content = content.replace(
  "const [email, setEmail] = useState('');",
  "const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');"
);

content = content.replace(
  `    if (!name || !email) return;`,
  `    if (!name || !email || !password) return;`
);

const oldSubmit = `      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let generatedPassword = "";
      for (let i = 0; i < 8; i++) {
        generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      setCreatedCredentials({ username: email, password: generatedPassword });`;
      
const newSubmit = `      setCreatedCredentials({ username: email, password: password });`;

content = content.replace(oldSubmit, newSubmit);

content = content.replace(
  `    setEmail('');`,
  `    setEmail('');\n    setPassword('');`
);

const oldEmail = `              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahmed@crts.gov.so"
                  className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
                />
              </div>`;

const newEmail = `              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahmed@crts.gov.so"
                  className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
                />
              </div>
              
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Password *</label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
                />
              </div>`;

content = content.replace(oldEmail, newEmail);

fs.writeFileSync('src/components/UserManagementView.tsx', content);
