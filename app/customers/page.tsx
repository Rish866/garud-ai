export default function CustomersPage() {
  const customers = [
    {
      name: "ABC Logistics",
      vehicles: 25,
      plan: "Professional",
      revenue: "₹19,975",
      status: "Active",
    },
    {
      name: "XYZ Mining",
      vehicles: 12,
      plan: "Enterprise",
      revenue: "₹9,588",
      status: "Active",
    },
    {
      name: "School Bus Fleet",
      vehicles: 40,
      plan: "Professional",
      revenue: "₹31,960",
      status: "Active",
    },
    {
      name: "FastTrack Transport",
      vehicles: 8,
      plan: "Starter",
      revenue: "₹3,992",
      status: "Trial",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Customer Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage fleet customers and subscriptions
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold">
          + Add Customer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Customers</p>
          <h2 className="text-3xl font-bold mt-2">4</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Vehicles</p>
          <h2 className="text-3xl font-bold mt-2">85</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Monthly Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-green-500">
            ₹65,515
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Active Plans</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-500">
            3
          </h2>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Customer List
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-4">Customer</th>
              <th className="text-left py-4">Vehicles</th>
              <th className="text-left py-4">Plan</th>
              <th className="text-left py-4">Revenue</th>
              <th className="text-left py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.name}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >
                <td className="py-4 font-medium">
                  {customer.name}
                </td>

                <td>{customer.vehicles}</td>

                <td>
                  <span className="bg-blue-900/40 px-3 py-1 rounded">
                    {customer.plan}
                  </span>
                </td>

                <td className="text-green-500 font-semibold">
                  {customer.revenue}
                </td>

                <td>
                  <span
                    className={
                      customer.status === "Active"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SaaS Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            Monthly Recurring Revenue
          </h3>

          <p className="text-4xl font-bold text-green-500">
            ₹65,515
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            Average Revenue / Customer
          </h3>

          <p className="text-4xl font-bold text-blue-500">
            ₹16,378
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            Fleet Retention
          </h3>

          <p className="text-4xl font-bold text-yellow-400">
            98%
          </p>
        </div>
      </div>
    </main>
  );
}