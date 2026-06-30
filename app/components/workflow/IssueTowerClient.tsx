"use client";

import { useState } from "react";
import { controlTowerIssues } from "../../lib/operatingSystemData";

export default function IssueTowerClient() {
  const [closedIds, setClosedIds] = useState<string[]>([]);

  const openIssues = controlTowerIssues.filter(
    (issue) => !closedIds.includes(issue.id)
  );

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Control Tower Issues</h2>
          <p className="mt-1 text-sm text-slate-400">
            Assign, escalate, and close operational issues with SLA visibility.
          </p>
        </div>
        <span className="rounded-md bg-rose-400/10 px-4 py-2 text-sm font-black text-rose-200">
          {openIssues.length} open
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {openIssues.map((issue) => (
          <div
            key={issue.id}
            className="rounded-lg border border-slate-800 bg-slate-950/80 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-500">{issue.id}</p>
                <h3 className="mt-1 font-bold text-white">{issue.title}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Owner: {issue.owner} | Linked: {issue.linkedTrip}
                </p>
              </div>
              <div className="text-right">
                <p className="rounded-md bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                  {issue.sla}
                </p>
                <p className="mt-2 text-xs font-bold text-rose-300">
                  {issue.severity}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setClosedIds((ids) => [...ids, issue.id])}
                className="rounded-md bg-emerald-400 px-3 py-2 text-xs font-black text-slate-950"
              >
                Close issue
              </button>
              <button
                type="button"
                className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-200"
              >
                Escalate
              </button>
              <button
                type="button"
                className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-200"
              >
                Attach evidence
              </button>
            </div>
          </div>
        ))}

        {openIssues.length === 0 && (
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-100">
            All issues closed. Control tower is clear.
          </div>
        )}
      </div>
    </div>
  );
}
