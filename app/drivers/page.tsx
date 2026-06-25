import AppLayout from "../components/AppLayout";
import DriverTable from "../components/DriverTable";
import { supabase } from "../lib/supabase";

export default async function DriversPage() {
  const { data: drivers, error: driversError } = await supabase
    .from("drivers")
    .select("*");

  const { data: vehicles, error: vehiclesError } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Drivers</h1>
        <p className="mt-2 text-slate-400">
          Add, edit, delete and assign drivers to vehicles.
        </p>
      </div>

      {(driversError || vehiclesError) && (
        <div className="mb-6 rounded-xl border border-red-500 bg-red-900/30 p-4">
          <pre>
            {JSON.stringify(driversError || vehiclesError, null, 2)}
          </pre>
        </div>
      )}

      <DriverTable drivers={drivers || []} vehicles={vehicles || []} />
    </AppLayout>
  );
}