"use client";

import Image from "next/image";
import { useState } from "react";

export default function SuperAdminSetupClient() {
  const [fullName, setFullName] = useState("GARUD Super Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function createSuperAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/super-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setMessage(result.message || "Could not create super admin.");
        return;
      }

      setCreated(true);
      setMessage("Super admin created. Login with this email and password.");
    } catch {
      setMessage("Could not reach setup service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eef9ff,#ffffff_42%,#eafff5)] px-5 py-8 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-xl items-center">
        <form
          onSubmit={createSuperAdmin}
          className="w-full rounded-2xl border border-cyan-100 bg-white p-7 shadow-2xl shadow-cyan-100/70"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-cyan-200 bg-white shadow-lg">
              <Image
                src="/logo.png"
                alt="GARUD AI"
                fill
                sizes="80px"
                className="object-contain p-2"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
                One-time setup
              </p>
              <h1 className="mt-1 text-3xl font-black">Super Admin</h1>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-600">
            Create your GARUD owner login. This user can onboard customers and
            enter any customer portal.
          </p>

          <label className="mt-6 block text-sm font-bold text-slate-700">
            Your name
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
            />
          </label>

          <label className="mt-4 block text-sm font-bold text-slate-700">
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-cyan-500 focus:bg-white"
              placeholder="you@garud.ai"
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
              placeholder="Minimum 10 characters"
            />
          </label>

          {message ? (
            <p className="mt-4 rounded-lg border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-900">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading || created}
            className="mt-6 w-full rounded-lg bg-cyan-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {created ? "Super admin ready" : loading ? "Creating..." : "Create super admin"}
          </button>

          {created ? (
            <a
              href="/login"
              className="mt-4 block text-center text-sm font-black text-cyan-800"
            >
              Go to login
            </a>
          ) : null}
        </form>
      </div>
    </main>
  );
}
