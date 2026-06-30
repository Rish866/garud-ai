import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { financeModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const config = financeModules.payments;
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: payments } = await filterByTenant(
    supabase.from("payments").select("*").order("created_at", { ascending: false }),
    tenantId,
  );
  const rows = (payments || []).map((payment) => [
    payment.invoice_id || "-",
    payment.payment_date || "-",
    payment.amount || 0,
    payment.payment_method || "-",
    payment.utr_number || "-",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Cash control
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Payments</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live receipt and reconciliation ledger with invoice mapping,
            method, UTR, notes, PDF exports, and control tower actions.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="payments"
          columns={["Invoice", "Date", "Amount", "Method", "UTR"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Payment"
          table="payments"
          initialRows={payments || []}
          fields={[
            { key: "invoice_id", label: "Invoice ID", type: "number", required: true },
            { key: "payment_date", label: "Payment Date", type: "date", required: true },
            { key: "amount", label: "Amount", type: "number", required: true },
            { key: "payment_method", label: "Payment Method", type: "select", options: ["NEFT", "RTGS", "UPI", "Cheque", "Cash", "Card"] },
            { key: "utr_number", label: "UTR / Reference" },
            { key: "notes", label: "Notes" },
          ]}
        />
      </div>
    </AppLayout>
  );
}
