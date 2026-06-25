import Link from "next/link";

type Props = {
  totalVehicles: number;
  activeVehicles: number;
  totalDrivers: number;
  totalCustomers: number;
  totalTrips: number;
};

export default function DashboardFleetHealth({
  totalVehicles,
  activeVehicles,
  totalDrivers,
  totalCustomers,
  totalTrips,
}: Props) {
  const inactiveVehicles = totalVehicles - activeVehicles;

  const health = Math.round(
    totalVehicles === 0
      ? 100
      : (activeVehicles / totalVehicles) * 100
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Fleet Health
          </h2>

          <p className="mt-1 text-slate-400">
            Live operational status of your fleet.
          </p>
        </div>

        <div
          className={`rounded-full px-4 py-2 text-sm font-bold ${
            health >= 90
              ? "bg-green-500/10 text-green-400"
              : health >= 70
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {health}% Healthy
        </div>
      </div>

      <div className="mt-8 space-y-5">

        <HealthRow
          title="Fleet Vehicles"
          value={totalVehicles}
          online={activeVehicles}
          href="/vehicles"
          color="blue"
        />

        <HealthRow
          title="Drivers"
          value={totalDrivers}
          online={totalDrivers}
          href="/drivers"
          color="green"
        />

        <HealthRow
          title="Customers"
          value={totalCustomers}
          online={totalCustomers}
          href="/customers"
          color="purple"
        />

        <HealthRow
          title="Trips"
          value={totalTrips}
          online={totalTrips}
          href="/trips"
          color="orange"
        />

      </div>

      <div className="mt-8 rounded-xl bg-slate-950 p-5 border border-slate-800">

        <div className="flex justify-between mb-3">
          <span className="text-slate-400">
            Active Vehicles
          </span>

          <span className="font-bold text-green-400">
            {activeVehicles}
          </span>
        </div>

        <div className="flex justify-between mb-3">
          <span className="text-slate-400">
            Offline Vehicles
          </span>

          <span className="font-bold text-red-400">
            {inactiveVehicles}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">
            Fleet Health Score
          </span>

          <span className="font-black text-blue-400">
            {health}%
          </span>
        </div>

      </div>
    </div>
  );
}

function HealthRow({
  title,
  value,
  online,
  href,
  color,
}: {
  title: string;
  value: number;
  online: number;
  href: string;
  color: string;
}) {
  const colors: any = {
    blue: "text-blue-400 bg-blue-500/10",
    green: "text-green-400 bg-green-500/10",
    purple: "text-purple-400 bg-purple-500/10",
    orange: "text-orange-400 bg-orange-500/10",
  };

  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 hover:border-blue-500 transition"
    >
      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {online} operational
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div
          className={`rounded-xl px-4 py-2 font-bold ${colors[color]}`}
        >
          {value}
        </div>

        <div className="text-blue-400 group-hover:translate-x-1 transition">
          →
        </div>

      </div>
    </Link>
  );
}