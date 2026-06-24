import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function DriverScorePage() {
  const { data: drivers } = await supabase
    .from("drivers")
    .select("*")
    .order("safety_score", {
      ascending: false,
    });

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        🏆 Driver Safety Score
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Drivers
          </p>

          <h2 className="text-3xl font-bold">
            {drivers?.length || 0}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Safe Drivers
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            {
              drivers?.filter(
                (d: any) =>
                  d.safety_score >= 90
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Risk Drivers
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            {
              drivers?.filter(
                (d: any) =>
                  d.safety_score < 80
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Average Score
          </p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {drivers?.length
              ? Math.round(
                  drivers.reduce(
                    (
                      sum: number,
                      d: any
                    ) =>
                      sum +
                      Number(
                        d.safety_score || 0
                      ),
                    0
                  ) /
                    drivers.length
                )
              : 0}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Driver Ranking
        </h2>

        <div className="space-y-4">

          {drivers?.map(
            (
              driver: any,
              index: number
            ) => (
              <div
                key={driver.id}
                className="bg-slate-800 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-xl font-semibold">
                    #{index + 1}{" "}
                    {driver.name}
                  </p>

                  <p className="text-slate-400 text-sm">
                    Events:{" "}
                    {driver.total_events || 0}
                  </p>

                  <p className="text-slate-400 text-sm">
                    Penalty Points:{" "}
                    {driver.penalty_points ||
                      0}
                  </p>
                </div>

                <div className="text-right">

                  <div
                    className={`text-3xl font-bold ${
                      driver.safety_score >=
                      90
                        ? "text-green-500"
                        : driver.safety_score >=
                          80
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {driver.safety_score}
                  </div>

                  <p className="text-slate-400 text-sm">
                    Safety Score
                  </p>

                </div>
              </div>
            )
          )}

        </div>

      </div>
    </AppLayout>
  );
}