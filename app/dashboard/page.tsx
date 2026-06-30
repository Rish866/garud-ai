import Link from "next/link";
import AppLayout from "../components/AppLayout";
import DashboardLiveMap from "../components/DashboardLiveMap";
import {
  commandEvents,
  complianceQueue,
  demoDrivers,
  demoTrips,
  demoVehicles,
  dispatchBoard,
  maintenanceQueue,
  receivableAging,
  transporterKPIs,
} from "../lib/demoData";

function money(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

function statusClass(status: string) {
  const value = status.toLowerCase();

  if (value.includes("critical") || value.includes("high")) {
    return "border-rose-400/30 bg-rose-400/10 text-rose-200";
  }

  if (value.includes("medium") || value.includes("follow")) {
    return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  }

  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
}

export default function DashboardPage() {
  const activeVehicles = demoVehicles.filter(
    (vehicle) => vehicle.status === "active"
  ).length;
  const runningTrips = demoTrips.filter((trip) => trip.status === "running");
  const revenueToday = demoTrips.reduce((sum, trip) => sum + trip.revenue, 0);
  const profitToday = demoTrips.reduce(
    (sum, trip) => sum + Number(trip.profit || 0),
    0
  );
  const openAlerts = demoVehicles.reduce(
    (sum, vehicle) => sum + vehicle.alerts,
    0
  );

  const profitPercent = Math.round((profitToday / revenueToday) * 100);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#0f172a,#06131f_50%,#111827)]">
          <div className="grid gap-6 p-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="w-fit rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                Owner control room
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
                GARUD AI Transport Command Dashboard
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                One screen for cash, dispatch, vehicle health, driver safety,
                receivables, compliance, and customer billing readiness.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Revenue today", money(revenueToday), "Booked trips"],
                  ["Net profit", money(profitToday), `${profitPercent}% margin`],
                  ["Active vehicles", `${activeVehicles}/${demoVehicles.length}`, "Live on road"],
                  ["Open AI alerts", openAlerts, "Needs review"],
                ].map(([label, value, hint]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl font-black text-white">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-cyan-400/20 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">
                    Today&apos;s command priorities
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    What a transporter should act on first
                  </p>
                </div>
                <span className="rounded-md bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Live
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  "Collect INR 2.18L from 0-15 day invoices before dispatch cut-off.",
                  "Hold credit on two customers crossing 45+ days outstanding.",
                  "Pull RJ14BT4501 from reefer duty until engine heat is cleared.",
                  "Coach Mohan Reddy for distraction event before next trip assignment.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-xs font-black text-cyan-200">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Cash in bank", money(transporterKPIs.cashInBank), "Available for fuel and advances"],
            ["Receivables", money(transporterKPIs.receivables), `${transporterKPIs.openInvoices} open invoices`],
            ["Fuel spend", money(transporterKPIs.fuelSpend), "Month to date"],
            ["Utilization", `${transporterKPIs.utilization}%`, `${transporterKPIs.emptyKm}% empty km`],
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

        <section className="mb-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Dispatch Board</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Lane demand, available vehicles, market rate, and margin.
                </p>
              </div>
              <Link
                href="/trips/add"
                className="rounded-md bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950"
              >
                Create trip
              </Link>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {dispatchBoard.map((lane) => (
                <div
                  key={lane.lane}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">{lane.lane}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {lane.demand} loads, {lane.available} vehicles available
                      </p>
                    </div>
                    <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">
                      {lane.margin}% margin
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <p className="text-2xl font-black text-cyan-200">
                      {money(lane.rate)}
                    </p>
                    <p className="text-xs text-slate-500">market rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Receivables Aging</h2>
            <p className="mt-1 text-sm text-slate-400">
              Collections view before allowing more credit.
            </p>
            <div className="mt-5 space-y-3">
              {receivableAging.map((row) => (
                <div key={row.bucket}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{row.bucket}</span>
                    <span className="font-bold text-white">
                      {money(row.amount)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${Math.min(100, row.amount / 2500)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {row.count} invoices, {row.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DashboardLiveMap vehicles={demoVehicles} />
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Active Trips</h2>
            <div className="mt-4 space-y-3">
              {runningTrips.map((trip) => {
                const vehicle = demoVehicles.find(
                  (item) => item.id === trip.vehicle_id
                );
                const driver = demoDrivers.find(
                  (item) => item.id === trip.driver_id
                );

                return (
                  <div
                    key={trip.id}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <p className="font-bold text-white">
                      {trip.origin} to {trip.destination}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <span>{vehicle?.vehicle_number}</span>
                      <span>{driver?.name}</span>
                      <span>{trip.distanceKm} km</span>
                      <span>ETA {trip.eta}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Compliance Queue</h2>
            <div className="mt-4 space-y-3">
              {complianceQueue.map((item) => (
                <div
                  key={`${item.item}-${item.vehicle}`}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{item.item}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.vehicle} due in {item.due}
                      </p>
                    </div>
                    <span
                      className={`rounded-md border px-2 py-1 text-xs font-bold ${statusClass(
                        item.risk
                      )}`}
                    >
                      {item.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Maintenance Queue</h2>
            <div className="mt-4 space-y-3">
              {maintenanceQueue.map((item) => (
                <div
                  key={`${item.vehicle}-${item.issue}`}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">
                        {item.vehicle}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.issue}
                      </p>
                    </div>
                    <span
                      className={`rounded-md border px-2 py-1 text-xs font-bold ${statusClass(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-bold text-cyan-200">
                    Est. {money(item.cost)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">AI Safety Feed</h2>
            <div className="mt-4 space-y-3">
              {commandEvents.map((event) => (
                <div
                  key={`${event.vehicle}-${event.time}`}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{event.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {event.vehicle} at {event.time}
                      </p>
                    </div>
                    <span
                      className={`rounded-md border px-2 py-1 text-xs font-bold ${statusClass(
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
        </section>
      </div>
    </AppLayout>
  );
}
