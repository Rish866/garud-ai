import { supabase } from "../../lib/supabase";
import AddPaymentForm from "../../components/AddPaymentForm";

export default async function AddPaymentPage() {
  const { data: invoices } =
    await supabase
      .from("invoices")
      .select("*")
      .order("id");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">
        Add Payment
      </h1>

      <AddPaymentForm
        invoices={invoices || []}
      />
    </main>
  );
}