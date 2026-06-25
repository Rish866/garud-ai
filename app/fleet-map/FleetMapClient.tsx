"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Vehicle = {
  id: number;
  vehicle_number: string;
  make?: string | null;
  model?: string | null;
  status?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

const vehicleIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048314.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

export default function FleetMapClient({
  vehicles,
  error,
}: {
  vehicles: Vehicle[];
  error?: string;
}) {
  const validVehicles = vehicles.filter(
    (vehicle) =>
      typeof vehicle.latitude === "number" &&
      typeof vehicle.longitude === "number"
  );

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Live Fleet Map</h1>
        <p className="mt-2 text-slate-400">
          Live GPS map connected with Supabase vehicles table.
        </p>
      </section>

      {error && (
        <div className="rounded-xl border border-red-500 bg-red-900/30 p-4 text-red-300">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-4">
        <Stat title="Total Vehicles" value={String(vehicles.length)} color="text-blue-400" />
        <Stat title="GPS Visible" value={String(validVehicles.length)} color="text-green-400" />
        <Stat
          title="Missing GPS"
          value={String(vehicles.length - validVehicles.length)}
          color="text-yellow-400"
        />
        <Stat title="Camera Offline" value="0" color="text-red-400" />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Real GPS Map</h2>
              <p className="text-sm text-slate-400">
                Showing vehicles with latitude and longitude.
              </p>
            </div>

            <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
              ● Live Tracking
            </span>
          </div>

          <div className="h-[560px] overflow-hidden rounded-2xl border border-slate-800">
            <MapContainer
              center={[19.076, 72.8777]}
              zoom={9}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {validVehicles.map((vehicle) => (
                <Marker
                  key={vehicle.id}
                  position={[vehicle.latitude!, vehicle.longitude!]}
                  icon={vehicleIcon}
                >
                  <Popup>
                    <div className="space-y-1 text-sm">
                      <strong>{vehicle.vehicle_number}</strong>
                      <div>Make: {vehicle.make || "-"}</div>
                      <div>Model: {vehicle.model || "-"}</div>
                      <div>Status: {vehicle.status || "Active"}</div>
                      <div>Lat: {vehicle.latitude}</div>
                      <div>Lng: {vehicle.longitude}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold">Vehicle Status</h2>
          <p className="mb-5 text-sm text-slate-400">
            Same vehicles from Supabase.
          </p>

          <div className="space-y-3">
            {vehicles.map((vehicle) => {
              const hasGps =
                typeof vehicle.latitude === "number" &&
                typeof vehicle.longitude === "number";

              return (
                <div
                  key={vehicle.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{vehicle.vehicle_number}</p>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        hasGps
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {hasGps ? "GPS OK" : "No GPS"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {vehicle.make || "-"} · {vehicle.model || "-"}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <MiniStat title="Status" value={vehicle.status || "Active"} />
                    <MiniStat
                      title="GPS"
                      value={hasGps ? "Available" : "Missing"}
                      color={hasGps ? "text-green-400" : "text-yellow-400"}
                    />
                  </div>

                  <Link
                    href={`/live?vehicle=${encodeURIComponent(
                      vehicle.vehicle_number
                    )}`}
                    className="mt-4 block w-full rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold hover:bg-blue-500"
                  >
                    View Live Camera
                  </Link>
                </div>
              );
            })}

            {vehicles.length === 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
                No vehicles found. Add vehicles from Vehicles module.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className={`mt-3 text-3xl font-black ${color}`}>{value}</h2>
    </div>
  );
}

function MiniStat({
  title,
  value,
  color = "text-white",
}: {
  title: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="rounded-lg bg-slate-900 p-2">
      <p className="text-slate-500">{title}</p>
      <p className={`mt-1 font-semibold ${color}`}>{value}</p>
    </div>
  );
}