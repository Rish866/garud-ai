import Link from "next/link";
import AppLayout from "../AppLayout";
import ModuleActions from "./ModuleActions";

export type ERPMetric = {
  label: string;
  value: string | number;
  hint: string;
  tone?: "cyan" | "emerald" | "amber" | "rose" | "blue";
};

export type ERPAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type ERPWorkflow = {
  title: string;
  owner: string;
  status: string;
  due: string;
};

export type ERPTable = {
  title: string;
  columns: string[];
  rows: Array<Array<string | number>>;
};

export type ERPModuleConfig = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: ERPAction;
  secondaryActions: ERPAction[];
  metrics: ERPMetric[];
  workflows: ERPWorkflow[];
  table: ERPTable;
  automations: string[];
  reports: string[];
};

function toneClass(tone: ERPMetric["tone"] = "cyan") {
  const tones = {
    cyan: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    emerald: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    amber: "text-amber-300 bg-amber-400/10 border-amber-400/20",
    rose: "text-rose-300 bg-rose-400/10 border-rose-400/20",
    blue: "text-blue-300 bg-blue-400/10 border-blue-400/20",
  };

  return tones[tone];
}

export default function ERPModulePage({ config }: { config: ERPModuleConfig }) {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)]">
          <div className="grid gap-6 p-6 xl:grid-cols-[1fr_0.72fr]">
            <div>
              <p className="w-fit rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                {config.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
                {config.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                {config.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={config.primaryAction.href}
                  className="rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  {config.primaryAction.label}
                </Link>
                {config.secondaryActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-bold text-white">Module readiness</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {config.metrics.slice(0, 4).map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-lg border p-4 ${toneClass(metric.tone)}`}
                  >
                    <p className="text-xs opacity-80">{metric.label}</p>
                    <p className="mt-2 text-2xl font-black">{metric.value}</p>
                    <p className="mt-1 text-xs opacity-70">{metric.hint}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey={config.eyebrow}
          columns={config.table.columns}
          rows={config.table.rows}
          reports={config.reports}
        />

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {config.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-5"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <h2 className="mt-3 text-3xl font-black text-white">
                {metric.value}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{metric.hint}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Operating Workflow</h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {config.workflows.map((item) => (
                <div
                  key={`${item.title}-${item.owner}`}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Owner: {item.owner}
                      </p>
                    </div>
                    <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-xs font-bold text-cyan-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">Due: {item.due}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Automations</h2>
            <div className="mt-5 space-y-3">
              {config.automations.map((automation, index) => (
                <div
                  key={automation}
                  className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-400/10 text-xs font-black text-emerald-200">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-300">
                    {automation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">{config.table.title}</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    {config.table.columns.map((column) => (
                      <th key={column} className="pb-3 font-medium">
                        {column}
                      </th>
                    ))}
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {config.table.rows.map((row) => (
                    <tr
                      key={row.join("-")}
                      className="border-b border-slate-800"
                    >
                      {row.map((cell, index) => (
                        <td
                          key={`${cell}-${index}`}
                          className={
                            index === 0
                              ? "py-4 font-semibold text-white"
                              : "py-4 text-slate-300"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                      <td className="py-4">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`${config.primaryAction.href}?record=${encodeURIComponent(
                              String(row[0])
                            )}`}
                            className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1.5 text-xs font-bold text-cyan-200 transition hover:bg-cyan-400/15"
                          >
                            Open
                          </Link>
                          <Link
                            href={`/control-tower?module=${encodeURIComponent(
                              config.title
                            )}&record=${encodeURIComponent(String(row[0]))}`}
                            className="rounded-md border border-amber-400/25 bg-amber-400/10 px-2.5 py-1.5 text-xs font-bold text-amber-200 transition hover:bg-amber-400/15"
                          >
                            Issue
                          </Link>
                          <Link
                            href={`/reports?module=${encodeURIComponent(
                              config.title
                            )}&record=${encodeURIComponent(String(row[0]))}`}
                            className="rounded-md border border-white/15 px-2.5 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-white/10"
                          >
                            Report
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Reports in this module</h2>
            <div className="mt-5 space-y-3">
              {config.reports.map((report) => (
                <div
                  key={report}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <p className="font-semibold text-white">{report}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Export-ready for owner, customer, or auditor review.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/reports?report=${encodeURIComponent(report)}`}
                      className="rounded-md bg-cyan-400 px-2.5 py-1.5 text-xs font-black text-slate-950"
                    >
                      Open
                    </Link>
                    <Link
                      href={`/billing-packs?report=${encodeURIComponent(
                        report
                      )}`}
                      className="rounded-md border border-white/15 px-2.5 py-1.5 text-xs font-bold text-slate-200"
                    >
                      Pack
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
