import { notFound } from "next/navigation";
import AppLayout from "../../components/AppLayout";
import DatabaseWorkbench from "../../components/erp/DatabaseWorkbench";
import ModuleActions from "../../components/erp/ModuleActions";
import {
  architectureModules,
  findArchitectureModule,
} from "../../lib/erpArchitecture";
import { createSupabaseAdminClient } from "../../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function UniversalERPModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const config = findArchitectureModule(module);

  if (!config) {
    notFound();
  }

  let records: Record<string, string | number | boolean | null>[] = [];
  let tableReady = true;

  try {
    const supabase = createSupabaseAdminClient();
    const tenantId = await getTenantIdForData();
    const { data, error } = await filterByTenant(
      supabase
        .from("erp_module_records")
        .select("*")
        .eq("module_key", module)
        .order("created_at", { ascending: false }),
      tenantId,
    );

    if (error) {
      tableReady = false;
    } else {
      records = data || [];
    }
  } catch {
    tableReady = false;
  }

  const rows = records.map((record) => [
    String(record.title || "-"),
    String(record.record_type || "-"),
    String(record.party || "-"),
    String(record.vehicle_label || "-"),
    Number(record.amount || 0),
    String(record.status || "-"),
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            {config.group}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {config.title}
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            {config.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {config.features.map((feature) => (
              <span
                key={feature}
                className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </section>

        {!tableReady && (
          <section className="mb-6 rounded-lg border border-amber-400/30 bg-amber-400/10 p-5 text-amber-100">
            Run `supabase/migrations/002_universal_erp_architecture.sql` in
            Supabase SQL Editor to activate create/edit/delete records for this
            module.
          </section>
        )}

        <ModuleActions
          moduleTitle={config.title}
          moduleKey={config.key}
          columns={["Title", "Type", "Party", "Vehicle", "Amount", "Status"]}
          rows={rows}
          reports={[
            `${config.title} register`,
            `${config.title} pending report`,
            `${config.title} audit export`,
          ]}
        />

        <DatabaseWorkbench
          title={config.title}
          table="erp_module_records"
          defaultValues={{ module_key: config.key }}
          initialRows={records}
          fields={[
            { key: "record_type", label: "Record Type", required: true },
            { key: "title", label: "Title", required: true },
            { key: "party", label: "Party / Vendor / Customer" },
            { key: "vehicle_label", label: "Vehicle / Asset" },
            { key: "driver_label", label: "Driver / Operator" },
            { key: "amount", label: "Amount", type: "number" },
            {
              key: "priority",
              label: "Priority",
              type: "select",
              options: ["low", "normal", "medium", "high", "critical"],
              required: true,
            },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: ["open", "pending", "approved", "active", "closed"],
              required: true,
            },
            { key: "due_date", label: "Due Date", type: "date" },
            { key: "notes", label: "Notes" },
          ]}
        />
      </div>
    </AppLayout>
  );
}
