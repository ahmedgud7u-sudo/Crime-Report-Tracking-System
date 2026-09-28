const fs = require('fs');
let code = fs.readFileSync('src/components/CaseManagementView.tsx', 'utf8');

const oldForm = `{/* Add Note Form */}
                  <form onSubmit={handleNoteSubmit} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl  space-y-3">`;

const newForm = `{/* Add Note Form */}
                  {(currentUser.role !== 'citizen') && (
                  <form onSubmit={handleNoteSubmit} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl  space-y-3">`;

code = code.replace(oldForm, newForm);

const oldFormEnd = `                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" /> Save Note
                      </button>
                    </div>
                  </form>`;

const newFormEnd = `                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" /> Save Note
                      </button>
                    </div>
                  </form>
                  )}`;

code = code.replace(oldFormEnd, newFormEnd);
fs.writeFileSync('src/components/CaseManagementView.tsx', code);
