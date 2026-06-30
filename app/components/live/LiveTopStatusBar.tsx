import type { Vehicle } from "../../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LiveTopStatusBar({ selectedVehicle }: Props) {
  const vehicleNumber = selectedVehicle?.vehicle_number || "No Vehicle";

  const items = [
    { label: "Vehicle", value: vehicleNumber, color: "text-white" },
    { label: "Driver", value: "Not Assigned", color: "text-slate-300" },
    { label: "Speed", value: "0 km/h", color: "text-blue-400" },
    { label: "GPS", value: "Active", color: "text-emerald-400" },
    { label: "Ignition", value: "ON", color: "text-emerald-400" },
    { label: "Recording", value: "REC", color: "text-red-400" },
    { label: "Network", value: "4G", color: "text-blue-400" },
    { label: "Storage", value: "78%", color: "text-amber-400" },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-3"
          >
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className={`mt-1 truncate text-sm font-bold ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}