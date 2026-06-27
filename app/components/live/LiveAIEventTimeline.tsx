import type { Vehicle } from "../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LiveAIEventTimeline({ selectedVehicle }: Props) {
  const vehicleNumber = selectedVehicle?.vehicle_number || "Selected Vehicle";

  const events = [
    { time: "14:23", type: "Overspeed", severity: "High" },
    { time: "14:18", type: "Harsh Brake", severity: "Medium" },
    { time: "14:11", type: "Phone Usage", severity: "High" },
    { time: "13:58", type: "Fatigue Alert", severity: "Medium" },
    { time: "13:46", type: "Seat Belt", severity: "Low" },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          AI Event Timeline
        </h2>
        <p className="text-sm text-slate-400">
          AI dashcam events for {vehicleNumber}
        </p>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <div>
              <p className="font-semibold text-white">{event.type}</p>
              <p className="text-sm text-slate-400">
                {event.time} · {vehicleNumber}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                event.severity === "High"
                  ? "bg-red-500/10 text-red-400"
                  : event.severity === "Medium"
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-blue-500/10 text-blue-400"
              }`}
            >
              {event.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}