import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { supabase } from "../../../../lib/supabase";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await context.params;

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select(`
      *,
      trips(
        origin,
        destination
      )
    `)
    .eq("id", Number(id))
    .single();

  if (error || !invoice) {
    return new NextResponse(
      "Invoice not found",
      {
        status: 404,
      }
    );
  }

  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([595, 842]);

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  page.drawText("GARUD AI", {
    x: 50,
    y: 780,
    size: 24,
    font,
  });

  page.drawText(
    `Invoice: ${invoice.invoice_number}`,
    {
      x: 50,
      y: 730,
      size: 16,
      font,
    }
  );

  page.drawText(
    `Trip: ${invoice.trips?.origin || "-"} -> ${
      invoice.trips?.destination || "-"
    }`,
    {
      x: 50,
      y: 690,
      size: 14,
      font,
    }
  );

  page.drawText(
    `Amount: Rs ${Number(
      invoice.amount
    ).toLocaleString()}`,
    {
      x: 50,
      y: 650,
      size: 14,
      font,
    }
  );

  page.drawText(
    `Status: ${invoice.status}`,
    {
      x: 50,
      y: 610,
      size: 14,
      font,
    }
  );

  page.drawText(
    `Date: ${new Date(
      invoice.created_at
    ).toLocaleDateString()}`,
    {
      x: 50,
      y: 570,
      size: 14,
      font,
    }
  );

  page.drawText(
    "Thank you for choosing Garud AI",
    {
      x: 50,
      y: 500,
      size: 12,
      font,
    }
  );

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.invoice_number}.pdf"`,
    },
  });
}