import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

function money(value: number) {
  return `INR ${Math.round(value || 0).toLocaleString("en-IN")}`;
}

function sumBy(entries: Array<Record<string, any>>, match: (entry: Record<string, any>) => boolean) {
  return entries.filter(match).reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
}

export default async function FinancialStatementsPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [{ data: entries }, { data: inventory }, { data: ledgerPostings }] = await Promise.all([
    filterByTenant(supabase.from("erp_accounting_entries").select("*"), tenantId),
    filterByTenant(supabase.from("erp_inventory_items").select("*"), tenantId),
    filterByTenant(supabase.from("erp_ledger_postings").select("*"), tenantId),
  ]);
  const safeEntries = entries || [];
  const safeInventory = inventory || [];
  const safeLedgerPostings = ledgerPostings || [];
  const purchases = sumBy(safeEntries, (entry) => String(entry.entry_type || "").startsWith("Purchase"));
  const sales = sumBy(safeEntries, (entry) => String(entry.entry_type || "").startsWith("Sales"));
  const directExpenses = sumBy(safeEntries, (entry) => String(entry.entry_type || "").includes("Expense"));
  const bankReceipts = sumBy(safeEntries, (entry) => String(entry.entry_type || "") === "Bank Receipt");
  const bankPayments = sumBy(safeEntries, (entry) => String(entry.entry_type || "") === "Bank Payment");
  const cashReceipts = sumBy(safeEntries, (entry) => String(entry.entry_type || "") === "Cash Receipt");
  const cashPayments = sumBy(safeEntries, (entry) => String(entry.entry_type || "") === "Cash Payment");
  const closingStock = safeInventory.reduce(
    (sum, item) => sum + Number(item.current_stock || 0) * Number(item.purchase_rate || 0),
    0,
  );
  const grossProfit = sales + closingStock - purchases;
  const netProfit = grossProfit - directExpenses;
  const cashBalance = cashReceipts - cashPayments;
  const bankBalance = bankReceipts - bankPayments;
  const assets = closingStock + Math.max(0, cashBalance) + Math.max(0, bankBalance);
  const liabilities = Math.abs(Math.min(0, cashBalance)) + Math.abs(Math.min(0, bankBalance));
  const capital = assets - liabilities;
  const rows = [
    ["Trading Account", "Sales", money(sales)],
    ["Trading Account", "Purchases", money(purchases)],
    ["Trading Account", "Closing stock", money(closingStock)],
    ["Profit and Loss", "Gross profit", money(grossProfit)],
    ["Profit and Loss", "Expenses", money(directExpenses)],
    ["Profit and Loss", "Net profit", money(netProfit)],
    ["Balance Sheet", "Assets", money(assets)],
    ["Balance Sheet", "Liabilities", money(liabilities)],
    ["Balance Sheet", "Capital balancing figure", money(capital)],
  ];
  const ledgerTotals = safeLedgerPostings.reduce<Record<string, { debit: number; credit: number }>>(
    (totals, posting) => {
      const ledgerName = String(posting.ledger_name || "Ledger");
      totals[ledgerName] ||= { debit: 0, credit: 0 };
      totals[ledgerName].debit += Number(posting.debit || 0);
      totals[ledgerName].credit += Number(posting.credit || 0);
      return totals;
    },
    {},
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Financial statements
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Trading, P&L & Balance Sheet
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Simple online statements generated from accounting entries and
            inventory stock for cement/construction agency operations.
          </p>
        </section>

        <ModuleActions
          moduleTitle="Financial Statements"
          moduleKey="financial-statements"
          columns={["Statement", "Head", "Amount"]}
          rows={rows}
          reports={["Trading account", "Profit and loss account", "Balance sheet"]}
        />

        <section className="grid gap-4 xl:grid-cols-3">
          {[
            {
              title: "Trading Account",
              lines: [
                ["Sales", sales],
                ["Purchases", purchases],
                ["Closing stock", closingStock],
                ["Gross profit", grossProfit],
              ],
            },
            {
              title: "Profit & Loss",
              lines: [
                ["Gross profit", grossProfit],
                ["Expenses", directExpenses],
                ["Net profit", netProfit],
              ],
            },
            {
              title: "Balance Sheet",
              lines: [
                ["Stock asset", closingStock],
                ["Cash balance", cashBalance],
                ["Bank balance", bankBalance],
                ["Liabilities", liabilities],
                ["Capital", capital],
              ],
            },
          ].map((statement) => (
            <div key={statement.title} className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-xl font-bold">{statement.title}</h2>
              <div className="mt-5 space-y-3">
                {statement.lines.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/80 p-4">
                    <p className="text-slate-400">{label}</p>
                    <p className="font-bold text-white">{money(Number(value))}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-lg border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-bold">Ledger Posting Summary</h2>
          <p className="mt-1 text-sm text-slate-400">
            Double-entry ledger lines auto-created from purchase, sales,
            receipt, payment, and expense vouchers.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="border-b border-slate-800 pb-3 font-medium">Ledger</th>
                  <th className="border-b border-slate-800 pb-3 font-medium">Debit</th>
                  <th className="border-b border-slate-800 pb-3 font-medium">Credit</th>
                  <th className="border-b border-slate-800 pb-3 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ledgerTotals).length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">
                      No ledger postings yet. New vouchers will post here automatically.
                    </td>
                  </tr>
                ) : null}
                {Object.entries(ledgerTotals).map(([ledgerName, total]) => (
                  <tr key={ledgerName} className="border-b border-slate-800">
                    <td className="py-3 font-bold text-white">{ledgerName}</td>
                    <td className="py-3 text-slate-300">{money(total.debit)}</td>
                    <td className="py-3 text-slate-300">{money(total.credit)}</td>
                    <td className="py-3 text-cyan-300">{money(total.debit - total.credit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
