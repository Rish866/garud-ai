import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function ProfitabilityPage() {
  const { data: trips } = await supabase
    .from("trip_profitability")
    .select("*");

  const totalRevenue =
    trips?.reduce(
      (sum: number, trip: any) =>
        sum + Number(trip.revenue || 0),
      0
    ) || 0;

  const totalExpenses =
    trips?.reduce(
      (sum: number, trip: any) =>
        sum + Number(trip.total_expenses || 0),
      0
    ) || 0;

  const totalProfit =
    trips?.reduce(
      (sum: number, trip: any) =>
        sum + Number(trip.profit || 0),
      0
    ) || 0;

  const profitMargin =
    totalRevenue > 0
      ? (totalProfit / totalRevenue) * 100
      : 0;

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-green-500 mb-8">
        📈 Vehicle Profitability
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-green-400">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Expenses
          </p>

          <h2 className="text-3xl font-bold text-red-400">
            ₹{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Net Profit
          </p>

          <h2 className="text-3xl font-bold text-cyan-400">
            ₹{totalProfit.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Profit Margin
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">
            {profitMargin.toFixed(1)}%
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Trip Profitability
        </h2>

        <div className="space-y-4">

          {trips?.map((trip: any) => (
            <div
              key={trip.id}
              className="bg-slate-800 rounded-lg p-4"
            >
              <div className="flex justify-between">

                <div>
                  <p className="font-bold text-cyan-400">
                    {trip.origin} → {trip.destination}
                  </p>

                  <p className="text-slate-400">
                    Trip #{trip.id}
                  </p>
                </div>

                <div className="text-right">

                  <p>
                    Revenue: ₹
                    {Number(
                      trip.revenue
                    ).toLocaleString()}
                  </p>

                  <p>
                    Expenses: ₹
                    {Number(
                      trip.total_expenses
                    ).toLocaleString()}
                  </p>

                  <p
                    className={
                      Number(trip.profit) >= 0
                        ? "text-green-400 font-bold"
                        : "text-red-400 font-bold"
                    }
                  >
                    Profit: ₹
                    {Number(
                      trip.profit
                    ).toLocaleString()}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </AppLayout>
  );
}