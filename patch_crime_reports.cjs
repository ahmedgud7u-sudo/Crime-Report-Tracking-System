const fs = require('fs');
let code = fs.readFileSync('src/components/CrimeReportsView.tsx', 'utf8');

// 1. Remove National ID field from create form
const oldCreateNationalId = `                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">National ID / Passport</label>
                    <input
                      type="text"
                      value={complainantNationalId}
                      onChange={(e) => setComplainantNationalId(e.target.value)}
                      placeholder="SOM-123456"
                      className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
                    />
                  </div>`;
code = code.replace(oldCreateNationalId, "");

// 2. Remove National ID field from update form
// Since it's exactly the same block, we can just replace it globally or do it again
code = code.replace(oldCreateNationalId, "");

// Fix the grid classes from sm:grid-cols-3 to sm:grid-cols-2 in Complainant Info
code = code.replace(/<h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Complainant \/ Reporter Info<\/h4>\s*<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">/g, 
  '<h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Complainant / Reporter Info</h4>\n                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">');

// 3. Remove Sawirka from create form
const oldSawirka = `                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Sawirka Eedeysanaha (Haddii uu jiro)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {suspectImage && (
                      <div className="mt-2 relative inline-block">
                        <img src={suspectImage} alt="Preview" className="h-16 w-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setPreviewImage(suspectImage)} />
                        <button type="button" onClick={() => setSuspectImage(null)} className="absolute -top-1.5 -right-1.5 bg-red-100 text-red-600 rounded-full p-0.5 hover:bg-red-200">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>`;

// Replace all occurrences (create and update)
code = code.replaceAll(oldSawirka, "");

fs.writeFileSync('src/components/CrimeReportsView.tsx', code);
