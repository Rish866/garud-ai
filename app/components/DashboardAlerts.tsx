import Link from "next/link";

type Alert = {
  title: string;
  message: string;
  type: "warning" | "success" | "info" | "danger";
};

export default function DashboardAlerts({ alerts }: { alerts: Alert[] }) {
  const getAlertStyle = (type: Alert["type"]) => {
    if (type === "danger") {
      return "border-red-500/40 bg-red-500/10 text-red-300";
    }

    if (type === "warning") {
      return "border-yellow-500/40 bg-yellow-500/10 text-yellow-300";
    }

    if (type === "success") {
      return "border-green-500/40 bg-green-500/10 text-green-300";
    }

    return "border-blue-500/40 bg-blue-500/10 text-blue-300";
  };

  const getAlertIcon = (type: Alert["type"]) => {
    if (type === "danger") return "🚨";
    if (type === "warning") return "⚠️";
    if (type === "success") return "✅";
    return "ℹ️";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">AI Alerts</h2>
          <p className="mt-1 text-sm text-slate-400">
            Safety and system notifications
          </p>
        </div>

        <Link
          href="/safety-events"
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-400">
            No active alerts.
          </div>
        )}

        {alerts.map((alert, index) => (
          <div
            key={`${alert.title}-${index}`}
            className={`rounded-xl border p-4 ${getAlertStyle(alert.type)}`}
          >
            <div className="flex gap-3">
              <div className="text-xl">{getAlertIcon(alert.type)}</div>

              <div>
                <h3 className="font-semibold">{alert.title}</h3>
                <p className="mt-1 text-sm opacity-80">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}