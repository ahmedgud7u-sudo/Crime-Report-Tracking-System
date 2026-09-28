const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

const oldCode = `            <div className="flex-1 bg-slate-900/50 rounded-lg p-3 border-slate-700/50 flex flex-col space-y-3 overflow-y-auto">
              {stats.location_breakdown.length === 0 ? (
                <div className="text-center text-xs text-slate-500 mt-4">Xogta deegaanada wali lama hayo</div>
              ) : (
                (() => {
                  const maxCrimes = Math.max(...stats.location_breakdown.map(l => l.count), 1);
                  const sortedLocations = [...stats.location_breakdown].sort((a, b) => b.count - a.count);
                  
                  return sortedLocations.map(loc => {
                    const percentage = Math.min((loc.count / maxCrimes) * 100, 100);
                    
                    let color = "bg-emerald-500";
                    let textColor = "text-emerald-400";
                    let label = "Dambiyo yar";
                    
                    if (percentage >= 80) {
                      color = "bg-red-600";
                      textColor = "text-red-500";
                      label = "Dambiyo aad u badan";
                    } else if (percentage >= 50) {
                      color = "bg-orange-500";
                      textColor = "text-orange-400";
                      label = "Dambiyo badan";
                    } else if (percentage >= 25) {
                      color = "bg-yellow-400";
                      textColor = "text-yellow-400";
                      label = "Dambiyo dhexdhexaad ah";
                    }

                    // Format station name (e.g. remove "Central Station" if it makes it too long)
                    let stationName = loc.station;
                    if (stationName.length > 20) {
                      stationName = stationName.replace(' Central Station', '').replace(' District', '');
                    }
                    
                    return (
                      <div key={loc.station} className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-300 truncate w-[35%]" title={loc.station}>{stationName}</span>
                        <div className="w-[30%] h-2 bg-slate-800 rounded-full overflow-hidden mx-2">
                          <div className={\`h-full \${color} rounded-full \${percentage >= 80 ? 'animate-pulse' : ''}\`} style={{ width: \`\${percentage}%\` }}></div>
                        </div>
                        <span className={\`text-[10px] font-bold \${textColor} whitespace-nowrap w-[35%] text-right\`}>{label} ({loc.count})</span>
                      </div>
                    );
                  });
                })()
              )}
            </div>`;

const newCode = `            <div className="flex-1 bg-slate-900/50 rounded-lg p-3 border-slate-700/50 flex flex-col justify-center space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">Galkayo (Zone C)</span>
                <div className="w-1/3 h-2 bg-slate-800 rounded-full overflow-hidden mx-2">
                  <div className="h-full bg-red-600 w-[95%] rounded-full animate-pulse"></div>
                </div>
                <span className="text-[10px] font-bold text-red-500 whitespace-nowrap">Dambiyo aad u badan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">Garowe (Zone A)</span>
                <div className="w-1/3 h-2 bg-slate-800 rounded-full overflow-hidden mx-2">
                  <div className="h-full bg-orange-500 w-[75%] rounded-full "></div>
                </div>
                <span className="text-[10px] font-bold text-orange-400 whitespace-nowrap">Dambiyo badan</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">Bosaso (Zone B)</span>
                <div className="w-1/3 h-2 bg-slate-800 rounded-full overflow-hidden mx-2">
                  <div className="h-full bg-yellow-400 w-[45%] rounded-full "></div>
                </div>
                <span className="text-[10px] font-bold text-yellow-400 whitespace-nowrap">Dambiyo dhexdhexaad ah</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">Qardho (Zone D)</span>
                <div className="w-1/3 h-2 bg-slate-800 rounded-full overflow-hidden mx-2">
                  <div className="h-full bg-emerald-500 w-[15%] rounded-full "></div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 whitespace-nowrap">Dambiyo yar</span>
              </div>
            </div>`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/components/DashboardView.tsx', content);
