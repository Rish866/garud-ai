import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function SafetyCenterPage() {
  const { data: events } = await supabase
    .from("safety_events")
    .select("*");

  const { data: drivers } = await supabase
    .from("drivers")
    .select("*");

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  const { data: clips } = await supabase
    .from("incident_clips")
    .select("*");

  const totalEvents =
    events?.length || 0;

  const criticalEvents =
    events?.filter(
      (e: any) =>
        e.severity === "Critical"
    ).length || 0;

  const highEvents =
    events?.filter(
      (e: any) =>
        e.severity === "High"
    ).length || 0;

  const mediumEvents =
    events?.filter(
      (e: any) =>
        e.severity === "Medium"
    ).length || 0;

  const totalDrivers =
    drivers?.length || 0;

  const totalVehicles =
    vehicles?.length || 0;

  const totalClips =
    clips?.length || 0;

  const driverEventMap: any = {};

  events?.forEach((event: any) => {
    if (!driverEventMap[event.driver_id]) {
      driverEventMap[event.driver_id] = 0;
    }

    driverEventMap[event.driver_id]++;
  });

  const worstDriverId =
    Object.keys(driverEventMap).sort(
      (a, b) =>
        driverEventMap[b] -
        driverEventMap[a]
    )[0];

  const worstDriver =
    drivers?.find(
      (d: any) =>
        d.id === Number(worstDriverId)
    );

  const vehicleEventMap: any = {};

  events?.forEach((event: any) => {
    if (!vehicleEventMap[event.vehicle_id]) {
      vehicleEventMap[event.vehicle_id] = 0;
    }

    vehicleEventMap[event.vehicle_id]++;
  });

  const worstVehicleId =
    Object.keys(vehicleEventMap).sort(
      (a, b) =>
        vehicleEventMap[b] -
        vehicleEventMap[a]
    )[0];

  const worstVehicle =
    vehicles?.find(
      (v: any) =>
        v.id === Number(worstVehicleId)
    );

  return (
    <AppLayout>

      <h1 className="text-4xl font-bold text-red-500 mb-8">
        🖥️ Fleet Safety Command Center
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Events
          </p>

          <h2 className="text-4xl font-bold text-yellow-400">
            {totalEvents}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Critical Events
          </p>

          <h2 className="text-4xl font-bold text-red-500">
            {criticalEvents}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            High Events
          </p>

          <h2 className="text-4xl font-bold text-orange-500">
            {highEvents}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Medium Events
          </p>

          <h2 className="text-4xl font-bold text-yellow-500">
            {mediumEvents}
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Drivers
          </p>

          <h2 className="text-4xl font-bold text-blue-500">
            {totalDrivers}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Vehicles
          </p>

          <h2 className="text-4xl font-bold text-green-500">
            {totalVehicles}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Incident Clips
          </p>

          <h2 className="text-4xl font-bold text-purple-500">
            {totalClips}
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">

          <h2 className="text-2xl font-bold mb-4 text-red-400">
            🚨 Worst Driver
          </h2>

          {worstDriver ? (
            <>
              <p className="text-2xl font-bold">
                {worstDriver.name}
              </p>

              <p className="text-slate-400">
                Total Events:{" "}
                {
                  driverEventMap[
                    worstDriver.id
                  ]
                }
              </p>
            </>
          ) : (
            <p>No data</p>
          )}

        </div>

        <div className="bg-slate-900 p-6 rounded-xl">

          <h2 className="text-2xl font-bold mb-4 text-orange-400">
            🚛 Worst Vehicle
          </h2>

          {worstVehicle ? (
            <>
              <p className="text-2xl font-bold text-orange-400">
                {
                  worstVehicle.vehicle_number
                }
              </p>

              <p className="text-slate-400">
                Total Events:{" "}
                {
                  vehicleEventMap[
                    worstVehicle.id
                  ]
                }
              </p>
            </>
          ) : (
            <p>No data</p>
          )}

        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-6">
          Recent Safety Events
        </h2>

        <div className="space-y-4">

          {events?.map(
            (event: any) => {
              const driver =
                drivers?.find(
                  (d: any) =>
                    d.id ===
                    event.driver_id
                );

              const vehicle =
                vehicles?.find(
                  (v: any) =>
                    v.id ===
                    event.vehicle_id
                );

              return (
                <div
                  key={event.id}
                  className="flex justify-between border-b border-slate-800 pb-3"
                >
                  <div>

                    <p className="font-bold">
                      {event.event_type}
                    </p>

                    <p className="text-slate-400 text-sm">
                      Driver:{" "}
                      {driver?.name ||
                        "Unknown"}
                    </p>

                    <p className="text-slate-500 text-sm">
                      Vehicle:{" "}
                      {vehicle?.vehicle_number ||
                        "Unknown"}
                    </p>

                  </div>

                  <div>

                    <span className="text-red-400">
                      {event.severity}
                    </span>

                  </div>
                </div>
              );
            }
          )}

        </div>

      </div>

    </AppLayout>
  );
}