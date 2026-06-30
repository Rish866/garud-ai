import Link from "next/link";
import {
  commandEvents,
  demoTrips,
  demoVehicles,
  transporterModes,
} from "../lib/demoData";

function statusStyle(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "active") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (normalized === "idle") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  return "border-rose-400/30 bg-rose-400/10 text-rose-300";
}

function severityStyle(severity: string) {
  if (severity === "Critical") {
    return "bg-rose-500/15 text-rose-200 ring-rose-400/30";
  }

  if (severity === "High") {
    return "bg-amber-500/15 text-amber-200 ring-amber-400/30";
  }

  return "bg-cyan-500/15 text-cyan-200 ring-cyan-400/30";
}

export default function CommandCenterPage() {
  const liveVehicles = demoVehicles.filter(
    (vehicle) => vehicle.status === "active"
  ).length;
  const onlineCameras = demoVehicles.reduce(
    (total, vehicle) => total + vehicle.cameras,
    0
  );
  const activeAlerts = demoVehicles.reduce(
    (total, vehicle) => total + vehicle.alerts,
    0
  );
  const activeVehicle = demoVehicles[0];

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100">
      <section className="border-b border-white/10 bg-[#080b13] px-5 py-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
              GARUD AI
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">
              Enterprise Command Center
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              ["Live vehicles", liveVehicles, "text-emerald-300"],
              ["Online cameras", onlineCameras, "text-cyan-300"],
              ["AI events", activeAlerts, "text-rose-300"],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2"
              >
                <p className="text-xs text-slate-400">{label}</p>
                <p className={`text-lg font-black ${color}`}>{value}</p>
              </div>
            ))}

            <Link
              href="/dashboard"
              className="rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/10"
            >
              SaaS dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="grid min-h-[calc(100vh-89px)] grid-cols-12 gap-4 p-4">
        <aside className="col-span-12 rounded-lg border border-white/10 bg-[#080b13] p-4 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                Vehicle Fleet
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Live demo vehicles with telemetry and AI events
              </p>
            </div>
            <span className="rounded-md bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              {demoVehicles.length} Units
            </span>
          </div>

          <div className="space-y-3">
            {demoVehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">
                      {vehicle.vehicle_number}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {vehicle.driver_name}
                    </p>
                  </div>

                  <span
                    className={`rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase ${statusStyle(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-md bg-black/30 p-2">
                    <p className="text-slate-500">Speed</p>
                    <p className="font-semibold text-slate-200">
                      {vehicle.speed} km/h
                    </p>
                  </div>
                  <div className="rounded-md bg-black/30 p-2">
                    <p className="text-slate-500">Cameras</p>
                    <p className="font-semibold text-slate-200">
                      {vehicle.cameras}/4
                    </p>
                  </div>
                  <div className="rounded-md bg-black/30 p-2">
                    <p className="text-slate-500">AI</p>
                    <p className="font-semibold text-rose-300">
                      {vehicle.alerts}
                    </p>
                  </div>
                </div>

                <p className="mt-3 truncate text-xs text-slate-500">
                  {vehicle.location}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <section className="col-span-12 space-y-4 xl:col-span-6">
          <div className="rounded-lg border border-white/10 bg-[#080b13] p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                  4CH Camera Wall
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {activeVehicle.vehicle_number} on {activeVehicle.route}
                </p>
              </div>

              <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                Recording
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {["Road view", "Cabin DMS", "Left blind spot", "Cargo bay"].map(
                (camera, index) => (
                  <div
                    key={camera}
                    className="min-h-56 overflow-hidden rounded-lg border border-slate-800 bg-[radial-gradient(circle_at_30%_25%,rgba(34,211,238,0.18),transparent_28%),linear-gradient(135deg,#111827,#020617)] p-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{camera}</span>
                      <span className="text-emerald-300">LIVE 0{index + 1}</span>
                    </div>
                    <div className="mt-24 grid gap-2">
                      <div className="h-2 rounded-full bg-cyan-300/30" />
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                      <div className="h-2 w-1/2 rounded-full bg-white/10" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Speed", `${activeVehicle.speed} km/h`],
              ["Fleet health", `${activeVehicle.health}%`],
              ["Trip revenue", "INR 48,500"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-[#080b13] p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-white/10 bg-[#080b13] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
              Transporter presets
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {transporterModes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300"
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="col-span-12 space-y-4 xl:col-span-3">
          <div className="rounded-lg border border-white/10 bg-[#080b13] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
              AI Events
            </h2>

            <div className="mt-4 space-y-3">
              {commandEvents.map((event) => (
                <div
                  key={`${event.vehicle}-${event.time}`}
                  className="rounded-lg border border-white/10 bg-black/30 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white">{event.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {event.vehicle} at {event.time}
                      </p>
                    </div>
                    <span
                      className={`rounded-md px-2 py-1 text-[10px] font-bold ring-1 ${severityStyle(
                        event.severity
                      )}`}
                    >
                      {event.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    {event.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#080b13] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
              Evidence Queue
            </h2>
            <div className="mt-4 space-y-2">
              {["Clip tagged", "Manager review", "Driver coaching", "Insurance packet"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="flex items-center justify-between rounded-md bg-white/[0.04] px-3 py-2 text-sm"
                  >
                    <span className="text-slate-300">{step}</span>
                    <span className="text-xs font-bold text-cyan-300">
                      {index + 2}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#080b13] p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
              Active Trips
            </h2>
            <div className="mt-4 space-y-3">
              {demoTrips.slice(0, 3).map((trip) => (
                <div key={trip.id} className="rounded-md bg-black/30 p-3">
                  <p className="text-sm font-semibold text-white">
                    {trip.origin}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    to {trip.destination}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase text-cyan-300">
                    {trip.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
