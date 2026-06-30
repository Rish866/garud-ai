import type { Vehicle } from "../../types/vehicle";

type Props = {
  selectedVehicle?: Vehicle;
};

export default function LiveVehicleInfo({ selectedVehicle }: Props) {
  const vehicleNumber = selectedVehicle?.vehicle_number || "No Vehicle";

  const data = [
    ["Vehicle", vehicleNumber],
    ["Driver", "Not Assigned"],
    ["Speed", "0 km/h"],
    ["Ignition", "ON"],
    ["GPS", "Active"],
    ["Network", "4G"],
    ["Recording", "Enabled"],
    ["Storage", "78%"],
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-bold text-white">
        Vehicle Information
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {data.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-slate-800 bg-slate-950 p-3"
          >
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 truncate text-sm font-bold text-white">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}