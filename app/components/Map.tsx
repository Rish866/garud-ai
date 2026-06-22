"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const vehicles = [
  {
    id: 1,
    name: "MH46AB1234",
    lat: 19.076,
    lng: 72.8777,
    status: "Online",
  },
  {
    id: 2,
    name: "MH04XY5678",
    lat: 19.2183,
    lng: 72.9781,
    status: "Idle",
  },
  {
    id: 3,
    name: "MH12PQ7890",
    lat: 18.9894,
    lng: 73.1175,
    status: "Offline",
  },
];

export default function Map() {
  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={10}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.lat, vehicle.lng]}
        >
          <Popup>
            <div>
              <strong>{vehicle.name}</strong>
              <br />
              Status: {vehicle.status}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}