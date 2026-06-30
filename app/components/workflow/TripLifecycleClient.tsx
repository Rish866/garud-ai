"use client";

import { useMemo, useState } from "react";
import { tripLifecycle } from "../../lib/operatingSystemData";

export default function TripLifecycleClient() {
  const [currentStep, setCurrentStep] = useState(3);
  const [issueCount, setIssueCount] = useState(2);
  const [podReady, setPodReady] = useState(false);

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / tripLifecycle.length) * 100),
    [currentStep]
  );

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Live Trip Lifecycle</h2>
          <p className="mt-1 text-sm text-slate-400">
            Interactive demo: move a shipment from booking to payment.
          </p>
        </div>
        <div className="rounded-md bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
          {progress}% complete
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tripLifecycle.map((step, index) => (
          <div
            key={step}
            className={`rounded-lg border p-4 ${
              index <= currentStep
                ? "border-cyan-400/25 bg-cyan-400/10"
                : "border-slate-800 bg-slate-950/80"
            }`}
          >
            <p className="text-xs font-bold text-slate-500">
              Step {index + 1}
            </p>
            <p className="mt-2 font-semibold text-white">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            setCurrentStep((step) => Math.min(tripLifecycle.length - 1, step + 1))
          }
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950"
        >
          Advance status
        </button>
        <button
          type="button"
          onClick={() => setPodReady(true)}
          className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200"
        >
          Mark POD received
        </button>
        <button
          type="button"
          onClick={() => setIssueCount((count) => count + 1)}
          className="rounded-md border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-bold text-rose-200"
        >
          Create issue
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg bg-slate-950/80 p-4">
          <p className="text-xs text-slate-500">POD status</p>
          <p className="mt-2 font-black text-white">
            {podReady ? "Received" : "Pending"}
          </p>
        </div>
        <div className="rounded-lg bg-slate-950/80 p-4">
          <p className="text-xs text-slate-500">Open issues</p>
          <p className="mt-2 font-black text-white">{issueCount}</p>
        </div>
        <div className="rounded-lg bg-slate-950/80 p-4">
          <p className="text-xs text-slate-500">Next billing action</p>
          <p className="mt-2 font-black text-white">
            {podReady ? "Generate invoice" : "Wait for POD"}
          </p>
        </div>
      </div>
    </div>
  );
}
