const fs = require('fs');

let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

// We will add a simple confirmation modal state
content = content.replace(
  "const [editingUserId, setEditingUserId] = useState<string | null>(null);",
  "const [editingUserId, setEditingUserId] = useState<string | null>(null);\n  const [userToDelete, setUserToDelete] = useState<User | null>(null);\n  const [errorMessage, setErrorMessage] = useState<string | null>(null);"
);

// Replace alert with errorMessage
content = content.replace(
  "alert('Error saving user: ' + err.message);",
  "setErrorMessage('Error saving user: ' + err.message);"
);
content = content.replace(
  "alert('Failed to update status: ' + err.message);",
  "setErrorMessage('Failed to update status: ' + err.message);"
);

// Replace Delete action
const oldDeleteAction = `                    {onDeleteUser && (
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
                    )}`;

const newDeleteAction = `                    {onDeleteUser && (
                      <button
                        onClick={() => setUserToDelete(u)}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-[11px] inline-flex items-center gap-1 border-red-100"
                        title="Delete User"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}`;

content = content.replace(oldDeleteAction, newDeleteAction);

// Add the modals at the end of the return
const oldEnd = `    </div>
  );
};`;

const newEnd = `      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 z-[60] flex items-center justify-center p-4">
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
                    } catch (err: any) {
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
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 bg-slate-900/60 z-[70] flex items-center justify-center p-4">
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
        </div>
      )}

    </div>
  );
};`;

content = content.replace(oldEnd, newEnd);

fs.writeFileSync('src/components/UserManagementView.tsx', content);
