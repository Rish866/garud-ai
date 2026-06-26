type DashboardSafetyScoreProps = {
  vehicles?: any[] | null;
  drivers?: any[] | null;
  trips?: any[] | null;
};

export default function DashboardSafetyScore({
  vehicles = [],
  drivers = [],
  trips = [],
}: DashboardSafetyScoreProps) {
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const safeDrivers = Array.isArray(drivers) ? drivers : [];
  const safeTrips = Array.isArray(trips) ? trips : [];

  const totalVehicles = safeVehicles.length;
  const totalDrivers = safeDrivers.length;
  const totalTrips = safeTrips.length;

  const completedTrips = safeTrips.filter(
    (trip) => (trip.status || "").toLowerCase() === "completed"
  ).length;

  const activeVehicles = safeVehicles.filter(
    (vehicle) => (vehicle.status || "").toLowerCase() === "active"
  ).length;

  const vehicleScore =
    totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 40) : 0;

  const tripScore =
    totalTrips > 0 ? Math.round((completedTrips / totalTrips) * 35) : 0;

  const driverScore = totalDrivers > 0 ? 25 : 0;

  const safetyScore = vehicleScore + tripScore + driverScore;

  const label =
    safetyScore >= 85
      ? "Excellent"
      : safetyScore >= 70
      ? "Good"
      : safetyScore >= 50
      ? "Average"
      : "Needs Attention";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Safety Score</h2>
          <p className="text-sm text-slate-400">
            AI-based fleet safety index
          </p>
        </div>

        <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-400">
          {label}
        </div>
      </div>

      <div className="mb-6 flex items-end gap-2">
        <span className="text-5xl font-bold text-white">{safetyScore}</span>
        <span className="pb-2 text-sm text-slate-400">/ 100</span>
      </div>

      <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${safetyScore}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
          <p className="text-lg font-bold text-white">{vehicleScore}</p>
          <p className="text-xs text-slate-400">Vehicle</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
          <p className="text-lg font-bold text-white">{tripScore}</p>
          <p className="text-xs text-slate-400">Trips</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
          <p className="text-lg font-bold text-white">{driverScore}</p>
          <p className="text-xs text-slate-400">Drivers</p>
        </div>
      </div>
    </div>
  );
}