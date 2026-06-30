"use client";

import { useMemo, useState } from "react";

const transporterTypes = [
  { value: "fleet_owner", label: "Fleet owner" },
  { value: "market_load_operator", label: "Market load operator" },
  { value: "cold_chain", label: "Cold chain" },
  { value: "bus_operator", label: "Bus operator" },
  { value: "construction_tipper", label: "Construction / tipper" },
  { value: "3pl_logistics", label: "3PL logistics" },
];

function makePassword() {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `Garud@${suffix}${Math.floor(Math.random() * 90 + 10)}`;
}

export default function OnboardingClient() {
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [transporterType, setTransporterType] = useState("fleet_owner");
  const [password, setPassword] = useState(makePassword());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    tenant?: { tenant_code: string; company_name: string };
    user?: { email: string; fullName: string; role: string };
    message?: string;
  } | null>(null);

  const canSubmit = useMemo(
    () => companyName.trim() && email.trim() && password.length >= 8,
    [companyName, email, password],
  );

  async function createCustomer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/admin/onboard-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          fullName,
          email,
          password,
          transporterType,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setResult({ message: data.message || "Could not create customer." });
        return;
      }

      setResult(data);
    } catch {
      setResult({ message: "Could not reach customer onboarding service." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
          Customer onboarding
        </p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-950">
              Create a fresh GARUD AI workspace
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Use this when a new transporter signs up commercially. The system
              creates a unique customer ID, clean workspace, and first owner login.
            </p>
          </div>
          <a
            href="/login"
            className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-black text-cyan-800"
          >
            Login page
          </a>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={createCustomer}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <label className="block text-sm font-bold text-slate-700">
            Company / transporter name
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
              placeholder="Example Logistics Pvt Ltd"
              required
            />
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-700">
            Owner name
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
              placeholder="Owner / admin name"
            />
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-700">
            Owner email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
              placeholder="owner@company.com"
              required
            />
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-700">
            Transporter type
            <select
              value={transporterType}
              onChange={(event) => setTransporterType(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
            >
              {transporterTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-700">
            Temporary password
            <div className="mt-2 flex gap-2">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setPassword(makePassword())}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
              >
                Generate
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="mt-6 w-full rounded-lg bg-cyan-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating workspace..." : "Create customer workspace"}
          </button>
        </form>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">What customer gets</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Unique GARUD customer ID",
              "Fresh ERP workspace",
              "Owner login only, no signup",
              "Tenant-ready ERP records",
              "Onboarding checklist",
              "Secure password hash",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-cyan-100 bg-cyan-50/60 p-4 text-sm font-bold text-slate-800"
              >
                {item}
              </div>
            ))}
          </div>

          {result ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              {result.message ? (
                <p className="font-bold text-rose-700">{result.message}</p>
              ) : (
                <>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
                    Workspace ready
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    {result.tenant?.tenant_code}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">
                    Customer: {result.tenant?.company_name}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Login: {result.user?.email}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Temporary password: {password}
                  </p>
                </>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
