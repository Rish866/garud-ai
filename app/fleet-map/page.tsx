import AppLayout from "../components/AppLayout";
import FleetMapClient from "../components/FleetMapClient";
import { supabase } from "../lib/supabase";

export default async function FleetMapPage() {
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .order("vehicle_number");

  const mapVehicles =
    vehicles?.map((v: any) => ({
      id: v.id,
      name: v.driver_name,
      plate_number: v.vehicle_number,
      lat: v.latitude,
      lng: v.longitude,
      status: v.status,
      speed: 0,
    })) || [];

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-green-500 mb-8">
        🗺 Fleet GPS Map
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-slate-900 rounded-xl p-4 h-[700px] overflow-auto">

          <h2 className="text-xl font-bold mb-4">
            Vehicles
          </h2>

          <div className="space-y-3">

            {vehicles?.map((vehicle: any) => (
              <div
                key={vehicle.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <p className="font-bold text-cyan-400">
                  {vehicle.vehicle_number}
                </p>

                <p className="text-slate-400">
                  Driver: {vehicle.driver_name}
                </p>

                <p
                  className={
                    vehicle.status === "Online"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {vehicle.status}
                </p>
              </div>
            ))}

          </div>

        </div>

        <div className="lg:col-span-2 h-[700px]">
          <FleetMapClient vehicles={mapVehicles} />
        </div>

      </div>
    </AppLayout>
  );
}