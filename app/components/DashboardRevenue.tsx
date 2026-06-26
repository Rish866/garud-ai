type Trip = {
  id?: number | string;
  revenue?: number | string | null;
  status?: string | null;
};

type DashboardRevenueProps = {
  trips?: Trip[] | null;
  totalRevenue?: number;
};

export default function DashboardRevenue({
  trips = [],
  totalRevenue = 0,
}: DashboardRevenueProps) {
  const safeTrips = Array.isArray(trips) ? trips : [];

  const revenue = Number(totalRevenue) || 0;

  const completedTrips = safeTrips.filter(
    (trip) => (trip.status || "").trim().toLowerCase() === "completed"
  ).length;

  const runningTrips = safeTrips.filter((trip) => {
    const status = (trip.status || "").trim().toLowerCase();

    return (
      status === "in progress" ||
      status === "running" ||
      status === "active"
    );
  }).length;

  const pendingTrips = safeTrips.filter(
    (trip) => (trip.status || "").trim().toLowerCase() === "pending"
  ).length;

  const avgRevenue =
    safeTrips.length > 0 ? Math.round(revenue / safeTrips.length) : 0;

  const completionPercent =
    safeTrips.length > 0
      ? Math.round((completedTrips / safeTrips.length) * 100)
      : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Fleet billing & operational performance
        </p>
      </div>

      {/* Revenue */}

      <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
        <p className="text-sm text-emerald-300">
          Total Revenue
        </p>

        <h3 className="mt-2 text-4xl font-bold text-emerald-400">
          ₹{revenue.toLocaleString("en-IN")}
        </h3>
      </div>

      {/* Progress */}

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-400">
            Trip Completion
          </span>

          <span className="font-semibold text-white">
            {completionPercent}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{
              width: `${completionPercent}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}

      <div className="space-y-3">

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-slate-400">
            Completed Trips
          </span>

          <span className="font-bold text-emerald-400">
            {completedTrips}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-slate-400">
            Running Trips
          </span>

          <span className="font-bold text-blue-400">
            {runningTrips}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-slate-400">
            Pending Trips
          </span>

          <span className="font-bold text-amber-400">
            {pendingTrips}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <span className="text-slate-400">
            Average Revenue / Trip
          </span>

          <span className="font-bold text-white">
            ₹{avgRevenue.toLocaleString("en-IN")}
          </span>
        </div>

      </div>
    </div>
  );
}