import AppLayout from "../components/AppLayout";
import IssueTowerClient from "../components/workflow/IssueTowerClient";

export default function ControlTowerPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-300">
            Control tower
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Issue Management & SLA Tower
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Fleetx-style control tower, but deeper: safety events, POD delays,
            credit holds, maintenance holds, and customer disputes all become
            trackable issues with owner, SLA, evidence, and closure.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Open issues", "4", "Across departments"],
            ["SLA at risk", "2", "Escalate now"],
            ["Evidence attached", "76%", "Video/GPS/POD proof"],
            ["Avg closure", "3.4 hrs", "This week"],
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

        <IssueTowerClient />
      </div>
    </AppLayout>
  );
}
