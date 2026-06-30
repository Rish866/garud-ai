import AppLayout from "../components/AppLayout";
import {
  commandEvents,
  demoDrivers,
  demoVehicles,
  maintenanceQueue,
} from "../lib/demoData";

function riskTone(score: number) {
  if (score < 80) return "border-rose-400/30 bg-rose-400/10 text-rose-200";
  if (score < 88) return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
}

export default function RiskEnginePage() {
  const fleetScore = Math.round(
    demoDrivers.reduce(
      (sum, driver) => sum + Number(driver.safety_score || 0),
      0
    ) / demoDrivers.length
  );
  const highRiskDrivers = demoDrivers.filter(
    (driver) => Number(driver.safety_score || 100) < 85
  );
  const highRiskVehicles = demoVehicles.filter(
    (vehicle) => vehicle.alerts >= 2 || vehicle.health < 85
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-300">
            AI risk engine
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Predictive Driver & Vehicle Risk
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Prioritize coaching, maintenance, insurance evidence, and dispatch
            restrictions before a small risk becomes a large loss.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Fleet safety score", `${fleetScore}/100`, "AI weighted index"],
            ["High risk drivers", highRiskDrivers.length, "Coach before next trip"],
            ["Risk vehicles", highRiskVehicles.length, "Restrict heavy lanes"],
            ["Evidence events", commandEvents.length, "Ready for review"],
          ].map(([label, value, hint]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-5"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <h2 className="mt-3 text-3xl font-black text-white">{value}</h2>
              <p className="mt-2 text-sm text-slate-500">{hint}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Driver Risk Ranking</h2>
            <div className="mt-5 space-y-3">
              {[...demoDrivers]
                .sort(
                  (a, b) =>
                    Number(a.safety_score || 100) - Number(b.safety_score || 100)
                )
                .map((driver) => {
                  const score = Number(driver.safety_score || 100);
                  const action =
                    score < 80
                      ? "Immediate coaching + no night duty"
                      : score < 88
                      ? "Coach on next yard check-in"
                      : "Normal dispatch allowed";

                  return (
                    <div
                      key={driver.id}
                      className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-bold text-white">{driver.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {driver.status} | {driver.phone}
                          </p>
                        </div>
                        <span
                          className={`rounded-md border px-3 py-1 text-xs font-bold ${riskTone(
                            score
                          )}`}
                        >
                          {score}/100
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-300">{action}</p>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">AI Recommendations</h2>
            <div className="mt-5 space-y-3">
              {[
                "Block KA01TR8842 from high-value electronics route until driver distraction review is closed.",
                "Move RJ14BT4501 to workshop queue before assigning cold-chain load.",
                "Send forward-collision clip to Rajesh Patil coaching packet.",
                "Offer lower insurance excess on vehicles with 90+ health and no critical events.",
              ].map((recommendation, index) => (
                <div
                  key={recommendation}
                  className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rose-400/10 text-xs font-black text-rose-200">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-300">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Vehicle Risk Triggers</h2>
            <div className="mt-5 space-y-3">
              {highRiskVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">
                        {vehicle.vehicle_number}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {vehicle.route} | {vehicle.location}
                      </p>
                    </div>
                    <span className="rounded-md bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                      {vehicle.alerts} alerts
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    Health {vehicle.health}% | restrict if maintenance is open.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Loss Prevention Queue</h2>
            <div className="mt-5 space-y-3">
              {maintenanceQueue.map((item) => (
                <div
                  key={`${item.vehicle}-${item.issue}`}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <p className="font-bold text-white">{item.vehicle}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.issue}</p>
                  <p className="mt-3 text-xs font-bold uppercase text-cyan-300">
                    Priority: {item.priority}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
