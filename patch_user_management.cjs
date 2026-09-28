const fs = require('fs');

let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

content = content.replace(
  "const [isSubmitting, setIsSubmitting] = useState(false);",
  "const [isSubmitting, setIsSubmitting] = useState(false);\n  const [createdCredentials, setCreatedCredentials] = useState<{username: string, password: string} | null>(null);"
);

const oldSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

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
      setShowAddModal(false);
      setName('');
      setEmail('');
      setBadgeNumber('');
    } catch (err: any) {
      alert('Error creating user: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };`;

const newSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

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
      
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let generatedPassword = "";
      for (let i = 0; i < 8; i++) {
        generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      setCreatedCredentials({ username: email, password: generatedPassword });
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
    setBadgeNumber('');
    setCreatedCredentials(null);
  };`;

content = content.replace(oldSubmit, newSubmit);

// Replace the modal content with the success view if createdCredentials is not null
const oldFormStart = `<form onSubmit={handleSubmit} className="space-y-3 text-xs">`;
const newFormStart = `{createdCredentials ? (
              <div className="space-y-4 py-4 text-center">
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
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">`;

content = content.replace(oldFormStart, newFormStart);

const oldFormEnd = `              <div className="pt-3  flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 border-none rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>`;

const newFormEnd = `              <div className="pt-3  flex justify-end gap-2">
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
            )}`;

content = content.replace(oldFormEnd, newFormEnd);

// Handle the top X button
content = content.replace(
  `onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">`,
  `onClick={resetForm} className="text-slate-400 hover:text-slate-600">`
);

fs.writeFileSync('src/components/UserManagementView.tsx', content);
