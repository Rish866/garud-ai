import AppLayout from "../components/AppLayout";
import { billingPacks } from "../lib/operatingSystemData";

export default function BillingPacksPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
            Billing proof
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            POD, GPS & Billing Pack Builder
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Create a customer-ready billing packet with POD, GPS trail,
            detention proof, fuel/toll proof, invoice PDF, and safety notes.
          </p>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {billingPacks.map((pack) => (
            <div
              key={pack.id}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-500">{pack.id}</p>
                  <h2 className="mt-1 text-xl font-black text-white">
                    Trip {pack.trip}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{pack.customer}</p>
                </div>
                <span className="rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                  {pack.status}
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {pack.includes.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950"
              >
                Generate pack
              </button>
            </div>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
