import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { complianceModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function DocumentCenterPage() {
  const config = complianceModules["document-center"];
  const supabase = createSupabaseAdminClient();
  const { data: documents } = await supabase
    .from("erp_documents")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (documents || []).map((doc) => [
    doc.entity_label,
    doc.document_type,
    doc.expiry_date || "-",
    doc.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Compliance vault
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Document Center
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live document register for vehicles, drivers, customers, PODs,
            expiry tracking, verification, dispatch blocks, and audit exports.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_documents"
          columns={["Entity", "Document", "Expiry", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Document"
          table="erp_documents"
          initialRows={documents || []}
          fields={[
            { key: "entity_type", label: "Entity Type", type: "select", options: ["vehicle", "driver", "customer", "trip"], required: true },
            { key: "entity_label", label: "Entity", required: true },
            { key: "document_type", label: "Document Type", required: true },
            { key: "document_number", label: "Document Number" },
            { key: "issue_date", label: "Issue Date", type: "date" },
            { key: "expiry_date", label: "Expiry Date", type: "date" },
            { key: "file_url", label: "File URL" },
            { key: "status", label: "Status", type: "select", options: ["pending", "verified", "expired", "blocked"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
