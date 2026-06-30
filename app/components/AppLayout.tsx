import Image from "next/image";
import Link from "next/link";

const navSections = [
  {
    title: "Command",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: "DB" },
      { name: "GARUD Agent", href: "/garud-agent", icon: "AI" },
      { name: "TMS Lifecycle", href: "/tms", icon: "TMS" },
      { name: "Command Center", href: "/command-center", icon: "CC" },
      { name: "Control Tower", href: "/control-tower", icon: "ISS" },
      { name: "Route Planner", href: "/route-planner", icon: "RT" },
      { name: "Reports", href: "/reports", icon: "RPT" },
      { name: "ERP Modules", href: "/erp-architecture", icon: "ERP" },
      { name: "Onboard Customer", href: "/onboarding", icon: "NEW" },
      { name: "Readiness", href: "/system-readiness", icon: "RDY" },
    ],
  },
  {
    title: "Fleet ERP",
    items: [
      { name: "Vehicles", href: "/vehicles", icon: "TRK" },
      { name: "Drivers", href: "/drivers", icon: "DRV" },
      { name: "Customers", href: "/customers", icon: "CUS" },
      { name: "Customer Portal", href: "/customer-portal", icon: "PORT" },
      { name: "Trips", href: "/trips", icon: "TRP" },
      { name: "Trip Expenses", href: "/trip-expenses", icon: "EXP" },
      { name: "Driver App", href: "/driver-app", icon: "APP" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { name: "Maintenance Center", href: "/maintenance-center", icon: "MNT" },
      { name: "Tyre Management", href: "/tyre-management", icon: "TYR" },
      { name: "Maintenance Alerts", href: "/maintenance-alerts", icon: "ALT" },
      { name: "Document Center", href: "/document-center", icon: "DOC" },
      { name: "Document Alerts", href: "/document-alerts", icon: "DUE" },
    ],
  },
  {
    title: "Finance",
    items: [
      { name: "Fuel Management", href: "/fuel-management", icon: "FUEL" },
      { name: "Driver Salary", href: "/driver-salary", icon: "PAY" },
      { name: "Invoices", href: "/invoices", icon: "INV" },
      { name: "Billing Packs", href: "/billing-packs", icon: "POD" },
      { name: "Payments", href: "/payments", icon: "PMT" },
      { name: "Receivables", href: "/receivables", icon: "REC" },
      { name: "Vehicle Profitability", href: "/profitability", icon: "ROI" },
      { name: "Billing", href: "/billing", icon: "BIL" },
    ],
  },
  {
    title: "AI Safety & Video",
    items: [
      { name: "Live Dashcam", href: "/live-dashcam", icon: "LIVE" },
      { name: "Safety Events", href: "/safety-events", icon: "AI" },
      { name: "Video Search", href: "/video-search", icon: "SEA" },
      { name: "Video Requests", href: "/video-requests", icon: "REQ" },
      { name: "AI Risk Engine", href: "/risk-engine", icon: "RISK" },
    ],
  },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#05070d] text-white">
      <aside className="sticky top-0 hidden h-screen w-96 shrink-0 overflow-y-auto border-r border-white/10 bg-[#07111f]/95 xl:block">
        <div className="border-b border-white/10 p-6">
          <Link href="/dashboard" className="flex items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-cyan-400/20 bg-white shadow-lg shadow-cyan-950/30">
              <Image
                src="/logo.png"
                alt="GARUD AI"
                fill
                sizes="96px"
                className="object-contain p-2"
                priority
              />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-white">
                GARUD AI
              </h1>
              <p className="mt-1 text-sm font-semibold text-cyan-200">
                Transport OS
              </p>
              <p className="mt-2 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">
                ERP + AI Safety
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
                    className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-white"
                  >
                    <span className="flex h-7 w-10 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-950 text-[10px] font-black text-cyan-300">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/90 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">Fleet Operations Center</h2>
              <p className="text-sm text-slate-400">
                Dispatch, finance, compliance, GPS, and AI safety in one workflow
              </p>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/super-admin"
                className="rounded-md border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-800 hover:bg-cyan-100"
              >
                Super Admin
              </Link>
              <Link
                href="/garud-agent"
                className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
              >
                GARUD Agent
              </Link>

              <Link
                href="/live-dashcam"
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200 hover:bg-white/10"
              >
                Live dashcam
              </Link>

              <div className="rounded-md bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                System Online
              </div>

              <a
                href="/api/auth/logout"
                className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                Logout
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
