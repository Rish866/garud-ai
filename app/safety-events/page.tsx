import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { safetyModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function SafetyEventsPage() {
  const config = safetyModules["safety-events"];
  const supabase = createSupabaseAdminClient();
  const { data: events } = await supabase
    .from("erp_safety_events")
    .select("*")
    .order("occurred_at", { ascending: false });
  const rows = (events || []).map((event) => [
    event.event_type,
    event.vehicle_label,
    event.driver_label || "-",
    event.severity,
    event.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-300">
            AI safety
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Safety Events
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live DMS/ADAS event register with severity, coaching, evidence
            clip, closure status, PDF export, and control tower escalation.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_safety_events"
          columns={["Event", "Vehicle", "Driver", "Severity", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Safety Event"
          table="erp_safety_events"
          initialRows={events || []}
          fields={[
            { key: "vehicle_label", label: "Vehicle", required: true },
            { key: "driver_label", label: "Driver" },
            { key: "event_type", label: "Event Type", required: true },
            { key: "severity", label: "Severity", type: "select", options: ["low", "medium", "high", "critical"], required: true },
            { key: "gps_location", label: "GPS Location" },
            { key: "clip_url", label: "Clip URL" },
            { key: "coaching_required", label: "Coaching Required", type: "checkbox" },
            { key: "status", label: "Status", type: "select", options: ["open", "review", "coaching", "closed"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
