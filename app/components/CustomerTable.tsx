"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function CustomerTable({
  customers,
}: {
  customers: any[];
}) {
  const router = useRouter();

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [companyName, setCompanyName] =
    useState("");
  const [plan, setPlan] = useState("");
  const [vehicles, setVehicles] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [status, setStatus] = useState("");

  const startEdit = (customer: any) => {
    setEditingId(customer.id);
    setCompanyName(customer.company_name);
    setPlan(customer.plan);
    setVehicles(customer.vehicles);
    setRevenue(customer.monthly_revenue);
    setStatus(customer.status);
  };

  const saveEdit = async () => {
    const { error } = await supabase
      .from("customers")
      .update({
        company_name: companyName,
        plan,
        vehicles,
        monthly_revenue: revenue,
        status,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingId(null);
    router.refresh();
  };

  const deleteCustomer = async (
    id: number
  ) => {
    if (
      !confirm(
        "Delete this customer?"
      )
    )
      return;

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="text-left py-4">
            Customer
          </th>
          <th className="text-left py-4">
            Vehicles
          </th>
          <th className="text-left py-4">
            Plan
          </th>
          <th className="text-left py-4">
            Revenue
          </th>
          <th className="text-left py-4">
            Status
          </th>
          <th className="text-left py-4">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {customers.map((customer) => (
          <tr
            key={customer.id}
            className="border-b border-slate-800"
          >
            <td className="py-4">
              {editingId ===
              customer.id ? (
                <input
                  value={
                    companyName
                  }
                  onChange={(e) =>
                    setCompanyName(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                customer.company_name
              )}
            </td>

            <td>
              {editingId ===
              customer.id ? (
                <input
                  type="number"
                  value={vehicles}
                  onChange={(e) =>
                    setVehicles(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                customer.vehicles
              )}
            </td>

            <td>
              {editingId ===
              customer.id ? (
                <select
                  value={plan}
                  onChange={(e) =>
                    setPlan(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                >
                  <option>
                    Starter
                  </option>
                  <option>
                    Professional
                  </option>
                  <option>
                    Enterprise
                  </option>
                </select>
              ) : (
                customer.plan
              )}
            </td>

            <td>
              {editingId ===
              customer.id ? (
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) =>
                    setRevenue(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                `₹${Number(
                  customer.monthly_revenue
                ).toLocaleString()}`
              )}
            </td>

            <td>
              {editingId ===
              customer.id ? (
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded"
                >
                  <option>
                    Active
                  </option>
                  <option>
                    Trial
                  </option>
                  <option>
                    Inactive
                  </option>
                </select>
              ) : (
                customer.status
              )}
            </td>

            <td className="space-x-2">
              {editingId ===
              customer.id ? (
                <>
                  <button
                    onClick={
                      saveEdit
                    }
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditingId(
                        null
                      )
                    }
                    className="bg-gray-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      startEdit(
                        customer
                      )
                    }
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteCustomer(
                        customer.id
                      )
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}