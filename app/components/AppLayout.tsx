import Image from "next/image";
import Link from "next/link";

const navSections = [
  {
    title: "Core",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: "📊" },
      { name: "Live Fleet", href: "/fleet-map", icon: "🗺️" },
      { name: "Live Monitoring", href: "/live", icon: "🎥" },
    ],
  },
  {
    title: "AI Safety",
    items: [
      { name: "Safety Command Center", href: "/safety-center", icon: "🖥️" },
      { name: "Safety Events", href: "/safety-events", icon: "🚨" },
      { name: "Incident Clips", href: "/incidentclips", icon: "🎬" },
      { name: "Video Archive", href: "/video-archive", icon: "📹" },
      { name: "Video Search", href: "/video-search", icon: "🔎" },
      { name: "Video Requests", href: "/video-requests", icon: "📤" },
      { name: "Driver Safety Score", href: "/driver-score", icon: "🏆" },
      { name: "Violation History", href: "/violation-history", icon: "⚠️" },
      { name: "AI Risk Engine", href: "/risk-engine", icon: "🧠" },
      { name: "Top Risk Vehicles", href: "/vehicle-risk", icon: "🚗" },
    ],
  },
  {
    title: "Fleet ERP",
    items: [
      { name: "Vehicles", href: "/vehicles", icon: "🚛" },
      { name: "Drivers", href: "/drivers", icon: "👨‍✈️" },
      { name: "Customers", href: "/customers", icon: "👥" },
      { name: "Trips", href: "/trips", icon: "🛣️" },
      { name: "Trip Expenses", href: "/trip-expenses", icon: "💸" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { name: "Maintenance Center", href: "/maintenance-center", icon: "🔧" },
      { name: "Tyre Management", href: "/tyre-management", icon: "🛞" },
      { name: "Maintenance Alerts", href: "/maintenance-alerts", icon: "🚨" },
      { name: "Document Center", href: "/document-center", icon: "📄" },
      { name: "Document Alerts", href: "/document-alerts", icon: "🚨" },
    ],
  },
  {
    title: "Finance",
    items: [
      { name: "Fuel Management", href: "/fuel-management", icon: "⛽" },
      { name: "Driver Salary", href: "/driver-salary", icon: "👨‍✈️" },
      { name: "Invoices", href: "/invoices", icon: "🧾" },
      { name: "Payments", href: "/payments", icon: "💳" },
      { name: "Receivables", href: "/receivables", icon: "📥" },
      { name: "Vehicle Profitability", href: "/profitability", icon: "📈" },
      { name: "Billing", href: "/billing", icon: "💰" },
    ],
  },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-900/95 xl:block">
        <div className="border-b border-slate-800 p-6">
          <Link href="/dashboard" className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-800">
              <Image
                src="/logo.png"
                alt="GARUD AI"
                fill
                sizes="64px"
                className="object-contain p-1"
                priority
              />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                GARUD AI
              </h1>
              <p className="text-sm text-slate-400">
                Fleet Intelligence SaaS
              </p>
            </div>
          </Link>
        </div>

        <nav className="space-y-6 p-5">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Fleet Operations Center</h2>
              <p className="text-sm text-slate-400">
                AI Dashcam Monitoring + GPS + Transport ERP
              </p>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                ● System Online
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                👤 Admin
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}