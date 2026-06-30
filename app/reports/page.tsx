import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import {
  complianceQueue,
  demoDrivers,
  demoTrips,
  demoVehicles,
  monthlyPerformance,
  receivableAging,
  reportCatalog,
  transporterKPIs,
} from "../lib/demoData";

function money(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export default function ReportsPage() {
  const totalRevenue = monthlyPerformance.reduce(
    (sum, month) => sum + month.revenue,
    0
  );
  const totalExpense = monthlyPerformance.reduce(
    (sum, month) => sum + month.expense,
    0
  );
  const totalAlerts = monthlyPerformance.reduce(
    (sum, month) => sum + month.alerts,
    0
  );
  const bestDriver = [...demoDrivers].sort(
    (a, b) => Number(b.safety_score || 0) - Number(a.safety_score || 0)
  )[0];
  const reportRows = reportCatalog.map((report) => [
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
            Transporter Reports & Analytics
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Ready-to-send reports for owners, accounts, safety managers,
            customers, compliance teams, and insurance claims.
          </p>
        </section>

        <ModuleActions
          moduleTitle="Transporter Reports & Analytics"
          exportName="garud-reports-library"
          columns={["Report", "Owner", "Cadence", "Output"]}
          rows={reportRows}
          reports={reportCatalog.map((report) => report.title)}
        />

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Quarter revenue", money(totalRevenue), "Last 4 months"],
            ["Quarter expenses", money(totalExpense), "Fuel, salary, repairs"],
            ["Safety alerts", totalAlerts, "Down month-on-month"],
            ["Best driver", bestDriver.name, `${bestDriver.safety_score}/100 score`],
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
              {reportCatalog.map((report) => (
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
                      href={`/reports?report=${encodeURIComponent(
                        report.title
                      )}`}
                      className="rounded-md bg-cyan-400 px-3 py-2 text-xs font-black text-slate-950"
                    >
                      Open Report
                    </a>
                    <a
                      href={`/billing-packs?report=${encodeURIComponent(
                        report.title
                      )}`}
                      className="rounded-md border border-white/15 px-3 py-2 text-xs font-bold text-slate-200"
                    >
                      Build Pack
                    </a>
                    <a
                      href={`/control-tower?report=${encodeURIComponent(
                        report.title
                      )}`}
                      className="rounded-md border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-200"
                    >
                      Raise Issue
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Monthly Trend</h2>
            <div className="mt-5 space-y-4">
              {monthlyPerformance.map((month) => {
                const profit = month.revenue - month.expense;
                const width = Math.round((profit / 700000) * 100);

                return (
                  <div key={month.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-semibold text-white">
                        {month.label}
                      </span>
                      <span className="text-cyan-300">{money(profit)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${Math.min(100, width)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Revenue {money(month.revenue)} | Alerts {month.alerts}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Customer Billing Pack</h2>
            <div className="mt-4 space-y-3">
              {demoTrips.slice(0, 4).map((trip) => (
                <div
                  key={trip.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <p className="font-semibold text-white">
                    Trip #{trip.id}: {trip.origin} to {trip.destination}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    POD + GPS trail + detention + invoice + payment status
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Compliance Snapshot</h2>
            <div className="mt-4 space-y-3">
              {complianceQueue.map((item) => (
                <div
                  key={`${item.item}-${item.vehicle}`}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div>
                    <p className="font-semibold text-white">{item.item}</p>
                    <p className="text-xs text-slate-500">
                      {item.vehicle} due in {item.due}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-amber-300">
                    {item.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Finance Snapshot</h2>
            <div className="mt-4 space-y-3">
              {receivableAging.map((row) => (
                <div
                  key={row.bucket}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div>
                    <p className="font-semibold text-white">{row.bucket}</p>
                    <p className="text-xs text-slate-500">{row.status}</p>
                  </div>
                  <span className="font-bold text-cyan-300">
                    {money(row.amount)}
                  </span>
                </div>
              ))}
              <div className="rounded-lg bg-cyan-400/10 p-4 text-sm text-cyan-200">
                Open invoices: {transporterKPIs.openInvoices}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
