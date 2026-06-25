"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Vehicle {
  id: number;
  name: string;
  plate_number: string;
  lat: number | null;
  lng: number | null;
  status: string;
  speed?: number;
}

interface MapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
}

function MapController({
  center,
  vehicles,
}: {
  center: [number, number];
  vehicles: Vehicle[];
}) {
  const map = useMap();

  useEffect(() => {
    const validVehicles = vehicles.filter((v) => v.lat != null && v.lng != null);

    if (validVehicles.length > 1) {
      const bounds = L.latLngBounds(
        validVehicles.map((v) => [Number(v.lat), Number(v.lng)])
      );

      map.fitBounds(bounds, {
        padding: [40, 40],
      });

      return;
    }

    map.setView(center, 12);
  }, [center, vehicles, map]);

  return null;
}

export default function Map({ vehicles, selectedVehicle }: MapProps) {
  const validVehicles = vehicles.filter((v) => v.lat != null && v.lng != null);

  const defaultCenter: [number, number] =
    validVehicles.length > 0
      ? [Number(validVehicles[0].lat), Number(validVehicles[0].lng)]
      : [19.076, 72.8777];

  const mapCenter: [number, number] = selectedVehicle
    ? [Number(selectedVehicle.lat), Number(selectedVehicle.lng)]
    : defaultCenter;

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
      <MapContainer
        center={mapCenter}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validVehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[Number(vehicle.lat), Number(vehicle.lng)]}
          >
            <Popup>
              <div className="p-2 text-slate-900">
                <strong className="block text-lg">{vehicle.name}</strong>
                <div className="text-sm">Plate: {vehicle.plate_number}</div>
                <div className="mt-1 text-sm font-bold">
                  Status: {vehicle.status}
                </div>
                {vehicle.speed != null && (
                  <div className="text-sm">Speed: {vehicle.speed} km/h</div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController center={mapCenter} vehicles={validVehicles} />
      </MapContainer>
    </div>
  );
}