import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import VehicleTable from "../components/VehicleTable";
import { erpModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function VehiclesPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: vehicles } = await filterByTenant(
    supabase.from("vehicles").select("*").order("id", { ascending: false }),
    tenantId,
  );

  const rows = (vehicles || []).map((vehicle) => [
    vehicle.vehicle_number || `Vehicle ${vehicle.id}`,
    vehicle.driver_name || "-",
    vehicle.make || "-",
    vehicle.model || "-",
    vehicle.status || "Active",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Fleet master
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Vehicles
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live Supabase vehicle register with add, edit, delete, GPS status,
            export, reporting, and audit actions.
          </p>
        </section>

        <ModuleActions
          moduleTitle={erpModules.vehicles.title}
          moduleKey="vehicles"
          columns={["Vehicle", "Driver", "Make", "Model", "Status"]}
          rows={rows}
          reports={erpModules.vehicles.reports}
        />

        <VehicleTable vehicles={(vehicles || []) as any} />
      </div>
    </AppLayout>
  );
}
