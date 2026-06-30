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
import { ownerPriorityNotifications, toneClass as notificationToneClass } from "../lib/actionRoutes";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

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

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [{ data: tenantVehicles }, { data: tenantTrips }, { data: tenantDrivers }] =
    await Promise.all([
      filterByTenant(supabase.from("vehicles").select("*").order("id"), tenantId),
      filterByTenant(supabase.from("trips").select("*").order("id"), tenantId),
      filterByTenant(supabase.from("drivers").select("*").order("id"), tenantId),
    ]);

  const vehicles = tenantId
    ? (tenantVehicles || []).map((vehicle) => ({
        id: Number(vehicle.id),
        vehicle_number: vehicle.vehicle_number || `Vehicle ${vehicle.id}`,
        driver_id: vehicle.driver_id ? Number(vehicle.driver_id) : undefined,
        customer_id: vehicle.customer_id ? Number(vehicle.customer_id) : undefined,
        driver_name: vehicle.driver_name || undefined,
        status: vehicle.status || "idle",
        latitude: Number(vehicle.latitude || 19.076),
        longitude: Number(vehicle.longitude || 72.8777),
        location: vehicle.location || "Not tracked yet",
        speed: Number(vehicle.speed || 0),
        cameras: Number(vehicle.cameras || 0),
        alerts: Number(vehicle.alerts || 0),
        route: vehicle.route || "No active route",
        mode: vehicle.mode || vehicle.vehicle_type || "Fleet",
        health: Number(vehicle.health || 0),
      }))
    : demoVehicles;
  const trips = tenantId
    ? (tenantTrips || []).map((trip) => ({
        id: Number(trip.id),
        origin: trip.origin || "-",
        destination: trip.destination || "-",
        revenue: Number(trip.revenue || 0),
        expenses: Number(trip.expenses || 0),
        profit: Number(trip.profit || 0),
        distanceKm: Number(trip.distance_km || trip.distanceKm || 0),
        eta: trip.eta || "-",
        status: trip.status || "pending",
        vehicle_id: trip.vehicle_id ? Number(trip.vehicle_id) : undefined,
        driver_id: trip.driver_id ? Number(trip.driver_id) : undefined,
        customer_id: trip.customer_id ? Number(trip.customer_id) : undefined,
      }))
    : demoTrips;
  const drivers = tenantId
    ? (tenantDrivers || []).map((driver) => ({
        id: Number(driver.id),
        name: driver.name || `Driver ${driver.id}`,
        phone: driver.phone || undefined,
        safety_score: Number(driver.safety_score || 0),
        status: driver.status || "available",
      }))
    : demoDrivers;
  const scopedDispatchBoard = tenantId ? [] : dispatchBoard;
  const scopedReceivableAging = tenantId ? [] : receivableAging;
  const scopedComplianceQueue = tenantId ? [] : complianceQueue;
  const scopedMaintenanceQueue = tenantId ? [] : maintenanceQueue;
  const scopedCommandEvents = tenantId ? [] : commandEvents;
  const scopedPriorityNotifications = tenantId ? [] : ownerPriorityNotifications;
  const scopedKPIs = tenantId
    ? {
        cashInBank: 0,
        receivables: 0,
        openInvoices: 0,
        fuelSpend: 0,
        utilization: 0,
        emptyKm: 0,
      }
    : transporterKPIs;

  const activeVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "active"
  ).length;
  const runningTrips = trips.filter((trip) => trip.status === "running");
  const revenueToday = trips.reduce((sum, trip) => sum + trip.revenue, 0);
  const profitToday = trips.reduce(
    (sum, trip) => sum + Number(trip.profit || 0),
    0
  );
  const openAlerts = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.alerts,
    0
  );

  const profitPercent = revenueToday ? Math.round((profitToday / revenueToday) * 100) : 0;

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-slate-900">
        <section className="mb-6 overflow-hidden rounded-lg border border-cyan-100 bg-[linear-gradient(135deg,#ffffff,#e8f7ff_52%,#f4fff8)] shadow-xl shadow-cyan-900/10">
          <div className="grid gap-6 p-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="w-fit rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                Owner control room
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                GARUD AI Transport Command Dashboard
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                One screen for cash, dispatch, vehicle health, driver safety,
                receivables, compliance, and customer billing readiness.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Revenue today", money(revenueToday), "Booked trips"],
                  ["Net profit", money(profitToday), `${profitPercent}% margin`],
                  ["Active vehicles", `${activeVehicles}/${vehicles.length}`, "Live on road"],
                  ["Open AI alerts", openAlerts, "Needs review"],
                ].map(([label, value, hint]) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-lg border border-cyan-100 bg-white/85 p-4 shadow-sm"
                  >
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-2 break-words text-xl font-black text-slate-950">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-cyan-100 bg-white/90 p-4 shadow-lg shadow-cyan-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-950">
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
                {scopedPriorityNotifications.map((item, index) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex gap-3 rounded-md border border-cyan-100 bg-sky-50/70 p-3 transition hover:border-cyan-300 hover:bg-cyan-50"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-xs font-black text-cyan-200">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold leading-6 text-slate-950">
                          {item.title}
                        </p>
                        <span
                          className={`rounded-md border px-2 py-1 text-[10px] font-bold ${notificationToneClass(
                            item.tone
                          )}`}
                        >
                          {item.meta}
                        </span>
                      </div>
                      <p className="text-xs leading-5 text-slate-400">
                        {item.detail}
                      </p>
                      <p className="mt-1 text-xs font-bold text-cyan-300 transition group-hover:translate-x-1">
                        Open linked module
                      </p>
                    </div>
                  </Link>
                ))}
                {!scopedPriorityNotifications.length ? (
                  <div className="rounded-md border border-cyan-100 bg-sky-50/70 p-4 text-sm font-semibold text-slate-500">
                    No customer alerts yet. New workspace is clean.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Cash in bank", money(scopedKPIs.cashInBank), "Available for fuel and advances"],
            ["Receivables", money(scopedKPIs.receivables), `${scopedKPIs.openInvoices} open invoices`],
            ["Fuel spend", money(scopedKPIs.fuelSpend), "Month to date"],
            ["Utilization", `${scopedKPIs.utilization}%`, `${scopedKPIs.emptyKm}% empty km`],
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
              {scopedDispatchBoard.map((lane) => (
                  <Link
                    key={lane.lane}
                    href={`/route-planner?lane=${encodeURIComponent(lane.lane)}`}
                    className="block rounded-lg border border-slate-800 bg-slate-950/80 p-4"
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
                  </Link>
                ))}
              {!scopedDispatchBoard.length ? (
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-400">
                  No lanes yet. Create the first trip or route plan.
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Receivables Aging</h2>
            <p className="mt-1 text-sm text-slate-400">
              Collections view before allowing more credit.
            </p>
            <div className="mt-5 space-y-3">
              {scopedReceivableAging.map((row) => (
                <Link key={row.bucket} href="/receivables" className="block rounded-md p-2 transition hover:bg-cyan-400/10">
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
                </Link>
              ))}
              {!scopedReceivableAging.length ? (
                <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-400">
                  No invoices yet. Receivables start at zero.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DashboardLiveMap vehicles={vehicles} />
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Active Trips</h2>
            <div className="mt-4 space-y-3">
              {runningTrips.map((trip) => {
                const vehicle = vehicles.find(
                  (item) => item.id === trip.vehicle_id
                );
                const driver = drivers.find(
                  (item) => item.id === trip.driver_id
                );

                return (
                  <Link
                    key={trip.id}
                    href={`/trips?record=${trip.id}`}
                    className="block rounded-lg border border-slate-800 bg-slate-950/80 p-4"
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
                  </Link>
                );
              })}
              {!runningTrips.length ? (
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-400">
                  No active trips yet.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Compliance Queue</h2>
            <div className="mt-4 space-y-3">
              {scopedComplianceQueue.map((item) => (
                <Link
                  key={`${item.item}-${item.vehicle}`}
                  href={`/document-center?entity=${encodeURIComponent(item.vehicle)}`}
                  className="block rounded-lg border border-slate-800 bg-slate-950/80 p-4"
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
                </Link>
              ))}
              {!scopedComplianceQueue.length ? (
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-400">
                  No compliance alerts yet.
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">Maintenance Queue</h2>
            <div className="mt-4 space-y-3">
              {scopedMaintenanceQueue.map((item) => (
                <Link
                  key={`${item.vehicle}-${item.issue}`}
                  href={`/maintenance-center?vehicle=${encodeURIComponent(item.vehicle)}`}
                  className="block rounded-lg border border-slate-800 bg-slate-950/80 p-4"
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
                </Link>
              ))}
              {!scopedMaintenanceQueue.length ? (
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-400">
                  No maintenance jobs yet.
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="text-xl font-bold">AI Safety Feed</h2>
            <div className="mt-4 space-y-3">
              {scopedCommandEvents.map((event) => (
                <Link
                  key={`${event.vehicle}-${event.time}`}
                  href={`/safety-events?vehicle=${encodeURIComponent(event.vehicle)}`}
                  className="block rounded-lg border border-slate-800 bg-slate-950/80 p-4"
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
                </Link>
              ))}
              {!scopedCommandEvents.length ? (
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-400">
                  No AI safety events yet.
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
