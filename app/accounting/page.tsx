import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

function money(value: number) {
  return `INR ${Math.round(value || 0).toLocaleString("en-IN")}`;
}

export default async function AccountingPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data } = await filterByTenant(
    supabase.from("erp_accounting_entries").select("*").order("entry_date", { ascending: false }),
    tenantId,
  );
  const entries = data || [];
  const totalPurchase = entries
    .filter((entry) => String(entry.entry_type || "").startsWith("Purchase"))
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const totalSales = entries
    .filter((entry) => String(entry.entry_type || "").startsWith("Sales"))
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const cashBank = entries
    .filter((entry) => ["Bank Payment", "Bank Receipt", "Cash Payment", "Cash Receipt"].includes(String(entry.entry_type || "")))
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const expenses = entries
    .filter((entry) => String(entry.entry_type || "").includes("Expense"))
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const rows = entries.map((entry) => [
    entry.entry_date || "-",
    entry.entry_type || "-",
    entry.party_name || entry.ledger_name || "-",
    entry.item_name || "-",
    money(Number(entry.amount || 0)),
    entry.status || "open",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Tally-style accounting
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Accounting Entries
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Enter purchase credit, purchase cash, sales cash, sales credit,
            bank/cash receipts and payments, and expenses from one online desk.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Purchases", money(totalPurchase), "Cash + credit"],
            ["Sales", money(totalSales), "Cash + credit"],
            ["Cash/Bank flow", money(cashBank), "Receipts + payments"],
            ["Expenses", money(expenses), "Cash + bank"],
          ].map(([label, value, hint]) => (
            <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <h2 className="mt-3 text-3xl font-black text-white">{value}</h2>
              <p className="mt-2 text-sm text-slate-500">{hint}</p>
            </div>
          ))}
        </section>

        <ModuleActions
          moduleTitle="Accounting Entries"
          moduleKey="erp_accounting_entries"
          columns={["Date", "Type", "Party/Ledger", "Item", "Amount", "Status"]}
          rows={rows}
          reports={["Purchase register", "Sales register", "Cash book", "Bank book", "Expense ledger"]}
        />

        <DatabaseWorkbench
          title="Accounting Entry"
          table="erp_accounting_entries"
          initialRows={entries}
          fields={[
            { key: "entry_date", label: "Date", type: "date", required: true },
            {
              key: "entry_type",
              label: "Entry Type",
              type: "select",
              required: true,
              options: [
                "Purchase - Credit",
                "Purchase - Cash",
                "Sales - Cash",
                "Sales - Credit",
                "Bank Payment",
                "Bank Receipt",
                "Cash Payment",
                "Cash Receipt",
                "Expense - Cash",
                "Expense - Bank",
              ],
            },
            { key: "voucher_no", label: "Voucher / Bill No." },
            { key: "party_name", label: "Party Name" },
            { key: "ledger_name", label: "Ledger Head" },
            { key: "item_name", label: "Item / Material" },
            { key: "quantity", label: "Quantity", type: "number" },
            { key: "unit", label: "Unit" },
            { key: "rate", label: "Rate", type: "number" },
            { key: "amount", label: "Amount", type: "number", required: true },
            { key: "tax_amount", label: "Tax Amount", type: "number" },
            { key: "payment_mode", label: "Payment Mode", type: "select", options: ["Cash", "Bank", "UPI", "Cheque", "Credit"] },
            { key: "bank_name", label: "Bank Name" },
            { key: "reference_no", label: "Reference No." },
            { key: "status", label: "Status", type: "select", options: ["open", "paid", "received", "pending"], required: true },
            { key: "notes", label: "Notes" },
          ]}
        />
      </div>
    </AppLayout>
  );
}
