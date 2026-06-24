"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddMaintenanceForm({
vehicles,
}: {
vehicles: any[];
}) {
const router = useRouter();

const [vehicleId, setVehicleId] =
useState("");

const [
insuranceExpiry,
setInsuranceExpiry,
] = useState("");

const [
fitnessExpiry,
setFitnessExpiry,
] = useState("");

const [
permitExpiry,
setPermitExpiry,
] = useState("");

const [pucExpiry, setPucExpiry] =
useState("");

const [
lastServiceDate,
setLastServiceDate,
] = useState("");

const [
nextServiceDate,
setNextServiceDate,
] = useState("");

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();

const { error } =
  await supabase
    .from("vehicle_maintenance")
    .insert({
      vehicle_id: Number(
        vehicleId
      ),
      insurance_expiry:
        insuranceExpiry,
      fitness_expiry:
        fitnessExpiry,
      permit_expiry:
        permitExpiry,
      puc_expiry: pucExpiry,
      last_service_date:
        lastServiceDate,
      next_service_date:
        nextServiceDate,
    });

if (error) {
  alert(error.message);
  return;
}

alert(
  "Maintenance record saved"
);

router.push("/maintenance");
router.refresh();

}

return ( <form
   onSubmit={handleSubmit}
   className="space-y-6"
 > <div> <label className="block mb-2 text-slate-300">
Vehicle </label>

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
  </div>

  <div className="bg-slate-900 p-5 rounded-xl">
    <h3 className="text-xl font-bold mb-4 text-blue-400">
      Compliance Documents
    </h3>

    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-slate-300">
          Insurance Expiry Date
        </label>

        <input
          type="date"
          value={insuranceExpiry}
          onChange={(e) =>
            setInsuranceExpiry(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>

      <div>
        <label className="block mb-2 text-slate-300">
          Fitness Certificate Expiry
        </label>

        <input
          type="date"
          value={fitnessExpiry}
          onChange={(e) =>
            setFitnessExpiry(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>

      <div>
        <label className="block mb-2 text-slate-300">
          Permit Expiry Date
        </label>

        <input
          type="date"
          value={permitExpiry}
          onChange={(e) =>
            setPermitExpiry(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>

      <div>
        <label className="block mb-2 text-slate-300">
          PUC Expiry Date
        </label>

        <input
          type="date"
          value={pucExpiry}
          onChange={(e) =>
            setPucExpiry(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>
    </div>
  </div>

  <div className="bg-slate-900 p-5 rounded-xl">
    <h3 className="text-xl font-bold mb-4 text-green-400">
      Service Schedule
    </h3>

    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-slate-300">
          Last Service Date
        </label>

        <input
          type="date"
          value={lastServiceDate}
          onChange={(e) =>
            setLastServiceDate(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>

      <div>
        <label className="block mb-2 text-slate-300">
          Next Service Date
        </label>

        <input
          type="date"
          value={nextServiceDate}
          onChange={(e) =>
            setNextServiceDate(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>
    </div>
  </div>

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded"
  >
    Save Maintenance Record
  </button>
</form>

);
}
