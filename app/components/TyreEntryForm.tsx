"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function TyreEntryForm({
  vehicles,
}: {
  vehicles: any[];
}) {
  const router = useRouter();

  const [vehicleId, setVehicleId] = useState("");
  const [position, setPosition] = useState("");
  const [brand, setBrand] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [installDate, setInstallDate] = useState("");
  const [installKm, setInstallKm] = useState("");
  const [expectedLifeKm, setExpectedLifeKm] = useState("");

  async function saveTyre() {
    const { error } = await supabase
      .from("tyre_management")
      .insert([
        {
          vehicle_id: Number(vehicleId),
          tyre_position: position,
          brand,
          serial_number: serialNumber,
          install_date: installDate,
          install_km: Number(installKm),
          expected_life_km: Number(expectedLifeKm),
          current_km: Number(installKm),
          status: "Active",
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Tyre added");

    router.refresh();
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        ➕ Add Tyre
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

        <input
          placeholder="Position (FL, FR, R1L...)"
          value={position}
          onChange={(e) =>
            setPosition(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Serial Number"
          value={serialNumber}
          onChange={(e) =>
            setSerialNumber(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          type="date"
          value={installDate}
          onChange={(e) =>
            setInstallDate(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Install KM"
          value={installKm}
          onChange={(e) =>
            setInstallKm(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Expected Life KM"
          value={expectedLifeKm}
          onChange={(e) =>
            setExpectedLifeKm(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

      </div>

      <button
        onClick={saveTyre}
        className="mt-4 bg-orange-600 px-6 py-3 rounded"
      >
        Save Tyre
      </button>
    </div>
  );
}