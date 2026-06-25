"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabase";

type Vehicle = {
  id: number;
  vehicle_number: string;
};

type Driver = {
  id: number;
  name: string;
  phone?: string | null;
  license_no?: string | null;
  vehicle_id?: number | null;
  status?: string | null;
};

export default function DriverTable({
  drivers,
  vehicles,
}: {
  drivers: Driver[];
  vehicles: Vehicle[];
}) {
  const [rows, setRows] = useState<Driver[]>(drivers);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    license_no: "",
    vehicle_id: "",
    status: "Active",
  });

  function resetForm() {
    setEditingId(null);
    setForm({
      name: "",
      phone: "",
      license_no: "",
      vehicle_id: "",
      status: "Active",
    });
  }

  function getVehicle(vehicleId?: number | null) {
    return vehicles.find((item) => item.id === vehicleId);
  }

  function editDriver(driver: Driver) {
    setEditingId(driver.id);
    setForm({
      name: driver.name || "",
      phone: driver.phone || "",
      license_no: driver.license_no || "",
      vehicle_id: driver.vehicle_id ? String(driver.vehicle_id) : "",
      status: driver.status || "Active",
    });
  }

  async function saveDriver() {
    if (!form.name.trim()) {
      alert("Driver name is required");
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      license_no: form.license_no.trim() || null,
      vehicle_id: form.vehicle_id ? Number(form.vehicle_id) : null,
      status: form.status,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("drivers")
        .update(payload)
        .eq("id", editingId)
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      setRows(rows.map((row) => (row.id === editingId ? data : row)));
      resetForm();
      return;
    }

    const { data, error } = await supabase
      .from("drivers")
      .insert(payload)
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setRows([data, ...rows]);
    resetForm();
  }

  async function deleteDriver(id: number) {
    if (!confirm("Delete this driver?")) return;

    const { error } = await supabase.from("drivers").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setRows(rows.filter((row) => row.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold">
          {editingId ? "Edit Driver" : "Add Driver"}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Driver Name"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone Number"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={form.license_no}
            onChange={(e) =>
              setForm({ ...form, license_no: e.target.value })
            }
            placeholder="License Number"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={form.vehicle_id}
            onChange={(e) =>
              setForm({ ...form, vehicle_id: e.target.value })
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicle_number}
              </option>
            ))}
          </select>

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>On Trip</option>
            <option>Suspended</option>
          </select>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={saveDriver}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            {editingId ? "Update Driver" : "Add Driver"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="p-4">Driver</th>
              <th className="p-4">Phone</th>
              <th className="p-4">License</th>
              <th className="p-4">Assigned Vehicle</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((driver) => {
              const vehicle = getVehicle(driver.vehicle_id);

              return (
                <tr
                  key={driver.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="p-4 font-bold">
                    <Link
                      href={`/drivers/${driver.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {driver.name}
                    </Link>
                  </td>

                  <td className="p-4 text-slate-300">
                    {driver.phone || "-"}
                  </td>

                  <td className="p-4 text-slate-300">
                    {driver.license_no || "-"}
                  </td>

                  <td className="p-4 text-slate-300">
                    {vehicle ? (
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {vehicle.vehicle_number}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                      {driver.status || "Active"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/drivers/${driver.id}`}
                        className="rounded-lg bg-blue-500/10 px-3 py-2 text-blue-400 hover:bg-blue-500/20"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => editDriver(driver)}
                        className="rounded-lg bg-yellow-500/10 px-3 py-2 text-yellow-400 hover:bg-yellow-500/20"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteDriver(driver.id)}
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-red-400 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No drivers found. Add your first driver.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}