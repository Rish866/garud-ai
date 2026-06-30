import AppLayout from "../components/AppLayout";
import { routePlans } from "../lib/operatingSystemData";

export default function RoutePlannerPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Route intelligence
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Route Planner, Geofence & Detention Engine
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Plan truckable routes, geofence customer yards and tolls, detect
            route deviation, record arrival/departure, and auto-calculate
            detention for billing.
          </p>
        </section>

        <section className="grid gap-4">
          {routePlans.map((route) => (
            <div
              key={route.id}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-500">{route.id}</p>
                  <h2 className="mt-1 text-2xl font-black text-white">
                    {route.lane}
                  </h2>
                </div>
                <span className="rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                  ETA {route.eta}
                </span>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-sm font-bold text-white">
                    Geofence Milestones
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {route.geofences.map((geofence, index) => (
                      <div
                        key={geofence}
                        className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4"
                      >
                        <p className="text-xs font-bold text-cyan-300">
                          Stop {index + 1}
                        </p>
                        <p className="mt-2 font-semibold text-white">
                          {geofence}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                  <div className="rounded-lg bg-slate-950/80 p-4">
                    <p className="text-xs text-slate-500">Distance</p>
                    <p className="mt-2 text-xl font-black text-white">
                      {route.distance} km
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-950/80 p-4">
                    <p className="text-xs text-slate-500">Deviation</p>
                    <p className="mt-2 text-xl font-black text-white">
                      {route.deviation}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-950/80 p-4">
                    <p className="text-xs text-slate-500">Detention risk</p>
                    <p className="mt-2 text-xl font-black text-white">
                      {route.detentionRisk}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
