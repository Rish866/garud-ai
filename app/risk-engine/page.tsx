import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function RiskEnginePage() {
  const { data: drivers } = await supabase
    .from("drivers")
    .select("*");

  const { data: events } = await supabase
    .from("safety_events")
    .select("*");

  const fleetSafetyScore =
    drivers && drivers.length > 0
      ? Math.round(
          drivers.reduce(
            (sum: number, driver: any) =>
              sum + Number(driver.safety_score || 100),
            0
          ) / drivers.length
        )
      : 100;

  const repeatOffenders =
    drivers?.filter(
      (driver: any) =>
        Number(driver.total_events || 0) >= 2
    ) || [];

  const criticalEvents =
    events?.filter(
      (event: any) =>
        event.severity === "Critical"
    ) || [];

  const highRiskDrivers =
    drivers?.filter(
      (driver: any) =>
        Number(driver.safety_score || 100) < 80
    ) || [];

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-red-500 mb-8">
        🧠 AI Risk Engine
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Fleet Safety Score
          </p>

          <h2 className="text-5xl font-bold text-green-500 mt-2">
            {fleetSafetyScore}
          </h2>

          <p className="text-slate-500 mt-2">
            /100
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Repeat Offenders
          </p>

          <h2 className="text-5xl font-bold text-red-500 mt-2">
            {repeatOffenders.length}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Critical Events
          </p>

          <h2 className="text-5xl font-bold text-yellow-500 mt-2">
            {criticalEvents.length}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-4">
          High Risk Drivers
        </h2>

        <div className="space-y-4">

          {highRiskDrivers.map(
            (driver: any) => (
              <div
                key={driver.id}
                className="border border-red-500 rounded-lg p-4"
              >
                <p className="font-bold text-xl">
                  {driver.name}
                </p>

                <p>
                  Safety Score:{" "}
                  {driver.safety_score}
                </p>

                <p>
                  Events:{" "}
                  {driver.total_events}
                </p>

                <p className="text-red-400 font-semibold">
                  HIGH RISK
                </p>
              </div>
            )
          )}

          {highRiskDrivers.length === 0 && (
            <p className="text-green-400">
              No high risk drivers found.
            </p>
          )}

        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          AI Recommendations
        </h2>

        <div className="space-y-3">

          {drivers?.map((driver: any) => {
            const score =
              Number(
                driver.safety_score || 100
              );

            if (score < 80) {
              return (
                <p
                  key={driver.id}
                  className="text-red-400"
                >
                  ⚠ {driver.name} requires
                  immediate safety coaching.
                </p>
              );
            }

            if (score < 95) {
              return (
                <p
                  key={driver.id}
                  className="text-yellow-400"
                >
                  ⚠ {driver.name} should
                  improve driving behaviour.
                </p>
              );
            }

            return (
              <p
                key={driver.id}
                className="text-green-400"
              >
                ✅ {driver.name} is
                maintaining excellent
                safety standards.
              </p>
            );
          })}

        </div>
      </div>

    </AppLayout>
  );
}