"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddTripForm() {
  const router = useRouter();

  const [customers, setCustomers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: customersData } =
      await supabase.from("customers").select("*");

    const { data: vehiclesData } =
      await supabase.from("vehicles").select("*");

    const { data: driversData } =
      await supabase.from("drivers").select("*");

    setCustomers(customersData || []);
    setVehicles(vehiclesData || []);
    setDrivers(driversData || []);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("trips")
      .insert([
        {
          customer_id: Number(customerId),
          vehicle_id: Number(vehicleId),
          driver_id: Number(driverId),
          origin,
          destination,
          revenue,
          status,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Trip Created");

    router.push("/trips");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <select
        value={customerId}
        onChange={(e) =>
          setCustomerId(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      >
        <option value="">
          Select Customer
        </option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.company_name}
          </option>
        ))}
      </select>

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
        value={driverId}
        onChange={(e) =>
          setDriverId(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      >
        <option value="">
          Select Driver
        </option>

        {drivers.map((driver) => (
          <option
            key={driver.id}
            value={driver.id}
          >
            {driver.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) =>
          setOrigin(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) =>
          setDestination(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        type="number"
        placeholder="Revenue"
        value={revenue}
        onChange={(e) =>
          setRevenue(Number(e.target.value))
        }
        className="w-full p-3 rounded bg-slate-800"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Create Trip
      </button>
    </form>
  );
}