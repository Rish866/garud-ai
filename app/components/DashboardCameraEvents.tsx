type CameraEvent = {
  id?: number | string;
  title?: string | null;
  event_type?: string | null;
  vehicle_number?: string | null;
  severity?: string | null;
  created_at?: string | null;
};

type DashboardCameraEventsProps = {
  events?: CameraEvent[] | null;
};

export default function DashboardCameraEvents({
  events = [],
}: DashboardCameraEventsProps) {
  const safeEvents = Array.isArray(events) ? events : [];

  const visibleEvents = safeEvents.slice(0, 4);

  const getSeverityClass = (severity?: string | null) => {
    const value = (severity || "").toLowerCase();

    if (value.includes("high") || value.includes("critical")) {
      return "bg-red-500/15 text-red-400 border-red-500/20";
    }

    if (value.includes("medium") || value.includes("warning")) {
      return "bg-amber-500/15 text-amber-400 border-amber-500/20";
    }

    if (value.includes("low")) {
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    }

    return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Camera Events
          </h2>
          <p className="text-sm text-slate-400">
            Driver monitoring and road events
          </p>
        </div>

        <div className="rounded-xl bg-purple-500/10 px-3 py-2 text-sm font-semibold text-purple-400">
          {safeEvents.length}
        </div>
      </div>

      <div className="space-y-4">
        {visibleEvents.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-sm text-slate-400">
            No AI camera events detected.
          </div>
        )}

        {visibleEvents.map((event, index) => (
          <div
            key={event.id || index}
            className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-medium text-white">
                {event.title || event.event_type || "Camera Event"}
              </p>

              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getSeverityClass(
                  event.severity
                )}`}
              >
                {event.severity || "Info"}
              </span>
            </div>

            <p className="text-sm text-slate-400">
              Vehicle: {event.vehicle_number || "Not assigned"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}