import Link from "next/link";
import AppLayout from "../components/AppLayout";
import DriverTable from "../components/DriverTable";
import { supabase } from "../lib/supabase";

export default async function DriversPage() {
  const { data: drivers, error } = await supabase
    .from("drivers")
    .select(`
      *,
      vehicles!drivers_vehicle_id_fkey (
        vehicle_number
      )
    `);

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">
          Drivers
        </h1>

        <Link
          href="/drivers/add"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Add Driver
        </Link>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg mb-6">
          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-slate-900 rounded-xl p-6">
        <DriverTable
          drivers={drivers || []}
        />
      </div>
    </AppLayout>
  );
}