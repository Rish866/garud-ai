import AppLayout from "../components/AppLayout";
import TripTable from "../components/TripTable";
import { supabase } from "../lib/supabase";

export default async function TripsPage() {
  const { data: trips, error: tripsError } = await supabase
    .from("trips")
    .select("*")
    .order("id", { ascending: false });

  const { data: customers, error: customersError } = await supabase
    .from("customers")
    .select("*")
    .order("id", { ascending: true });

  const { data: vehicles, error: vehiclesError } = await supabase
    .from("vehicles")
    .select("*")
    .order("id", { ascending: true });

  const { data: drivers, error: driversError } = await supabase
    .from("drivers")
    .select("*")
    .order("id", { ascending: true });

  const error = tripsError || customersError || vehiclesError || driversError;

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Trips</h1>
        <p className="mt-2 text-slate-400">
          Add, edit, delete and manage transport trips.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500 bg-red-900/30 p-4">
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <TripTable
        trips={trips || []}
        customers={customers || []}
        vehicles={vehicles || []}
        drivers={drivers || []}
      />
    </AppLayout>
  );
}