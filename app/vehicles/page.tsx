import AppLayout from "../components/AppLayout";
import VehicleTable from "../components/VehicleTable";
import { supabase } from "../lib/supabase";

export default async function VehiclesPage() {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Vehicles</h1>
        <p className="mt-2 text-slate-400">
          Add, edit, delete and manage fleet vehicles.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500 bg-red-900/30 p-4">
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <VehicleTable vehicles={vehicles || []} />
    </AppLayout>
  );
}