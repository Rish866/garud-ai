import AppLayout from "../components/AppLayout";
import CustomerTable from "../components/CustomerTable";
import { supabase } from "../lib/supabase";

export default async function CustomersPage() {
  const { data: customers, error } = await supabase
    .from("customers")
    .select("*")
    .order("id", { ascending: true });

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Customers</h1>
        <p className="mt-2 text-slate-400">
          Add, edit, delete and manage customer subscriptions.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500 bg-red-900/30 p-4">
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <CustomerTable customers={customers || []} />
    </AppLayout>
  );
}