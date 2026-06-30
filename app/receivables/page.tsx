import AppLayout from "../components/AppLayout";
import {
  demoCustomers,
  receivableAging,
  transporterKPIs,
} from "../lib/demoData";

function money(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

const customerReceivables = [
  {
    customer: "TransOcean Logistics",
    invoice: "INV-2407-018",
    amount: 218000,
    received: 64000,
    age: "14 days",
    status: "Collect today",
  },
  {
    customer: "Bharat Auto Components",
    invoice: "INV-2407-014",
    amount: 164500,
    received: 0,
    age: "24 days",
    status: "Follow up",
  },
  {
    customer: "FreshRoute Cold Chain",
    invoice: "INV-2406-029",
    amount: 121000,
    received: 25000,
    age: "39 days",
    status: "Escalate",
  },
  {
    customer: "MetroMart Retail",
    invoice: "INV-2406-021",
    amount: 109000,
    received: 0,
    age: "52 days",
    status: "Hold credit",
  },
];

export default function ReceivablesPage() {
  const totalOutstanding = customerReceivables.reduce(
    (sum, row) => sum + (row.amount - row.received),
    0
  );
  const totalReceived = customerReceivables.reduce(
    (sum, row) => sum + row.received,
    0
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Collections command
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Receivables & Credit Control
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            See who owes money, which customers need follow-up, and where
            dispatch should be blocked until payment discipline improves.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Outstanding", money(totalOutstanding), "Amount to collect"],
            ["Received", money(totalReceived), "Against open invoices"],
            ["Open invoices", transporterKPIs.openInvoices, "Across customers"],
            ["Customers", demoCustomers.length, "Credit accounts"],
          ].map(([label, value, hint]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-5"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <h2 className="mt-3 text-3xl font-black text-white">{value}</h2>
              <p className="mt-2 text-sm text-slate-500">{hint}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.7fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Customer Collection Queue</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Invoice</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Received</th>
                    <th className="pb-3 font-medium">Outstanding</th>
                    <th className="pb-3 font-medium">Age</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerReceivables.map((row) => {
                    const outstanding = row.amount - row.received;

                    return (
                      <tr
                        key={row.invoice}
                        className="border-b border-slate-800"
                      >
                        <td className="py-4 text-white">{row.customer}</td>
                        <td className="py-4 text-slate-300">{row.invoice}</td>
                        <td className="py-4 text-slate-300">
                          {money(row.amount)}
                        </td>
                        <td className="py-4 text-emerald-300">
                          {money(row.received)}
                        </td>
                        <td className="py-4 font-bold text-rose-300">
                          {money(outstanding)}
                        </td>
                        <td className="py-4 text-slate-300">{row.age}</td>
                        <td className="py-4">
                          <span className="rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Aging Summary</h2>
            <div className="mt-5 space-y-4">
              {receivableAging.map((row) => (
                <div key={row.bucket}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">{row.bucket}</span>
                    <span className="font-bold text-white">
                      {money(row.amount)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${Math.min(100, row.amount / 2500)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {row.count} invoices | {row.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
