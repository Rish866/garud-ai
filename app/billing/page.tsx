export default function BillingPage() {
  const subscriptions = [
    {
      customer: "ABC Logistics",
      plan: "Professional",
      billing: "Monthly",
      amount: "₹19,975",
      status: "Paid",
    },
    {
      customer: "XYZ Mining",
      plan: "Enterprise",
      billing: "Annual",
      amount: "₹115,000",
      status: "Paid",
    },
    {
      customer: "School Bus Fleet",
      plan: "Professional",
      billing: "Monthly",
      amount: "₹31,960",
      status: "Due",
    },
    {
      customer: "FastTrack Transport",
      plan: "Starter",
      billing: "Monthly",
      amount: "₹3,992",
      status: "Trial",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">
          Billing & Subscriptions
        </h1>

        <button className="bg-blue-600 px-4 py-2 rounded-lg">
          Generate Invoice
        </button>
      </div>

      {/* Revenue Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">MRR</p>
          <h2 className="text-3xl font-bold text-green-500">
            ₹65,515
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">ARR</p>
          <h2 className="text-3xl font-bold text-blue-500">
            ₹7.8L
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Active Plans</p>
          <h2 className="text-3xl font-bold">
            4
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Due Payments</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            1
          </h2>
        </div>

      </div>

      {/* Subscription Table */}
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Customer Subscriptions
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Plan</th>
              <th className="text-left py-3">Billing</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((sub) => (
              <tr
                key={sub.customer}
                className="border-b border-slate-800"
              >
                <td className="py-4">{sub.customer}</td>
                <td>{sub.plan}</td>
                <td>{sub.billing}</td>
                <td>{sub.amount}</td>

                <td>
                  <span
                    className={
                      sub.status === "Paid"
                        ? "text-green-500"
                        : sub.status === "Due"
                        ? "text-yellow-400"
                        : "text-blue-500"
                    }
                  >
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}