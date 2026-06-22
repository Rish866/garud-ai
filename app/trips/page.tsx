import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function TripsPage() {
  const { data: trips, error } = await supabase
    .from("trips")
    .select("*")
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
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <div className="bg-slate-900 rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">ID</th>
              <th className="text-left py-3">Origin</th>
              <th className="text-left py-3">Destination</th>
              <th className="text-left py-3">Revenue</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {trips?.map((trip: any) => (
              <tr
                key={trip.id}
                className="border-b border-slate-800"
              >
                <td className="py-4">{trip.id}</td>
                <td>{trip.origin}</td>
                <td>{trip.destination}</td>
                <td>
                  ₹{Number(trip.revenue).toLocaleString()}
                </td>
                <td>
                  <span
                    className={
                      trip.status === "Completed"
                        ? "text-green-500"
                        : trip.status === "In Progress"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }
                  >
                    {trip.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {trips?.length === 0 && (
          <p className="mt-4 text-yellow-400">
            No trips found.
          </p>
        )}
      </div>
    </main>
  );
}