const fs = require('fs');
let content = fs.readFileSync('src/db/store.ts', 'utf8');

const oldUpdate = `  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    this.data.users[idx] = { ...this.data.users[idx], ...updates };
    this.saveData();
    return this.data.users[idx];
  }`;

const newUpdate = `  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    
    if (this.data.users[idx].email === 'admin@crts.gov.so' && updates.is_active === false) {
      delete updates.is_active;
    }
    
    this.data.users[idx] = { ...this.data.users[idx], ...updates };
    this.saveData();
    return this.data.users[idx];
  }`;

content = content.replace(oldUpdate, newUpdate);

const oldDelete = `  public deleteUser(id: string, actingUser: User): boolean {
    const initialLength = this.data.users.length;
    this.data.users = this.data.users.filter(u => u.id !== id);`;

const newDelete = `  public deleteUser(id: string, actingUser: User): boolean {
    const userToDelete = this.data.users.find(u => u.id === id);
    if (userToDelete?.email === 'admin@crts.gov.so') return false;
    
    const initialLength = this.data.users.length;
    this.data.users = this.data.users.filter(u => u.id !== id);`;

content = content.replace(oldDelete, newDelete);

fs.writeFileSync('src/db/store.ts', content);
