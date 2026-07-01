import AppLayout from "../components/AppLayout";
import TripLifecycleClient from "../components/workflow/TripLifecycleClient";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

function money(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export default async function TMSPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: trips } = await filterByTenant(
    supabase.from("trips").select("*").order("id", { ascending: false }),
    tenantId,
  );
  const safeTrips = trips || [];
  const assignedTrips = safeTrips.filter((trip) =>
    ["Assigned", "In transit", "Delivered"].includes(String(trip.status || "")),
  );
  const podPendingTrips = safeTrips.filter((trip) =>
    ["Delivered", "POD pending"].includes(String(trip.status || "")),
  );
  const totalRevenue = safeTrips.reduce(
    (sum, trip) => sum + Number(trip.revenue || 0),
    0,
  );
  const completion =
    safeTrips.length > 0
      ? Math.round((assignedTrips.length / safeTrips.length) * 100)
      : 0;

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            AI Transport Management System
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Order to Cash TMS
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Book loads, approve rates, assign vehicle and driver, track
            geofence milestones, capture POD, generate invoice, and follow
            payment from one lifecycle.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Open trips", String(safeTrips.length), "Created in this workspace"],
            ["Assigned", String(assignedTrips.length), "Vehicle and driver locked"],
            ["POD pending", String(podPendingTrips.length), "Billing blocked"],
            ["Order to cash", `${completion}%`, `${money(totalRevenue)} booked`],
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

        <section className="mb-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Load Board</h2>
            <div className="mt-5 space-y-3">
              {safeTrips.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center">
                  <h3 className="text-lg font-black text-white">
                    No trips created yet
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Create the first trip to start TMS lifecycle tracking,
                    assignment, POD, billing, and payment follow-up.
                  </p>
                  <a
                    href="/trips"
                    className="mt-5 inline-flex rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
                  >
                    Create first trip
                  </a>
                </div>
              ) : null}

              {safeTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500">
                        Trip #{trip.id}
                      </p>
                      <h3 className="mt-1 font-bold text-white">
                        {trip.origin || "Origin not set"} to{" "}
                        {trip.destination || "Destination not set"}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {trip.material || "Material not set"}
                      </p>
                    </div>
                    <span className="rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                      {trip.status || "Pending"}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">Rate</p>
                      <p className="font-bold text-white">
                        {money(Number(trip.revenue || 0))}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Vehicle</p>
                      <p className="font-bold text-white">
                        {trip.vehicle_id ? `#${trip.vehicle_id}` : "Not assigned"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Driver</p>
                      <p className="font-bold text-emerald-300">
                        {trip.driver_id ? `#${trip.driver_id}` : "Not assigned"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TripLifecycleClient trips={safeTrips as any} />
        </section>
      </div>
    </AppLayout>
  );
}
