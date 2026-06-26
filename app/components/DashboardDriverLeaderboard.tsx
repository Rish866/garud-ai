type Driver = {
  id?: number | string;
  name?: string | null;
};

type Trip = {
  driver_id?: number | string | null;
  revenue?: number | string | null;
  status?: string | null;
};

type Props = {
  drivers?: Driver[] | null;
  trips?: Trip[] | null;
};

export default function DashboardDriverLeaderboard({
  drivers = [],
  trips = [],
}: Props) {
  const safeDrivers = Array.isArray(drivers) ? drivers : [];
  const safeTrips = Array.isArray(trips) ? trips : [];

  const leaderboard = safeDrivers
    .map((driver) => {
      const driverTrips = safeTrips.filter(
        (trip) => String(trip.driver_id) === String(driver.id)
      );

      const completedTrips = driverTrips.filter(
        (trip) =>
          (trip.status || "").trim().toLowerCase() === "completed"
      ).length;

      const revenue = driverTrips.reduce(
        (sum, trip) => sum + (Number(trip.revenue) || 0),
        0
      );

      return {
        ...driver,
        completedTrips,
        revenue,
      };
    })
    .sort((a, b) => {
      if (b.completedTrips !== a.completedTrips) {
        return b.completedTrips - a.completedTrips;
      }

      return b.revenue - a.revenue;
    });

  const medal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "👤";
  };

  const status = (completedTrips: number) => {
    if (completedTrips === 0)
      return {
        text: "No Trips",
        color: "bg-slate-700 text-slate-200",
      };

    if (completedTrips <= 2)
      return {
        text: "New",
        color: "bg-blue-600 text-white",
      };

    if (completedTrips <= 5)
      return {
        text: "Average",
        color: "bg-amber-500 text-black",
      };

    if (completedTrips <= 10)
      return {
        text: "Good",
        color: "bg-green-600 text-white",
      };

    return {
      text: "Excellent",
      color: "bg-emerald-500 text-white",
    };
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Driver Leaderboard
        </h2>

        <p className="text-sm text-slate-400">
          Ranked by completed trips
        </p>
      </div>

      {leaderboard.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
          No driver data available.
        </div>
      )}

      <div className="space-y-3">
        {leaderboard.slice(0, 5).map((driver, index) => {
          const badge = status(driver.completedTrips);

          return (
            <div
              key={driver.id ?? index}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 hover:border-blue-500/30 transition"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {medal(index)}
                  </span>

                  <div>
                    <h3 className="font-semibold text-white">
                      {driver.name || "Unknown Driver"}
                    </h3>

                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${badge.color}`}
                    >
                      {badge.text}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    Revenue
                  </p>

                  <p className="font-semibold text-emerald-400">
                    ₹{driver.revenue.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="text-sm text-slate-400">
                  Completed Trips
                </span>

                <span className="text-lg font-bold text-white">
                  {driver.completedTrips}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}