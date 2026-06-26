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
import DashboardVehicleStatus from "../components/DashboardVehicleStatus";
import DashboardSafetyScore from "../components/DashboardSafetyScore";
import DashboardDriverLeaderboard from "../components/DashboardDriverLeaderboard";
import DashboardSystemHealth from "../components/DashboardSystemHealth";

export default async function DashboardPage() {
  const { data: vehicles } = await supabase.from("vehicles").select("*");
  const { data: drivers } = await supabase.from("drivers").select("*");
  const { data: customers } = await supabase.from("customers").select("*");

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .order("id", { ascending: false });

  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const safeDrivers = Array.isArray(drivers) ? drivers : [];
  const safeCustomers = Array.isArray(customers) ? customers : [];
  const safeTrips = Array.isArray(trips) ? trips : [];

  const totalVehicles = safeVehicles.length;
  const totalDrivers = safeDrivers.length;
  const totalCustomers = safeCustomers.length;
  const totalTrips = safeTrips.length;

  const activeVehicles = safeVehicles.filter(
    (vehicle) => (vehicle.status || "").toLowerCase() === "active"
  ).length;

  const completedTrips = safeTrips.filter(
    (trip) => (trip.status || "").toLowerCase() === "completed"
  ).length;

  const totalRevenue = safeTrips.reduce((sum, trip) => {
    const revenue = Number(trip.revenue || 0);
    return sum + revenue;
  }, 0);

  return (
    <AppLayout>
      <div className="min-h-screen bg-slate-950 p-4 text-white md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">
            GARUD AI Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Monitor. Protect. Prevent.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Vehicles"
            value={totalVehicles}
            subtitle={`${activeVehicles} active vehicles`}
            href="/vehicles"
          />

          <DashboardCard
            title="Drivers"
            value={totalDrivers}
            subtitle="Registered drivers"
            href="/drivers"
          />

          <DashboardCard
            title="Customers"
            value={totalCustomers}
            subtitle="Fleet customers"
            href="/customers"
          />

          <DashboardCard
            title="Trips"
            value={totalTrips}
            subtitle={`${completedTrips} completed`}
            href="/trips"
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DashboardLiveMap vehicles={safeVehicles} />
          </div>

          <DashboardSafetyScore
            vehicles={safeVehicles}
            drivers={safeDrivers}
            trips={safeTrips}
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <DashboardVehicleStatus vehicles={safeVehicles} />

          <DashboardFleetHealth vehicles={safeVehicles} />

          <DashboardSystemHealth />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <DashboardDriverLeaderboard
            drivers={safeDrivers}
            trips={safeTrips}
          />

          <DashboardAIStatus />

          <DashboardAlerts />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DashboardRecentTrips
              trips={safeTrips}
              customers={safeCustomers}
              vehicles={safeVehicles}
              drivers={safeDrivers}
            />
          </div>

          <DashboardRevenue totalRevenue={totalRevenue} trips={safeTrips} />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <DashboardQuickActions />

          <div className="xl:col-span-2">
            <DashboardCameraEvents />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}