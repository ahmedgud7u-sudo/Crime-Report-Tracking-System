const fs = require('fs');
let code = fs.readFileSync('src/components/CaseManagementView.tsx', 'utf8');

// Hide Update Status
const oldUpdateStatus = `<button
                  onClick={() => setShowStatusModal(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 "
                >
                  <Clock className="w-3.5 h-3.5" /> Update Status
                </button>`;
const newUpdateStatus = `{(currentUser.role !== 'citizen') && (
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 "
                >
                  <Clock className="w-3.5 h-3.5" /> Update Status
                </button>
                )}`;
code = code.replace(oldUpdateStatus, newUpdateStatus);

// Hide Upload Evidence
const oldUploadEvidence = `<button
                      onClick={() => setShowAddEvidenceModal(true)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 "
                    >
                      <Plus className="w-3.5 h-3.5" /> Upload Evidence
                    </button>`;
const newUploadEvidence = `{(currentUser.role !== 'citizen') && (
                    <button
                      onClick={() => setShowAddEvidenceModal(true)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5 "
                    >
                      <Plus className="w-3.5 h-3.5" /> Upload Evidence
                    </button>
                    )}`;
code = code.replace(oldUploadEvidence, newUploadEvidence);

// Hide Add Note Form - let's find the exact string
fs.writeFileSync('src/components/CaseManagementView.tsx', code);
