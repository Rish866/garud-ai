import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

type TripRecord = {
  id: string | number;
  origin?: string | null;
  destination?: string | null;
  revenue?: number | null;
  expenses?: number | null;
  profit?: number | null;
  status?: string | null;
  vehicle_id?: string | number | null;
};

function money(value: number) {
  return `INR ${Math.round(value || 0).toLocaleString("en-IN")}`;
}

function numberValue(value: unknown) {
  return Number(value || 0);
}

export default async function ProfitabilityPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [
    { data: trips },
    { data: fuelLogs },
    { data: maintenanceJobs },
    { data: tyreRecords },
  ] = await Promise.all([
    filterByTenant(supabase.from("trips").select("*").order("id", { ascending: false }), tenantId),
    filterByTenant(supabase.from("fuel_logs").select("*"), tenantId),
    filterByTenant(supabase.from("erp_maintenance_jobs").select("*"), tenantId),
    filterByTenant(supabase.from("erp_tyre_records").select("*"), tenantId),
  ]);

  const safeTrips = (trips || []) as TripRecord[];
  const fuelSpend = (fuelLogs || []).reduce(
    (sum, fuel) => sum + numberValue(fuel.amount),
    0,
  );
  const maintenanceSpend = (maintenanceJobs || []).reduce(
    (sum, job) => sum + numberValue(job.actual_cost || job.estimated_cost),
    0,
  );
  const tyreSpend = (tyreRecords || []).reduce(
    (sum, tyre) => sum + numberValue(tyre.cost),
    0,
  );
  const totalRevenue = safeTrips.reduce(
    (sum, trip) => sum + numberValue(trip.revenue),
    0,
  );
  const tripExpenses = safeTrips.reduce(
    (sum, trip) => sum + numberValue(trip.expenses),
    0,
  );
  const totalExpenses = tripExpenses + fuelSpend + maintenanceSpend + tyreSpend;
  const totalProfit = safeTrips.reduce((sum, trip) => {
    const explicitProfit = trip.profit;
    if (explicitProfit !== null && explicitProfit !== undefined) {
      return sum + numberValue(explicitProfit);
    }
    return sum + numberValue(trip.revenue) - numberValue(trip.expenses);
  }, 0) - fuelSpend - maintenanceSpend - tyreSpend;
  const profitMargin =
    totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0;
  const rows = safeTrips.map((trip) => {
    const tripProfit =
      trip.profit !== null && trip.profit !== undefined
        ? numberValue(trip.profit)
        : numberValue(trip.revenue) - numberValue(trip.expenses);
    return [
      `Trip #${trip.id}`,
      `${trip.origin || "-"} to ${trip.destination || "-"}`,
      money(numberValue(trip.revenue)),
      money(numberValue(trip.expenses)),
      money(tripProfit),
      trip.status || "Pending",
    ];
  });

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
            Profit command
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Profitability & Cost Control
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Live margin view for this customer workspace. Revenue comes from
            trips, and cost pressure comes from trip expenses, fuel,
            maintenance, and tyres.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Revenue", money(totalRevenue), "Booked trips"],
            ["Expenses", money(totalExpenses), "Trip + fuel + workshop"],
            ["Net profit", money(totalProfit), `${profitMargin}% margin`],
            ["Fuel spend", money(fuelSpend), "Logged in fuel module"],
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

        <ModuleActions
          moduleTitle="Profitability"
          moduleKey="profitability"
          columns={["Trip", "Lane", "Revenue", "Expense", "Profit", "Status"]}
          rows={rows}
          reports={["Trip profitability", "Cost leakage", "Vehicle P&L", "Fuel spend"]}
        />

        <section className="mb-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Trip Profitability</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Uses only trips entered in this customer portal.
                </p>
              </div>
              <a
                href="/trips"
                className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
              >
                Add trip
              </a>
            </div>

            <div className="mt-5 space-y-3">
              {safeTrips.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center">
                  <h3 className="text-lg font-black text-white">
                    No profitability data yet
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Create trips, fuel logs, maintenance jobs, and tyre records
                    to build a real profit report for this customer.
                  </p>
                </div>
              ) : null}

              {safeTrips.map((trip) => {
                const revenue = numberValue(trip.revenue);
                const expenses = numberValue(trip.expenses);
                const profit =
                  trip.profit !== null && trip.profit !== undefined
                    ? numberValue(trip.profit)
                    : revenue - expenses;
                const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;

                return (
                  <div
                    key={trip.id}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-white">
                          {trip.origin || "Origin not set"} to{" "}
                          {trip.destination || "Destination not set"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Trip #{trip.id} | {trip.status || "Pending"}
                        </p>
                      </div>
                      <span className="rounded-md bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                        {margin}% margin
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <p className="text-slate-500">Revenue</p>
                        <p className="font-bold text-white">{money(revenue)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Expense</p>
                        <p className="font-bold text-rose-300">{money(expenses)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Profit</p>
                        <p className="font-bold text-emerald-300">{money(profit)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-xl font-bold">Cost Split</h2>
              <div className="mt-5 space-y-3">
                {[
                  ["Trip expenses", money(tripExpenses), "From trip records"],
                  ["Fuel", money(fuelSpend), "From fuel logs"],
                  ["Maintenance", money(maintenanceSpend), "From job cards"],
                  ["Tyres", money(tyreSpend), "From tyre records"],
                ].map(([label, value, hint]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-slate-400">{label}</p>
                      <p className="font-bold text-white">{value}</p>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-xl font-bold">Next Actions</h2>
              <div className="mt-5 grid gap-3">
                <a
                  href="/fuel-management"
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 font-bold text-cyan-200 hover:border-cyan-400/30"
                >
                  Add fuel cost
                </a>
                <a
                  href="/maintenance-center"
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 font-bold text-cyan-200 hover:border-cyan-400/30"
                >
                  Add maintenance cost
                </a>
                <a
                  href="/tyre-management"
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 font-bold text-cyan-200 hover:border-cyan-400/30"
                >
                  Add tyre cost
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
