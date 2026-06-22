import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function DashboardPage() {
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  const { data: drivers } = await supabase
    .from("drivers")
    .select("*");

  const { data: customers } = await supabase
    .from("customers")
    .select("*");

  const { data: trips } = await supabase
    .from("trips")
    .select("*");

  const totalVehicles = vehicles?.length || 0;
  const totalDrivers = drivers?.length || 0;
  const totalCustomers = customers?.length || 0;
  const totalTrips = trips?.length || 0;

  const activeTrips =
    trips?.filter(
      (trip) => trip.status === "In Progress"
    ).length || 0;

  const completedTrips =
    trips?.filter(
      (trip) => trip.status === "Completed"
    ).length || 0;

  const totalRevenue =
    trips?.reduce(
      (sum, trip) =>
        sum + Number(trip.revenue || 0),
      0
    ) || 0;

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Vehicles
          </p>
          <h2 className="text-3xl font-bold">
            {totalVehicles}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Drivers
          </p>
          <h2 className="text-3xl font-bold">
            {totalDrivers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Customers
          </p>
          <h2 className="text-3xl font-bold">
            {totalCustomers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Trips
          </p>
          <h2 className="text-3xl font-bold">
            {totalTrips}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Active Trips
          </p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {activeTrips}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Completed Trips
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            {completedTrips}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-blue-500">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>
    </AppLayout>
  );
}