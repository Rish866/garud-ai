import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function VehicleRiskPage() {

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  const { data: safetyEvents } = await supabase
    .from("safety_events")
    .select("*");

  const vehicleRiskData =
    vehicles?.map((vehicle: any) => {

      const vehicleEvents =
        safetyEvents?.filter(
          (event: any) =>
            event.vehicle_id === vehicle.id
        ) || [];

      const totalEvents =
        vehicleEvents.length;

      let riskLevel = "Safe";

      if (totalEvents >= 2) {
        riskLevel = "High";
      } else if (totalEvents === 1) {
        riskLevel = "Medium";
      }

      return {
        ...vehicle,
        totalEvents,
        riskLevel,
      };

    }) || [];

  const sortedVehicles =
    vehicleRiskData.sort(
      (a: any, b: any) =>
        b.totalEvents - a.totalEvents
    );

  return (
    <AppLayout>

      <h1 className="text-4xl font-bold text-red-500 mb-8">
        🚗 Top Risk Vehicles
      </h1>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Vehicle Risk Ranking
        </h2>

        <div className="space-y-4">

          {sortedVehicles.map(
            (vehicle: any) => (

              <div
                key={vehicle.id}
                className="border border-slate-700 rounded-lg p-4 flex justify-between items-center"
              >

                <div>
                  <h3 className="text-xl font-bold">
                    {vehicle.vehicle_number}
                  </h3>

                  <p className="text-slate-400">
                    Total Events:
                    {" "}
                    {vehicle.totalEvents}
                  </p>
                </div>

                <div>

                  {vehicle.riskLevel ===
                  "High" ? (
                    <span className="bg-red-600 px-4 py-2 rounded-lg">
                      🔴 HIGH RISK
                    </span>
                  ) : vehicle.riskLevel ===
                    "Medium" ? (
                    <span className="bg-yellow-600 px-4 py-2 rounded-lg">
                      🟡 MEDIUM
                    </span>
                  ) : (
                    <span className="bg-green-600 px-4 py-2 rounded-lg">
                      🟢 SAFE
                    </span>
                  )}

                </div>

              </div>

            )
          )}

          {sortedVehicles.length === 0 && (
            <p className="text-yellow-400">
              No vehicles found.
            </p>
          )}

        </div>

      </div>

    </AppLayout>
  );
}