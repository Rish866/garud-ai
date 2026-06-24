import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function FuelPage() {
  const { data: logs } = await supabase
    .from("fuel_logs")
    .select(`
      *,
      vehicles(vehicle_number)
    `)
    .order("fuel_date", {
      ascending: false,
    });

  const totalFuel =
    logs?.reduce(
      (sum: number, log: any) =>
        sum + Number(log.amount || 0),
      0
    ) || 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-500">
          Fuel Management
        </h1>

        <Link
          href="/fuel/add"
          className="bg-blue-600 px-5 py-3 rounded"
        >
          + Add Fuel Entry
        </Link>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl mb-6">
        <p>Total Fuel Expense</p>

        <h2 className="text-3xl font-bold text-red-500">
          ₹{totalFuel.toLocaleString()}
        </h2>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3">
                Vehicle
              </th>

              <th className="text-left py-3">
                Date
              </th>

              <th className="text-left py-3">
                Liters
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Odometer
              </th>

              <th className="text-left py-3">
                Station
              </th>
            </tr>
          </thead>

          <tbody>
            {logs?.map((log: any) => (
              <tr
                key={log.id}
                className="border-t border-slate-800"
              >
                <td className="py-3">
                  {
                    log.vehicles
                      ?.vehicle_number
                  }
                </td>

                <td>
                  {log.fuel_date}
                </td>

                <td>
                  {log.liters}
                </td>

                <td>
                  ₹
                  {Number(
                    log.amount
                  ).toLocaleString()}
                </td>

                <td>
                  {log.odometer}
                </td>

                <td>
                  {log.fuel_station}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}