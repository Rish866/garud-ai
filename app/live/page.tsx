import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function LiveMonitoringPage() {
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .order("vehicle_number");

  const selectedVehicle =
    vehicles && vehicles.length > 0
      ? vehicles[0]
      : null;

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        🎥 Live Monitoring Center
      </h1>

      {selectedVehicle && (
        <div className="bg-slate-900 rounded-xl p-6 mb-8">

          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">
                {selectedVehicle.vehicle_number}
              </h2>

              <p className="text-slate-400 mt-2">
                Driver: {selectedVehicle.driver_name}
              </p>
            </div>

            <div>
              <span
                className={`px-4 py-2 rounded-lg font-bold ${
                  selectedVehicle.status === "Online"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {selectedVehicle.status}
              </span>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-slate-400">
                Latitude
              </p>

              <p className="text-xl font-bold">
                {selectedVehicle.latitude}
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-slate-400">
                Longitude
              </p>

              <p className="text-xl font-bold">
                {selectedVehicle.longitude}
              </p>
            </div>

          </div>

        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 1 - Road View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            🎥 Live Feed
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 2 - Driver View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            🎥 Live Feed
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 3 - Cabin View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            🎥 Live Feed
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 4 - Rear View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            🎥 Live Feed
          </div>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          🚨 Live AI Alerts
        </h2>

        <div className="space-y-3">

          <div className="bg-red-900/30 p-4 rounded-lg">
            🔴 Driver using mobile phone detected
          </div>

          <div className="bg-yellow-900/30 p-4 rounded-lg">
            🟠 Driver fatigue detected
          </div>

          <div className="bg-orange-900/30 p-4 rounded-lg">
            🟡 Harsh braking event detected
          </div>

        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Vehicle List
        </h2>

        <div className="space-y-3">

          {vehicles?.map((vehicle: any) => (
            <div
              key={vehicle.id}
              className="flex justify-between bg-slate-800 p-4 rounded-lg"
            >
              <div>
                <p className="font-bold">
                  {vehicle.vehicle_number}
                </p>

                <p className="text-slate-400">
                  {vehicle.driver_name}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded ${
                  vehicle.status === "Online"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {vehicle.status}
              </span>
            </div>
          ))}

        </div>

      </div>

    </AppLayout>
  );
}