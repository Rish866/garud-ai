type Vehicle = {
  id: number;
  vehicle_number: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string | null;
};

export default function DashboardLiveMap({
  vehicles,
}: {
  vehicles: Vehicle[];
}) {
  const validVehicle = vehicles.find(
    (vehicle) => vehicle.latitude !== null && vehicle.longitude !== null
  );

  const lat = validVehicle?.latitude || 19.076;
  const lng = validVehicle?.longitude || 72.8777;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lng - 0.08
  }%2C${lat - 0.08}%2C${lng + 0.08}%2C${
    lat + 0.08
  }&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Live Fleet Map</h2>
          <p className="mt-1 text-sm text-slate-400">
            Real-time vehicle location overview
          </p>
        </div>

        <span className="rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
          Live
        </span>
      </div>

      <div
        className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950"
        style={{ height: "420px" }}
      >
        <iframe
          src={mapUrl}
          className="h-full w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}