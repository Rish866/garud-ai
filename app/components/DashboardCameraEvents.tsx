type CameraEvent = {
  id: number;
  vehicle: string;
  driver: string;
  event: string;
  severity: "High" | "Medium" | "Low";
  time: string;
};

export default function DashboardCameraEvents({
  events,
}: {
  events: CameraEvent[];
}) {
  const severityColor = (severity: string) => {
    if (severity === "High") {
      return "bg-red-500/20 text-red-400 border-red-500/40";
    }

    if (severity === "Medium") {
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
    }

    return "bg-green-500/20 text-green-400 border-green-500/40";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">AI Camera Events</h2>

        <span className="text-sm text-slate-400">Last 24 Hours</span>
      </div>

      <div className="space-y-4">
        {events.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
            No AI camera events detected
          </div>
        )}

        {events.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-blue-500"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white">{item.event}</h3>

                <p className="mt-1 text-sm text-slate-400">{item.vehicle}</p>

                <p className="text-sm text-slate-500">
                  Driver: {item.driver}
                </p>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${severityColor(
                  item.severity
                )}`}
              >
                {item.severity}
              </span>
            </div>

            <div className="mt-3 text-xs text-slate-500">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}