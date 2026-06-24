import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function SafetyScorePage() {
  const { data: scores } =
    await supabase
      .from("driver_safety_score")
      .select("*")
      .order("safety_score", {
        ascending: false,
      });

  const fleetAverage =
    scores?.length
      ? (
          scores.reduce(
            (sum: number, row: any) =>
              sum +
              Number(
                row.safety_score || 0
              ),
            0
          ) / scores.length
        ).toFixed(1)
      : "0";

  const totalViolations =
    scores?.reduce(
      (sum: number, row: any) =>
        sum +
        Number(
          row.total_events || 0
        ),
      0
    ) || 0;

  const highRiskDrivers =
    scores?.filter(
      (row: any) =>
        Number(
          row.safety_score
        ) < 80
    ).length || 0;

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-red-500 mb-8">
        🛡 Driver Safety Score
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Fleet Average Score
          </p>

          <h2 className="text-4xl font-bold text-green-500">
            {fleetAverage}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Violations
          </p>

          <h2 className="text-4xl font-bold text-red-500">
            {totalViolations}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            High Risk Drivers
          </p>

          <h2 className="text-4xl font-bold text-yellow-500">
            {highRiskDrivers}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Driver Leaderboard
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">
                Rank
              </th>

              <th className="text-left py-3">
                Driver
              </th>

              <th className="text-left py-3">
                Violations
              </th>

              <th className="text-left py-3">
                Penalty Points
              </th>

              <th className="text-left py-3">
                Safety Score
              </th>
            </tr>
          </thead>

          <tbody>

            {scores?.map(
              (
                row: any,
                index: number
              ) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-4">
                    #{index + 1}
                  </td>

                  <td>
                    {row.name}
                  </td>

                  <td>
                    {
                      row.total_events
                    }
                  </td>

                  <td>
                    {
                      row.penalty_points
                    }
                  </td>

                  <td>
                    <span
                      className={`px-4 py-2 rounded font-bold ${
                        row.safety_score >=
                        90
                          ? "bg-green-600"
                          : row.safety_score >=
                            80
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {
                        row.safety_score
                      }
                    </span>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </AppLayout>
  );
}