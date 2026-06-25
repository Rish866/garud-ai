import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

import DashboardCard from "../components/DashboardCard";
import DashboardQuickActions from "../components/DashboardQuickActions";
import DashboardAlerts from "../components/DashboardAlerts";
import DashboardRecentTrips from "../components/DashboardRecentTrips";
import DashboardFleetHealth from "../components/DashboardFleetHealth";
import DashboardRevenue from "../components/DashboardRevenue";
import DashboardAIStatus from "../components/DashboardAIStatus";
import DashboardCameraEvents from "../components/DashboardCameraEvents";
import DashboardLiveMap from "../components/DashboardLiveMap";

export default async function DashboardPage() {
  const { data: vehicles } = await supabase.from("vehicles").select("*");
  const { data: drivers } = await supabase.from("drivers").select("*");
  const { data: customers } = await supabase.from("customers").select("*");

  const { data: trips } = await supabase
    .from("trips")
    .select(
      `
      *,
      customers(company_name),
      vehicles(vehicle_number),
      drivers(name)
    `
    )
    .order("id", { ascending: false });

  const totalVehicles = vehicles?.length || 0;
  const totalDrivers = drivers?.length || 0;
  const totalCustomers = customers?.length || 0;
  const totalTrips = trips?.length || 0;

  const activeVehicles =
    vehicles?.filter((vehicle) => vehicle.status === "Active").length || 0;

  const inactiveVehicles =
    vehicles?.filter((vehicle) => vehicle.status !== "Active").length || 0;

  const completedTrips =
    trips?.filter((trip) => trip.status === "Completed").length || 0;

  const inProgressTrips =
    trips?.filter((trip) => trip.status === "In Progress").length || 0;

  const pendingTrips =
    trips?.filter((trip) => trip.status === "Pending").length || 0;

  const totalRevenue =
    trips?.reduce((sum, trip) => {
      return sum + Number(trip.revenue || 0);
    }, 0) || 0;

  const recentTrips = trips?.slice(0, 5) || [];

  const alerts = [
    {
      title: "AI Fatigue Alert",
      message: "Driver attention monitoring is active.",
      type: "warning",
    },
    {
      title: "Fleet Sync",
      message: "Live vehicle tracking is connected.",
      type: "success",
    },
    {
      title: "Trip Monitoring",
      message: `${inProgressTrips} trip currently in progress.`,
      type: "info",
    },
  ];

  const cameraEvents = [
    {
      id: 1,
      vehicle: "MH04XY5678",
      driver: "Rajesh",
      event: "Driver Fatigue Detected",
      severity: "High" as const,
      time: "10 mins ago",
    },
    {
      id: 2,
      vehicle: "MH12PQ7890",
      driver: "Amit",
      event: "Mobile Phone Usage",
      severity: "Medium" as const,
      time: "25 mins ago",
    },
    {
      id: 3,
      vehicle: "MH04XY5678",
      driver: "Rajesh",
      event: "Harsh Braking",
      severity: "Low" as const,
      time: "1 hour ago",
    },
  ];

  return (
    <AppLayout>
      <main className="min-h-screen bg-slate-950 p-6 text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">GARUD AI Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Monitor fleet activity, driver safety, revenue, and AI alerts.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Vehicles"
            value={totalVehicles}
            subtitle={`${activeVehicles} active / ${inactiveVehicles} inactive`}
          />

          <DashboardCard
            title="Total Drivers"
            value={totalDrivers}
            subtitle="Registered drivers"
          />

          <DashboardCard
            title="Customers"
            value={totalCustomers}
            subtitle="Fleet customers"
          />

          <DashboardCard
            title="Trips"
            value={totalTrips}
            subtitle={`${completedTrips} completed / ${pendingTrips} pending`}
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DashboardRevenue
              totalRevenue={totalRevenue}
              completedTrips={completedTrips}
              inProgressTrips={inProgressTrips}
              pendingTrips={pendingTrips}
            />
          </div>

          <DashboardQuickActions />
        </section>

        <section className="mt-8">
          <DashboardLiveMap vehicles={vehicles || []} />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <DashboardAIStatus />

          <DashboardFleetHealth
  totalVehicles={totalVehicles}
  activeVehicles={activeVehicles}
  totalDrivers={totalDrivers}
  totalCustomers={totalCustomers}
  totalTrips={totalTrips}
/>

          <DashboardAlerts alerts={alerts} />
        </section>

        <section className="mt-8">
          <DashboardCameraEvents events={cameraEvents} />
        </section>

        <section className="mt-8">
          <DashboardRecentTrips trips={recentTrips} />
        </section>
      </main>
    </AppLayout>
  );
}