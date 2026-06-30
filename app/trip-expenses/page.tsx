import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { erpModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function TripExpensesPage() {
  const config = erpModules["trip-expenses"];
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: expenses } = await filterByTenant(
    supabase
      .from("erp_trip_expenses")
      .select("*")
      .order("created_at", { ascending: false }),
    tenantId,
  );
  const rows = (expenses || []).map((expense) => [
    expense.trip_label,
    expense.category,
    expense.amount || 0,
    expense.recoverable ? "Yes" : "No",
    expense.approval_status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Expense control
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Trip Expenses
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live expense register with recoverable tagging, approval status,
            proof links, invoice recovery, exports, and variance review.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_trip_expenses"
          columns={["Trip", "Category", "Amount", "Recoverable", "Approval"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Trip Expense"
          table="erp_trip_expenses"
          initialRows={expenses || []}
          fields={[
            { key: "trip_label", label: "Trip", required: true },
            { key: "category", label: "Category", type: "select", options: ["Diesel", "Toll", "Driver advance", "Loading", "Unloading", "Detention", "Challan", "Misc"], required: true },
            { key: "amount", label: "Amount", type: "number", required: true },
            { key: "recoverable", label: "Recoverable", type: "checkbox" },
            { key: "proof_url", label: "Proof URL" },
            { key: "approval_status", label: "Approval", type: "select", options: ["pending", "approved", "rejected", "billed"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
