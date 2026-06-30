export default function Sidebar() {
  const items = [
    ["Dashboard", "/dashboard"],
    ["Live Monitoring", "/live"],
    ["Vehicles", "/vehicles"],
    ["Customers", "/customers"],
    ["Billing", "/billing"],
    ["Trips", "/trips"],
    ["Trip Expenses", "/trip-expenses"],
    ["Driver Salary", "/driver-salary"],
    ["Maintenance", "/maintenance"],
    ["Invoices", "/invoices"],
    ["Payments", "/payments"],
    ["Receivables", "/receivables"],
    ["Vehicle Profitability", "/vehicle-profit"],
  ];

  return (
    <aside className="min-h-screen w-64 bg-slate-900 p-6">
      <h1 className="mb-8 text-2xl font-bold text-blue-500">GARUD AI</h1>

      <nav className="space-y-4">
        {items.map(([label, href]) => (
          <a key={href} href={href} className="block hover:text-blue-400">
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
