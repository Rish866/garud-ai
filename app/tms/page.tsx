import AppLayout from "../components/AppLayout";
import TripLifecycleClient from "../components/workflow/TripLifecycleClient";
import { loadBoard } from "../lib/operatingSystemData";

function money(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export default function TMSPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            AI Transport Management System
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Order to Cash TMS
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Book loads, approve rates, assign vehicle and driver, track
            geofence milestones, capture POD, generate invoice, and follow
            payment from one lifecycle.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Open loads", "18", "Ready for dispatch"],
            ["Assigned", "11", "Vehicle and driver locked"],
            ["POD pending", "6", "Billing blocked"],
            ["Order to cash", "82%", "Workflow completion"],
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

        <section className="mb-6 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Load Board</h2>
            <div className="mt-5 space-y-3">
              {loadBoard.map((load) => (
                <div
                  key={load.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500">
                        {load.id}
                      </p>
                      <h3 className="mt-1 font-bold text-white">{load.lane}</h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {load.customer} | {load.material}
                      </p>
                    </div>
                    <span className="rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                      {load.status}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">Rate</p>
                      <p className="font-bold text-white">{money(load.rate)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Vehicle</p>
                      <p className="font-bold text-white">{load.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Margin</p>
                      <p className="font-bold text-emerald-300">
                        {load.margin}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TripLifecycleClient />
        </section>
      </div>
    </AppLayout>
  );
}
