const fs = require('fs');

let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

// Add Pencil to imports
content = content.replace("Users, Plus, UserPlus, Shield, Check, X, Search, Building2", "Users, Plus, UserPlus, Shield, Check, X, Search, Building2, Pencil, Trash2");

// Add state
content = content.replace(
  "const [showAddModal, setShowAddModal] = useState(false);",
  "const [showAddModal, setShowAddModal] = useState(false);\n  const [editingUserId, setEditingUserId] = useState<string | null>(null);"
);

// Replace handleSubmit
const oldSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setIsSubmitting(true);
    try {
      await onCreateUser({
        name,
        email,
        badge_number: badgeNumber,
        role,
        phone,
        station_location: stationLocation
      });
      
      setCreatedCredentials({ username: email, password: password });
    } catch (err: any) {
      alert('Error creating user: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setShowAddModal(false);
    setName('');
    setEmail('');
    setPassword('');
    setBadgeNumber('');
    setCreatedCredentials(null);
  };`;

const newSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    if (!editingUserId && !password) return; // password required only for new users

    setIsSubmitting(true);
    try {
      if (editingUserId) {
        await onUpdateUser(editingUserId, {
          name,
          email,
          badge_number: badgeNumber,
          role,
          phone,
          station_location: stationLocation
        });
        resetForm();
      } else {
        await onCreateUser({
          name,
          email,
          badge_number: badgeNumber,
          role,
          phone,
          station_location: stationLocation
        });
        setCreatedCredentials({ username: email, password: password });
      }
    } catch (err: any) {
      alert('Error saving user: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setShowAddModal(false);
    setEditingUserId(null);
    setName('');
    setEmail('');
    setPassword('');
    setBadgeNumber('');
    setCreatedCredentials(null);
  };
  
  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword(''); // leave blank for editing unless we want to let them change it
    setBadgeNumber(user.badge_number || '');
    setRole(user.role);
    setPhone(user.phone || '');
    setStationLocation(user.station_location || '');
    setShowAddModal(true);
  };`;

content = content.replace(oldSubmit, newSubmit);

// Adjust modal title
content = content.replace(
  `<h3 className="font-bold text-slate-900 dark:text-white text-base">Provision New User Account</h3>`,
  `<h3 className="font-bold text-slate-900 dark:text-white text-base">{editingUserId ? 'Update User Account' : 'Provision New User Account'}</h3>`
);

// Hide password field if editing
const oldPwdField = `              <div>
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
const newPwdField = `              {!editingUserId && (
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
content = content.replace(oldPwdField, newPwdField);

// Fix Submit button text
content = content.replace(
  `{isSubmitting ? 'Creating...' : 'Create Account'}`,
  `{isSubmitting ? 'Saving...' : (editingUserId ? 'Update Account' : 'Create Account')}`
);

// Replace action buttons in table row
const oldTableActions = `                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-[11px]"
                    >
                      {u.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    {onDeleteUser && (
                      <button
                        onClick={async () => {
                          if (window.confirm(\`Are you sure you want to completely remove \${u.name}?\`)) {
                            try {
                              await onDeleteUser(u.id);
                            } catch (err: any) {
                              alert(err.message);
                            }
                          }
                        }}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-red-100"
                        title="Delete User"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </td>`;
                  
const newTableActions = `                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-[11px]"
                    >
                      {u.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-blue-100"
                      title="Edit User"
                    >
                      <Pencil className="w-3 h-3" /> Update
                    </button>

                    {onDeleteUser && (
                      <button
                        onClick={async () => {
                          if (window.confirm(\`Are you sure you want to completely remove \${u.name}?\`)) {
                            try {
                              await onDeleteUser(u.id);
                            } catch (err: any) {
                              alert(err.message);
                            }
                          }
                        }}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-red-100"
                        title="Delete User"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}
                  </td>`;

content = content.replace(oldTableActions, newTableActions);

fs.writeFileSync('src/components/UserManagementView.tsx', content);
