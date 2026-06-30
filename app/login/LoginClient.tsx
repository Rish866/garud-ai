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
    <main className="min-h-screen bg-[linear-gradient(135deg,#eef9ff,#ffffff_42%,#eafff5)] px-5 py-8 text-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section>
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-cyan-200 bg-white shadow-lg">
              <Image
                src="/logo.png"
                alt="GARUD AI"
                fill
                sizes="96px"
                className="object-contain p-2"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-700">
                Invite-only Transport OS
              </p>
              <h1 className="mt-2 text-5xl font-black tracking-tight">
                GARUD AI
              </h1>
            </div>
          </div>

          <h2 className="mt-10 max-w-3xl text-4xl font-black leading-tight">
            One secure workspace for each transporter, fleet, branch, and owner.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Login with the credentials issued during customer onboarding. Every
            customer receives a fresh GARUD ID and a clean ERP workspace.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Fleet ERP", "AI Safety", "Finance Control"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-cyan-100 bg-white p-4 text-sm font-bold shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-cyan-100 bg-white p-7 shadow-2xl shadow-cyan-100/70"
        >
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
            Customer login
          </p>
          <h3 className="mt-3 text-2xl font-black">Enter your workspace</h3>

          <label className="mt-7 block text-sm font-bold text-slate-700">
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
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
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
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
            className="mt-6 w-full rounded-lg bg-cyan-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Checking access..." : "Login"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            No public signup. New customers are created by GARUD AI admin.
          </p>
          <a
            href="/super-admin/setup"
            className="mt-3 block text-center text-sm font-black text-cyan-800"
          >
            First-time super admin setup
          </a>
        </form>
      </div>
    </main>
  );
}
