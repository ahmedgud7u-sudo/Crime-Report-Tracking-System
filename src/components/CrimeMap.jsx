import React from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});
const PUNTLAND_COORDS = {
  "Garowe": { "lat": 8.4064, "lng": 48.4819 },
  "Galkayo": { "lat": 6.7697, "lng": 47.4308 },
  "Bosaso": { "lat": 11.2842, "lng": 49.1816 },
  "Qardho": { "lat": 9.5, "lng": 49.0833 },
  "Galdogob": { "lat": 7.0227, "lng": 47.3371 },
  "Badhan": { "lat": 10.7144, "lng": 48.3444 },
  "Caluula": { "lat": 11.9661, "lng": 50.7569 },
  "Bandarbayla": { "lat": 9.4939, "lng": 50.8122 },
  "Iskushuban": { "lat": 10.2837, "lng": 49.8258 },
  "Ufayn": { "lat": 10.65, "lng": 49.75 },
  "Qandala": { "lat": 11.4719, "lng": 49.8731 },
  "Carmo": { "lat": 10.45, "lng": 49.1833 },
  "Dhahar": { "lat": 10.15, "lng": 48.8167 },
  "Xingalool": { "lat": 10.2167, "lng": 48.25 },
  "Hadaaftimo": { "lat": 10.7667, "lng": 48.1667 },
  "Baran": { "lat": 10.6, "lng": 48.2 },
  "Taleex": { "lat": 9.15, "lng": 48.4167 },
  "Dhoodida": { "lat": 8.5, "lng": 48.5 },
  "Dangorayo": { "lat": 8.35, "lng": 49.15 },
  "Eyl": { "lat": 7.9803, "lng": 49.8156 },
  "Burtinle": { "lat": 7.7981, "lng": 47.9897 },
  "Jariiban": { "lat": 7.2181, "lng": 48.8775 },
  "Garacad": { "lat": 6.6433, "lng": 49.3364 },
  "Hobyo": { "lat": 5.3533, "lng": 48.5264 },
  "Saaxo": { "lat": 6.4, "lng": 47 },
  "Godob-Jiraan": { "lat": 7.6, "lng": 49.3 },
  "Waaciye": { "lat": 10, "lng": 49 }
};
const createCustomIcon = (color) => {
  const markerHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32" stroke="white" stroke-width="2" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.4));">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;
  return L.divIcon({
    className: "custom-icon",
    html: markerHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};
export const CrimeMap = ({ locationBreakdown }) => {
  const mapData = Object.keys(PUNTLAND_COORDS).map((city) => {
    const matched = locationBreakdown.filter((l) => l.station.toLowerCase().includes(city.toLowerCase()));
    const totalCount = matched.reduce((sum, item) => sum + item.count, 0);
    return {
      city,
      lat: PUNTLAND_COORDS[city].lat,
      lng: PUNTLAND_COORDS[city].lng,
      count: totalCount
    };
  });
  const maxCrimes = Math.max(...mapData.map((d) => d.count), 1);
  return <MapContainer
    center={[9, 48.5]}
    zoom={6}
    style={{ width: "100%", height: "100%", zIndex: 10 }}
  >
      <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      
      {mapData.map((zone) => {
    if (zone.count === 0) return null;
    const percentage = zone.count / maxCrimes * 100;
    let color = "#10b981";
    let level = "low";
    let desc = "Dambiyo yar";
    if (percentage >= 80 && zone.count > 3) {
      color = "#dc2626";
      level = "critical";
      desc = "Dambiyo aad u badan";
    } else if (percentage >= 50 && zone.count > 1) {
      color = "#f97316";
      level = "high";
      desc = "Dambiyo badan";
    } else if (percentage >= 25 && zone.count > 0) {
      color = "#eab308";
      level = "medium";
      desc = "Dambiyo dhexdhexaad ah";
    }
    const radius = level === "critical" ? 30 : level === "high" ? 24 : level === "medium" ? 18 : 12;
    return <React.Fragment key={zone.city}>
            <CircleMarker
      center={[zone.lat, zone.lng]}
      pathOptions={{
        fillColor: color,
        color,
        fillOpacity: 0.6,
        weight: 2
      }}
      radius={radius}
    >
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-sm">{zone.city}</h3>
                  <p className="text-xs mt-1" style={{ color, fontWeight: "bold" }}>
                    {desc} ({zone.count} Kiis)
                  </p>
                </div>
              </Popup>
            </CircleMarker>
            <Marker position={[zone.lat, zone.lng]} icon={createCustomIcon(color)}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-sm">{zone.city}</h3>
                  <p className="text-xs mt-1" style={{ color, fontWeight: "bold" }}>
                    {desc} ({zone.count} Kiis)
                  </p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>;
  })}
    </MapContainer>;
};
