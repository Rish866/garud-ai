import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { financeModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const config = financeModules.invoices;
  const supabase = createSupabaseAdminClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (invoices || []).map((invoice) => [
    invoice.invoice_number || `INV-${invoice.id}`,
    invoice.trip_id || "-",
    invoice.amount || 0,
    invoice.status || "Pending",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Billing ledger
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Invoices</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live invoice register with trip link, amount, status, PDF export,
            payment follow-up, and report-ready ledger controls.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="invoices"
          columns={["Invoice", "Trip", "Amount", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Invoice"
          table="invoices"
          initialRows={invoices || []}
          fields={[
            { key: "trip_id", label: "Trip ID", type: "number", required: true },
            { key: "invoice_number", label: "Invoice Number", required: true },
            { key: "amount", label: "Amount", type: "number", required: true },
            { key: "status", label: "Status", type: "select", options: ["Pending", "Sent", "Partial", "Paid", "Overdue", "Disputed"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
