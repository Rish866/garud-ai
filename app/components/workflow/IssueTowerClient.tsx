"use client";

import { useState } from "react";

type Issue = {
  id: string;
  title: string;
  owner?: string | null;
  severity?: string | null;
  status?: string | null;
  record_label?: string | null;
  description?: string | null;
};

export default function IssueTowerClient({
  initialIssues,
}: {
  initialIssues: Issue[];
}) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [message, setMessage] = useState("Live issue desk");
  const openIssues = issues.filter((issue) => issue.status !== "closed");

  async function updateIssue(id: string, values: Partial<Issue>) {
    setMessage("Saving...");
    const response = await fetch("/api/erp/records", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "erp_issues", id, values }),
    });
    const result = (await response.json()) as {
      ok?: boolean;
      message?: string;
      data?: Issue;
    };

    if (!response.ok || !result.ok || !result.data) {
      setMessage(result.message || "Issue update failed");
      return;
    }

    setIssues((current) =>
      current.map((issue) => (issue.id === id ? result.data! : issue))
    );
    setMessage("Issue updated");
  }

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
      <div className="mt-3 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-semibold text-cyan-200">
        {message}
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
                  Owner: {issue.owner || "Unassigned"} | Linked:{" "}
                  {issue.record_label || "-"}
                </p>
                {issue.description && (
                  <p className="mt-2 text-xs text-slate-500">
                    {issue.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="rounded-md bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                  {issue.status || "open"}
                </p>
                <p className="mt-2 text-xs font-bold text-rose-300">
                  {issue.severity || "medium"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  void updateIssue(issue.id, {
                    status: "closed",
                  })
                }
                className="rounded-md bg-emerald-400 px-3 py-2 text-xs font-black text-slate-950"
              >
                Close issue
              </button>
              <button
                type="button"
                onClick={() =>
                  void updateIssue(issue.id, {
                    severity: "critical",
                    owner: "Owner escalation",
                    status: "escalated",
                  })
                }
                className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-200"
              >
                Escalate
              </button>
              <button
                type="button"
                onClick={() =>
                  void updateIssue(issue.id, {
                    description: `${issue.description || ""} Evidence requested.`,
                    status: "evidence_pending",
                  })
                }
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
