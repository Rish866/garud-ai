"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Customer = {
  id: number;
  company_name: string;
  plan?: string | null;
  vehicles?: number | null;
  monthly_revenue?: string | number | null;
  status?: string | null;
  created_at?: string | null;
};

export default function CustomerTable({
  customers,
}: {
  customers: Customer[];
}) {
  const [rows, setRows] = useState<Customer[]>(customers);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    company_name: "",
    plan: "Starter",
    vehicles: "",
    monthly_revenue: "",
    status: "Active",
  });

  const stats = useMemo(() => {
    const totalCustomers = rows.length;
    const totalVehicles = rows.reduce(
      (sum, customer) => sum + Number(customer.vehicles || 0),
      0
    );
    const totalRevenue = rows.reduce(
      (sum, customer) => sum + Number(customer.monthly_revenue || 0),
      0
    );
    const activeCustomers = rows.filter(
      (customer) => customer.status === "Active"
    ).length;

    return {
      totalCustomers,
      totalVehicles,
      totalRevenue,
      activeCustomers,
    };
  }, [rows]);

  function resetForm() {
    setEditingId(null);
    setForm({
      company_name: "",
      plan: "Starter",
      vehicles: "",
      monthly_revenue: "",
      status: "Active",
    });
  }

  function editCustomer(customer: Customer) {
    setEditingId(customer.id);
    setForm({
      company_name: customer.company_name || "",
      plan: customer.plan || "Starter",
      vehicles: customer.vehicles ? String(customer.vehicles) : "",
      monthly_revenue: customer.monthly_revenue
        ? String(customer.monthly_revenue)
        : "",
      status: customer.status || "Active",
    });
  }

  async function saveCustomer() {
    if (!form.company_name.trim()) {
      alert("Company name is required");
      return;
    }

    const payload = {
      company_name: form.company_name.trim(),
      plan: form.plan,
      vehicles: form.vehicles ? Number(form.vehicles) : 0,
      monthly_revenue: form.monthly_revenue ? Number(form.monthly_revenue) : 0,
      status: form.status,
    };

    if (editingId) {
      const response = await fetch("/api/erp/records", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "customers", id: editingId, values: payload }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message || "Could not update customer");
        return;
      }

      setRows(rows.map((row) => (row.id === editingId ? result.data : row)));
      resetForm();
      return;
    }

    const response = await fetch("/api/erp/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "customers", values: payload }),
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      alert(result.message || "Could not add customer");
      return;
    }

    setRows([result.data, ...rows]);
    resetForm();
  }

  async function deleteCustomer(id: number) {
    if (!confirm("Delete this customer?")) return;

    const response = await fetch("/api/erp/records", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "customers", id }),
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      alert(result.message || "Could not delete customer");
      return;
    }

    setRows(rows.filter((row) => row.id !== id));
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <Stat title="Total Customers" value={String(stats.totalCustomers)} />
        <Stat title="Total Vehicles" value={String(stats.totalVehicles)} />
        <Stat
          title="Monthly Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          color="text-green-400"
        />
        <Stat
          title="Active Customers"
          value={String(stats.activeCustomers)}
          color="text-blue-400"
        />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold">
          {editingId ? "Edit Customer" : "Add Customer"}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={form.company_name}
            onChange={(e) =>
              setForm({ ...form, company_name: e.target.value })
            }
            placeholder="Company Name"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option>Starter</option>
            <option>Professional</option>
            <option>Enterprise</option>
          </select>

          <input
            type="number"
            value={form.vehicles}
            onChange={(e) => setForm({ ...form, vehicles: e.target.value })}
            placeholder="Vehicles"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="number"
            value={form.monthly_revenue}
            onChange={(e) =>
              setForm({ ...form, monthly_revenue: e.target.value })
            }
            placeholder="Monthly Revenue"
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option>Active</option>
            <option>Trial</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={saveCustomer}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            {editingId ? "Update Customer" : "Add Customer"}
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
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Vehicles</th>
              <th className="p-4">Monthly Revenue</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="p-4 font-bold">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {customer.company_name}
                  </Link>
                </td>

                <td className="p-4 text-slate-300">{customer.plan || "-"}</td>

                <td className="p-4 text-slate-300">
                  {customer.vehicles || 0}
                </td>

                <td className="p-4 text-green-400">
                  ₹{Number(customer.monthly_revenue || 0).toLocaleString()}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      customer.status === "Active"
                        ? "bg-green-500/10 text-green-400"
                        : customer.status === "Trial"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {customer.status || "Active"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="rounded-lg bg-blue-500/10 px-3 py-2 text-blue-400 hover:bg-blue-500/20"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => editCustomer(customer)}
                      className="rounded-lg bg-yellow-500/10 px-3 py-2 text-yellow-400 hover:bg-yellow-500/20"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCustomer(customer.id)}
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
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No customers found. Add your first customer.
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
