import type { Vehicle } from "../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LiveCameraGrid({ selectedVehicle }: Props) {
  const vehicleNumber = selectedVehicle?.vehicle_number || "Selected Vehicle";

  const cameras = [
    { channel: "CH1", name: "Front Road Camera", status: "Live" },
    { channel: "CH2", name: "Cabin Driver Camera", status: "Live" },
    { channel: "CH3", name: "Left Side Camera", status: "Standby" },
    { channel: "CH4", name: "Rear Camera", status: "Offline" },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            4CH Dashcam View
          </h2>
          <p className="text-sm text-slate-400">
            {vehicleNumber} multi-camera live monitoring
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          4CH Layout
        </span>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-slate-800 bg-black lg:grid-cols-2">
        {cameras.map((camera) => (
          <div
            key={camera.channel}
            className="relative flex h-72 items-center justify-center border border-slate-800 bg-black"
          >
            <div className="absolute left-3 top-3 rounded-lg bg-black/70 px-3 py-1 text-xs font-semibold text-white">
              {camera.channel} · {camera.name}
            </div>

            <div
              className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                camera.status === "Live"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : camera.status === "Standby"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {camera.status}
            </div>

            <div className="text-center">
              <div className="mb-3 text-5xl">📹</div>
              <p className="text-sm font-semibold text-white">
                Stream Placeholder
              </p>
              <p className="mt-1 text-xs text-slate-500">
                RTSP / HLS / WebRTC feed
              </p>
            </div>

            <div className="absolute bottom-3 left-3 flex gap-2">
              <button className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-white hover:bg-slate-700">
                Fullscreen
              </button>
              <button className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-white hover:bg-slate-700">
                Snapshot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}