import { useState } from "react";
import { UserPlus, Check, X, Search, Pencil, Trash2 } from "lucide-react";
export const UserManagementView = ({
  users,
  onCreateUser,
  onUpdateUser,
  onDeleteUser
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [role, setRole] = useState("officer");
  const [phone, setPhone] = useState("");
  const [stationLocation, setStationLocation] = useState("Garowe Central Station");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.badge_number && u.badge_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    if (!editingUserId && !password) return;
    setIsSubmitting(true);
    try {
      if (editingUserId) {
        await onUpdateUser(editingUserId, {
          name,
          email,
          ...password ? { password } : {},
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
        setCreatedCredentials({ username: email, password });
      }
    } catch (err) {
      setErrorMessage("Error saving user: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setShowAddModal(false);
    setEditingUserId(null);
    setName("");
    setEmail("");
    setPassword("");
    setBadgeNumber("");
    setCreatedCredentials(null);
  };
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setBadgeNumber(user.badge_number || "");
    setRole(user.role);
    setPhone(user.phone || "");
    setStationLocation(user.station_location || "");
    setShowAddModal(true);
  };
  const handleToggleStatus = async (user) => {
    try {
      await onUpdateUser(user.id, { is_active: !user.is_active });
    } catch (err) {
      setErrorMessage("Failed to update status: " + err.message);
    }
  };
  return <div className="space-y-6">
      
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">User & Role Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Admin console for provisioning police officers, CID investigators, admins, and citizen access accounts.
          </p>
        </div>
        <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center gap-2 "
  >
          <UserPlus className="w-4 h-4" /> Add New Staff / User
        </button>
      </div>

      {
    /* Filter and Search */
  }
      <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl   flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
    type="text"
    placeholder="Search name, email, badge #..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-lg text-xs text-slate-900 dark:text-white  focus:outline-none"
  />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-600">Role Filter:</span>
          <select
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
    className="bg-slate-100 border-none rounded-lg text-xs py-1.5 px-2 text-slate-800"
  >
            <option value="all">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="officer">Police Officer</option>
            <option value="investigator">Investigator</option>
            <option value="citizen">Citizen / Complainant</option>
          </select>
        </div>
      </div>

      {
    /* Users Table */
  }
      <div className="bg-white dark:bg-[#0f172a] rounded-xl   overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 uppercase text-[10px] font-bold text-slate-700 ">
              <tr>
                <th className="px-4 py-3">User Name</th>
                <th className="px-4 py-3">Badge #</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Station / Location</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((u) => <tr key={u.id} className="hover:bg-slate-50 dark:bg-slate-800/50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                    <div className="text-[10px] text-slate-400">{u.email}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-blue-600">{u.badge_number || "N/A"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === "admin" ? "bg-purple-100 text-purple-800" : u.role === "investigator" ? "bg-amber-100 text-amber-800" : u.role === "officer" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{u.station_location}</td>
                  <td className="px-4 py-3 text-slate-600">{u.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.is_active ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                      {u.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {u.email !== "admin@crts.gov.so" && <button
    onClick={() => handleToggleStatus(u)}
    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-[11px]"
  >
                        {u.is_active ? "Deactivate" : "Activate"}
                      </button>}
                    
                    <button
    onClick={() => handleEdit(u)}
    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-blue-100"
    title="Edit User"
  >
                      <Pencil className="w-3 h-3" /> Update
                    </button>

                    {onDeleteUser && u.email !== "admin@crts.gov.so" && <button
    onClick={() => setUserToDelete(u)}
    className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-red-100"
    title="Delete User"
  >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {
    /* Add User Modal */
  }
      {showAddModal && <div className="fixed inset-0 bg-slate-900/60  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-2xl   max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between  pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{editingUserId ? "Update User Account" : "Provision New User Account"}</h3>
              <button type="button" onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {createdCredentials ? <div className="space-y-4 py-4 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Account Provisioned</h4>
                <p className="text-sm text-slate-500 pb-2">Please share these credentials securely with the new user.</p>
                
                <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-200">
                  <div className="mb-3">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Username / Email</label>
                    <div className="text-slate-900 font-mono text-sm mt-1">{createdCredentials.username}</div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Temporary Password</label>
                    <div className="text-slate-900 font-mono text-sm mt-1 bg-white p-2 rounded border border-slate-200 select-all">{createdCredentials.password}</div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
    type="button"
    onClick={resetForm}
    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors"
  >
                    Done
                  </button>
                </div>
              </div> : <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="e.g. Officer Ahmed Hassan"
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
              </div>

              <div>
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
                <label className="font-semibold text-slate-700 block mb-1">
                  Password {editingUserId ? "(Leave empty to keep current)" : "*"}
                </label>
                <input
    type="text"
    required={!editingUserId}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder={editingUserId ? "Leave empty to keep current" : "Create a password"}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Badge Number</label>
                  <input
    type="text"
    value={badgeNumber}
    onChange={(e) => setBadgeNumber(e.target.value)}
    placeholder="PNT-201"
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Role *</label>
                  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  >
                    <option value="officer">Police Officer</option>
                    <option value="investigator">Investigator</option>
                    <option value="admin">Administrator</option>
                    <option value="citizen">Citizen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Station Jurisdiction</label>
                  <input
    type="text"
    value={stationLocation}
    onChange={(e) => setStationLocation(e.target.value)}
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="e.g. 252..."
    className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
  />
                </div>
              </div>

              <div className="pt-3  flex justify-end gap-2">
                <button
    type="button"
    onClick={resetForm}
    className="px-4 py-2 bg-slate-100 border-none rounded text-slate-700 font-semibold"
  >
                  Cancel
                </button>
                <button
    type="submit"
    disabled={isSubmitting}
    className="px-5 py-2 bg-blue-600 text-white rounded font-semibold"
  >
                  Create Account
                </button>
              </div>
            </form>}
          </div>
        </div>}

      {
    /* Delete Confirmation Modal */
  }
      {userToDelete && <div className="fixed inset-0 bg-slate-900/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Delete User</h3>
            <p className="text-sm text-slate-500 mb-5">
              Are you sure you want to completely remove <strong>{userToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
    onClick={() => setUserToDelete(null)}
    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm"
  >
                Cancel
              </button>
              <button
    onClick={async () => {
      if (onDeleteUser) {
        try {
          await onDeleteUser(userToDelete.id);
          setUserToDelete(null);
        } catch (err) {
          setErrorMessage(err.message);
        }
      }
    }}
    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm"
  >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>}

      {
    /* Error Modal */
  }
      {errorMessage && <div className="fixed inset-0 bg-slate-900/60 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 text-center">
            <h3 className="font-bold text-lg text-red-600 mb-2">Error</h3>
            <p className="text-sm text-slate-700 mb-5">{errorMessage}</p>
            <button
    onClick={() => setErrorMessage(null)}
    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm w-full"
  >
              Close
            </button>
          </div>
        </div>}

    </div>;
};
