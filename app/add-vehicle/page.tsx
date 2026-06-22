"use client";

import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default function AddVehiclePage() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [status, setStatus] = useState("Online");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("vehicles").insert([
      {
        vehicle_number: vehicleNumber,
        driver_name: driverName,
        status,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Vehicle Added Successfully");

    setVehicleNumber("");
    setDriverName("");
    setStatus("Online");
  };

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Add Vehicle
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl max-w-xl"
      >
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-slate-800"
        />

        <input
          type="text"
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-slate-800"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-slate-800"
        >
          <option>Online</option>
          <option>Offline</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 px-6 py-3 rounded"
        >
          Add Vehicle
        </button>
      </form>
    </AppLayout>
  );
}