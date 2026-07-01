import AppLayout from "../components/AppLayout";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

type DriverRecord = {
  id: string | number;
  name?: string | null;
  phone?: string | null;
  status?: string | null;
  safety_score?: number | string | null;
};

type VehicleRecord = {
  id: string | number;
  vehicle_number?: string | null;
  status?: string | null;
  health?: number | string | null;
  alerts?: number | string | null;
  location?: string | null;
  route?: string | null;
};

function riskTone(score: number) {
  if (score < 80) return "border-rose-400/30 bg-rose-400/10 text-rose-200";
  if (score < 88) return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
}

function numberValue(value: unknown, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export default async function RiskEnginePage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [
    { data: drivers },
    { data: vehicles },
    { data: maintenanceJobs },
    { data: safetyEvents },
  ] = await Promise.all([
    filterByTenant(supabase.from("drivers").select("*").order("id"), tenantId),
    filterByTenant(supabase.from("vehicles").select("*").order("id"), tenantId),
    filterByTenant(supabase.from("erp_maintenance_jobs").select("*"), tenantId),
    filterByTenant(supabase.from("erp_safety_events").select("*"), tenantId),
  ]);

  const safeDrivers = (drivers || []) as DriverRecord[];
  const safeVehicles = (vehicles || []) as VehicleRecord[];
  const openMaintenance = (maintenanceJobs || []).filter(
    (job) => String(job.status || "").toLowerCase() !== "closed",
  );
  const openSafetyEvents = (safetyEvents || []).filter(
    (event) => String(event.status || "").toLowerCase() !== "closed",
  );
  const fleetScore =
    safeDrivers.length > 0
      ? Math.round(
          safeDrivers.reduce(
            (sum, driver) => sum + numberValue(driver.safety_score, 100),
            0,
          ) / safeDrivers.length,
        )
      : 0;
  const highRiskDrivers = safeDrivers.filter(
    (driver) => numberValue(driver.safety_score, 100) < 85,
  );
  const highRiskVehicles = safeVehicles.filter(
    (vehicle) =>
      numberValue(vehicle.alerts) >= 2 ||
      numberValue(vehicle.health, 100) < 85 ||
      String(vehicle.status || "").toLowerCase().includes("maintenance"),
  );
  const recommendations = [
    highRiskDrivers.length
      ? "Review low-scoring drivers before assigning night or high-value trips."
      : "",
    highRiskVehicles.length
      ? "Clear vehicle risk flags before assigning sensitive loads."
      : "",
    openMaintenance.length
      ? "Close open maintenance jobs before dispatch release."
      : "",
    openSafetyEvents.length
      ? "Review AI safety events and attach closure notes."
      : "",
  ].filter(Boolean);

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
            Risk view generated from this customer&apos;s drivers, vehicles,
            maintenance jobs, and AI safety events.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Fleet safety score", `${fleetScore}/100`, "Driver weighted index"],
            ["High risk drivers", String(highRiskDrivers.length), "Coach before next trip"],
            ["Risk vehicles", String(highRiskVehicles.length), "Restrict until cleared"],
            ["Open evidence", String(openSafetyEvents.length), "Safety events to review"],
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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Driver Risk Ranking</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Based on driver safety score in this workspace.
                </p>
              </div>
              <a
                href="/drivers"
                className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
              >
                Add driver
              </a>
            </div>
            <div className="mt-5 space-y-3">
              {safeDrivers.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center">
                  <h3 className="text-lg font-black text-white">
                    No driver risk data yet
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Add drivers and safety scores to start risk ranking.
                  </p>
                </div>
              ) : null}

              {[...safeDrivers]
                .sort(
                  (a, b) =>
                    numberValue(a.safety_score, 100) -
                    numberValue(b.safety_score, 100),
                )
                .map((driver) => {
                  const score = numberValue(driver.safety_score, 100);
                  const action =
                    score < 80
                      ? "Immediate coaching + dispatch review"
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
                          <p className="font-bold text-white">
                            {driver.name || `Driver #${driver.id}`}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {driver.status || "available"} | {driver.phone || "No phone"}
                          </p>
                        </div>
                        <span
                          className={`rounded-md border px-3 py-1 text-xs font-bold ${riskTone(
                            score,
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
              {recommendations.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center">
                  <h3 className="text-lg font-black text-white">
                    No risk recommendations yet
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Recommendations appear after drivers, vehicles, maintenance
                    jobs, or safety events are added.
                  </p>
                </div>
              ) : null}
              {recommendations.map((recommendation, index) => (
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
              {highRiskVehicles.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center text-sm text-slate-400">
                  No vehicle risk triggers yet.
                </div>
              ) : null}
              {highRiskVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">
                        {vehicle.vehicle_number || `Vehicle #${vehicle.id}`}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {vehicle.route || "No active route"} |{" "}
                        {vehicle.location || "No location"}
                      </p>
                    </div>
                    <span className="rounded-md bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                      {numberValue(vehicle.alerts)} alerts
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    Health {numberValue(vehicle.health, 100)}% | status{" "}
                    {vehicle.status || "unknown"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Loss Prevention Queue</h2>
            <div className="mt-5 space-y-3">
              {openMaintenance.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center text-sm text-slate-400">
                  No open maintenance risk yet.
                </div>
              ) : null}
              {openMaintenance.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <p className="font-bold text-white">{item.vehicle_label}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.issue}</p>
                  <p className="mt-3 text-xs font-bold uppercase text-cyan-300">
                    Priority: {item.priority || "medium"}
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
