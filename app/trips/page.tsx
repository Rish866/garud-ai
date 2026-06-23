import Link from "next/link";
import { supabase } from "../lib/supabase";
import TripTable from "../components/TripTable";

export default async function TripsPage() {
  const { data: trips, error } = await supabase
    .from("trips")
    .select(`
      *,
      customers(company_name),
      vehicles(vehicle_number),
      drivers(name)
    `)
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Trips
          </h1>

          <p className="text-slate-400 mt-2">
            Manage transport trips
          </p>
        </div>

        <Link
          href="/trips/add"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
        >
          + Add Trip
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
        <TripTable trips={trips || []} />
      </div>
    </main>
  );
}