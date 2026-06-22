"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Vehicle {
  id: number;
  name: string;
  plate_number: string;
  lat: number;
  lng: number;
  status: string;
  speed?: number;
}

interface MapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
}

// Controller to handle auto-focusing
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

export default function Map({ vehicles, selectedVehicle }: MapProps) {
  const defaultCenter: [number, number] = [19.076, 72.8777];
  const mapCenter: [number, number] = selectedVehicle 
    ? [selectedVehicle.lat, selectedVehicle.lng] 
    : defaultCenter;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* DATA SAFETY: Only map vehicles that have valid coordinates */}
        {vehicles
          .filter((v) => v.lat != null && v.lng != null)
          .map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={[vehicle.lat, vehicle.lng]}
            >
              <Popup>
                <div className="p-2 text-slate-900">
                  <strong className="block text-lg">{vehicle.name}</strong>
                  <div className="text-sm">Plate: {vehicle.plate_number}</div>
                  <div className="text-sm font-bold mt-1">Status: {vehicle.status}</div>
                  {vehicle.speed != null && (
                    <div className="text-sm">Speed: {vehicle.speed} km/h</div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

        {selectedVehicle && <MapController center={mapCenter} />}
      </MapContainer>
    </div>
  );
}