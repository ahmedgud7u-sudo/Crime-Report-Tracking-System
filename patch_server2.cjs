const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// The DBStore has private `data`. Let's replace db.data.users.push with a method if needed, or bypass.
// Actually, DBStore already has a `data` property. We can use `db.getUsers().push(newUser)` if it's mutable, 
// or since it returns `this.data.users`, pushing to it modifies the array! Let's check db.getUsers().
// Better yet, just replace db.data.users.push with db.getUsers().push

code = code.replace("db.data.users.push(newUser);", "db.getUsers().push(newUser as any);");
code = code.replace("role: 'citizen',", "role: 'citizen' as const,");

fs.writeFileSync('server.ts', code);
