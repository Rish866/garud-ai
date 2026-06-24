import { supabase } from "../../lib/supabase";
import AddDriverSalaryForm from "../../components/AddDriverSalaryForm";

export default async function AddDriverSalaryPage() {
  const { data: drivers } =
    await supabase
      .from("drivers")
      .select("*");

  const { data: vehicles } =
    await supabase
      .from("vehicles")
      .select("*");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">
        Add Driver Salary
      </h1>

      <AddDriverSalaryForm
        drivers={drivers || []}
        vehicles={vehicles || []}
      />
    </main>
  );
}