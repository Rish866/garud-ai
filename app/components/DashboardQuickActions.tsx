import Link from "next/link";

const actions = [
  {
    title: "Add Vehicle",
    code: "TRK",
    href: "/vehicles",
    color: "bg-blue-600/20 text-blue-200",
  },
  {
    title: "Add Driver",
    code: "DRV",
    href: "/drivers",
    color: "bg-green-600/20 text-green-200",
  },
  {
    title: "TMS Lifecycle",
    code: "TMS",
    href: "/tms",
    color: "bg-cyan-600/20 text-cyan-200",
  },
  {
    title: "Create Trip",
    code: "LOAD",
    href: "/trips",
    color: "bg-cyan-600/20 text-cyan-200",
  },
  {
    title: "Control Tower",
    code: "ISS",
    href: "/control-tower",
    color: "bg-rose-600/20 text-rose-200",
  },
  {
    title: "Route Planner",
    code: "RT",
    href: "/route-planner",
    color: "bg-blue-600/20 text-blue-200",
  },
  {
    title: "New Customer",
    code: "CUS",
    href: "/customers",
    color: "bg-indigo-600/20 text-indigo-200",
  },
  {
    title: "Fuel Entry",
    code: "FUEL",
    href: "/fuel-management",
    color: "bg-amber-600/20 text-amber-200",
  },
  {
    title: "Driver App",
    code: "APP",
    href: "/driver-app",
    color: "bg-emerald-600/20 text-emerald-200",
  },
  {
    title: "Customer Portal",
    code: "PORT",
    href: "/customer-portal",
    color: "bg-indigo-600/20 text-indigo-200",
  },
  {
    title: "Billing Pack",
    code: "POD",
    href: "/billing-packs",
    color: "bg-violet-600/20 text-violet-200",
  },
  {
    title: "Maintenance",
    code: "MNT",
    href: "/maintenance-center",
    color: "bg-rose-600/20 text-rose-200",
  },
  {
    title: "Create Invoice",
    code: "INV",
    href: "/invoices",
    color: "bg-violet-600/20 text-violet-200",
  },
  {
    title: "Driver Salary",
    code: "PAY",
    href: "/driver-salary",
    color: "bg-emerald-600/20 text-emerald-200",
  },
];

export default function DashboardQuickActions() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <p className="mt-1 text-slate-400">
            Daily transporter operating shortcuts.
          </p>
        </div>

        <div className="rounded-md bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          {actions.length} Modules
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group rounded-lg border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-500 hover:bg-slate-900"
          >
            <div
              className={`mb-4 flex h-12 w-14 items-center justify-center rounded-md text-xs font-black ${action.color}`}
            >
              {action.code}
            </div>

            <h3 className="font-semibold text-white">{action.title}</h3>
            <p className="mt-2 text-sm text-slate-500">Open module</p>

            <div className="mt-4 text-sm font-bold text-cyan-300 transition-transform group-hover:translate-x-1">
              Open
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
