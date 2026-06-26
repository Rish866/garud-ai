type Vehicle = {
  id?: number | string;
  vehicle_number?: string | null;
  status?: string | null;
};

type DashboardVehicleStatusProps = {
  vehicles?: Vehicle[] | null;
};

export default function DashboardVehicleStatus({
  vehicles = [],
}: DashboardVehicleStatusProps) {
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

  const total = safeVehicles.length;

  const active = safeVehicles.filter(
    (v) => (v.status || "").toLowerCase() === "active"
  ).length;

  const inactive = safeVehicles.filter(
    (v) => (v.status || "").toLowerCase() === "inactive"
  ).length;

  const maintenance = safeVehicles.filter((v) =>
    (v.status || "").toLowerCase().includes("maintenance")
  ).length;

  const unknown = total - active - inactive - maintenance;

  const data = [
    {
      label: "Active",
      value: active,
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    },
    {
      label: "Inactive",
      value: inactive,
      badge: "bg-red-500/15 text-red-400 border-red-500/20",
    },
    {
      label: "Maintenance",
      value: maintenance,
      badge: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    },
    {
      label: "Unknown",
      value: unknown,
      badge: "bg-slate-500/15 text-slate-400 border-slate-500/20",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Vehicle Status
          </h2>
          <p className="text-sm text-slate-400">
            Fleet availability overview
          </p>
        </div>

        <div className="rounded-xl bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-400">
          {total} Total
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
          >
            <div
              className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${item.badge}`}
            >
              {item.label}
            </div>

            <p className="text-2xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {total === 0 && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
          No vehicles found. Add vehicles to see fleet status here.
        </div>
      )}
    </div>
  );
}