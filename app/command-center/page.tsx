import Link from "next/link";

type Vehicle = {
  id: string;
  vehicleNumber: string;
  driver: string;
  status: "LIVE" | "IDLE" | "OFFLINE";
  location: string;
  speed: number;
  cameras: number;
  alerts: number;
};

const vehicles: Vehicle[] = [
  {
    id: "1",
    vehicleNumber: "MH04XY5678",
    driver: "Rajesh",
    status: "LIVE",
    location: "Panvel, Navi Mumbai",
    speed: 42,
    cameras: 4,
    alerts: 2,
  },
  {
    id: "2",
    vehicleNumber: "MH12PQ7890",
    driver: "Anit",
    status: "IDLE",
    location: "Pune Bypass",
    speed: 0,
    cameras: 4,
    alerts: 0,
  },
  {
    id: "3",
    vehicleNumber: "MH43CQ1100",
    driver: "Lala",
    status: "OFFLINE",
    location: "Taloja MIDC",
    speed: 0,
    cameras: 0,
    alerts: 1,
  },
];

function statusStyle(status: Vehicle["status"]) {
  if (status === "LIVE") return "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30";
  if (status === "IDLE") return "bg-amber-500/15 text-amber-300 ring-amber-400/30";
  return "bg-rose-500/15 text-rose-300 ring-rose-400/30";
}

export default function CommandCenterPage() {
  const liveVehicles = vehicles.filter((vehicle) => vehicle.status === "LIVE").length;
  const onlineCameras = vehicles.reduce((total, vehicle) => total + vehicle.cameras, 0);
  const activeAlerts = vehicles.reduce((total, vehicle) => total + vehicle.alerts, 0);

  return (
    <main className="min-h-screen bg-[#05070d] text-slate-100">
      <section className="border-b border-white/10 bg-[#080b13] px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
              GARUD AI
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              Enterprise Command Center
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
              <p className="text-xs text-slate-400">Live Vehicles</p>
              <p className="text-lg font-bold text-emerald-300">{liveVehicles}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
              <p className="text-xs text-slate-400">Online Cameras</p>
              <p className="text-lg font-bold text-cyan-300">{onlineCameras}</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
              <p className="text-xs text-slate-400">AI Events</p>
              <p className="text-lg font-bold text-rose-300">{activeAlerts}</p>
            </div>

            <Link
              href="/live"
              className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 hover:bg-white/10"
            >
              Old Live Backup
            </Link>
          </div>
        </div>
      </section>

      <section className="grid min-h-[calc(100vh-89px)] grid-cols-12 gap-4 p-4">
        <aside className="col-span-12 rounded-2xl border border-white/10 bg-[#080b13] p-4 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                Vehicle Fleet
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Select vehicle for camera and telemetry feed
              </p>
            </div>
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              {vehicles.length} Units
            </span>
          </div>

          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{vehicle.vehicleNumber}</p>
                    <p className="mt-1 text-xs text-slate-400">Driver: {vehicle.driver}</p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${statusStyle(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg bg-black/30 p-2">
                    <p className="text-slate-500">Speed</p>
                    <p className="font-semibold text-slate-200">{vehicle.speed} km/h</p>
                  </div>
                  <div className="rounded-lg bg-black/30 p-2">
                    <p className="text-slate-500">CH</p>
                    <p className="font-semibold text-slate-200">{vehicle.cameras}/4</p>
                  </div>
                  <div className="rounded-lg bg-black/30 p-2">
                    <p className="text-slate-500">AI</p>
                    <p className="font-semibold text-rose-300">{vehicle.alerts}</p>
                  </div>
                </div>

                <p className="mt-3 truncate text-xs text-slate-500">
                  {vehicle.location}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <section className="col-span-12 rounded-2xl border border-white/10 bg-[#080b13] p-4 xl:col-span-6">
          <div className="flex h-full min-h-[520px] items-center justify-center rounded-2xl border border-dashed border-cyan-400/20 bg-black/30">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                4CH Camera Wall
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Pack 2 Coming Next
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                This center area will become the hero 4-camera live video wall.
              </p>
            </div>
          </div>
        </section>

        <aside className="col-span-12 rounded-2xl border border-white/10 bg-[#080b13] p-4 xl:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
            AI Events
          </h2>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm font-semibold text-white">Events panel placeholder</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Pack 3 will add harsh braking, driver distraction, lane deviation,
              overspeeding and evidence tagging.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}