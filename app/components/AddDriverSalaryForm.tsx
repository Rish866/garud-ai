"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddDriverSalaryForm({
  drivers,
  vehicles,
}: {
  drivers: any[];
  vehicles: any[];
}) {
  const router = useRouter();

  const [driverId, setDriverId] =
    useState("");

  const [vehicleId, setVehicleId] =
    useState("");

  const [month, setMonth] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [advancePaid, setAdvancePaid] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const balance =
      Number(salary) -
      Number(advancePaid || 0);

    const { error } =
      await supabase
        .from("driver_salary")
        .insert({
          driver_id: Number(driverId),
          vehicle_id: Number(vehicleId),
          month,
          salary: Number(salary),
          advance_paid:
            Number(advancePaid) || 0,
          balance,
          status,
        });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Salary Saved");

    router.push("/driver-salary");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <select
        required
        value={driverId}
        onChange={(e) =>
          setDriverId(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      >
        <option value="">
          Select Driver
        </option>

        {drivers.map(
          (driver: any) => (
            <option
              key={driver.id}
              value={driver.id}
            >
              {driver.name}
            </option>
          )
        )}
      </select>

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
        type="text"
        placeholder="Month (June 2026)"
        value={month}
        onChange={(e) =>
          setMonth(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) =>
          setSalary(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <input
        type="number"
        placeholder="Advance Paid"
        value={advancePaid}
        onChange={(e) =>
          setAdvancePaid(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
        className="w-full bg-slate-800 p-3 rounded"
      >
        <option value="Pending">
          Pending
        </option>

        <option value="Paid">
          Paid
        </option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded"
      >
        Save Salary
      </button>
    </form>
  );
}