"use client";

import { useMemo, useState } from "react";

export type WorkbenchField = {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
};

type RecordValue = string | number | boolean | null;
type WorkbenchRecord = Record<string, RecordValue> & { id?: string };

type DatabaseWorkbenchProps = {
  title: string;
  table: string;
  fields: WorkbenchField[];
  initialRows: WorkbenchRecord[];
  defaultValues?: Record<string, RecordValue>;
};

function emptyForm(fields: WorkbenchField[]) {
  return fields.reduce<Record<string, string | boolean>>((form, field) => {
    form[field.key] = field.type === "checkbox" ? false : "";
    return form;
  }, {});
}

function normalizeValue(field: WorkbenchField, value: string | boolean) {
  if (field.type === "checkbox") return Boolean(value);
  if (field.type === "number") return value === "" ? 0 : Number(value);
  return value === "" ? null : value;
}

export default function DatabaseWorkbench({
  title,
  table,
  fields,
  initialRows,
  defaultValues = {},
}: DatabaseWorkbenchProps) {
  const [rows, setRows] = useState(initialRows);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm(fields));
  const [status, setStatus] = useState("Ready");
  const [resultHref, setResultHref] = useState<string | null>(null);

  const stats = useMemo(() => {
    const open = rows.filter((row) =>
      String(row.status || "").toLowerCase().includes("open")
    ).length;
    const pending = rows.filter((row) =>
      String(row.status || "").toLowerCase().includes("pending")
    ).length;

    return { total: rows.length, open, pending };
  }, [rows]);

  function edit(row: WorkbenchRecord) {
    const next = emptyForm(fields);
    fields.forEach((field) => {
      const value = row[field.key];
      next[field.key] =
        field.type === "checkbox" ? Boolean(value) : value == null ? "" : String(value);
    });
    setEditingId(String(row.id));
    setForm(next);
  }

  function reset() {
    setEditingId(null);
    setForm(emptyForm(fields));
  }

  async function save() {
    const missing = fields.find(
      (field) => field.required && !String(form[field.key] || "").trim()
    );

    if (missing) {
      setStatus(`${missing.label} is required`);
      return;
    }

    const values = fields.reduce<Record<string, RecordValue>>(
      (payload, field) => {
        payload[field.key] = normalizeValue(field, form[field.key]);
        return payload;
      },
      { ...defaultValues }
    );

    const response = await fetch("/api/erp/records", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, id: editingId, values }),
    });
    const result = (await response.json()) as {
      ok?: boolean;
      message?: string;
      data?: WorkbenchRecord;
    };

    if (!response.ok || !result.ok || !result.data) {
      setStatus(result.message || "Save failed");
      setResultHref(null);
      return;
    }

    setRows((current) =>
      editingId
        ? current.map((row) => (String(row.id) === editingId ? result.data! : row))
        : [result.data!, ...current]
    );
    reset();
    setStatus(editingId ? "Record updated" : "Record created");
    setResultHref(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this record?")) return;

    const response = await fetch("/api/erp/records", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, id }),
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Delete failed");
      setResultHref(null);
      return;
    }

    setRows((current) => current.filter((row) => String(row.id) !== id));
    setStatus("Record deleted");
    setResultHref(null);
  }

  async function createIssue(row: WorkbenchRecord) {
    const label = String(row[fields[0]?.key] || row.id || title);
    setStatus("Creating linked issue...");

    const response = await fetch("/api/erp/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleKey: table,
        moduleTitle: title,
        recordLabel: label,
        actionType: "issue",
        note: `Issue created for ${label} from ${title} workbench.`,
      }),
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setStatus(result.message || "Issue creation failed");
      setResultHref(null);
      return;
    }

    setStatus("Linked issue created");
    setResultHref("/control-tower");
  }

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <p className="text-sm text-slate-400">Records</p>
          <h2 className="mt-2 text-3xl font-black text-white">{stats.total}</h2>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <p className="text-sm text-slate-400">Open</p>
          <h2 className="mt-2 text-3xl font-black text-amber-300">{stats.open}</h2>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <p className="text-sm text-slate-400">Pending</p>
          <h2 className="mt-2 text-3xl font-black text-cyan-300">{stats.pending}</h2>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-bold">{editingId ? `Edit ${title}` : `Add ${title}`}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-cyan-200">
              {status}
            </span>
            {resultHref && (
              <a
                href={resultHref}
                className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-200"
              >
                Open result
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {fields.map((field) =>
            field.type === "select" ? (
              <select
                key={field.key}
                value={String(form[field.key] || "")}
                onChange={(event) =>
                  setForm({ ...form, [field.key]: event.target.value })
                }
                className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              >
                <option value="">{field.label}</option>
                {(field.options || []).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <label
                key={field.key}
                className="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[field.key])}
                  onChange={(event) =>
                    setForm({ ...form, [field.key]: event.target.checked })
                  }
                />
                {field.label}
              </label>
            ) : (
              <input
                key={field.key}
                type={field.type || "text"}
                value={String(form[field.key] || "")}
                onChange={(event) =>
                  setForm({ ...form, [field.key]: event.target.value })
                }
                placeholder={field.label}
                className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            )
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={save}
            className="rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 hover:bg-cyan-300"
          >
            {editingId ? "Update Record" : "Create Record"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-bold text-slate-200 hover:bg-white/10"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/80">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              {fields.map((field) => (
                <th key={field.key} className="p-4 font-medium">
                  {field.label}
                </th>
              ))}
              <th className="p-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row.id)} className="border-t border-slate-800">
                {fields.map((field, index) => (
                  <td
                    key={field.key}
                    className={index === 0 ? "p-4 font-bold text-white" : "p-4 text-slate-300"}
                  >
                    {field.type === "checkbox"
                      ? row[field.key]
                        ? "Yes"
                        : "No"
                      : String(row[field.key] ?? "-")}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => edit(row)}
                      className="rounded-md bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-300"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void createIssue(row)}
                      className="rounded-md bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-300"
                    >
                      Issue
                    </button>
                    <button
                      type="button"
                      onClick={() => row.id && void remove(String(row.id))}
                      className="rounded-md bg-rose-400/10 px-3 py-2 text-xs font-bold text-rose-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
