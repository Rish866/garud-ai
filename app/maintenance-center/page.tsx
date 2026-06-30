import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { complianceModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function MaintenanceCenterPage() {
  const config = complianceModules["maintenance-center"];
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: jobs } = await filterByTenant(
    supabase
      .from("erp_maintenance_jobs")
      .select("*")
      .order("opened_at", { ascending: false }),
    tenantId,
  );
  const rows = (jobs || []).map((job) => [
    job.vehicle_label,
    job.issue,
    job.priority,
    job.estimated_cost || 0,
    job.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Workshop ERP
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Maintenance Center
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live job cards with priority, vendor, estimate, actual cost, status,
            dispatch hold decisions, exports, and audit actions.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_maintenance_jobs"
          columns={["Vehicle", "Issue", "Priority", "Estimate", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Maintenance Job"
          table="erp_maintenance_jobs"
          initialRows={jobs || []}
          fields={[
            { key: "vehicle_label", label: "Vehicle", required: true },
            { key: "job_type", label: "Job Type", required: true },
            { key: "issue", label: "Issue", required: true },
            { key: "priority", label: "Priority", type: "select", options: ["low", "medium", "high", "critical"], required: true },
            { key: "estimated_cost", label: "Estimated Cost", type: "number" },
            { key: "actual_cost", label: "Actual Cost", type: "number" },
            { key: "vendor_name", label: "Vendor" },
            { key: "status", label: "Status", type: "select", options: ["open", "in_progress", "waiting_parts", "closed"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
