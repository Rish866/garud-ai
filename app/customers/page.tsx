import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function CustomersPage() {
  const { data: customers } = await supabase
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

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Customers</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalCustomers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Vehicles</p>
          <h2 className="text-3xl font-bold mt-2">
            {totalVehicles}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Monthly Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-green-500">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Active Plans</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-500">
            {activePlans}
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Customer List
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-4">Customer</th>
              <th className="text-left py-4">Vehicles</th>
              <th className="text-left py-4">Plan</th>
              <th className="text-left py-4">Revenue</th>
              <th className="text-left py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {customers?.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >
                <td className="py-4 font-medium">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {customer.company_name}
                  </Link>
                </td>

                <td>{customer.vehicles}</td>

                <td>
                  <span className="bg-blue-900/40 px-3 py-1 rounded">
                    {customer.plan}
                  </span>
                </td>

                <td className="text-green-500 font-semibold">
                  ₹
                  {Number(
                    customer.monthly_revenue
                  ).toLocaleString()}
                </td>

                <td>
                  <span
                    className={
                      customer.status === "Active"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}