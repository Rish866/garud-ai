import FuelEntryForm from "../components/FuelEntryForm";
import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function FuelManagementPage() {
  const { data: fuelEntries } = await supabase
    .from("fuel_entries")
    .select("*")
    .order("fuel_date", {
      ascending: false,
    });

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  const totalFuel =
    fuelEntries?.reduce(
      (sum: number, item: any) =>
        sum + Number(item.litres || 0),
      0
    ) || 0;

  const totalCost =
    fuelEntries?.reduce(
      (sum: number, item: any) =>
        sum + Number(item.amount || 0),
      0
    ) || 0;

  const averageFuelPrice =
    totalFuel > 0
      ? totalCost / totalFuel
      : 0;

  return (
  <AppLayout>
    <h1 className="text-4xl font-bold text-green-500 mb-8">
      ⛽ Fuel Management
    </h1>

    <FuelEntryForm vehicles={vehicles || []} />

    <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Fuel
          </p>

          <h2 className="text-4xl font-bold text-green-400">
            {totalFuel.toFixed(0)} L
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Cost
          </p>

          <h2 className="text-4xl font-bold text-red-400">
            ₹{totalCost.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Avg Fuel Price
          </p>

          <h2 className="text-4xl font-bold text-yellow-400">
            ₹{averageFuelPrice.toFixed(2)}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Fuel Entries
        </h2>

        <div className="space-y-4">

          {fuelEntries?.map((entry: any) => {
            const vehicle =
              vehicles?.find(
                (v: any) =>
                  v.id === entry.vehicle_id
              );

            return (
              <div
                key={entry.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <p className="font-bold text-cyan-400">
                      {vehicle?.vehicle_number ||
                        `Vehicle #${entry.vehicle_id}`}
                    </p>

                    <p>
                      {entry.driver_name}
                    </p>

                    <p className="text-slate-400 text-sm">
                      {entry.fuel_station}
                    </p>
                  </div>

                  <div className="text-right">

                    <p>
                      {entry.fuel_date}
                    </p>

                    <p>
                      {entry.litres} L
                    </p>

                    <p className="font-bold text-green-400">
                      ₹{Number(
                        entry.amount
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </AppLayout>
  );
}