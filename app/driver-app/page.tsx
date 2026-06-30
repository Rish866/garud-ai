import AppLayout from "../components/AppLayout";
import { driverAppTasks } from "../lib/operatingSystemData";

export default function DriverAppPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
            Driver mobile workflow
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Driver App Command Flow
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            A driver-side experience for accepting trips, uploading POD, adding
            expenses, reporting breakdowns, SOS, and acknowledging safety
            coaching.
          </p>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-4">
            <div className="rounded-[24px] bg-slate-950 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                GARUD Driver
              </p>
              <h2 className="mt-3 text-2xl font-black">Today&apos;s Trip</h2>
              <p className="mt-2 text-sm text-slate-400">
                MH04XY5678 | JNPT to Bhiwandi
              </p>
              <div className="mt-5 space-y-3">
                {driverAppTasks.map((task) => (
                  <div
                    key={task.task}
                    className="rounded-lg border border-slate-800 bg-slate-900 p-4"
                  >
                    <p className="font-bold text-white">{task.task}</p>
                    <p className="mt-1 text-xs text-slate-500">{task.detail}</p>
                    <p className="mt-3 text-xs font-bold text-cyan-300">
                      {task.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Trip acceptance", "Driver confirms duty and vehicle before loading."],
              ["Expense capture", "Fuel, toll, loading, challan, and advance proof upload."],
              ["POD capture", "Photo, signature, receiver name, GPS, and timestamp."],
              ["Safety coaching", "Driver acknowledges AI event clips before next dispatch."],
              ["Breakdown report", "Driver raises issue with photo, location, and severity."],
              ["SOS", "Emergency alert to control tower with live location."],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-lg border border-slate-800 bg-slate-900/80 p-5"
              >
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
