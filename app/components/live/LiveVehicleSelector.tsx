"use client";

import type { Vehicle } from "../../types/vehicle";

type Props = {
  vehicles: Vehicle[];
  selectedVehicleId: string;
  onVehicleChange: (id: string) => void;
};

export default function LiveVehicleSelector({
  vehicles,
  selectedVehicleId,
  onVehicleChange,
}: Props) {
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

  const selected =
    safeVehicles.find(
      (vehicle) => String(vehicle.id) === String(selectedVehicleId)
    ) || safeVehicles[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-1 text-lg font-semibold text-white">
        Vehicle Selector
      </h2>

      <p className="mb-5 text-sm text-slate-400">
        Select vehicle for live monitoring
      </p>

      <select
        value={selectedVehicleId}
        onChange={(e) => onVehicleChange(e.target.value)}
        className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
      >
        {safeVehicles.map((vehicle) => (
          <option
            key={vehicle.id}
            value={String(vehicle.id)}
          >
            {vehicle.vehicle_number}
          </option>
        ))}
      </select>

      {selected && (
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="flex justify-between">
            <span className="text-slate-400">
              Vehicle
            </span>

            <span className="font-semibold text-white">
              {selected.vehicle_number}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Make
            </span>

            <span className="text-white">
              {selected.make || "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Model
            </span>

            <span className="text-white">
              {selected.model || "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Status
            </span>

            <span
              className={
                selected.status === "Active"
                  ? "font-semibold text-green-400"
                  : "font-semibold text-red-400"
              }
            >
              {selected.status || "Unknown"}
            </span>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <p className="text-xs text-slate-500">
              GPS coordinates
            </p>

            <p className="mt-1 text-xs text-slate-300">
              {selected.latitude}, {selected.longitude}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}