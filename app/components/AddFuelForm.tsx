"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddFuelForm({
  vehicles,
}: {
  vehicles: any[];
}) {
  const router = useRouter();

  const [vehicleId, setVehicleId] =
    useState("");

  const [fuelDate, setFuelDate] =
    useState("");

  const [liters, setLiters] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [odometer, setOdometer] =
    useState("");

  const [station, setStation] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } =
      await supabase
        .from("fuel_logs")
        .insert({
          vehicle_id:
            Number(vehicleId),
          fuel_date: fuelDate,
          liters:
            Number(liters),
          amount:
            Number(amount),
          odometer:
            Number(odometer),
          fuel_station: station,
        });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Fuel entry saved");

    router.push("/fuel");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <select
        required
        value={vehicleId}
        onChange={(e) =>
          setVehicleId(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      >
        <option value="">
          Select Vehicle
        </option>

        {vehicles.map(
          (vehicle: any) => (
            <option
              key={vehicle.id}
              value={vehicle.id}
            >
              {
                vehicle.vehicle_number
              }
            </option>
          )
        )}
      </select>

      <input
        type="date"
        value={fuelDate}
        onChange={(e) =>
          setFuelDate(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Fuel Liters"
        value={liters}
        onChange={(e) =>
          setLiters(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Odometer Reading"
        value={odometer}
        onChange={(e) =>
          setOdometer(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        placeholder="Fuel Station"
        value={station}
        onChange={(e) =>
          setStation(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 px-5 py-3 rounded"
      >
        Save Fuel Entry
      </button>
    </form>
  );
}