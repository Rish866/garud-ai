import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function DashboardPage() {
  const { count: vehicleCount } = await supabase
    .from("vehicles")
    .select("*", { count: "exact", head: true });

  const { count: driverCount } = await supabase
    .from("drivers")
    .select("*", { count: "exact", head: true });

  const { count: onlineVehicles } = await supabase
    .from("vehicles")
    .select("*", { count: "exact", head: true })
    .eq("status", "Online");

  const { count: activeDrivers } = await supabase
    .from("drivers")
    .select("*", { count: "exact", head: true })
    .eq("status", "Active");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Vehicles</p>
          <h2 className="text-3xl font-bold">
            {vehicleCount || 0}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Online Vehicles</p>
          <h2 className="text-3xl font-bold text-green-500">
            {onlineVehicles || 0}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Drivers</p>
          <h2 className="text-3xl font-bold">
            {driverCount || 0}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Active Drivers</p>
          <h2 className="text-3xl font-bold text-green-500">
            {activeDrivers || 0}
          </h2>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Fleet Overview
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-400">
              Vehicle Utilization
            </p>

            <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{
                  width: `${
                    vehicleCount
                      ? ((onlineVehicles || 0) /
                          vehicleCount) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-400">
              {onlineVehicles || 0} of{" "}
              {vehicleCount || 0} vehicles online
            </p>
          </div>

          <div>
            <p className="text-slate-400">
              Driver Availability
            </p>

            <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${
                    driverCount
                      ? ((activeDrivers || 0) /
                          driverCount) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-400">
              {activeDrivers || 0} of{" "}
              {driverCount || 0} drivers active
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}