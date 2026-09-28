const fs = require('fs');
let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');

const oldCode = `            <div className="flex-1 bg-slate-900/50 rounded-lg p-3 border-slate-700/50 flex flex-col justify-center space-y-3">
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

const newCode = `            <div className="flex-1 bg-slate-900/50 rounded-lg p-3 border-slate-700/50 flex flex-col space-y-3 overflow-y-auto max-h-[260px] custom-scrollbar">
              {(() => {
                const puntlandCities = [
                  "Garowe", "Galkayo", "Bosaso", "Qardho", "Galdogob", "Badhan", 
                  "Caluula", "Bandarbayla", "Iskushuban", "Ufayn", "Qandala", 
                  "Carmo", "Dhahar", "Xingalool", "Hadaaftimo", "Baran", 
                  "Taleex", "Dhoodida", "Dangorayo", "Eyl", "Burtinle", 
                  "Jariiban", "Garacad", "Hobyo", "Saaxo", "Godob-Jiraan", "Waaciye"
                ];

                const heatMapData = puntlandCities.map(city => {
                  const matched = stats.location_breakdown.filter(l => l.station.toLowerCase().includes(city.toLowerCase()));
                  const totalCount = matched.reduce((sum, item) => sum + item.count, 0);
                  return { city, count: totalCount };
                });

                stats.location_breakdown.forEach(l => {
                  const isIncluded = puntlandCities.some(city => l.station.toLowerCase().includes(city.toLowerCase()));
                  if (!isIncluded && l.station) {
                    let cleanStation = l.station.replace(' Police Station', '').replace(' District', '').replace(' Central Station', '');
                    if (cleanStation.length > 20) cleanStation = cleanStation.substring(0, 20) + '...';
                    // Only add if not already in array
                    if (!heatMapData.some(h => h.city === cleanStation)) {
                      heatMapData.push({ city: cleanStation, count: l.count });
                    }
                  }
                });

                heatMapData.sort((a, b) => b.count - a.count);
                const maxCrimes = Math.max(...heatMapData.map(l => l.count), 1);
                
                return heatMapData.map(loc => {
                  const percentage = Math.min((loc.count / maxCrimes) * 100, 100);
                  
                  let color = "bg-slate-700";
                  let textColor = "text-slate-400";
                  let label = "Nabad ah (0)";
                  
                  if (loc.count > 0) {
                    color = "bg-emerald-500";
                    textColor = "text-emerald-400";
                    label = \`Dambiyo yar (\${loc.count})\`;
                    
                    if (percentage >= 80 && loc.count > 3) {
                      color = "bg-red-600";
                      textColor = "text-red-500";
                      label = \`Dambiyo aad u badan (\${loc.count})\`;
                    } else if (percentage >= 50 && loc.count > 1) {
                      color = "bg-orange-500";
                      textColor = "text-orange-400";
                      label = \`Dambiyo badan (\${loc.count})\`;
                    } else if (percentage >= 25 && loc.count > 0) {
                      color = "bg-yellow-400";
                      textColor = "text-yellow-400";
                      label = \`Dambiyo dhexdhexaad (\${loc.count})\`;
                    }
                  }
                  
                  return (
                    <div key={loc.city} className="flex items-center justify-between shrink-0">
                      <span className="text-[11px] font-bold text-slate-300 w-[25%] truncate" title={loc.city}>{loc.city}</span>
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden mx-2">
                        <div className={\`h-full \${color} rounded-full \${percentage >= 80 && loc.count > 0 ? 'animate-pulse' : ''}\`} style={{ width: loc.count === 0 ? '5%' : \`\${percentage}%\` }}></div>
                      </div>
                      <span className={\`text-[10px] font-bold \${textColor} whitespace-nowrap w-[40%] text-right\`}>{label}</span>
                    </div>
                  );
                });
              })()}
            </div>`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/components/DashboardView.tsx', content);
