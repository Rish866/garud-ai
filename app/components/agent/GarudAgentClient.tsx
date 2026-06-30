"use client";

import { useState } from "react";

type AgentResponse = {
  ok?: boolean;
  title?: string;
  message?: string;
  href?: string;
  records?: Array<{ table: string; id?: string | number; label: string }>;
};

const examples = [
  "Add diesel bill INR 12500 for MH04XY5678 from HP Fuel Pump",
  "Create maintenance request for RJ14BT4501 engine heat estimated INR 42000",
  "Record payment received INR 64000 UTR HDFC123 for invoice INV-2407-018",
  "Upload POD for trip 9001 vehicle MH04XY5678",
  "Add driver advance INR 5000 for Rajesh Patil",
];

export default function GarudAgentClient() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AgentResponse | null>(null);

  async function submitText() {
    setBusy(true);
    setResult(null);
    const response = await fetch("/api/garud-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setResult(await response.json());
    setBusy(false);
  }

  async function submitFile() {
    if (!file) return;
    setBusy(true);
    setResult(null);
    const form = new FormData();
    form.append("file", file);
    form.append("message", message);
    const response = await fetch("/api/garud-agent", {
      method: "POST",
      body: form,
    });
    setResult(await response.json());
    setBusy(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
      <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-xl font-bold text-white">Tell GARUD what to do</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Type an operational request or attach a document. The agent classifies
          the request, records it under the correct ERP head, and gives you the
          destination module.
        </p>

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          placeholder="Example: Add diesel bill INR 12500 for MH04XY5678 from HP Fuel Pump"
          className="mt-5 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400"
        />

        <div className="mt-4 rounded-lg border border-dashed border-cyan-300 bg-cyan-50/60 p-4">
          <label className="text-sm font-bold text-slate-900">
            Upload invoice, POD, RC, insurance, permit, fuel bill, photo, or PDF
          </label>
          <input
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            className="mt-3 block w-full text-sm"
          />
          {file && (
            <p className="mt-2 text-xs font-semibold text-cyan-700">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submitText}
            disabled={busy || !message.trim()}
            className="rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 disabled:opacity-50"
          >
            Process Request
          </button>
          <button
            type="button"
            onClick={submitFile}
            disabled={busy || !file}
            className="rounded-md border border-cyan-300 bg-white px-4 py-2.5 text-sm font-black text-cyan-800 disabled:opacity-50"
          >
            Upload & Capture
          </button>
        </div>

        {busy && (
          <div className="mt-5 rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm font-semibold text-cyan-800">
            GARUD AI Agent is processing...
          </div>
        )}

        {result && (
          <div
            className={`mt-5 rounded-lg border p-4 ${
              result.ok
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            <h3 className="font-black">{result.title || "Agent result"}</h3>
            <p className="mt-2 text-sm leading-6">{result.message}</p>
            {Boolean(result.records?.length) && (
              <div className="mt-3 space-y-1 text-xs">
                {result.records?.map((record) => (
                  <p key={`${record.table}-${record.id}`}>
                    {record.table}: {record.label}
                  </p>
                ))}
              </div>
            )}
            {result.href && (
              <a
                href={result.href}
                className="mt-4 inline-flex rounded-md bg-cyan-500 px-4 py-2 text-sm font-black text-white"
              >
                Open recorded module
              </a>
            )}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-xl font-bold text-white">What it can do now</h2>
        <div className="mt-4 space-y-3">
          {[
            "Classify typed requests into finance, trips, documents, fuel, maintenance, drivers, and master data.",
            "Upload files into Supabase Storage under erp-documents.",
            "Create document records for invoice, POD, RC, permit, insurance, and fuel bills.",
            "Create module records under the correct ERP head.",
            "Create audit log entries for traceability.",
            "Return the destination module after recording.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-md border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-500"
            >
              {item}
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
          Try examples
        </h3>
        <div className="mt-3 space-y-2">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setMessage(example)}
              className="block w-full rounded-md border border-cyan-100 bg-cyan-50 px-3 py-2 text-left text-xs font-semibold text-cyan-900 hover:bg-cyan-100"
            >
              {example}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
