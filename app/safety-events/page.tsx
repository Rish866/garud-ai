import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function SafetyEventsPage() {
  const { data: events } =
    await supabase
      .from("safety_events")
      .select(`
        *,
        vehicles(
          vehicle_number
        ),
        drivers(
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

  const totalEvents =
    events?.length || 0;

  const criticalEvents =
    events?.filter(
      (event: any) =>
        event.severity ===
        "Critical"
    ).length || 0;

  const highEvents =
    events?.filter(
      (event: any) =>
        event.severity ===
        "High"
    ).length || 0;

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-red-500 mb-8">
        🚨 Safety Events
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Events
          </p>

          <h2 className="text-3xl font-bold">
            {totalEvents}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Critical Events
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            {criticalEvents}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            High Severity
          </p>

          <h2 className="text-3xl font-bold text-orange-500">
            {highEvents}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">

              <th className="text-left py-3">
                Vehicle
              </th>

              <th className="text-left py-3">
                Driver
              </th>

              <th className="text-left py-3">
                Event
              </th>

              <th className="text-left py-3">
                Severity
              </th>

              <th className="text-left py-3">
                Time
              </th>

            </tr>
          </thead>

          <tbody>
            {events?.map(
              (event: any) => (
                <tr
                  key={event.id}
                  className="border-b border-slate-800"
                >

                  <td className="py-4">
                    {
                      event.vehicles
                        ?.vehicle_number
                    }
                  </td>

                  <td>
                    {
                      event.drivers
                        ?.name
                    }
                  </td>

                  <td>
                    {event.event_type}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        event.severity ===
                        "Critical"
                          ? "bg-red-600"
                          : event.severity ===
                            "High"
                          ? "bg-orange-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {event.severity}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      event.created_at
                    ).toLocaleString()}
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