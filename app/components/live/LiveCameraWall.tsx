import type { Vehicle } from "../../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LiveCameraWall({ selectedVehicle }: Props) {
  const vehicleNumber = selectedVehicle?.vehicle_number || "Selected Vehicle";

  const cameras = [
    {
      channel: "CH1",
      title: "Front Road",
      status: "LIVE",
      ai: "Road AI",
    },
    {
      channel: "CH2",
      title: "Cabin Driver",
      status: "LIVE",
      ai: "Driver AI",
    },
    {
      channel: "CH3",
      title: "Left Side",
      status: "LIVE",
      ai: "Blind Spot",
    },
    {
      channel: "CH4",
      title: "Rear View",
      status: "OFFLINE",
      ai: "Rear AI",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold text-white">
            4CH Camera Wall
          </h2>
          <p className="text-sm text-slate-400">
            {vehicleNumber} synchronized dashcam view
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
            ● Recording
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
            AI Enabled
          </span>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
            4CH DVR
          </span>
        </div>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-slate-700 bg-black md:grid-cols-2">
        {cameras.map((camera) => (
          <div
            key={camera.channel}
            className="relative h-[240px] border border-slate-800 bg-black xl:h-[300px]"
          >
            <div className="absolute left-3 top-3 z-10 rounded-lg bg-black/80 px-3 py-1 text-xs font-bold text-white">
              {camera.channel} · {camera.title}
            </div>

            <div
              className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold ${
                camera.status === "LIVE"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              ● {camera.status}
            </div>

            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900">
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-slate-700 bg-slate-900" />
                <p className="text-sm font-bold text-white">
                  Stream Ready
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  RTSP / HLS / WebRTC
                </p>
                <p className="mt-2 text-xs font-semibold text-blue-400">
                  {camera.ai}
                </p>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              <button
                onClick={() => alert(`${camera.channel} fullscreen`)}
                className="rounded-lg bg-slate-900/90 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Fullscreen
              </button>

              <button
                onClick={() => alert(`${camera.channel} snapshot captured`)}
                className="rounded-lg bg-slate-900/90 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Snapshot
              </button>

              <button
                onClick={() => alert(`${camera.channel} clip marked`)}
                className="rounded-lg bg-slate-900/90 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Mark Clip
              </button>

              <button
                onClick={() => alert(`${camera.channel} settings`)}
                className="ml-auto rounded-lg bg-slate-900/90 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Settings
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}