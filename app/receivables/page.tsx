import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

function money(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export const dynamic = "force-dynamic";

export default async function ReceivablesPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [{ data: invoices }, { data: payments }] = await Promise.all([
    filterByTenant(
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      tenantId,
    ),
    filterByTenant(supabase.from("payments").select("*"), tenantId),
  ]);
  const today = Date.now();
  const customerReceivables = (invoices || []).map((invoice) => {
    const paid = (payments || [])
      .filter((payment) => payment.invoice_id === invoice.id)
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const amount = Number(invoice.amount || 0);
    const ageDays = invoice.created_at
      ? Math.max(
          0,
          Math.floor((today - new Date(invoice.created_at).getTime()) / 86400000)
        )
      : 0;
    const outstanding = amount - paid;
    const status =
      outstanding <= 0
        ? "Collected"
        : ageDays > 45
        ? "Hold credit"
        : ageDays > 30
        ? "Escalate"
        : ageDays > 15
        ? "Follow up"
        : "Collect today";

    return {
      customer: `Trip ${invoice.trip_id || "-"}`,
      invoice: invoice.invoice_number || `INV-${invoice.id}`,
      amount,
      received: paid,
      age: `${ageDays} days`,
      status,
      outstanding,
    };
  });
  const totalOutstanding = customerReceivables.reduce(
    (sum, row) => sum + row.outstanding,
    0
  );
  const totalReceived = customerReceivables.reduce(
    (sum, row) => sum + row.received,
    0
  );
  const rows = customerReceivables.map((row) => [
    row.customer,
    row.invoice,
    row.amount,
    row.received,
    row.outstanding,
    row.age,
    row.status,
  ]);
  const aging = [
    {
      bucket: "0-15 days",
      amount: customerReceivables
        .filter((row) => Number(row.age.split(" ")[0]) <= 15)
        .reduce((sum, row) => sum + row.outstanding, 0),
      status: "Normal collection",
    },
    {
      bucket: "16-30 days",
      amount: customerReceivables
        .filter((row) => {
          const age = Number(row.age.split(" ")[0]);
          return age > 15 && age <= 30;
        })
        .reduce((sum, row) => sum + row.outstanding, 0),
      status: "Follow up",
    },
    {
      bucket: "31-45 days",
      amount: customerReceivables
        .filter((row) => {
          const age = Number(row.age.split(" ")[0]);
          return age > 30 && age <= 45;
        })
        .reduce((sum, row) => sum + row.outstanding, 0),
      status: "Escalate",
    },
    {
      bucket: "45+ days",
      amount: customerReceivables
        .filter((row) => Number(row.age.split(" ")[0]) > 45)
        .reduce((sum, row) => sum + row.outstanding, 0),
      status: "Credit hold",
    },
  ];

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

        <ModuleActions
          moduleTitle="Receivables & Credit Control"
          moduleKey="receivables"
          columns={["Customer", "Invoice", "Amount", "Received", "Outstanding", "Age", "Action"]}
          rows={rows}
          reports={["Receivable aging", "Customer ledger", "Credit hold report", "Collection forecast"]}
        />

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Outstanding", money(totalOutstanding), "Amount to collect"],
            ["Received", money(totalReceived), "Against open invoices"],
            ["Open invoices", customerReceivables.length, "Across customers"],
            ["Credit hold", customerReceivables.filter((row) => row.status === "Hold credit").length, "Accounts blocked"],
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
                      <tr key={row.invoice} className="border-b border-slate-800">
                        <td className="py-4 text-white">{row.customer}</td>
                        <td className="py-4 text-slate-300">{row.invoice}</td>
                        <td className="py-4 text-slate-300">
                          {money(row.amount)}
                        </td>
                        <td className="py-4 text-emerald-300">
                          {money(row.received)}
                        </td>
                        <td className="py-4 font-bold text-rose-300">{money(outstanding)}</td>
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
              {aging.map((row) => (
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
                    {row.status}
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
