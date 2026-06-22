export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-blue-500 mb-8">
          GARUD AI
        </h1>

        <nav className="space-y-4">

          <a href="/dashboard" className="block hover:text-blue-400">
            📊 Dashboard
          </a>

          <a href="/live" className="block hover:text-blue-400">
            🎥 Live Monitoring
          </a>

          <a href="/vehicles" className="block hover:text-blue-400">
            🚛 Vehicles
          </a>

          <a href="/drivers" className="block hover:text-blue-400">
            👨‍✈️ Drivers
          </a>

          <a href="/customers" className="block hover:text-blue-400">
            👥 Customers
          </a>

          <a href="/billing" className="block hover:text-blue-400">
            💰 Billing
          </a>

          <a href="/alerts" className="block hover:text-blue-400">
            🚨 Alerts
          </a>

        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1">

        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between">

          <div>
            Fleet Safety Platform
          </div>

          <div className="flex gap-4">
            <span>🔔 5 Alerts</span>
            <span>👤 Admin</span>
          </div>

        </header>

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}
