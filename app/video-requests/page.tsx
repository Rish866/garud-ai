import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { safetyModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function VideoRequestsPage() {
  const config = safetyModules["video-requests"];
  const supabase = createSupabaseAdminClient();
  const { data: requests } = await supabase
    .from("erp_video_requests")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (requests || []).map((request) => [
    request.vehicle_label,
    request.trip_label || "-",
    request.requested_by,
    request.reason,
    request.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-300">
            Video evidence
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Video Requests
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live video request queue with trip, vehicle, requester, time window,
            export link, status, PDF logs, and evidence workflow.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_video_requests"
          columns={["Vehicle", "Trip", "Requested By", "Reason", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Video Request"
          table="erp_video_requests"
          initialRows={requests || []}
          fields={[
            { key: "vehicle_label", label: "Vehicle", required: true },
            { key: "trip_label", label: "Trip" },
            { key: "requested_by", label: "Requested By", required: true },
            { key: "reason", label: "Reason", required: true },
            { key: "from_time", label: "From Time" },
            { key: "to_time", label: "To Time" },
            { key: "export_url", label: "Export URL" },
            { key: "status", label: "Status", type: "select", options: ["requested", "approved", "exporting", "ready", "rejected"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
