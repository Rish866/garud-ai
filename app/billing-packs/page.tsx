import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function BillingPacksPage() {
  const supabase = createSupabaseAdminClient();
  const { data: packs } = await supabase
    .from("erp_billing_packs")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (packs || []).map((pack) => [
    pack.trip_label,
    pack.customer_label,
    pack.invoice_label || "-",
    pack.includes_pod ? "POD" : "POD missing",
    pack.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
            Billing proof
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            POD, GPS & Billing Pack Builder
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Create a customer-ready billing packet with POD, GPS trail,
            detention proof, fuel/toll proof, invoice PDF, and safety notes.
          </p>
        </section>

        <ModuleActions
          moduleTitle="POD, GPS & Billing Pack Builder"
          moduleKey="erp_billing_packs"
          columns={["Trip", "Customer", "Invoice", "POD", "Status"]}
          rows={rows}
          reports={["Customer billing packet", "POD proof pack", "GPS trail export", "Invoice evidence pack"]}
        />

        <DatabaseWorkbench
          title="Billing Pack"
          table="erp_billing_packs"
          initialRows={packs || []}
          fields={[
            { key: "trip_label", label: "Trip", required: true },
            { key: "customer_label", label: "Customer", required: true },
            { key: "invoice_label", label: "Invoice" },
            { key: "includes_pod", label: "POD Included", type: "checkbox" },
            { key: "includes_gps", label: "GPS Included", type: "checkbox" },
            { key: "includes_expenses", label: "Expenses Included", type: "checkbox" },
            { key: "includes_video", label: "Video Included", type: "checkbox" },
            { key: "share_url", label: "Share URL" },
            { key: "status", label: "Status", type: "select", options: ["draft", "review", "ready", "sent", "disputed"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
