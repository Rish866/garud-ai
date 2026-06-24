import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function IncidentClipsPage() {
  const { data: clips } = await supabase
    .from("incident_clips")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const { data: vehicles } =
    await supabase
      .from("vehicles")
      .select("*");

  const { data: drivers } =
    await supabase
      .from("drivers")
      .select("*");

  const { data: events } =
    await supabase
      .from("safety_events")
      .select("*");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-red-500 mb-8">
        🎬 Incident Clips
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {clips?.map((clip: any) => {
          const vehicle =
            vehicles?.find(
              (v: any) =>
                v.id ===
                clip.vehicle_id
            );

          const driver =
            drivers?.find(
              (d: any) =>
                d.id ===
                clip.driver_id
            );

          const event =
            events?.find(
              (e: any) =>
                e.id ===
                clip.safety_event_id
            );

          return (
            <div
              key={clip.id}
              className="bg-slate-900 p-5 rounded-xl"
            >
              <video
                controls
                className="w-full rounded mb-4"
              >
                <source
                  src={clip.clip_url}
                  type="video/mp4"
                />
              </video>

              <div className="space-y-2">
                <p>
                  <strong>
                    Vehicle:
                  </strong>{" "}
                  {
                    vehicle?.vehicle_number
                  }
                </p>

                <p>
                  <strong>
                    Driver:
                  </strong>{" "}
                  {driver?.name}
                </p>

                <p>
                  <strong>
                    Event:
                  </strong>{" "}
                  {
                    event?.event_type
                  }
                </p>

                <p>
                  <strong>
                    Severity:
                  </strong>{" "}
                  {
                    event?.severity
                  }
                </p>

                <p className="text-slate-400 text-sm">
                  {new Date(
                    clip.created_at
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {clips?.length === 0 && (
        <div className="bg-slate-900 p-6 rounded-xl">
          No incident clips found.
        </div>
      )}
    </AppLayout>
  );
}