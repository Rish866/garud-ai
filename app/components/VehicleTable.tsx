"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabase";

type Vehicle = {
  id: number;
  vehicle_number: string;
  driver_name?: string | null;
  make?: string | null;
  model?: string | null;
  status?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export default function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  const [rows, setRows] = useState<Vehicle[]>(vehicles);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    vehicle_number: "",
    driver_name: "",
    make: "",
    model: "",
    status: "Active",
    latitude: "",
    longitude: "",
  });

  function resetForm() {
    setEditingId(null);
    setForm({
      vehicle_number: "",
      driver_name: "",
      make: "",
      model: "",
      status: "Active",
      latitude: "",
      longitude: "",
    });
  }

  function editVehicle(vehicle: Vehicle) {
    setEditingId(vehicle.id);
    setForm({
      vehicle_number: vehicle.vehicle_number || "",
      driver_name: vehicle.driver_name || "",
      make: vehicle.make || "",
      model: vehicle.model || "",
      status: vehicle.status || "Active",
      latitude: vehicle.latitude?.toString() || "",
      longitude: vehicle.longitude?.toString() || "",
    });
  }

  async function saveVehicle() {
    if (!form.vehicle_number.trim()) {
      alert("Vehicle number is required");
      return;
    }

    const payload = {
      vehicle_number: form.vehicle_number.trim(),
      driver_name: form.driver_name.trim() || null,
      make: form.make.trim() || null,
      model: form.model.trim() || null,
      status: form.status,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("vehicles")
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
      .from("vehicles")
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

  async function deleteVehicle(id: number) {
    if (!confirm("Delete this vehicle?")) return;

    const { error } = await supabase.from("vehicles").delete().eq("id", id);

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
          {editingId ? "Edit Vehicle" : "Add Vehicle"}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={form.vehicle_number}
            onChange={(e) =>
              setForm({ ...form, vehicle_number: e.target.value })
            }
            placeholder="Vehicle Number"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={form.driver_name}
            onChange={(e) => setForm({ ...form, driver_name: e.target.value })}
            placeholder="Driver Name"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            placeholder="Make"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="Model"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option>Active</option>
            <option>Idle</option>
            <option>Maintenance</option>
            <option>Offline</option>
          </select>

          <input
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
            placeholder="Latitude"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
            placeholder="Longitude"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={saveVehicle}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            {editingId ? "Update Vehicle" : "Add Vehicle"}
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
              <th className="p-4">Vehicle</th>
              <th className="p-4">Driver</th>
              <th className="p-4">Make</th>
              <th className="p-4">Model</th>
              <th className="p-4">Status</th>
              <th className="p-4">GPS</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="p-4 font-bold">
                  <Link
                    href={`/vehicles/${vehicle.id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {vehicle.vehicle_number}
                  </Link>
                </td>

                <td className="p-4 text-slate-300">
                  {vehicle.driver_name || "-"}
                </td>

                <td className="p-4 text-slate-300">{vehicle.make || "-"}</td>
                <td className="p-4 text-slate-300">{vehicle.model || "-"}</td>

                <td className="p-4">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                    {vehicle.status || "Active"}
                  </span>
                </td>

                <td className="p-4 text-slate-300">
                  {vehicle.latitude && vehicle.longitude ? "Available" : "-"}
                </td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/vehicles/${vehicle.id}`}
                      className="rounded-lg bg-blue-500/10 px-3 py-2 text-blue-400 hover:bg-blue-500/20"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => editVehicle(vehicle)}
                      className="rounded-lg bg-yellow-500/10 px-3 py-2 text-yellow-400 hover:bg-yellow-500/20"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="rounded-lg bg-red-500/10 px-3 py-2 text-red-400 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  No vehicles found. Add your first vehicle.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}