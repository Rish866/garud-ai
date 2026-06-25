import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { supabase } from "../../lib/supabase";

export default async function TripProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tripId = Number(id);

  if (!tripId) {
    return (
      <AppLayout>
        <ErrorCard message="Invalid trip ID." />
      </AppLayout>
    );
  }

  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .maybeSingle();

  if (tripError || !trip) {
    return (
      <AppLayout>
        <ErrorCard message={`Trip ID ${tripId} not found.`} />
      </AppLayout>
    );
  }

  const { data: customer } = trip.customer_id
    ? await supabase
        .from("customers")
        .select("*")
        .eq("id", trip.customer_id)
        .maybeSingle()
    : { data: null };

  const { data: vehicle } = trip.vehicle_id
    ? await supabase
        .from("vehicles")
        .select("*")
        .eq("id", trip.vehicle_id)
        .maybeSingle()
    : { data: null };

  const { data: driver } = trip.driver_id
    ? await supabase
        .from("drivers")
        .select("*")
        .eq("id", trip.driver_id)
        .maybeSingle()
    : { data: null };

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:flex-row md:items-center">
          <div>
            <Link href="/trips" className="text-sm text-blue-400">
              ← Back to Trips
            </Link>

            <h1 className="mt-3 text-4xl font-bold text-white">
              Trip #{trip.id}
            </h1>

            <p className="mt-2 text-slate-400">
              {trip.origin || "-"} → {trip.destination || "-"}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
              trip.status === "Completed"
                ? "bg-green-500/10 text-green-400"
                : trip.status === "In Progress"
                ? "bg-blue-500/10 text-blue-400"
                : trip.status === "Cancelled"
                ? "bg-red-500/10 text-red-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {trip.status || "Pending"}
          </span>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <StatCard title="Revenue" value={`₹${Number(trip.revenue || 0).toLocaleString()}`} color="text-green-400" />
          <StatCard title="Customer" value={customer?.company_name || "-"} />
          <StatCard title="Vehicle" value={vehicle?.vehicle_number || "-"} />
          <StatCard title="Driver" value={driver?.name || "-"} />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
            <h2 className="text-2xl font-bold">Trip Overview</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Trip ID" value={trip.id} />
              <Info label="Origin" value={trip.origin || "-"} />
              <Info label="Destination" value={trip.destination || "-"} />
              <Info label="Revenue" value={`₹${Number(trip.revenue || 0).toLocaleString()}`} />
              <Info label="Status" value={trip.status || "Pending"} />
              <Info label="Created At" value={trip.created_at || "-"} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Linked Records</h2>

            <div className="mt-6 space-y-3">
              {customer ? (
                <Link
                  href={`/customers/${customer.id}`}
                  className="block rounded-xl border border-slate-700 px-5 py-3 hover:bg-slate-800"
                >
                  Customer: <span className="text-blue-400">{customer.company_name}</span>
                </Link>
              ) : (
                <EmptyLink label="Customer not assigned" />
              )}

              {vehicle ? (
                <Link
                  href={`/vehicles/${vehicle.id}`}
                  className="block rounded-xl border border-slate-700 px-5 py-3 hover:bg-slate-800"
                >
                  Vehicle: <span className="text-blue-400">{vehicle.vehicle_number}</span>
                </Link>
              ) : (
                <EmptyLink label="Vehicle not assigned" />
              )}

              {driver ? (
                <Link
                  href={`/drivers/${driver.id}`}
                  className="block rounded-xl border border-slate-700 px-5 py-3 hover:bg-slate-800"
                >
                  Driver: <span className="text-blue-400">{driver.name}</span>
                </Link>
              ) : (
                <EmptyLink label="Driver not assigned" />
              )}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-500 bg-red-900/30 p-6">
      <h1 className="text-2xl font-bold text-red-400">Trip not found</h1>
      <p className="mt-2 text-slate-300">{message}</p>

      <Link
        href="/trips"
        className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
      >
        Back to Trips
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
      <h2 className={`mt-3 text-xl font-black ${color}`}>{value}</h2>
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

function EmptyLink({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-slate-500">
      {label}
    </div>
  );
}