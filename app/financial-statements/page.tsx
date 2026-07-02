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
  const [{ data: entries }, { data: inventory }] = await Promise.all([
    filterByTenant(supabase.from("erp_accounting_entries").select("*"), tenantId),
    filterByTenant(supabase.from("erp_inventory_items").select("*"), tenantId),
  ]);
  const safeEntries = entries || [];
  const safeInventory = inventory || [];
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
      </div>
    </AppLayout>
  );
}
