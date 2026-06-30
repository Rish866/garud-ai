import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { complianceModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function TyreManagementPage() {
  const config = complianceModules["tyre-management"];
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: tyres } = await filterByTenant(
    supabase
      .from("erp_tyre_records")
      .select("*")
      .order("recorded_at", { ascending: false }),
    tenantId,
  );
  const rows = (tyres || []).map((tyre) => [
    tyre.vehicle_label,
    tyre.tyre_serial,
    tyre.axle_position,
    tyre.tread_percent || 0,
    tyre.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Tyre control
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Tyre Management
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live tyre lifecycle records with fitment position, tread, pressure,
            cost, replacement decisions, exports, and action tracking.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_tyre_records"
          columns={["Vehicle", "Serial", "Position", "Tread", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Tyre Record"
          table="erp_tyre_records"
          initialRows={tyres || []}
          fields={[
            { key: "vehicle_label", label: "Vehicle", required: true },
            { key: "tyre_serial", label: "Tyre Serial", required: true },
            { key: "axle_position", label: "Axle Position", required: true },
            { key: "tread_percent", label: "Tread %", type: "number" },
            { key: "pressure_psi", label: "Pressure PSI", type: "number" },
            { key: "cost", label: "Cost", type: "number" },
            { key: "status", label: "Status", type: "select", options: ["active", "rotate", "replace", "scrap"], required: true },
            { key: "next_action", label: "Next Action" },
          ]}
        />
      </div>
    </AppLayout>
  );
}
