"use client";

import { useState } from "react";

type Customer = {
  id: string;
  tenant_code: string;
  company_name: string;
  transporter_type: string;
  status: string;
  created_at: string;
};

export default function SuperAdminClient({ customers }: { customers: Customer[] }) {
  const [activeId, setActiveId] = useState("");
  const [message, setMessage] = useState("");

  async function enterCustomer(tenantId: string) {
    setActiveId(tenantId);
    setMessage("");

    try {
      const response = await fetch("/api/admin/switch-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setMessage(result.message || "Could not enter customer portal.");
        return;
      }

      window.location.href = result.redirectTo || "/dashboard";
    } catch {
      setMessage("Could not reach customer switch service.");
    } finally {
      setActiveId("");
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
          GARUD control
        </p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-950">
              Super Admin Console
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Access every customer workspace, onboard new transporters, and
              support customers without using their password.
            </p>
          </div>
          <a
            href="/onboarding"
            className="rounded-lg bg-cyan-500 px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-400"
          >
            Onboard customer
          </a>
        </div>
      </section>

      {message ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
          {message}
        </p>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black text-slate-950">Customer portals</h2>
          <span className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2 text-sm font-black text-cyan-800">
            {customers.length} workspaces
          </span>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Customer ID</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t border-slate-200">
                  <td className="px-4 py-4 font-black text-cyan-800">
                    {customer.tenant_code}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-950">
                    {customer.company_name}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {customer.transporter_type.replace(/_/g, " ")}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => enterCustomer(customer.id)}
                      disabled={activeId === customer.id}
                      className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-black text-white hover:bg-slate-800 disabled:opacity-60"
                    >
                      {activeId === customer.id ? "Opening..." : "Enter portal"}
                    </button>
                  </td>
                </tr>
              ))}
              {!customers.length ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan={5}>
                    No customers yet. Onboard the first transporter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
