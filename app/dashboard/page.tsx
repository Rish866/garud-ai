import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function DashboardPage() {
  const { data: vehicles } =
    await supabase
      .from("vehicles")
      .select("*");

  const { data: drivers } =
    await supabase
      .from("drivers")
      .select("*");

  const { data: customers } =
    await supabase
      .from("customers")
      .select("*");

  const { data: trips } =
    await supabase
      .from("trips")
      .select(`
        *,
        customers(
          company_name
        )
      `)
      .order("id", {
        ascending: false,
      });

  const { data: profitability } =
    await supabase
      .from("trip_profitability")
      .select("*");

  const { data: salaries } =
    await supabase
      .from("driver_salary")
      .select("*");

  const { data: invoices } =
    await supabase
      .from("invoices")
      .select("*");

  const { data: payments } =
    await supabase
      .from("payments")
      .select("*");

  const totalVehicles =
    vehicles?.length || 0;

  const totalDrivers =
    drivers?.length || 0;

  const totalCustomers =
    customers?.length || 0;

  const totalTrips =
    trips?.length || 0;

  const activeTrips =
    trips?.filter(
      (trip: any) =>
        trip.status ===
        "In Progress"
    ).length || 0;

  const completedTrips =
    trips?.filter(
      (trip: any) =>
        trip.status ===
        "Completed"
    ).length || 0;

  const totalRevenue =
    trips?.reduce(
      (
        sum: number,
        trip: any
      ) =>
        sum +
        Number(
          trip.revenue || 0
        ),
      0
    ) || 0;

  const totalTripExpenses =
    profitability?.reduce(
      (
        sum: number,
        trip: any
      ) =>
        sum +
        Number(
          trip.total_expenses || 0
        ),
      0
    ) || 0;

  const totalDriverSalary =
    salaries?.reduce(
      (
        sum: number,
        row: any
      ) =>
        sum +
        Number(
          row.salary || 0
        ),
      0
    ) || 0;

  const totalInvoices =
    invoices?.reduce(
      (
        sum: number,
        invoice: any
      ) =>
        sum +
        Number(
          invoice.amount || 0
        ),
      0
    ) || 0;

  const totalPayments =
    payments?.reduce(
      (
        sum: number,
        payment: any
      ) =>
        sum +
        Number(
          payment.amount || 0
        ),
      0
    ) || 0;

  const outstandingReceivables =
    totalInvoices -
    totalPayments;

  const totalExpenses =
    totalTripExpenses +
    totalDriverSalary;

  const totalProfit =
    totalRevenue -
    totalExpenses;

  const profitMargin =
    totalRevenue > 0
      ? (
          (totalProfit /
            totalRevenue) *
          100
        ).toFixed(1)
      : "0";

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Vehicles
          </p>

          <h2 className="text-3xl font-bold">
            {totalVehicles}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Drivers
          </p>

          <h2 className="text-3xl font-bold">
            {totalDrivers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Customers
          </p>

          <h2 className="text-3xl font-bold">
            {totalCustomers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Trips
          </p>

          <h2 className="text-3xl font-bold">
            {totalTrips}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Active Trips
          </p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {activeTrips}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Completed Trips
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            {completedTrips}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-blue-500">
            ₹
            {totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-6 mb-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Trip Expenses
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            ₹
            {totalTripExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Driver Salary
          </p>

          <h2 className="text-3xl font-bold text-orange-500">
            ₹
            {totalDriverSalary.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Receivables
          </p>

          <h2 className="text-3xl font-bold text-cyan-500">
            ₹
            {outstandingReceivables.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Net Profit
          </p>

          <h2
            className={`text-3xl font-bold ${
              totalProfit >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ₹
            {totalProfit.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Profit Margin
          </p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {profitMargin}%
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Recent Trips
        </h2>

        <div className="space-y-4">
          {trips?.slice(0, 5).map(
            (trip: any) => (
              <div
                key={trip.id}
                className="flex justify-between items-center border-b border-slate-800 pb-3"
              >
                <div>
                  <p className="font-semibold">
                    {trip.customers
                      ?.company_name ||
                      "Unknown Customer"}
                  </p>

                  <p className="text-slate-400 text-sm">
                    {trip.origin} →{" "}
                    {trip.destination}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-green-500">
                    ₹
                    {Number(
                      trip.revenue
                    ).toLocaleString()}
                  </p>

                  <p className="text-sm text-slate-400">
                    {trip.status}
                  </p>
                </div>
              </div>
            )
          )}

          {trips?.length === 0 && (
            <p className="text-yellow-400">
              No trips found.
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}