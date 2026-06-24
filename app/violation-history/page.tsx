import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function ViolationHistoryPage() {

  const { data: events } =
    await supabase
      .from("safety_events")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  const { data: drivers } =
    await supabase
      .from("drivers")
      .select("*");

  return (
    <AppLayout>

      <h1 className="text-4xl font-bold text-red-500 mb-8">
        ⚠️ Driver Violation History
      </h1>

      <div className="space-y-4">

        {events?.map((event: any) => {

          const driver =
            drivers?.find(
              (d: any) =>
                d.id === event.driver_id
            );

          return (
            <div
              key={event.id}
              className="bg-slate-900 rounded-xl p-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-xl font-bold">
                    {driver?.name ||
                      "Unknown Driver"}
                  </h2>

                  <p className="text-slate-400">
                    {event.event_type}
                  </p>

                </div>

                <div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      event.severity ===
                      "Critical"
                        ? "bg-red-600"
                        : event.severity ===
                          "High"
                        ? "bg-orange-500"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {event.severity}
                  </span>

                </div>

              </div>

              <p className="text-slate-500 text-sm mt-4">
                {new Date(
                  event.created_at
                ).toLocaleString()}
              </p>

            </div>
          );
        })}

      </div>

    </AppLayout>
  );
}