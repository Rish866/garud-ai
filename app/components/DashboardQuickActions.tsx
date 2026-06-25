import Link from "next/link";

const actions = [
  {
    title: "Add Vehicle",
    icon: "🚛",
    href: "/add-vehicle",
    color: "bg-blue-600",
  },
  {
    title: "Add Driver",
    icon: "👨‍✈️",
    href: "/drivers/add",
    color: "bg-green-600",
  },
  {
    title: "Create Trip",
    icon: "🛣️",
    href: "/trips/add",
    color: "bg-purple-600",
  },
  {
    title: "New Customer",
    icon: "👥",
    href: "/customers/add",
    color: "bg-cyan-600",
  },
  {
    title: "Fuel Entry",
    icon: "⛽",
    href: "/fuel/add",
    color: "bg-orange-600",
  },
  {
    title: "Maintenance",
    icon: "🔧",
    href: "/maintenance/add",
    color: "bg-red-600",
  },
  {
    title: "Create Invoice",
    icon: "🧾",
    href: "/invoices/add",
    color: "bg-indigo-600",
  },
  {
    title: "Driver Salary",
    icon: "💰",
    href: "/driver-salary/add",
    color: "bg-emerald-600",
  },
];

export default function DashboardQuickActions() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-1 text-slate-400">
            Frequently used operational shortcuts.
          </p>
        </div>

        <div className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
          8 Modules
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="
              group
              rounded-2xl
              border
              border-slate-800
              bg-slate-950
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-500
              hover:shadow-xl
              hover:shadow-blue-500/10
            "
          >
            <div
              className={`
                ${action.color}
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                text-3xl
              `}
            >
              {action.icon}
            </div>

            <h3 className="font-semibold text-white">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Open module
            </p>

            <div className="mt-4 text-blue-400 transition-transform group-hover:translate-x-1">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}