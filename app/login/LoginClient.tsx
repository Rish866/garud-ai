"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setMessage(result.message || "Login failed.");
        return;
      }

      window.location.href = result.redirectTo || "/dashboard";
    } catch {
      setMessage("Could not reach GARUD AI login service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4fbff] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex items-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(140deg,#e7f8ff_0%,#ffffff_48%,#e9fff7_100%)]" />
          <div className="absolute left-0 top-0 h-2 w-full bg-[linear-gradient(90deg,#00b8d9,#44e0a0,#f8d66d)]" />

          <div className="relative mx-auto w-full max-w-3xl">
            <div className="flex items-center gap-5">
              <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-cyan-200 bg-white shadow-xl shadow-cyan-100">
              <Image
                src="/logo.png"
                alt="GARUD AI"
                fill
                sizes="112px"
                className="object-contain p-3"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
                Invite-only transporter ERP
              </p>
              <h1 className="mt-2 text-6xl font-black tracking-tight">
                GARUD AI
              </h1>
            </div>
          </div>

          <h2 className="mt-12 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight">
            Transport operations, finance, fleet, and AI safety in one secure
            workspace.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Each customer gets a private GARUD ID, clean ERP data, live command
            modules, and owner-controlled access from day one.
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {[
              ["Fleet ERP", "Vehicles, drivers, trips"],
              ["AI Safety", "Dashcam risk events"],
              ["Finance", "Invoices, fuel, receivables"],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-xl border border-cyan-100 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-black">{title}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                  {copy}
                </p>
              </div>
            ))}
          </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-cyan-100/60">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
                    Live command preview
                  </p>
                  <p className="mt-1 text-lg font-black">Owner control room</p>
                </div>
                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                  Online
                </span>
              </div>

              <div className="grid gap-3 pt-4 sm:grid-cols-3">
                {[
                  ["Active trips", "42"],
                  ["Open alerts", "7"],
                  ["Today revenue", "INR 8.4L"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-14">
        <form
          onSubmit={handleLogin}
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/80"
        >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Secure access
          </p>
            <h3 className="mt-3 text-3xl font-black">Login to GARUD AI</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use your super-admin or customer owner credentials.
            </p>

          <label className="mt-7 block text-sm font-bold text-slate-700">
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white"
              placeholder="owner@company.com"
            />
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-700">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white"
              placeholder="Issued password"
            />
          </label>

          {message ? (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
              className="mt-6 w-full rounded-xl bg-cyan-500 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Checking access..." : "Login"}
          </button>

            <p className="mt-5 text-center text-xs font-semibold leading-5 text-slate-500">
              No public signup. Customer portals are created from Super Admin.
          </p>
          <a
            href="/super-admin/setup"
              className="mt-4 block text-center text-sm font-black text-cyan-800"
          >
            First-time super admin setup
          </a>
        </form>
        </section>
      </div>
    </main>
  );
}
