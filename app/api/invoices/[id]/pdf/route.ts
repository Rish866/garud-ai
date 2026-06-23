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
        destination,
        customers(
          company_name
        )
      )
    `)
    .eq("id", Number(id))
    .single();

  if (error || !invoice) {
    return new NextResponse(
      "Invoice not found",
      { status: 404 }
    );
  }

  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([595, 842]);

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  const boldFont =
    await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

  page.drawText("GARUD AI", {
    x: 50,
    y: 790,
    size: 28,
    font: boldFont,
  });

  page.drawText(
    "Fleet Intelligence Platform",
    {
      x: 50,
      y: 768,
      size: 12,
      font,
    }
  );

  page.drawLine({
    start: { x: 50, y: 748 },
    end: { x: 545, y: 748 },
    thickness: 1,
  });

  page.drawText("INVOICE", {
    x: 50,
    y: 705,
    size: 22,
    font: boldFont,
  });

  page.drawText(
    `Invoice No: ${invoice.invoice_number}`,
    {
      x: 50,
      y: 670,
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
      y: 645,
      size: 14,
      font,
    }
  );

  page.drawLine({
    start: { x: 50, y: 620 },
    end: { x: 545, y: 620 },
    thickness: 1,
  });

  page.drawText(
    "Customer Details",
    {
      x: 50,
      y: 585,
      size: 16,
      font: boldFont,
    }
  );

  page.drawText(
    `Customer: ${
      invoice.trips?.customers
        ?.company_name || "N/A"
    }`,
    {
      x: 50,
      y: 555,
      size: 13,
      font,
    }
  );

  page.drawLine({
    start: { x: 50, y: 525 },
    end: { x: 545, y: 525 },
    thickness: 1,
  });

  page.drawText(
    "Trip Details",
    {
      x: 50,
      y: 490,
      size: 16,
      font: boldFont,
    }
  );

  page.drawText(
    `Origin: ${
      invoice.trips?.origin || "-"
    }`,
    {
      x: 50,
      y: 460,
      size: 13,
      font,
    }
  );

  page.drawText(
    `Destination: ${
      invoice.trips?.destination || "-"
    }`,
    {
      x: 50,
      y: 435,
      size: 13,
      font,
    }
  );

  page.drawLine({
    start: { x: 50, y: 400 },
    end: { x: 545, y: 400 },
    thickness: 1,
  });

  page.drawText(
    "Billing Summary",
    {
      x: 50,
      y: 365,
      size: 16,
      font: boldFont,
    }
  );

  page.drawText(
    `Amount: Rs ${Number(
      invoice.amount
    ).toLocaleString()}`,
    {
      x: 50,
      y: 335,
      size: 14,
      font: boldFont,
    }
  );

  page.drawText(
    `Status: ${invoice.status}`,
    {
      x: 50,
      y: 305,
      size: 14,
      font,
    }
  );

  page.drawLine({
    start: { x: 50, y: 260 },
    end: { x: 545, y: 260 },
    thickness: 1,
  });

  page.drawText(
    "Thank you for choosing Garud AI.",
    {
      x: 50,
      y: 225,
      size: 12,
      font,
    }
  );

  page.drawText(
    "Generated automatically by Garud AI Fleet Platform",
    {
      x: 50,
      y: 205,
      size: 10,
      font,
    }
  );

  const pdfBytes =
    await pdfDoc.save();

  return new Response(
    Buffer.from(pdfBytes),
    {
      headers: {
        "Content-Type":
          "application/pdf",
        "Content-Disposition":
          `attachment; filename="${invoice.invoice_number}.pdf"`,
      },
    }
  );
}