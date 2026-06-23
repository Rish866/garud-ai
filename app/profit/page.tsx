import { supabase } from "../lib/supabase";

export default async function ProfitPage() {
  const { data: trips } =
    await supabase
      .from("trip_profitability")
      .select("*");

  const totalRevenue =
    trips?.reduce(
      (sum, trip: any) =>
        sum + Number(trip.revenue || 0),
      0
    ) || 0;

  const totalExpenses =
    trips?.reduce(
      (sum, trip: any) =>
        sum +
        Number(
          trip.total_expenses || 0
        ),
      0
    ) || 0;

  const totalProfit =
    trips?.reduce(
      (sum, trip: any) =>
        sum + Number(trip.profit || 0),
      0
    ) || 0;

  const profitMargin =
    totalRevenue > 0
      ? (
          (totalProfit /
            totalRevenue) *
          100
        ).toFixed(1)
      : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Profit Analytics
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Revenue
          </p>

          <h2 className="text-3xl font-bold text-blue-500">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Expenses
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            ₹{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Net Profit
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            ₹{totalProfit.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Margin
          </p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {profitMargin}%
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">
                Route
              </th>

              <th className="text-left py-3">
                Revenue
              </th>

              <th className="text-left py-3">
                Expenses
              </th>

              <th className="text-left py-3">
                Profit
              </th>
            </tr>
          </thead>

          <tbody>
            {trips?.map(
              (trip: any) => (
                <tr
                  key={trip.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-3">
                    {trip.origin}
                    {" → "}
                    {trip.destination}
                  </td>

                  <td>
                    ₹
                    {Number(
                      trip.revenue
                    ).toLocaleString()}
                  </td>

                  <td className="text-red-500">
                    ₹
                    {Number(
                      trip.total_expenses
                    ).toLocaleString()}
                  </td>

                  <td className="text-green-500">
                    ₹
                    {Number(
                      trip.profit
                    ).toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}