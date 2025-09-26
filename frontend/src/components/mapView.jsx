import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

const DefaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function FitTo({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points || points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14);
    } else {
      const b = L.latLngBounds(points);
      map.fitBounds(b, { padding: [40, 40] });
    }
  }, [points, map]);
  return null;
}


export default function MapView({ pickup, delivery }) {
  const pts = [];
  if (pickup) pts.push([pickup.lat, pickup.lng]);
  if (delivery) pts.push([delivery.lat, delivery.lng]);

  return (
    <MapContainer
      center={[19.9975, 73.7898]} // Nashik default center
      zoom={12}
      style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
    >
     
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
      {delivery && <Marker position={[delivery.lat, delivery.lng]} />}

      {pickup && delivery && (
        <Polyline positions={[[pickup.lat, pickup.lng], [delivery.lat, delivery.lng]]} />
      )}

      <FitTo points={pts} />
    </MapContainer>
  );
}
