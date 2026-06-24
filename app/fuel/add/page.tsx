import { supabase } from "../../lib/supabase";
import AddFuelForm from "../../components/AddFuelForm";

export default async function AddFuelPage() {
  const { data: vehicles } =
    await supabase
      .from("vehicles")
      .select("*");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">
        Add Fuel Entry
      </h1>

      <AddFuelForm
        vehicles={vehicles || []}
      />
    </main>
  );
}