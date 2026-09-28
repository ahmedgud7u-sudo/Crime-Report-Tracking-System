const fs = require('fs');

let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

const oldPwdField = `              {!editingUserId && (
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
                </div>
              )}`;

const newPwdField = `              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Password {editingUserId ? '(Leave empty to keep current)' : '*'}
                </label>
                <input
                  type="text"
                  required={!editingUserId}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={editingUserId ? "Leave empty to keep current" : "Create a password"}
                  className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
                />
              </div>`;

content = content.replace(oldPwdField, newPwdField);

fs.writeFileSync('src/components/UserManagementView.tsx', content);
