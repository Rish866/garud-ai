import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function TyreManagementPage() {
  const { data: tyres } = await supabase
    .from("tyre_management")
    .select("*");

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  const totalTyres =
    tyres?.length || 0;

  const activeTyres =
    tyres?.filter(
      (t: any) => t.status === "Active"
    ).length || 0;

  const nearReplacement =
    tyres?.filter((t: any) => {
      const usedKm =
        Number(t.current_km || 0) -
        Number(t.install_km || 0);

      const remainingKm =
        Number(t.expected_life_km || 0) -
        usedKm;

      return remainingKm <= 10000;
    }).length || 0;

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        🛞 Tyre Management
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Tyres
          </p>

          <h2 className="text-4xl font-bold text-cyan-400">
            {totalTyres}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Active Tyres
          </p>

          <h2 className="text-4xl font-bold text-green-400">
            {activeTyres}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Near Replacement
          </p>

          <h2 className="text-4xl font-bold text-red-400">
            {nearReplacement}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Tyre Inventory
        </h2>

        <div className="space-y-4">

          {tyres?.map((tyre: any) => {
            const vehicle =
              vehicles?.find(
                (v: any) =>
                  v.id === tyre.vehicle_id
              );

            const usedKm =
              Number(tyre.current_km || 0) -
              Number(tyre.install_km || 0);

            const remainingKm =
              Number(
                tyre.expected_life_km || 0
              ) - usedKm;

            return (
              <div
                key={tyre.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">

                  <div>

                    <p className="font-bold text-cyan-400">
                      {vehicle?.vehicle_number ||
                        `Vehicle #${tyre.vehicle_id}`}
                    </p>

                    <p>
                      Position:{" "}
                      {tyre.tyre_position}
                    </p>

                    <p>
                      Brand: {tyre.brand}
                    </p>

                    <p className="text-slate-400 text-sm">
                      Serial:{" "}
                      {tyre.serial_number}
                    </p>

                  </div>

                  <div className="text-right">

                    <p>
                      Installed:
                    </p>

                    <p>
                      {tyre.install_date}
                    </p>

                    <p
                      className={
                        remainingKm <= 10000
                          ? "text-red-400 font-bold"
                          : "text-green-400 font-bold"
                      }
                    >
                      {remainingKm.toLocaleString()} KM left
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