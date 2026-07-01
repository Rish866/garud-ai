import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import { complianceModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

type DocumentRecord = {
  id: string;
  entity_label?: string | null;
  document_type?: string | null;
  expiry_date?: string | null;
  status?: string | null;
};

function daysUntil(value?: string | null) {
  if (!value) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(value);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry.getTime() - today.getTime()) / 86400000);
}

function urgency(days: number | null, status?: string | null) {
  if (status === "expired" || (days !== null && days < 0)) return "Expired";
  if (days !== null && days <= 7) return "Critical";
  if (days !== null && days <= 30) return "High";
  if (days !== null && days <= 60) return "Medium";
  return "Healthy";
}

function dueText(days: number | null) {
  if (days === null) return "No expiry set";
  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return "Due today";
  return `${days} days left`;
}

export default async function DocumentAlertsPage() {
  const config = complianceModules["document-alerts"];
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data } = await filterByTenant(
    supabase.from("erp_documents").select("*").order("expiry_date", { ascending: true }),
    tenantId,
  );
  const documents = ((data || []) as DocumentRecord[]).filter(
    (doc) => doc.status !== "verified" || daysUntil(doc.expiry_date) !== null,
  );
  const expiring = documents.filter((doc) => {
    const days = daysUntil(doc.expiry_date);
    return doc.status === "expired" || (days !== null && days <= 60);
  });
  const critical = expiring.filter((doc) =>
    ["Expired", "Critical"].includes(urgency(daysUntil(doc.expiry_date), doc.status)),
  );
  const missingExpiry = documents.filter((doc) => !doc.expiry_date);
  const rows = expiring.map((doc) => {
    const days = daysUntil(doc.expiry_date);
    return [
      doc.entity_label || "-",
      doc.document_type || "-",
      dueText(days),
      urgency(days, doc.status),
      doc.status || "pending",
    ];
  });

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Compliance control
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Document Alerts
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live expiry watch for this customer workspace. Alerts appear only
            from uploaded vehicle, driver, trip, customer, and POD documents.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Documents", String(documents.length), "Tracked in this workspace"],
            ["Due in 60 days", String(expiring.length), "Needs follow-up"],
            ["Critical", String(critical.length), "Expired or due this week"],
            ["Missing expiry", String(missingExpiry.length), "Complete master data"],
          ].map(([label, value, hint]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-5"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <h2 className="mt-3 text-3xl font-black text-white">{value}</h2>
              <p className="mt-2 text-sm text-slate-500">{hint}</p>
            </div>
          ))}
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_documents"
          columns={["Entity", "Document", "Due", "Risk", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Expiry Queue</h2>
              <p className="mt-1 text-sm text-slate-400">
                Sorted from most urgent to least urgent.
              </p>
            </div>
            <a
              href="/document-center"
              className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
            >
              Add document
            </a>
          </div>

          <div className="mt-5 space-y-3">
            {expiring.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center">
                <h3 className="text-lg font-black text-white">
                  No document alerts yet
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Upload documents with expiry dates in Document Center. This
                  page will then show renewal alerts for this customer only.
                </p>
              </div>
            ) : null}

            {expiring.map((doc) => {
              const days = daysUntil(doc.expiry_date);
              const risk = urgency(days, doc.status);
              return (
                <div
                  key={doc.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">
                        {doc.document_type || "Document"}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {doc.entity_label || "Entity not set"}
                      </p>
                    </div>
                    <span className="rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                      {risk}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <p className="text-slate-500">Expiry</p>
                      <p className="font-bold text-white">
                        {doc.expiry_date || "Not set"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Due</p>
                      <p className="font-bold text-amber-300">{dueText(days)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Status</p>
                      <p className="font-bold text-emerald-300">
                        {doc.status || "pending"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
