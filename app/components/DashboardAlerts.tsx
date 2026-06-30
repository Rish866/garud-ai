import Link from "next/link";

type Alert = {
  id?: number | string;
  title?: string | null;
  message?: string | null;
  type?: string | null;
  severity?: string | null;
  status?: string | null;
  created_at?: string | null;
  href?: string | null;
};

type DashboardAlertsProps = {
  alerts?: Alert[] | null;
};

export default function DashboardAlerts({
  alerts = [],
}: DashboardAlertsProps) {
  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  const visibleAlerts = safeAlerts.slice(0, 4);

  const getBadgeClass = (alert: Alert) => {
    const value = `${alert.type || ""} ${alert.severity || ""}`.toLowerCase();

    if (value.includes("critical") || value.includes("high")) {
      return "bg-red-500/15 text-red-400 border-red-500/20";
    }

    if (value.includes("warning") || value.includes("medium")) {
      return "bg-amber-500/15 text-amber-400 border-amber-500/20";
    }

    if (value.includes("success") || value.includes("low")) {
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    }

    return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Safety Alerts
          </h2>
          <p className="text-sm text-slate-400">
            Active risk notifications
          </p>
        </div>

        <div className="rounded-xl bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400">
          {safeAlerts.length}
        </div>
      </div>

      <div className="space-y-4">
        {visibleAlerts.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-400">
            No active alerts.
          </div>
        )}

        {visibleAlerts.map((alert, index) => (
          <Link
            key={alert.id || index}
            href={alert.href || "/control-tower"}
            className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-medium text-white">
                {alert.title || "Safety Alert"}
              </p>

              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getBadgeClass(
                  alert
                )}`}
              >
                {alert.severity || alert.type || "Info"}
              </span>
            </div>

            <p className="text-sm text-slate-400">
              {alert.message || "Vehicle safety event requires attention."}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
