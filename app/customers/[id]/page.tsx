import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import { supabase } from "../../lib/supabase";

export default async function CustomerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customerId = Number(id);

  if (!customerId) {
    return (
      <AppLayout>
        <ErrorCard message="Invalid customer ID." />
      </AppLayout>
    );
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .maybeSingle();

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("customer_id", customerId)
    .order("id", { ascending: false });

  if (customerError || !customer) {
    return (
      <AppLayout>
        <ErrorCard message={`Customer ID ${customerId} not found.`} />
      </AppLayout>
    );
  }

  const totalTrips = trips?.length || 0;
  const completedTrips =
    trips?.filter((trip) => trip.status === "Completed").length || 0;
  const tripRevenue =
    trips?.reduce((sum, trip) => sum + Number(trip.revenue || 0), 0) || 0;

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <Link href="/customers" className="text-sm text-blue-400">
            ← Back to Customers
          </Link>

          <h1 className="mt-3 text-4xl font-bold text-white">
            {customer.company_name}
          </h1>

          <p className="mt-2 text-slate-400">
            Customer profile, subscription, revenue and trip history.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <StatCard title="Plan" value={customer.plan || "-"} />
          <StatCard title="Vehicles" value={customer.vehicles || 0} />
          <StatCard
            title="Monthly Revenue"
            value={`₹${Number(customer.monthly_revenue || 0).toLocaleString()}`}
            color="text-green-400"
          />
          <StatCard title="Trips" value={totalTrips} color="text-blue-400" />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
            <h2 className="text-2xl font-bold">Customer Overview</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Info label="Database ID" value={customer.id} />
              <Info label="Company Name" value={customer.company_name || "-"} />
              <Info label="Plan" value={customer.plan || "-"} />
              <Info label="Vehicles" value={customer.vehicles || 0} />
              <Info
                label="Monthly Revenue"
                value={`₹${Number(customer.monthly_revenue || 0).toLocaleString()}`}
              />
              <Info label="Status" value={customer.status || "-"} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Quick Actions</h2>

            <div className="mt-6 space-y-3">
              <Link
                href="/trips"
                className="block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold hover:bg-blue-500"
              >
                Manage Trips
              </Link>

              <Link
                href="/invoices"
                className="block rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold hover:bg-slate-800"
              >
                View Invoices
              </Link>

              <Link
                href="/receivables"
                className="block rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold hover:bg-slate-800"
              >
                View Receivables
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Trip Summary</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Info label="Total Trips" value={totalTrips} />
            <Info label="Completed Trips" value={completedTrips} />
            <Info
              label="Trip Revenue"
              value={`₹${tripRevenue.toLocaleString()}`}
            />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-500 bg-red-900/30 p-6">
      <h1 className="text-2xl font-bold text-red-400">Customer not found</h1>
      <p className="mt-2 text-slate-300">{message}</p>

      <Link
        href="/customers"
        className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
      >
        Back to Customers
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