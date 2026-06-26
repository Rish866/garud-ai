type DashboardSystemHealthProps = {
  databaseOnline?: boolean;
  gpsOnline?: boolean;
  aiOnline?: boolean;
  cameraOnline?: boolean;
  notificationsOnline?: boolean;
};

export default function DashboardSystemHealth({
  databaseOnline = true,
  gpsOnline = true,
  aiOnline = true,
  cameraOnline = true,
  notificationsOnline = true,
}: DashboardSystemHealthProps) {
  const services = [
    { name: "Supabase Database", online: databaseOnline },
    { name: "GPS Tracking", online: gpsOnline },
    { name: "AI Engine", online: aiOnline },
    { name: "Camera Stream", online: cameraOnline },
    { name: "Notifications", online: notificationsOnline },
  ];

  const healthy = services.filter((s) => s.online).length;
  const uptime = Math.round((healthy / services.length) * 1000) / 10;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          System Health
        </h2>

        <p className="text-sm text-slate-400">
          GARUD AI platform services
        </p>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3"
          >
            <span className="text-sm text-slate-300">
              {service.name}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                service.online
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {service.online ? "Online" : "Offline"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">
            Platform Uptime
          </span>

          <span className="text-xl font-bold text-emerald-400">
            {uptime}%
          </span>
        </div>
      </div>
    </div>
  );
}