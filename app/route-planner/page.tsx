import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function RoutePlannerPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: routePlans } = await filterByTenant(
    supabase.from("erp_route_plans").select("*").order("created_at", { ascending: false }),
    tenantId,
  );
  const rows = (routePlans || []).map((route) => [
    route.lane_label,
    route.origin,
    route.destination,
    route.planned_km || 0,
    route.risk_level,
    route.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Route intelligence
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Route Planner, Geofence & Detention Engine
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Plan truckable routes, geofence customer yards and tolls, detect
            route deviation, record arrival/departure, and auto-calculate
            detention for billing.
          </p>
        </section>

        <ModuleActions
          moduleTitle="Route Planner, Geofence & Detention Engine"
          moduleKey="erp_route_plans"
          columns={["Lane", "Origin", "Destination", "KM", "Risk", "Status"]}
          rows={rows}
          reports={["Route plan export", "Detention estimate", "Lane risk report", "Fuel and toll estimate"]}
        />

        <DatabaseWorkbench
          title="Route Plan"
          table="erp_route_plans"
          initialRows={routePlans || []}
          fields={[
            { key: "lane_label", label: "Lane", required: true },
            { key: "origin", label: "Origin", required: true },
            { key: "destination", label: "Destination", required: true },
            { key: "planned_km", label: "Planned KM", type: "number" },
            { key: "planned_hours", label: "Planned Hours", type: "number" },
            { key: "toll_estimate", label: "Toll Estimate", type: "number" },
            { key: "fuel_estimate", label: "Fuel Estimate", type: "number" },
            { key: "risk_level", label: "Risk", type: "select", options: ["normal", "medium", "high", "critical"], required: true },
            { key: "status", label: "Status", type: "select", options: ["active", "hold", "archived"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
