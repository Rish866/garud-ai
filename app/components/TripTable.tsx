"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Customer = {
  id: number;
  company_name: string;
};

type Vehicle = {
  id: number;
  vehicle_number: string;
};

type Driver = {
  id: number;
  name: string;
};

type Trip = {
  id: number;
  customer_id?: number | null;
  vehicle_id?: number | null;
  driver_id?: number | null;
  origin?: string | null;
  destination?: string | null;
  revenue?: string | number | null;
  status?: string | null;
  created_at?: string | null;
};

export default function TripTable({
  trips,
  customers,
  vehicles,
  drivers,
}: {
  trips: Trip[];
  customers: Customer[];
  vehicles: Vehicle[];
  drivers: Driver[];
}) {
  const [rows, setRows] = useState<Trip[]>(trips);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    customer_id: "",
    vehicle_id: "",
    driver_id: "",
    origin: "",
    destination: "",
    revenue: "",
    status: "Pending",
  });

  const stats = useMemo(() => {
    const totalTrips = rows.length;
    const activeTrips = rows.filter((trip) => trip.status === "In Progress").length;
    const completedTrips = rows.filter((trip) => trip.status === "Completed").length;
    const totalRevenue = rows.reduce(
      (sum, trip) => sum + Number(trip.revenue || 0),
      0
    );

    return { totalTrips, activeTrips, completedTrips, totalRevenue };
  }, [rows]);

  function getCustomer(id?: number | null) {
    return customers.find((customer) => customer.id === id);
  }

  function getVehicle(id?: number | null) {
    return vehicles.find((vehicle) => vehicle.id === id);
  }

  function getDriver(id?: number | null) {
    return drivers.find((driver) => driver.id === id);
  }

  function resetForm() {
    setEditingId(null);
    setForm({
      customer_id: "",
      vehicle_id: "",
      driver_id: "",
      origin: "",
      destination: "",
      revenue: "",
      status: "Pending",
    });
  }

  function editTrip(trip: Trip) {
    setEditingId(trip.id);
    setForm({
      customer_id: trip.customer_id ? String(trip.customer_id) : "",
      vehicle_id: trip.vehicle_id ? String(trip.vehicle_id) : "",
      driver_id: trip.driver_id ? String(trip.driver_id) : "",
      origin: trip.origin || "",
      destination: trip.destination || "",
      revenue: trip.revenue ? String(trip.revenue) : "",
      status: trip.status || "Pending",
    });
  }

  async function saveTrip() {
    if (!form.origin.trim() || !form.destination.trim()) {
      alert("Origin and destination are required");
      return;
    }

    const payload = {
      customer_id: form.customer_id ? Number(form.customer_id) : null,
      vehicle_id: form.vehicle_id ? Number(form.vehicle_id) : null,
      driver_id: form.driver_id ? Number(form.driver_id) : null,
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      revenue: form.revenue ? Number(form.revenue) : 0,
      status: form.status,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("trips")
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
      .from("trips")
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

  async function deleteTrip(id: number) {
    if (!confirm("Delete this trip?")) return;

    const { error } = await supabase.from("trips").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setRows(rows.filter((row) => row.id !== id));
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <Stat title="Total Trips" value={String(stats.totalTrips)} />
        <Stat title="Active Trips" value={String(stats.activeTrips)} color="text-blue-400" />
        <Stat title="Completed" value={String(stats.completedTrips)} color="text-green-400" />
        <Stat
          title="Trip Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          color="text-green-400"
        />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold">
          {editingId ? "Edit Trip" : "Add Trip"}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={form.customer_id}
            onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.company_name}
              </option>
            ))}
          </select>

          <select
            value={form.vehicle_id}
            onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}
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
            value={form.driver_id}
            onChange={(e) => setForm({ ...form, driver_id: e.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>

          <input
            value={form.origin}
            onChange={(e) => setForm({ ...form, origin: e.target.value })}
            placeholder="Origin"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            placeholder="Destination"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="number"
            value={form.revenue}
            onChange={(e) => setForm({ ...form, revenue: e.target.value })}
            placeholder="Revenue"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={saveTrip}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            {editingId ? "Update Trip" : "Add Trip"}
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
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[1150px] text-left text-sm">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="p-4">Trip</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Driver</th>
              <th className="p-4">Origin</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Revenue</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((trip) => {
              const customer = getCustomer(trip.customer_id);
              const vehicle = getVehicle(trip.vehicle_id);
              const driver = getDriver(trip.driver_id);

              return (
                <tr
                  key={trip.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="p-4 font-bold">
                    <Link
                      href={`/trips/${trip.id}`}
                      className="text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      Trip #{trip.id}
                    </Link>
                  </td>

                  <td className="p-4 font-semibold">
                    {customer ? (
                      <Link
                        href={`/customers/${customer.id}`}
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {customer.company_name}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    {vehicle ? (
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {vehicle.vehicle_number}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    {driver ? (
                      <Link
                        href={`/drivers/${driver.id}`}
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {driver.name}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4 text-slate-300">{trip.origin || "-"}</td>
                  <td className="p-4 text-slate-300">{trip.destination || "-"}</td>

                  <td className="p-4 text-green-400">
                    ₹{Number(trip.revenue || 0).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        trip.status === "Completed"
                          ? "bg-green-500/10 text-green-400"
                          : trip.status === "In Progress"
                          ? "bg-blue-500/10 text-blue-400"
                          : trip.status === "Cancelled"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {trip.status || "Pending"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/trips/${trip.id}`}
                        className="rounded-lg bg-blue-500/10 px-3 py-2 text-blue-400 hover:bg-blue-500/20"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => editTrip(trip)}
                        className="rounded-lg bg-yellow-500/10 px-3 py-2 text-yellow-400 hover:bg-yellow-500/20"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTrip(trip.id)}
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
                <td colSpan={9} className="p-8 text-center text-slate-400">
                  No trips found. Add your first trip.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Stat({
  title,
  value,
  color = "text-white",
}: {
  title: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className={`mt-3 text-3xl font-black ${color}`}>{value}</h2>
    </div>
  );
}