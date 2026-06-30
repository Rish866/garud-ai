import type { Vehicle } from "../../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
  onEventSelect?: (event: {
    time: string;
    channel: string;
    event: string;
  }) => void;
};

export default function LiveAIEventsPanel({
  selectedVehicle,
  onEventSelect,
}: Props) {
  const vehicleNumber = selectedVehicle?.vehicle_number || "Selected Vehicle";

  const events = [
    { time: "14:23:11", event: "Phone Usage", channel: "CH2", level: "High" },
    { time: "14:18:40", event: "Harsh Brake", channel: "CH1", level: "Medium" },
    { time: "14:02:09", event: "Fatigue Alert", channel: "CH2", level: "High" },
    { time: "13:46:22", event: "Overspeed", channel: "CH1", level: "Medium" },
    { time: "13:15:54", event: "Seat Belt", channel: "CH2", level: "Low" },
  ];

  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">AI Events</h2>
        <p className="text-sm text-slate-400">{vehicleNumber}</p>
      </div>

      <div className="space-y-3">
        {events.map((item, index) => (
          <button
            key={index}
            onClick={() => onEventSelect?.(item)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-left hover:border-blue-500/50"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  {item.event}
                </p>
                <p className="text-xs text-slate-400">
                  {item.time} · {item.channel}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  item.level === "High"
                    ? "bg-red-500/10 text-red-400"
                    : item.level === "Medium"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {item.level}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
