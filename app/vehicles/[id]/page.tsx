import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { supabase } from "../../lib/supabase";

export default async function VehicleProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicleId = Number(id);

  if (!vehicleId) {
    return (
      <AppLayout>
        <ErrorCard message="Invalid vehicle ID." />
      </AppLayout>
    );
  }

  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .maybeSingle();

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("vehicle_id", vehicleId)
    .order("id", { ascending: false });

  if (vehicleError || !vehicle) {
    return (
      <AppLayout>
        <ErrorCard message={`Vehicle ID ${vehicleId} not found.`} />
      </AppLayout>
    );
  }

  const totalTrips = trips?.length || 0;
  const completedTrips =
    trips?.filter((trip) => trip.status === "Completed").length || 0;
  const totalRevenue =
    trips?.reduce((sum, trip) => sum + Number(trip.revenue || 0), 0) || 0;

  const hasGps = Boolean(vehicle.latitude && vehicle.longitude);

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:flex-row md:items-center">
          <div>
            <Link href="/vehicles" className="text-sm text-blue-400">
              ← Back to Vehicles
            </Link>

            <h1 className="mt-3 text-4xl font-bold text-white">
              {vehicle.vehicle_number}
            </h1>

            <p className="mt-2 text-slate-400">
              Vehicle profile, GPS, trips, revenue and operational history.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            {vehicle.status || "Active"}
          </span>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <StatCard title="Total Trips" value={totalTrips} />
          <StatCard title="Completed Trips" value={completedTrips} color="text-green-400" />
          <StatCard title="Trip Revenue" value={`₹${totalRevenue.toLocaleString()}`} color="text-green-400" />
          <StatCard
            title="GPS Status"
            value={hasGps ? "Online" : "Missing"}
            color={hasGps ? "text-green-400" : "text-yellow-400"}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
            <h2 className="text-2xl font-bold">Vehicle Overview</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Database ID" value={vehicle.id} />
              <Info label="Vehicle Number" value={vehicle.vehicle_number || "-"} />
              <Info label="Driver Name" value={vehicle.driver_name || "-"} />
              <Info label="Make" value={vehicle.make || "-"} />
              <Info label="Model" value={vehicle.model || "-"} />
              <Info label="Latitude" value={vehicle.latitude || "-"} />
              <Info label="Longitude" value={vehicle.longitude || "-"} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Quick Actions</h2>

            <div className="mt-6 space-y-3">
              <Link
                href={`/live?vehicle=${encodeURIComponent(vehicle.vehicle_number)}`}
                className="block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold hover:bg-blue-500"
              >
                View Live Camera
              </Link>

              <Link
                href="/fleet-map"
                className="block rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold hover:bg-slate-800"
              >
                Open Fleet Map
              </Link>

              <Link
                href="/trips"
                className="block rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold hover:bg-slate-800"
              >
                Manage Trips
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Trip History</h2>
          <p className="mt-1 text-slate-400">Trips linked to this vehicle.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="text-slate-400">
                <tr className="border-b border-slate-800">
                  <th className="pb-3">Origin</th>
                  <th className="pb-3">Destination</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {(trips || []).map((trip) => (
                  <tr key={trip.id} className="border-b border-slate-800 last:border-0">
                    <td className="py-4 font-semibold">{trip.origin || "-"}</td>
                    <td className="py-4 text-slate-300">{trip.destination || "-"}</td>
                    <td className="py-4 text-green-400">
                      ₹{Number(trip.revenue || 0).toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                        {trip.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}

                {totalTrips === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      No trips found for this vehicle.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-500 bg-red-900/30 p-6">
      <h1 className="text-2xl font-bold text-red-400">Vehicle not found</h1>
      <p className="mt-2 text-slate-300">{message}</p>

      <Link
        href="/vehicles"
        className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
      >
        Back to Vehicles
      </Link>
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "text-white",
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className={`mt-3 text-3xl font-black ${color}`}>{value}</h2>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  );
}