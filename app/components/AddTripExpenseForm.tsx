"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddTripExpenseForm({
  trips,
}: {
  trips: any[];
}) {
  const router = useRouter();

  const [tripId, setTripId] = useState("");
  const [fuelCost, setFuelCost] = useState("");
  const [tollCost, setTollCost] = useState("");
  const [driverCost, setDriverCost] = useState("");
  const [maintenanceCost, setMaintenanceCost] =
    useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("trip_expenses")
      .insert({
        trip_id: Number(tripId),
        fuel_cost:
          Number(fuelCost) || 0,
        toll_cost:
          Number(tollCost) || 0,
        driver_cost:
          Number(driverCost) || 0,
        maintenance_cost:
          Number(
            maintenanceCost
          ) || 0,
        notes,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Expense Saved");

    router.push("/trip-expenses");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <select
        required
        value={tripId}
        onChange={(e) =>
          setTripId(e.target.value)
        }
        className="w-full bg-slate-800 p-3 rounded"
      >
        <option value="">
          Select Trip
        </option>

        {trips.map((trip) => (
          <option
            key={trip.id}
            value={trip.id}
          >
            #{trip.id} - {trip.origin} to{" "}
            {trip.destination}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Fuel Cost"
        value={fuelCost}
        onChange={(e) =>
          setFuelCost(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Toll Cost"
        value={tollCost}
        onChange={(e) =>
          setTollCost(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Driver Cost"
        value={driverCost}
        onChange={(e) =>
          setDriverCost(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Maintenance Cost"
        value={maintenanceCost}
        onChange={(e) =>
          setMaintenanceCost(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded"
      >
        Save Expense
      </button>
    </form>
  );
}