type DashboardRevenueProps = {
  totalRevenue?: number;
  completedTrips?: number;
  inProgressTrips?: number;
  pendingTrips?: number;
};

export default function DashboardRevenue({
  totalRevenue = 0,
  completedTrips = 0,
  inProgressTrips = 0,
  pendingTrips = 0,
}: DashboardRevenueProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Revenue Overview</h2>
        <p className="mt-1 text-sm text-slate-400">
          Trip billing and operational performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RevenueCard title="Trip Revenue" value={totalRevenue} />

        <StatusCard
          title="Completed Trips"
          value={completedTrips}
          label="Closed trips"
        />

        <StatusCard
          title="Running Trips"
          value={inProgressTrips}
          label="Currently in progress"
        />

        <StatusCard title="Pending Trips" value={pendingTrips} label="Waiting" />
      </div>
    </div>
  );
}

function RevenueCard({ title, value = 0 }: { title: string; value?: number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="mt-3 text-3xl font-black text-green-400">
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </h2>

      <p className="mt-2 text-sm text-slate-500">Total trip billing</p>
    </div>
  );
}

function StatusCard({
  title,
  value = 0,
  label,
}: {
  title: string;
  value?: number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="mt-3 text-3xl font-black text-white">{value}</h2>

      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}