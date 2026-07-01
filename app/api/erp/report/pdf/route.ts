import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createSupabaseAdminClient } from "../../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ReportBody = {
  title?: string;
  moduleKey?: string;
  columns?: string[];
  rows?: Array<Array<string | number>>;
  reports?: string[];
};

export async function GET() {
  return Response.json({ ok: true, route: "erp-report-pdf", version: 2 });
}

function text(value: unknown) {
  return String(value ?? "").slice(0, 72);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReportBody;
    const title = body.title || "GARUD AI ERP Report";
    const columns = body.columns || [];
    const rows = body.rows || [];

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([842, 595]);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();

  page.drawRectangle({
    x: 0,
    y: height - 86,
    width: 842,
    height: 86,
    color: rgb(0.02, 0.04, 0.08),
  });
  page.drawText("GARUD AI", {
    x: 36,
    y: height - 42,
    size: 18,
    font: bold,
    color: rgb(0.35, 0.9, 1),
  });
  page.drawText(title, {
    x: 36,
    y: height - 68,
    size: 13,
    font: regular,
    color: rgb(0.9, 0.95, 1),
  });
  page.drawText(new Date().toLocaleString("en-IN"), {
    x: 650,
    y: height - 42,
    size: 10,
    font: regular,
    color: rgb(0.72, 0.78, 0.86),
  });

  let y = height - 122;
  page.drawText("Records", { x: 36, y, size: 12, font: bold, color: rgb(0.1, 0.15, 0.22) });
  y -= 24;

  const widths = [125, 145, 135, 120, 120, 110];
  columns.slice(0, 6).forEach((column, index) => {
    page.drawText(text(column), {
      x: 36 + widths.slice(0, index).reduce((sum, item) => sum + item, 0),
      y,
      size: 9,
      font: bold,
      color: rgb(0.1, 0.15, 0.22),
    });
  });
  y -= 16;

  rows.slice(0, 18).forEach((row) => {
    page.drawLine({
      start: { x: 36, y: y + 10 },
      end: { x: 806, y: y + 10 },
      thickness: 0.5,
      color: rgb(0.86, 0.9, 0.95),
    });
    row.slice(0, 6).forEach((cell, index) => {
      page.drawText(text(cell), {
        x: 36 + widths.slice(0, index).reduce((sum, item) => sum + item, 0),
        y,
        size: 8,
        font: regular,
        color: rgb(0.18, 0.23, 0.3),
      });
    });
    y -= 20;
  });

  if (body.reports?.length) {
    y -= 16;
    page.drawText("Available Reports", {
      x: 36,
      y,
      size: 12,
      font: bold,
      color: rgb(0.1, 0.15, 0.22),
    });
    y -= 18;
    body.reports.slice(0, 8).forEach((report) => {
      page.drawText(`- ${text(report)}`, {
        x: 36,
        y,
        size: 9,
        font: regular,
        color: rgb(0.18, 0.23, 0.3),
      });
      y -= 14;
    });
  }

  try {
    const supabase = createSupabaseAdminClient();
    await supabase.from("erp_report_exports").insert({
      report_name: title,
      module_key: body.moduleKey || null,
      format: "pdf",
      requested_by: "admin",
      status: "generated",
    });
  } catch {
    // The PDF should still download even if audit logging is unavailable.
  }

  const bytes = await pdf.save();

    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}.pdf"`,
      },
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "PDF export failed",
      },
      { status: 500 },
    );
  }
}
