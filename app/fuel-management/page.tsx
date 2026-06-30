import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { financeModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function FuelManagementPage() {
  const config = financeModules["fuel-management"];
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: fuelLogs } = await filterByTenant(
    supabase.from("fuel_logs").select("*").order("created_at", { ascending: false }),
    tenantId,
  );
  const rows = (fuelLogs || []).map((fuel) => [
    fuel.vehicle_id || "-",
    fuel.trip_id || "-",
    fuel.fuel_date || "-",
    fuel.liters || 0,
    fuel.amount || 0,
    fuel.fuel_station || "-",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Fuel control
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Fuel Management
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live fuel ledger with vehicle, trip, litres, amount, odometer,
            station, mileage variance exports, and audit actions.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="fuel_logs"
          columns={["Vehicle", "Trip", "Date", "Litres", "Amount", "Station"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Fuel Log"
          table="fuel_logs"
          initialRows={fuelLogs || []}
          fields={[
            { key: "vehicle_id", label: "Vehicle ID", type: "number", required: true },
            { key: "trip_id", label: "Trip ID", type: "number" },
            { key: "fuel_date", label: "Fuel Date", type: "date", required: true },
            { key: "liters", label: "Litres", type: "number", required: true },
            { key: "amount", label: "Amount", type: "number", required: true },
            { key: "odometer", label: "Odometer", type: "number" },
            { key: "fuel_station", label: "Fuel Station" },
          ]}
        />
      </div>
    </AppLayout>
  );
}
