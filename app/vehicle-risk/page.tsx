import AppLayout from "../components/AppLayout";
import { demoVehicles, maintenanceQueue } from "../lib/demoData";

export default function VehicleRiskPage() {
  const vehicles = [...demoVehicles].sort(
    (a, b) => b.alerts + (100 - b.health) - (a.alerts + (100 - a.health))
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
            Vehicle risk
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Top Risk Vehicles
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Rank vehicles by health, AI events, camera coverage, maintenance
            exposure, and dispatch restriction status.
          </p>
        </section>

        <section className="grid gap-4">
          {vehicles.map((vehicle, index) => {
            const openIssue = maintenanceQueue.find(
              (item) => item.vehicle === vehicle.vehicle_number
            );
            const score = Math.max(0, vehicle.health - vehicle.alerts * 6);
            const level =
              score < 75 ? "High risk" : score < 88 ? "Watchlist" : "Safe";

            return (
              <div
                key={vehicle.id}
                className="rounded-lg border border-slate-800 bg-slate-900/80 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-cyan-300">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-xl font-black text-white">
                        {vehicle.vehicle_number}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {vehicle.route} | {vehicle.driver_name}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-md px-3 py-1 text-xs font-bold ${
                      level === "High risk"
                        ? "bg-rose-400/10 text-rose-200"
                        : level === "Watchlist"
                        ? "bg-amber-400/10 text-amber-200"
                        : "bg-emerald-400/10 text-emerald-200"
                    }`}
                  >
                    {level}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-4">
                  {[
                    ["Risk score", `${score}/100`],
                    ["Health", `${vehicle.health}%`],
                    ["AI alerts", vehicle.alerts],
                    ["Cameras", `${vehicle.cameras}/4`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                    >
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-2 text-xl font-black text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {openIssue && (
                  <div className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                    Open issue: {openIssue.issue}. Priority {openIssue.priority}.
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </AppLayout>
  );
}
