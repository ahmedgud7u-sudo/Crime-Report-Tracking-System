const fs = require('fs');
const newMap = `import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PUNTLAND_COORDS: Record<string, { lat: number, lng: number }> = {
  "Garowe": { "lat": 8.4064, "lng": 48.4819 },
  "Galkayo": { "lat": 6.7697, "lng": 47.4308 },
  "Bosaso": { "lat": 11.2842, "lng": 49.1816 },
  "Qardho": { "lat": 9.5000, "lng": 49.0833 },
  "Galdogob": { "lat": 7.0227, "lng": 47.3371 },
  "Badhan": { "lat": 10.7144, "lng": 48.3444 },
  "Caluula": { "lat": 11.9661, "lng": 50.7569 },
  "Bandarbayla": { "lat": 9.4939, "lng": 50.8122 },
  "Iskushuban": { "lat": 10.2837, "lng": 49.8258 },
  "Ufayn": { "lat": 10.6500, "lng": 49.7500 },
  "Qandala": { "lat": 11.4719, "lng": 49.8731 },
  "Carmo": { "lat": 10.4500, "lng": 49.1833 },
  "Dhahar": { "lat": 10.1500, "lng": 48.8167 },
  "Xingalool": { "lat": 10.2167, "lng": 48.2500 },
  "Hadaaftimo": { "lat": 10.7667, "lng": 48.1667 },
  "Baran": { "lat": 10.6000, "lng": 48.2000 },
  "Taleex": { "lat": 9.1500, "lng": 48.4167 },
  "Dhoodida": { "lat": 8.5000, "lng": 48.5000 },
  "Dangorayo": { "lat": 8.3500, "lng": 49.1500 },
  "Eyl": { "lat": 7.9803, "lng": 49.8156 },
  "Burtinle": { "lat": 7.7981, "lng": 47.9897 },
  "Jariiban": { "lat": 7.2181, "lng": 48.8775 },
  "Garacad": { "lat": 6.6433, "lng": 49.3364 },
  "Hobyo": { "lat": 5.3533, "lng": 48.5264 },
  "Saaxo": { "lat": 6.4000, "lng": 47.0000 },
  "Godob-Jiraan": { "lat": 7.6000, "lng": 49.3000 },
  "Waaciye": { "lat": 10.0000, "lng": 49.0000 }
};

interface CrimeMapProps {
  locationBreakdown: { station: string; count: number }[];
}

export const CrimeMap: React.FC<CrimeMapProps> = ({ locationBreakdown }) => {
  const mapData = Object.keys(PUNTLAND_COORDS).map(city => {
    const matched = locationBreakdown.filter(l => l.station.toLowerCase().includes(city.toLowerCase()));
    const totalCount = matched.reduce((sum, item) => sum + item.count, 0);
    return {
      city,
      lat: PUNTLAND_COORDS[city].lat,
      lng: PUNTLAND_COORDS[city].lng,
      count: totalCount
    };
  });

  const maxCrimes = Math.max(...mapData.map(d => d.count), 1);

  return (
    <MapContainer 
      center={[9.0, 48.5]} 
      zoom={6} 
      style={{ width: '100%', height: '100%', zIndex: 10 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {mapData.map(zone => {
        if (zone.count === 0) return null; // Don't show marker if no crime

        const percentage = (zone.count / maxCrimes) * 100;
        
        let color = "#10b981"; // Emerald (Low)
        let level = "low";
        let desc = "Dambiyo yar";
        
        if (percentage >= 80 && zone.count > 3) {
          color = "#dc2626"; // Red (Critical)
          level = "critical";
          desc = "Dambiyo aad u badan";
        } else if (percentage >= 50 && zone.count > 1) {
          color = "#f97316"; // Orange (High)
          level = "high";
          desc = "Dambiyo badan";
        } else if (percentage >= 25 && zone.count > 0) {
          color = "#eab308"; // Yellow (Medium)
          level = "medium";
          desc = "Dambiyo dhexdhexaad ah";
        }

        const radius = level === 'critical' ? 30 : level === 'high' ? 24 : level === 'medium' ? 18 : 12;

        return (
          <React.Fragment key={zone.city}>
            <CircleMarker
              center={[zone.lat, zone.lng]}
              pathOptions={{ 
                fillColor: color, 
                color: color,
                fillOpacity: 0.6,
                weight: 2
              }}
              radius={radius}
            >
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-sm">{zone.city}</h3>
                  <p className="text-xs mt-1" style={{ color: color, fontWeight: 'bold' }}>
                    {desc} ({zone.count} Kiis)
                  </p>
                </div>
              </Popup>
            </CircleMarker>
            <Marker position={[zone.lat, zone.lng]}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-sm">{zone.city}</h3>
                  <p className="text-xs mt-1" style={{ color: color, fontWeight: 'bold' }}>
                    {desc} ({zone.count} Kiis)
                  </p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};
`;
fs.writeFileSync('src/components/CrimeMap.tsx', newMap);

// Now update DashboardView.tsx to pass the prop
let dash = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');
dash = dash.replace('<CrimeMap />', '<CrimeMap locationBreakdown={stats.location_breakdown} />');
fs.writeFileSync('src/components/DashboardView.tsx', dash);
