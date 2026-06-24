import { supabase } from "../lib/supabase";

export default async function VehicleProfitPage() {
  const { data: vehicles } =
    await supabase
      .from("vehicles")
      .select("*");

  const { data: trips } =
    await supabase
      .from("trips")
      .select("*");

  const { data: expenses } =
    await supabase
      .from("trip_expenses")
      .select("*");

  const { data: salaries } =
    await supabase
      .from("driver_salary")
      .select("*");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-green-500 mb-6">
        Vehicle Profitability
      </h1>

      <div className="grid gap-6">
        {vehicles?.map(
          (vehicle: any) => {
            const vehicleTrips =
              trips?.filter(
                (trip: any) =>
                  trip.vehicle_id ===
                  vehicle.id
              ) || [];

            const revenue =
              vehicleTrips.reduce(
                (
                  sum: number,
                  trip: any
                ) =>
                  sum +
                  Number(
                    trip.revenue || 0
                  ),
                0
              );

            const tripIds =
              vehicleTrips.map(
                (trip: any) =>
                  trip.id
              );

            const tripExpense =
              expenses
                ?.filter(
                  (expense: any) =>
                    tripIds.includes(
                      expense.trip_id
                    )
                )
                .reduce(
                  (
                    sum: number,
                    expense: any
                  ) =>
                    sum +
                    Number(
                      expense.fuel_cost ||
                        0
                    ) +
                    Number(
                      expense.toll_cost ||
                        0
                    ) +
                    Number(
                      expense.driver_cost ||
                        0
                    ) +
                    Number(
                      expense.maintenance_cost ||
                        0
                    ),
                  0
                ) || 0;

            const salary =
              salaries
                ?.filter(
                  (salary: any) =>
                    salary.vehicle_id ===
                    vehicle.id
                )
                .reduce(
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

            const profit =
              revenue -
              tripExpense -
              salary;

            return (
              <div
                key={vehicle.id}
                className="bg-slate-900 p-6 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {
                    vehicle.vehicle_number
                  }
                </h2>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-slate-400">
                      Revenue
                    </p>

                    <h3 className="text-green-500 text-xl font-bold">
                      ₹
                      {revenue.toLocaleString()}
                    </h3>
                  </div>

                  <div>
                    <p className="text-slate-400">
                      Expenses
                    </p>

                    <h3 className="text-red-500 text-xl font-bold">
                      ₹
                      {tripExpense.toLocaleString()}
                    </h3>
                  </div>

                  <div>
                    <p className="text-slate-400">
                      Driver Salary
                    </p>

                    <h3 className="text-yellow-500 text-xl font-bold">
                      ₹
                      {salary.toLocaleString()}
                    </h3>
                  </div>

                  <div>
                    <p className="text-slate-400">
                      Profit
                    </p>

                    <h3
                      className={`text-xl font-bold ${
                        profit >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      ₹
                      {profit.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </main>
  );
}