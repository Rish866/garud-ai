"use client";

import { useMemo, useState } from "react";

type Tenant = {
  tenant_code: string;
  company_name: string;
  transporter_type: string;
  status: string;
} | null;

type User = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
  last_login_at?: string | null;
  created_at?: string | null;
};

type Role = {
  key: string;
  label: string;
  description: string;
  modules: readonly string[];
};

function makePassword() {
  return `Garud@${Math.random().toString(36).slice(2, 8).toUpperCase()}${Math.floor(
    Math.random() * 90 + 10,
  )}`;
}

export default function SettingsClient({
  tenant,
  users,
  roles,
  canManage,
  currentRole,
}: {
  tenant: Tenant;
  users: User[];
  roles: readonly Role[];
  canManage: boolean;
  currentRole: string;
}) {
  const [rows, setRows] = useState(users);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [password, setPassword] = useState(makePassword());
  const [status, setStatus] = useState("Ready");
  const [busyId, setBusyId] = useState("");

  const counts = useMemo(() => {
    return {
      active: rows.filter((user) => user.status === "active").length,
      admins: rows.filter((user) => ["owner", "admin"].includes(user.role)).length,
      inactive: rows.filter((user) => user.status !== "active").length,
    };
  }, [rows]);

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Creating user...");

    const response = await fetch("/api/settings/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, role, password }),
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Could not create user.");
      return;
    }

    setRows((current) => [result.user, ...current]);
    setFullName("");
    setEmail("");
    setRole("viewer");
    setPassword(makePassword());
    setStatus("User created.");
  }

  async function updateUser(id: string, updates: Record<string, string>) {
    setBusyId(id);
    setStatus("Saving changes...");

    const response = await fetch("/api/settings/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Could not update user.");
      setBusyId("");
      return;
    }

    setRows((current) =>
      current.map((user) => (user.id === id ? result.user : user)),
    );
    setStatus("User updated.");
    setBusyId("");
  }

  return (
    <div className="min-h-screen bg-[#f6fbff] text-slate-950">
      <section className="mb-6 rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
          ERP settings
        </p>
        <div className="mt-3 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-black">Users, Roles & Access</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {tenant?.company_name || "Customer workspace"} ·{" "}
              {tenant?.tenant_code || "No customer selected"}
            </p>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-black text-cyan-800">
            Your role: {currentRole}
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          ["Active users", counts.active],
          ["Admins / owners", counts.admins],
          ["Inactive users", counts.inactive],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Add user</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create logins for dispatch, finance, safety, branch, and read-only
            customer support users.
          </p>

          <form onSubmit={createUser} className="mt-5 space-y-4">
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={!canManage}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500"
              placeholder="Full name"
              required
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={!canManage}
              type="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500"
              placeholder="user@company.com"
              required
            />
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              disabled={!canManage}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500"
            >
              {roles.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={!canManage}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500"
                placeholder="Temporary password"
                required
              />
              <button
                type="button"
                onClick={() => setPassword(makePassword())}
                disabled={!canManage}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 disabled:opacity-50"
              >
                Generate
              </button>
            </div>
            <button
              disabled={!canManage}
              className="w-full rounded-xl bg-cyan-500 px-5 py-3 text-sm font-black text-slate-950 disabled:opacity-50"
            >
              Create user
            </button>
          </form>

          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-600">
            {canManage ? status : "Only owner/admin can manage users."}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Workspace users</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last login</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((user) => (
                  <tr key={user.id} className="border-t border-slate-200">
                    <td className="px-4 py-4">
                      <p className="font-black">{user.full_name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={user.role}
                        disabled={!canManage || busyId === user.id}
                        onChange={(event) => updateUser(user.id, { role: event.target.value })}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold"
                      >
                        {roles.map((item) => (
                          <option key={item.key} value={item.key}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        disabled={!canManage || busyId === user.id}
                        onClick={() =>
                          updateUser(user.id, {
                            status: user.status === "active" ? "inactive" : "active",
                          })
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black disabled:opacity-50"
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {user.last_login_at
                        ? new Date(user.last_login_at).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        disabled={!canManage || busyId === user.id}
                        onClick={() => updateUser(user.id, { password: makePassword() })}
                        className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-black text-white disabled:opacity-50"
                      >
                        Reset password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black">Role access matrix</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roles.map((item) => (
            <div key={item.key} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-black">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-lg border border-cyan-100 bg-white px-3 py-1.5 text-xs font-black text-cyan-800"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
