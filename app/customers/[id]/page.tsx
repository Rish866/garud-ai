import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function CustomerProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (!customer) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-3xl font-bold text-red-500">
          Customer Not Found
        </h1>

        <Link
          href="/customers"
          className="text-blue-400"
        >
          Back to Customers
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Customer Profile
          </h1>

          <p className="text-slate-400 mt-2">
            Customer ID: {customer.id}
          </p>
        </div>

        <Link
          href="/customers"
          className="bg-slate-800 px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Company Information
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Company:</strong>{" "}
            {customer.company_name}
          </p>

          <p>
            <strong>Plan:</strong>{" "}
            {customer.plan}
          </p>

          <p>
            <strong>Vehicles:</strong>{" "}
            {customer.vehicles}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {customer.status}
          </p>

          <p>
            <strong>Monthly Billing:</strong> ₹
            {Number(
              customer.monthly_revenue
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Account Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-4 rounded">
            <p className="text-slate-400">
              Fleet Size
            </p>

            <h3 className="text-3xl font-bold">
              {customer.vehicles}
            </h3>
          </div>

          <div className="bg-slate-800 p-4 rounded">
            <p className="text-slate-400">
              Plan
            </p>

            <h3 className="text-3xl font-bold">
              {customer.plan}
            </h3>
          </div>

          <div className="bg-slate-800 p-4 rounded">
            <p className="text-slate-400">
              Monthly Revenue
            </p>

            <h3 className="text-3xl font-bold text-green-500">
              ₹
              {Number(
                customer.monthly_revenue
              ).toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}