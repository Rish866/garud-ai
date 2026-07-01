import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

function money(value: number) {
  return `INR ${Math.round(value || 0).toLocaleString("en-IN")}`;
}

function total(rows: Array<Record<string, any>>, key: string) {
  return rows.reduce((sum, row) => sum + Number(row[key] || 0), 0);
}

const reportCards = [
  {
    title: "Trip Profitability",
    owner: "Owner / Operations",
    cadence: "Daily",
    output: "Trip revenue, expense, margin, and billing readiness.",
    href: "/profitability",
  },
  {
    title: "Customer Outstanding",
    owner: "Finance",
    cadence: "Daily",
    output: "Invoices, payments, pending receivables, and credit exposure.",
    href: "/receivables",
  },
  {
    title: "Fleet Compliance",
    owner: "Compliance",
    cadence: "Weekly",
    output: "Vehicle, driver, and trip document expiry queue.",
    href: "/document-alerts",
  },
  {
    title: "Fuel Spend",
    owner: "Finance / Fleet",
    cadence: "Weekly",
    output: "Fuel amount, litres, station, and vehicle/trip linkage.",
    href: "/fuel-management",
  },
  {
    title: "Maintenance Cost",
    owner: "Workshop",
    cadence: "Weekly",
    output: "Open jobs, estimated cost, actual cost, and vendor spend.",
    href: "/maintenance-center",
  },
  {
    title: "AI Safety Events",
    owner: "Safety",
    cadence: "Daily",
    output: "Events, severity, vehicle, driver, and closure status.",
    href: "/safety-events",
  },
];

export default async function ReportsPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [
    { data: trips },
    { data: invoices },
    { data: payments },
    { data: documents },
    { data: fuelLogs },
    { data: maintenanceJobs },
    { data: safetyEvents },
  ] = await Promise.all([
    filterByTenant(supabase.from("trips").select("*").order("id", { ascending: false }), tenantId),
    filterByTenant(supabase.from("invoices").select("*").order("id", { ascending: false }), tenantId),
    filterByTenant(supabase.from("payments").select("*").order("id", { ascending: false }), tenantId),
    filterByTenant(supabase.from("erp_documents").select("*"), tenantId),
    filterByTenant(supabase.from("fuel_logs").select("*"), tenantId),
    filterByTenant(supabase.from("erp_maintenance_jobs").select("*"), tenantId),
    filterByTenant(supabase.from("erp_safety_events").select("*"), tenantId),
  ]);

  const safeTrips = trips || [];
  const safeInvoices = invoices || [];
  const safePayments = payments || [];
  const safeDocuments = documents || [];
  const safeFuelLogs = fuelLogs || [];
  const safeMaintenanceJobs = maintenanceJobs || [];
  const safeSafetyEvents = safetyEvents || [];
  const revenue = total(safeTrips, "revenue");
  const invoiceAmount = total(safeInvoices, "amount");
  const collected = total(safePayments, "amount");
  const receivable = Math.max(0, invoiceAmount - collected);
  const fuelSpend = total(safeFuelLogs, "amount");
  const workshopSpend = safeMaintenanceJobs.reduce(
    (sum, job) => sum + Number(job.actual_cost || job.estimated_cost || 0),
    0,
  );
  const reportRows = reportCards.map((report) => [
    report.title,
    report.owner,
    report.cadence,
    report.output,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Reports command desk
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Reports & Analytics
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Customer-specific reports generated from live trips, invoices,
            payments, documents, fuel logs, workshop jobs, and AI safety events.
          </p>
        </section>

        <ModuleActions
          moduleTitle="Reports & Analytics"
          exportName="garud-reports-library"
          columns={["Report", "Owner", "Cadence", "Output"]}
          rows={reportRows}
          reports={reportCards.map((report) => report.title)}
        />

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Trip revenue", money(revenue), `${safeTrips.length} trips`],
            ["Receivable", money(receivable), `${safeInvoices.length} invoices`],
            ["Fuel spend", money(fuelSpend), `${safeFuelLogs.length} fuel logs`],
            ["Workshop cost", money(workshopSpend), `${safeMaintenanceJobs.length} jobs`],
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

        <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Report Library</h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {reportCards.map((report) => (
                <div
                  key={report.title}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white">{report.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {report.output}
                      </p>
                    </div>
                    <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-xs font-bold text-cyan-300">
                      {report.cadence}
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                    Owner: {report.owner}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={report.href}
                      className="rounded-md bg-cyan-400 px-3 py-2 text-xs font-black text-slate-950"
                    >
                      Open Report
                    </a>
                    <a
                      href="/billing-packs"
                      className="rounded-md border border-white/15 px-3 py-2 text-xs font-bold text-slate-200"
                    >
                      Build Pack
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Readiness Snapshot</h2>
            <div className="mt-5 space-y-3">
              {[
                ["Documents", String(safeDocuments.length), "Document center records"],
                ["Safety events", String(safeSafetyEvents.length), "AI event records"],
                ["Payments", money(collected), "Collected against invoices"],
                ["Open reports", String(reportCards.length), "Available report types"],
              ].map(([label, value, hint]) => (
                <div
                  key={label}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-slate-400">{label}</p>
                    <p className="font-bold text-white">{value}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{hint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
