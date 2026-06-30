import AppLayout from "../components/AppLayout";
import {
  demoTrips,
  demoVehicles,
  maintenanceQueue,
  transporterKPIs,
} from "../lib/demoData";

function money(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export default function ProfitabilityPage() {
  const totalRevenue = demoTrips.reduce((sum, trip) => sum + trip.revenue, 0);
  const totalExpenses = demoTrips.reduce(
    (sum, trip) => sum + Number(trip.expenses || 0),
    0
  );
  const totalProfit = demoTrips.reduce(
    (sum, trip) => sum + Number(trip.profit || 0),
    0
  );
  const profitMargin = Math.round((totalProfit / totalRevenue) * 100);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
            Profit command
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Vehicle Profitability & Cost Control
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Track trip margin, vehicle P&L, fuel leakage, tyre spend,
            maintenance exposure, and customer pricing discipline.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Revenue", money(totalRevenue), "Booked trips"],
            ["Expenses", money(totalExpenses), "Fuel + salary + maintenance"],
            ["Net profit", money(totalProfit), `${profitMargin}% blended margin`],
            ["Fuel spend", money(transporterKPIs.fuelSpend), "Month to date"],
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

        <section className="mb-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Trip Profitability</h2>
            <div className="mt-5 space-y-3">
              {demoTrips.map((trip) => {
                const margin = Math.round(
                  (Number(trip.profit || 0) / trip.revenue) * 100
                );
                const vehicle = demoVehicles.find(
                  (item) => item.id === trip.vehicle_id
                );

                return (
                  <div
                    key={trip.id}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-white">
                          {trip.origin} to {trip.destination}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {vehicle?.vehicle_number} | {trip.distanceKm} km | {trip.status}
                        </p>
                      </div>
                      <span className="rounded-md bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                        {margin}% margin
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <p className="text-slate-500">Revenue</p>
                        <p className="font-bold text-white">
                          {money(trip.revenue)}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Expense</p>
                        <p className="font-bold text-rose-300">
                          {money(Number(trip.expenses || 0))}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Profit</p>
                        <p className="font-bold text-emerald-300">
                          {money(Number(trip.profit || 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-xl font-bold">Leakage Watch</h2>
              <div className="mt-5 space-y-3">
                {[
                  ["Empty km", `${transporterKPIs.emptyKm}%`, "Reduce return empty loads"],
                  ["Tyre spend", money(transporterKPIs.tyreSpend), "Rotate before failure"],
                  ["Payables", money(transporterKPIs.payables), "Vendor payments due"],
                ].map(([label, value, hint]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400">{label}</p>
                      <p className="font-bold text-white">{value}</p>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-xl font-bold">Repair Exposure</h2>
              <div className="mt-5 space-y-3">
                {maintenanceQueue.slice(0, 3).map((item) => (
                  <div
                    key={`${item.vehicle}-${item.issue}`}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                  >
                    <div>
                      <p className="font-semibold text-white">{item.vehicle}</p>
                      <p className="text-xs text-slate-500">{item.issue}</p>
                    </div>
                    <p className="font-bold text-amber-300">
                      {money(item.cost)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
