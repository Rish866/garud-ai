export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto">

        <h1 className="text-2xl font-bold text-blue-500 mb-8">
          GARUD AI
        </h1>

        <nav className="space-y-4">

          <a
            href="/dashboard"
            className="block hover:text-blue-400"
          >
            📊 Dashboard
          </a>

          <hr className="border-slate-800" />

          <p className="text-slate-500 text-xs uppercase">
            AI Safety
          </p>

          <a
            href="/safety-center"
            className="block hover:text-blue-400"
          >
            🖥️ Safety Command Center
          </a>

          <a
            href="/live"
            className="block hover:text-blue-400"
          >
            🎥 Live Monitoring
          </a>

          <a
            href="/safety-events"
            className="block hover:text-blue-400"
          >
            🚨 Safety Events
          </a>

          <a
            href="/incidentclips"
            className="block hover:text-blue-400"
          >
            🎬 Incident Clips
          </a>

          <a
            href="/video-archive"
            className="block hover:text-blue-400"
          >
            📹 Video Archive
          </a>

          <a
            href="/video-search"
            className="block hover:text-blue-400"
          >
            🔎 Video Search
          </a>

          <a
            href="/video-requests"
            className="block hover:text-blue-400"
          >
            📤 Video Requests
          </a>

          <a
            href="/driver-score"
            className="block hover:text-blue-400"
          >
            🏆 Driver Safety Score
          </a>

          <a
            href="/violation-history"
            className="block hover:text-blue-400"
          >
            ⚠️ Violation History
          </a>

          <a
            href="/risk-engine"
            className="block hover:text-blue-400"
          >
            🧠 AI Risk Engine
          </a>

          <a
            href="/vehicle-risk"
            className="block hover:text-blue-400"
          >
            🚗 Top Risk Vehicles
          </a>

          <hr className="border-slate-800" />

          <p className="text-slate-500 text-xs uppercase">
            Fleet
          </p>

          <a
  href="/vehicles"
  className="block hover:text-blue-400"
>
  🚛 Vehicles
</a>

<a
  href="/fleet-map"
  className="block hover:text-blue-400"
>
  🗺 Fleet GPS Map
</a>

<a
  href="/drivers"
  className="block hover:text-blue-400"
>
  👨‍✈️ Drivers
</a>

          <a
            href="/customers"
            className="block hover:text-blue-400"
          >
            👥 Customers
          </a>

          <hr className="border-slate-800" />

          <p className="text-slate-500 text-xs uppercase">
            Operations
          </p>

          <a
            href="/trips"
            className="block hover:text-blue-400"
          >
            🛣️ Trips
          </a>

          <a
            href="/trip-expenses"
            className="block hover:text-blue-400"
          >
            💸 Trip Expenses
          </a>

          <hr className="border-slate-800" />

          <p className="text-slate-500 text-xs uppercase">
            Compliance
          </p>

          <a
            href="/maintenance-center"
            className="block hover:text-blue-400"
          >
            🔧 Maintenance Center
          </a>

          <a
            href="/document-center"
            className="block hover:text-blue-400"
          >
            📄 Document Center
          </a>
<a
  href="/document-alerts"
  className="block hover:text-blue-400"
>
  🚨 Document Alerts
</a>
          <hr className="border-slate-800" />

          <p className="text-slate-500 text-xs uppercase">
            Finance
          </p>

          <a
            href="/driver-salary"
            className="block hover:text-blue-400"
          >
            👨‍✈️ Driver Salary
          </a>

          <a
            href="/invoices"
            className="block hover:text-blue-400"
          >
            🧾 Invoices
          </a>

          <a
            href="/payments"
            className="block hover:text-blue-400"
          >
            💳 Payments
          </a>

          <a
            href="/receivables"
            className="block hover:text-blue-400"
          >
            📥 Receivables
          </a>

          <a
            href="/profitability"
            className="block hover:text-blue-400"
          >
            📈 Vehicle Profitability
          </a>

          <a
            href="/billing"
            className="block hover:text-blue-400"
          >
            💰 Billing
          </a>

        </nav>

      </aside>

      <div className="flex-1">

        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between">

          <div>
            AI Dashcam Fleet Platform
          </div>

          <div className="flex gap-4">
            <span>
              🚨 Safety Monitoring
            </span>

            <span>
              👤 Admin
            </span>
          </div>

        </header>

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}