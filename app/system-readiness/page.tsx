import AppLayout from "../components/AppLayout";
import { erpTableRequirements } from "../lib/erpSchema";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

async function getReadiness() {
  try {
    const supabase = createSupabaseAdminClient();
    const checks = await Promise.all(
      erpTableRequirements.map(async (item) => {
        const { count, error } = await supabase
          .from(item.table)
          .select("*", { count: "exact", head: true });

        return {
          ...item,
          ready: !error,
          count: count || 0,
          error: error?.message || null,
        };
      })
    );

    const critical = checks.filter((item) => item.critical);
    const readyCritical = critical.filter((item) => item.ready).length;

    return {
      connected: true,
      score: Math.round((readyCritical / critical.length) * 100),
      checks,
    };
  } catch {
    return {
      connected: false,
      score: 0,
      checks: erpTableRequirements.map((item) => ({
        ...item,
        ready: false,
        count: 0,
        error: "Supabase server connection unavailable",
      })),
    };
  }
}

export default async function SystemReadinessPage() {
  const readiness = await getReadiness();
  const missingCritical = readiness.checks.filter(
    (item) => item.critical && !item.ready
  ).length;

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Production readiness
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            ERP Backbone Health
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live database check for the tables required to move GARUD AI from
            demo screens to a working transporter ERP.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Readiness score</p>
            <h2 className="mt-3 text-4xl font-black text-white">
              {readiness.score}%
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Critical ERP tables available
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Supabase connection</p>
            <h2
              className={`mt-3 text-3xl font-black ${
                readiness.connected ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {readiness.connected ? "Connected" : "Blocked"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Server-side key check
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Critical gaps</p>
            <h2 className="mt-3 text-4xl font-black text-white">
              {missingCritical}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Must be fixed before production
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-bold">Database Modules</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-medium">Module</th>
                  <th className="pb-3 font-medium">Table</th>
                  <th className="pb-3 font-medium">Purpose</th>
                  <th className="pb-3 font-medium">Rows</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {readiness.checks.map((item) => (
                  <tr key={item.table} className="border-b border-slate-800">
                    <td className="py-4 font-semibold text-white">
                      {item.module}
                    </td>
                    <td className="py-4 text-slate-300">{item.table}</td>
                    <td className="py-4 text-slate-300">{item.label}</td>
                    <td className="py-4 text-slate-300">{item.count}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-md px-2.5 py-1.5 text-xs font-bold ${
                          item.ready
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-rose-400/10 text-rose-300"
                        }`}
                      >
                        {item.ready ? "Ready" : "Missing"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
