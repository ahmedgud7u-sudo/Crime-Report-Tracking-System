const fs = require('fs');
let content = fs.readFileSync('src/components/CrimeReportsView.tsx', 'utf-8');

const puntlandCitiesArr = `const puntlandCities = [
  "Garowe", "Galkayo", "Bosaso", "Qardho", "Galdogob", "Badhan", 
  "Caluula", "Bandarbayla", "Iskushuban", "Ufayn", "Qandala", 
  "Carmo", "Dhahar", "Xingalool", "Hadaaftimo", "Baran", 
  "Taleex", "Dhoodida", "Dangorayo", "Eyl", "Burtinle", 
  "Jariiban", "Garacad", "Hobyo", "Saaxo", "Godob-Jiraan", "Waaciye"
].sort();`;

// Add cities array at the top of the component
if (!content.includes('const puntlandCities')) {
  const target = `export const CrimeReportsView: React.FC<CrimeReportsViewProps> = ({`;
  content = content.replace(target, puntlandCitiesArr + '\n\n' + target);
}

const oldInput1 = `                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">District / Location *</label>
                  <input
                    type="text"
                    required
                    value={locationDistrict}
                    onChange={(e) => setLocationDistrict(e.target.value)}
                    placeholder="e.g. Bosaso Port Zone"
                    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
                  />`;

const newInput1 = `                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">District / Location *</label>
                  <select
                    required
                    value={locationDistrict}
                    onChange={(e) => {
                      setLocationDistrict(e.target.value);
                      if (e.target.value && !policeStation.includes(e.target.value)) {
                         setPoliceStation(e.target.value + ' Police Station');
                      }
                    }}
                    className="w-full px-3 py-1.5 bg-slate-100 border-none rounded-lg text-xs"
                  >
                    <option value="" disabled>Dooro Degmada/Deegaanka</option>
                    {puntlandCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>`;

content = content.replaceAll(oldInput1, newInput1);

// Handle initial states
content = content.replace(`const [locationDistrict, setLocationDistrict] = useState('Garowe Central District');`, `const [locationDistrict, setLocationDistrict] = useState('Garowe');`);
content = content.replace(`const [policeStation, setPoliceStation] = useState('Garowe Central Station');`, `const [policeStation, setPoliceStation] = useState('Garowe Police Station');`);

fs.writeFileSync('src/components/CrimeReportsView.tsx', content);
