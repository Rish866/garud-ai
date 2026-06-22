"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddCustomerForm() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [plan, setPlan] = useState("Starter");
  const [vehicles, setVehicles] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [status, setStatus] = useState("Active");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("customers")
      .insert([
        {
          company_name: companyName,
          plan,
          vehicles,
          monthly_revenue: monthlyRevenue,
          status,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Customer Added");

    router.push("/customers");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) =>
          setCompanyName(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <select
        value={plan}
        onChange={(e) =>
          setPlan(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
      >
        <option>Starter</option>
        <option>Professional</option>
        <option>Enterprise</option>
      </select>

      <input
        type="number"
        placeholder="Vehicles"
        value={vehicles}
        onChange={(e) =>
          setVehicles(Number(e.target.value))
        }
        className="w-full p-3 rounded bg-slate-800"
      />

      <input
        type="number"
        placeholder="Monthly Revenue"
        value={monthlyRevenue}
        onChange={(e) =>
          setMonthlyRevenue(Number(e.target.value))
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
        <option>Active</option>
        <option>Trial</option>
        <option>Inactive</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Add Customer
      </button>
    </form>
  );
}