import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

const requiredDocs = [
  "Vendor API documentation",
  "API base URL and authentication method",
  "API key/token or credential owner confirmation",
  "Vehicle number to device ID/IMEI mapping",
  "Sample location/event response",
  "Webhook details if vendor supports push events",
];

export default async function IntegrationsPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [{ data: integrations }, { data: mappings }] = await Promise.all([
    filterByTenant(
      supabase
        .from("erp_integrations")
        .select("*")
        .order("created_at", { ascending: false }),
      tenantId,
    ),
    filterByTenant(
      supabase
        .from("erp_device_mappings")
        .select("*")
        .order("created_at", { ascending: false }),
      tenantId,
    ),
  ]);

  const rows = (integrations || []).map((item) => [
    item.provider || "-",
    item.category || "-",
    item.status || "-",
    item.health_status || "not_checked",
    item.last_sync_at || "-",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Hardware-agnostic layer
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Device & Vendor Integrations
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            Connect customer-owned GPS, dashcams, fuel sensors, temperature
            sensors, e-locks, FASTag, Tally, and other vendors without replacing
            their existing hardware.
          </p>
        </section>

        <ModuleActions
          moduleTitle="Device & Vendor Integrations"
          moduleKey="erp_integrations"
          columns={["Provider", "Category", "Status", "Health", "Last Sync"]}
          rows={rows}
          reports={[
            "Integration registry",
            "Device mapping export",
            "Vendor health report",
            "API credential checklist",
          ]}
        />

        <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">First customer integration checklist</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {requiredDocs.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-6">
            <h2 className="text-xl font-bold text-cyan-100">How GARUD AI connects</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-cyan-50/90">
              <p>1. Register vendor API and credential reference.</p>
              <p>2. Map every customer vehicle to GPS/dashcam/sensor IDs.</p>
              <p>3. Pull or receive events into normalized ERP records.</p>
              <p>4. Use those events in live tracking, alerts, billing proof, and safety workflows.</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <DatabaseWorkbench
            title="Integration Vendor"
            table="erp_integrations"
            initialRows={(integrations || []) as any}
            fields={[
              { key: "provider", label: "Provider", required: true },
              {
                key: "category",
                label: "Category",
                type: "select",
                options: ["gps", "dashcam", "fuel_sensor", "temperature", "elock", "fastag", "tally", "whatsapp", "other"],
                required: true,
              },
              {
                key: "status",
                label: "Status",
                type: "select",
                options: ["planned", "credentials_received", "testing", "live", "failed", "paused"],
                required: true,
              },
              { key: "api_base_url", label: "API Base URL" },
              { key: "auth_type", label: "Auth Type", type: "select", options: ["api_key", "bearer_token", "basic", "oauth", "vendor_login", "webhook"] },
              { key: "credential_reference", label: "Credential Reference" },
              { key: "webhook_url", label: "Webhook URL" },
              { key: "health_status", label: "Health", type: "select", options: ["not_checked", "healthy", "degraded", "failed"] },
              { key: "notes", label: "Notes" },
            ]}
          />
        </section>

        <DatabaseWorkbench
          title="Vehicle Device Mapping"
          table="erp_device_mappings"
          initialRows={(mappings || []) as any}
          fields={[
            { key: "vehicle_number", label: "Vehicle Number", required: true },
            { key: "provider", label: "Provider", required: true },
            {
              key: "device_type",
              label: "Device Type",
              type: "select",
              options: ["gps", "dashcam", "fuel_sensor", "temperature_sensor", "elock", "camera_channel", "other"],
              required: true,
            },
            { key: "device_id", label: "Device ID" },
            { key: "imei", label: "IMEI" },
            { key: "sim_number", label: "SIM Number" },
            { key: "camera_channels", label: "Camera Channels" },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: ["pending", "mapped", "live", "inactive", "error"],
              required: true,
            },
            { key: "notes", label: "Notes" },
          ]}
        />
      </div>
    </AppLayout>
  );
}
