const fs = require('fs');
let content = fs.readFileSync('src/components/CrimeMap.tsx', 'utf-8');

const newMarkerLogic = `
const createCustomIcon = (color: string) => {
  const markerHtml = \`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="\${color}" width="32" height="32" stroke="white" stroke-width="2" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.4));">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  \`;

  return L.divIcon({
    className: 'custom-icon',
    html: markerHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export const CrimeMap: React.FC<CrimeMapProps> = ({ locationBreakdown }) => {`;

content = content.replace(`export const CrimeMap: React.FC<CrimeMapProps> = ({ locationBreakdown }) => {`, newMarkerLogic);

const oldMarkerReturn = `<Marker position={[zone.lat, zone.lng]}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-sm">{zone.city}</h3>
                  <p className="text-xs mt-1" style={{ color: color, fontWeight: 'bold' }}>
                    {desc} ({zone.count} Kiis)
                  </p>
                </div>
              </Popup>
            </Marker>`;

const newMarkerReturn = `<Marker position={[zone.lat, zone.lng]} icon={createCustomIcon(color)}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-sm">{zone.city}</h3>
                  <p className="text-xs mt-1" style={{ color: color, fontWeight: 'bold' }}>
                    {desc} ({zone.count} Kiis)
                  </p>
                </div>
              </Popup>
            </Marker>`;

content = content.replace(oldMarkerReturn, newMarkerReturn);

fs.writeFileSync('src/components/CrimeMap.tsx', content);
