import AddMaintenanceForm from "../../components/AddMaintenanceForm";
import { supabase } from "../../lib/supabase";

export default async function AddMaintenancePage() {
  const { data: vehicles } =
    await supabase
      .from("vehicles")
      .select("*")
      .order("id");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Add Maintenance Record
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl">
        <AddMaintenanceForm
          vehicles={vehicles || []}
        />
      </div>
    </main>
  );
}