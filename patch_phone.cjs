const fs = require('fs');
let content = fs.readFileSync('src/components/UserManagementView.tsx', 'utf8');

const oldField = `              <div>
                <label className="font-semibold text-slate-700 block mb-1">Station Jurisdiction</label>
                <input
                  type="text"
                  value={stationLocation}
                  onChange={(e) => setStationLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 border-none rounded-lg"
                />
              </div>`;

const newField = `              <div className="grid grid-cols-2 gap-3">
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
              </div>`;

content = content.replace(oldField, newField);
fs.writeFileSync('src/components/UserManagementView.tsx', content);
