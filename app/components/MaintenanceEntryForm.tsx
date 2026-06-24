"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function MaintenanceEntryForm({
  vehicles,
}: {
  vehicles: any[];
}) {
  const router = useRouter();

  const [vehicleId, setVehicleId] =
    useState("");

  const [serviceType, setServiceType] =
    useState("");

  const [serviceDate, setServiceDate] =
    useState("");

  const [currentOdometer, setCurrentOdometer] =
    useState("");

  const [nextDueKm, setNextDueKm] =
    useState("");

  const [nextDueDate, setNextDueDate] =
    useState("");

  const [vendor, setVendor] =
    useState("");

  const [cost, setCost] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  async function saveMaintenance() {
    const { error } = await supabase
      .from("maintenance_records")
      .insert([
        {
          vehicle_id: Number(vehicleId),
          service_type: serviceType,
          service_date: serviceDate,
          current_odometer: Number(
            currentOdometer
          ),
          next_due_km: Number(
            nextDueKm
          ),
          next_due_date: nextDueDate,
          vendor,
          cost: Number(cost),
          remarks,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Maintenance record added"
    );

    router.refresh();
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        🔧 Add Maintenance Record
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <select
          value={vehicleId}
          onChange={(e) =>
            setVehicleId(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        >
          <option value="">
            Select Vehicle
          </option>

          {vehicles.map((v) => (
            <option
              key={v.id}
              value={v.id}
            >
              {v.vehicle_number}
            </option>
          ))}
        </select>

        <select
          value={serviceType}
          onChange={(e) =>
            setServiceType(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        >
          <option value="">
            Service Type
          </option>

          <option>
            Engine Oil Change
          </option>

          <option>
            Gear Oil Change
          </option>

          <option>
            Full Service
          </option>

          <option>
            Brake Service
          </option>

          <option>
            Clutch Repair
          </option>

          <option>
            Battery Replacement
          </option>

          <option>
            Tyre Rotation
          </option>

          <option>
            Suspension Repair
          </option>

          <option>
            Other
          </option>
        </select>

        <input
          type="date"
          value={serviceDate}
          onChange={(e) =>
            setServiceDate(
              e.target.value
            )
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Current Odometer"
          value={currentOdometer}
          onChange={(e) =>
            setCurrentOdometer(
              e.target.value
            )
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Next Due KM"
          value={nextDueKm}
          onChange={(e) =>
            setNextDueKm(
              e.target.value
            )
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="date"
          value={nextDueDate}
          onChange={(e) =>
            setNextDueDate(
              e.target.value
            )
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Vendor / Workshop"
          value={vendor}
          onChange={(e) =>
            setVendor(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Cost"
          value={cost}
          onChange={(e) =>
            setCost(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Remarks"
          value={remarks}
          onChange={(e) =>
            setRemarks(
              e.target.value
            )
          }
          className="bg-slate-800 p-3 rounded"
        />

      </div>

      <button
        onClick={saveMaintenance}
        className="mt-4 bg-blue-600 px-6 py-3 rounded"
      >
        Save Maintenance
      </button>

    </div>
  );
}