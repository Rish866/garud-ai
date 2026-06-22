"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function VehicleTable({
  vehicles,
}: {
  vehicles: any[];
}) {
  const router = useRouter();

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [status, setStatus] = useState("");

  const startEdit = (vehicle: any) => {
    setEditingId(vehicle.id);
    setVehicleNumber(vehicle.vehicle_number);
    setDriverName(vehicle.driver_name);
    setStatus(vehicle.status);
  };

  const saveEdit = async () => {
    const { error } = await supabase
      .from("vehicles")
      .update({
        vehicle_number: vehicleNumber,
        driver_name: driverName,
        status,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingId(null);
    router.refresh();
  };

  const deleteVehicle = async (id: number) => {
    const confirmDelete = confirm(
      "Delete this vehicle?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="text-left py-3">
            Vehicle Number
          </th>

          <th className="text-left py-3">
            Driver
          </th>

          <th className="text-left py-3">
            Status
          </th>

          <th className="text-left py-3">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {vehicles.map((vehicle) => (
          <tr
            key={vehicle.id}
            className="border-b border-slate-800"
          >
            <td className="py-4">
              {editingId === vehicle.id ? (
                <input
                  value={vehicleNumber}
                  onChange={(e) =>
                    setVehicleNumber(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                vehicle.vehicle_number
              )}
            </td>

            <td>
              {editingId === vehicle.id ? (
                <input
                  value={driverName}
                  onChange={(e) =>
                    setDriverName(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                vehicle.driver_name
              )}
            </td>

            <td>
              {editingId === vehicle.id ? (
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                >
                  <option>
                    Online
                  </option>
                  <option>
                    Offline
                  </option>
                </select>
              ) : (
                vehicle.status
              )}
            </td>

            <td className="space-x-2">
              {editingId === vehicle.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditingId(null)
                    }
                    className="bg-gray-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      startEdit(vehicle)
                    }
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteVehicle(
                        vehicle.id
                      )
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}