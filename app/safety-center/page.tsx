import AppLayout from "../components/AppLayout";
import {
  commandEvents,
  demoDrivers,
  demoVehicles,
  reportCatalog,
} from "../lib/demoData";

function severityClass(severity: string) {
  if (severity === "Critical") return "bg-rose-500/15 text-rose-200";
  if (severity === "High") return "bg-amber-500/15 text-amber-200";
  return "bg-cyan-500/15 text-cyan-200";
}

export default function SafetyCenterPage() {
  const averageScore = Math.round(
    demoDrivers.reduce(
      (sum, driver) => sum + Number(driver.safety_score || 0),
      0
    ) / demoDrivers.length
  );
  const eventCount = commandEvents.length;
  const clipReports = reportCatalog.filter((report) =>
    report.title.includes("Incident") || report.title.includes("Driver")
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Safety command
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Fleet Safety Center
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            DMS, ADAS, driver coaching, evidence clips, claims readiness, and
            safety score governance for transport operations.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Safety score", `${averageScore}/100`, "Fleet average"],
            ["AI events", eventCount, "Open for review"],
            ["Vehicles monitored", demoVehicles.length, "4CH ready fleet"],
            ["Coaching packs", clipReports.length, "Ready to export"],
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
            <h2 className="text-xl font-bold">Safety Event Review</h2>
            <div className="mt-5 space-y-3">
              {commandEvents.map((event) => (
                <div
                  key={`${event.vehicle}-${event.time}`}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">{event.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {event.vehicle} | {event.time}
                      </p>
                    </div>
                    <span
                      className={`rounded-md px-3 py-1 text-xs font-bold ${severityClass(
                        event.severity
                      )}`}
                    >
                      {event.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {event.detail}
                  </p>
                  <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
                    <span className="rounded-md bg-white/[0.04] px-3 py-2">
                      Evidence clip queued
                    </span>
                    <span className="rounded-md bg-white/[0.04] px-3 py-2">
                      GPS attached
                    </span>
                    <span className="rounded-md bg-white/[0.04] px-3 py-2">
                      Coaching action
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Driver Coaching Queue</h2>
            <div className="mt-5 space-y-3">
              {[...demoDrivers]
                .sort(
                  (a, b) =>
                    Number(a.safety_score || 0) - Number(b.safety_score || 0)
                )
                .map((driver) => (
                  <div
                    key={driver.id}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{driver.name}</p>
                        <p className="text-xs text-slate-500">
                          {driver.status}
                        </p>
                      </div>
                      <p className="text-xl font-black text-cyan-300">
                        {driver.safety_score}
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-slate-400">
                      {Number(driver.safety_score) < 85
                        ? "Schedule coaching before next dispatch."
                        : "Continue monitoring and reward safe behavior."}
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
