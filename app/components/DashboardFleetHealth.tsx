type Vehicle = {
  id?: number | string;
  vehicle_number?: string | null;
  status?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
};

type DashboardFleetHealthProps = {
  vehicles?: Vehicle[] | null;
};

export default function DashboardFleetHealth({
  vehicles = [],
}: DashboardFleetHealthProps) {
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

  const totalVehicles = safeVehicles.length;

  const activeVehicles = safeVehicles.filter(
    (vehicle) => (vehicle.status || "").toLowerCase() === "active"
  ).length;

  const inactiveVehicles = safeVehicles.filter(
    (vehicle) => (vehicle.status || "").toLowerCase() === "inactive"
  ).length;

  const maintenanceVehicles = safeVehicles.filter((vehicle) =>
    (vehicle.status || "").toLowerCase().includes("maintenance")
  ).length;

  const liveTrackedVehicles = safeVehicles.filter((vehicle) => {
    const lat = Number(vehicle.latitude);
    const lng = Number(vehicle.longitude);

    return Number.isFinite(lat) && Number.isFinite(lng);
  }).length;

  const fleetHealth =
    totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Fleet Health
          </h2>
          <p className="text-sm text-slate-400">
            Vehicle readiness summary
          </p>
        </div>

        <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-400">
          {fleetHealth}%
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">Overall Health</span>
          <span className="font-semibold text-white">{fleetHealth}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${fleetHealth}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-sm text-slate-400">Active Vehicles</span>
          <span className="font-bold text-emerald-400">
            {activeVehicles}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-sm text-slate-400">Inactive Vehicles</span>
          <span className="font-bold text-red-400">
            {inactiveVehicles}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-sm text-slate-400">Maintenance</span>
          <span className="font-bold text-amber-400">
            {maintenanceVehicles}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-sm text-slate-400">Live GPS Tracking</span>
          <span className="font-bold text-blue-400">
            {liveTrackedVehicles}
          </span>
        </div>
      </div>
    </div>
  );
}