"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function DriverTable({
  drivers,
}: {
  drivers: any[];
}) {
  const router = useRouter();

  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [status, setStatus] = useState("");

  const startEdit = (driver: any) => {
    setEditingId(driver.id);
    setName(driver.name);
    setPhone(driver.phone);
    setLicenseNo(driver.license_no);
    setStatus(driver.status);
  };

  const saveEdit = async () => {
    const { error } = await supabase
      .from("drivers")
      .update({
        name,
        phone,
        license_no: licenseNo,
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

  const deleteDriver = async (id: number) => {
    const confirmDelete = confirm(
      "Delete this driver?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("drivers")
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
          <th className="text-left py-3">Name</th>
          <th className="text-left py-3">Phone</th>
          <th className="text-left py-3">License</th>
          <th className="text-left py-3">Vehicle</th>
          <th className="text-left py-3">Status</th>
          <th className="text-left py-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {drivers.map((driver) => (
          <tr
            key={driver.id}
            className="border-b border-slate-800"
          >
            <td className="py-4">
              {editingId === driver.id ? (
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                driver.name
              )}
            </td>

            <td>
              {editingId === driver.id ? (
                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                driver.phone
              )}
            </td>

            <td>
              {editingId === driver.id ? (
                <input
                  value={licenseNo}
                  onChange={(e) =>
                    setLicenseNo(e.target.value)
                  }
                  className="bg-slate-800 p-2 rounded"
                />
              ) : (
                driver.license_no
              )}
            </td>

            <td>
              {driver.vehicles?.vehicle_number ||
                "Not Assigned"}
            </td>

            <td>
              {editingId === driver.id ? (
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="bg-slate-800 p-2 rounded"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              ) : (
                driver.status
              )}
            </td>

            <td className="space-x-2">
              {editingId === driver.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditingId(null)
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
                      startEdit(driver)
                    }
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteDriver(driver.id)
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