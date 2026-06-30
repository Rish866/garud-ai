"use client";

import { useMemo, useState } from "react";

type TableCell = string | number;

type ModuleActionsProps = {
  moduleTitle: string;
  moduleKey?: string;
  exportName?: string;
  columns: string[];
  rows: TableCell[][];
  reports?: string[];
};

function cleanFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function csvEscape(value: TableCell) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export default function ModuleActions({
  moduleTitle,
  moduleKey,
  exportName,
  columns,
  rows,
  reports = [],
}: ModuleActionsProps) {
  const [status, setStatus] = useState("Ready");
  const [resultHref, setResultHref] = useState<string | null>(null);

  const reportSummary = useMemo(() => {
    const firstRows = rows
      .slice(0, 5)
      .map((row) => row.join(" | "))
      .join("\n");

    return [
      `${moduleTitle} report`,
      `Records: ${rows.length}`,
      reports.length ? `Reports: ${reports.join(", ")}` : "",
      firstRows,
    ]
      .filter(Boolean)
      .join("\n");
  }, [moduleTitle, reports, rows]);

  function exportCsv() {
    const csv = [
      columns.map(csvEscape).join(","),
      ...rows.map((row) => row.map(csvEscape).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cleanFileName(exportName || moduleTitle)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("CSV exported");
    setResultHref(null);
  }

  async function exportPdf() {
    setStatus("Generating PDF...");

    try {
      const response = await fetch("/api/erp/report/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: moduleTitle,
          moduleKey,
          columns,
          rows,
          reports,
        }),
      });

      if (!response.ok) {
        setStatus("PDF export failed");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${cleanFileName(exportName || moduleTitle)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus("PDF exported");
      setResultHref("/reports");
    } catch {
      setStatus("PDF export failed");
      setResultHref(null);
    }
  }

  async function copySummary() {
    await navigator.clipboard.writeText(reportSummary);
    setStatus("Summary copied");
  }

  function printReport() {
    setStatus("Print report opened");
    window.print();
  }

  async function recordServerAction(actionType: "review" | "issue") {
    setStatus("Saving action...");

    try {
      const response = await fetch("/api/erp/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleKey,
          moduleTitle,
          actionType,
          note:
            actionType === "review"
              ? "Module reviewed from ERP action bar"
              : "Issue created from ERP action bar",
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setStatus(result.message || "Action could not be saved");
        setResultHref(null);
        return;
      }

      setStatus(
        actionType === "review"
          ? "Review saved to audit log"
          : "Issue saved to control tower"
      );
      setResultHref(actionType === "issue" ? "/control-tower" : "/system-readiness");
    } catch {
      setStatus("Action could not reach the server");
      setResultHref(null);
    }
  }

  function queueReview() {
    void recordServerAction("review");
  }

  function raiseIssue() {
    void recordServerAction("issue");
  }

  return (
    <div className="mb-6 rounded-lg border border-slate-800 bg-slate-900/80 p-4 print:hidden">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-bold text-white">Actions & exports</p>
          <p className="mt-1 text-xs text-slate-500">
            {rows.length} records available for operations, finance, customer,
            and audit teams.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-md bg-cyan-400 px-3 py-2 text-xs font-black text-slate-950 transition hover:bg-cyan-300"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={printReport}
            className="rounded-md border border-white/15 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
          >
            Print Report
          </button>
          <button
            type="button"
            onClick={exportPdf}
            className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-200 transition hover:bg-cyan-400/15"
          >
            Export PDF
          </button>
          <button
            type="button"
            onClick={copySummary}
            className="rounded-md border border-white/15 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
          >
            Copy Summary
          </button>
          <button
            type="button"
            onClick={queueReview}
            className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-200 transition hover:bg-emerald-400/15"
          >
            Mark Reviewed
          </button>
          <button
            type="button"
            onClick={raiseIssue}
            className="rounded-md border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-200 transition hover:bg-amber-400/15"
          >
            Create Issue
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-semibold text-cyan-200">
        <span>{status}</span>
        {resultHref && (
          <a
            href={resultHref}
            className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1.5 text-xs font-black text-cyan-200 hover:bg-cyan-400/15"
          >
            Open result
          </a>
        )}
      </div>
    </div>
  );
}
