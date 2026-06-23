import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function TripExpensesPage() {
const { data: expenses } = await supabase
.from("trip_expenses")
.select(`       *,
      trips(
        origin,
        destination
      )
    `)
.order("id", {
ascending: false,
});

const totalFuel =
expenses?.reduce(
(sum: number, expense: any) =>
sum +
Number(expense.fuel_cost || 0),
0
) || 0;

const totalToll =
expenses?.reduce(
(sum: number, expense: any) =>
sum +
Number(expense.toll_cost || 0),
0
) || 0;

const totalDriver =
expenses?.reduce(
(sum: number, expense: any) =>
sum +
Number(expense.driver_cost || 0),
0
) || 0;

const totalMaintenance =
expenses?.reduce(
(sum: number, expense: any) =>
sum +
Number(
expense.maintenance_cost || 0
),
0
) || 0;

const totalExpenses =
totalFuel +
totalToll +
totalDriver +
totalMaintenance;

return ( <main className="min-h-screen bg-slate-950 text-white p-6"> <div className="flex justify-between items-center mb-8"> <div> <h1 className="text-4xl font-bold text-blue-500">
Trip Expenses </h1>

      <p className="text-slate-400 mt-2">
        Manage trip costs
      </p>
    </div>

    <Link
      href="/trip-expenses/add"
      className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
    >
      + Add Expense
    </Link>
  </div>

  <div className="grid md:grid-cols-5 gap-4 mb-8">
    <div className="bg-slate-900 p-4 rounded-xl">
      <p className="text-slate-400">Fuel</p>
      <h2 className="text-xl font-bold text-red-500">
        ₹{totalFuel.toLocaleString()}
      </h2>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl">
      <p className="text-slate-400">Toll</p>
      <h2 className="text-xl font-bold text-yellow-500">
        ₹{totalToll.toLocaleString()}
      </h2>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl">
      <p className="text-slate-400">Driver</p>
      <h2 className="text-xl font-bold text-blue-500">
        ₹{totalDriver.toLocaleString()}
      </h2>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl">
      <p className="text-slate-400">
        Maintenance
      </p>
      <h2 className="text-xl font-bold text-purple-500">
        ₹{totalMaintenance.toLocaleString()}
      </h2>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl">
      <p className="text-slate-400">Total</p>
      <h2 className="text-xl font-bold text-green-500">
        ₹{totalExpenses.toLocaleString()}
      </h2>
    </div>
  </div>
</main>

);
}
