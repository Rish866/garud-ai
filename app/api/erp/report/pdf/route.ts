export const dynamic = "force-dynamic";

type ReportBody = {
  title?: string;
  moduleKey?: string;
  columns?: string[];
  rows?: Array<Array<string | number>>;
  reports?: string[];
};

function pdfText(value: unknown) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .slice(0, 92);
}

function cleanFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildPdf(body: ReportBody) {
  const title = body.title || "GARUD AI ERP Report";
  const columns = body.columns || [];
  const rows = body.rows || [];
  const reports = body.reports || [];
  const lines = [
    "GARUD AI",
    title,
    `Generated: ${new Date().toLocaleString("en-IN")}`,
    `Records: ${rows.length}`,
    "",
    columns.length ? columns.slice(0, 5).join(" | ") : "Records",
    ...rows.slice(0, 24).map((row) => row.slice(0, 5).join(" | ")),
    "",
    ...reports.slice(0, 8).map((report) => `Report: ${report}`),
  ].filter((line, index) => line || index < 5);

  const content = [
    "BT",
    "/F1 18 Tf",
    "42 552 Td",
    `(GARUD AI) Tj`,
    "/F1 12 Tf",
    "0 -24 Td",
    `(${pdfText(title)}) Tj`,
    "/F2 9 Tf",
    "0 -18 Td",
    ...lines.slice(2).flatMap((line) => [
      `(${pdfText(line)}) Tj`,
      "0 -14 Td",
    ]),
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefOffset}\n%%EOF`;

  return { pdf, title };
}

export async function GET() {
  return Response.json({ ok: true, route: "erp-report-pdf", version: 3 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReportBody;
    const { pdf, title } = buildPdf(body);

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${cleanFileName(title)}.pdf"`,
      },
    });
  } catch {
    const { pdf } = buildPdf({ title: "GARUD AI ERP Report" });

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="garud-ai-erp-report.pdf"',
      },
    });
  }
}
