import AppLayout from "../components/AppLayout";
import VehicleTable from "../components/VehicleTable";
import { supabase } from "../lib/supabase";

export default async function VehiclesPage() {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Vehicles
      </h1>

      {error && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg mb-6">
          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-slate-900 rounded-xl p-6">
        <VehicleTable vehicles={vehicles || []} />
      </div>
    </AppLayout>
  );
}