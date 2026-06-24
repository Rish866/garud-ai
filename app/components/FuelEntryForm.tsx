"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function FuelEntryForm({
  vehicles,
}: {
  vehicles: any[];
}) {
  const router = useRouter();

  const [vehicleId, setVehicleId] =
    useState("");

  const [fuelDate, setFuelDate] =
    useState("");

  const [litres, setLitres] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [fuelStation, setFuelStation] =
    useState("");

  const [driverName, setDriverName] =
    useState("");

  async function saveFuelEntry() {
    const { error } = await supabase
      .from("fuel_entries")
      .insert([
        {
          vehicle_id: Number(vehicleId),
          fuel_date: fuelDate,
          litres: Number(litres),
          amount: Number(amount),
          fuel_station: fuelStation,
          driver_name: driverName,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Fuel entry added");

    router.refresh();
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        ➕ Add Fuel Entry
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
          type="date"
          value={fuelDate}
          onChange={(e) =>
            setFuelDate(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) =>
            setDriverName(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Litres"
          value={litres}
          onChange={(e) =>
            setLitres(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

        <input
          placeholder="Fuel Station"
          value={fuelStation}
          onChange={(e) =>
            setFuelStation(e.target.value)
          }
          className="bg-slate-800 p-3 rounded"
        />

      </div>

      <button
        onClick={saveFuelEntry}
        className="mt-4 bg-green-600 px-6 py-3 rounded"
      >
        Save Fuel Entry
      </button>

    </div>
  );
}