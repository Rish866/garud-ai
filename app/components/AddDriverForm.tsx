"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddDriverForm({
  vehicles,
}: {
  vehicles: any[];
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("drivers")
      .insert([
        {
          name,
          phone,
          license_no: licenseNo,
          vehicle_id: Number(vehicleId),
          status,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Driver Added");

    router.push("/drivers");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Driver Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        type="text"
        placeholder="License Number"
        value={licenseNo}
        onChange={(e) =>
          setLicenseNo(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <select
        value={vehicleId}
        onChange={(e) =>
          setVehicleId(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      >
        <option value="">
          Select Vehicle
        </option>

        {vehicles.map((vehicle) => (
          <option
            key={vehicle.id}
            value={vehicle.id}
          >
            {vehicle.vehicle_number}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Add Driver
      </button>
    </form>
  );
}