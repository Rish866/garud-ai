export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-6">
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

        <a
          href="/live"
          className="block hover:text-blue-400"
        >
          🎥 Live Monitoring
        </a>

        <a
          href="/vehicles"
          className="block hover:text-blue-400"
        >
          🚛 Vehicles
        </a>

        <a
          href="/customers"
          className="block hover:text-blue-400"
        >
          👥 Customers
        </a>

        <a
          href="/billing"
          className="block hover:text-blue-400"
        >
          💰 Billing
        </a>

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

        <a
          href="/driver-salary"
          className="block hover:text-blue-400"
        >
          👨‍✈️ Driver Salary
        </a>

        <a
          href="/maintenance"
          className="block hover:text-blue-400"
        >
          🔧 Maintenance
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
          href="/vehicle-profit"
          className="block hover:text-blue-400"
        >
          📈 Vehicle Profitability
        </a>
      </nav>
    </aside>
  );
}