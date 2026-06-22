import Link from "next/link";
import { supabase } from "../lib/supabase";
import CustomerTable from "../components/CustomerTable";

export default async function CustomersPage() {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .order("id");

  const totalCustomers = customers?.length || 0;

  const totalVehicles =
    customers?.reduce(
      (sum, customer) => sum + (customer.vehicles || 0),
      0
    ) || 0;

  const totalRevenue =
    customers?.reduce(
      (sum, customer) =>
        sum + Number(customer.monthly_revenue || 0),
      0
    ) || 0;

  const activePlans =
    customers?.filter(
      (customer) => customer.status === "Active"
    ).length || 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Customer Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage fleet customers and subscriptions
          </p>
        </div>

        <Link
          href="/customers/add"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
        >
          + Add Customer
        </Link>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg mb-6">
          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Customers
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {totalCustomers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Vehicles
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {totalVehicles}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Monthly Revenue
          </p>
          <h2 className="text-3xl font-bold mt-2 text-green-500">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Active Plans
          </p>
          <h2 className="text-3xl font-bold mt-2 text-blue-500">
            {activePlans}
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Customer List
        </h2>

        <CustomerTable
          customers={customers || []}
        />
      </div>
    </main>
  );
}