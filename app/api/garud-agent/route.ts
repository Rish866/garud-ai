import { NextResponse } from "next/server";
import { processAgentFile, processAgentText } from "../../lib/garudAgent";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file");
      const note = String(form.get("message") || "");

      if (!(file instanceof File)) {
        return NextResponse.json(
          { ok: false, message: "Upload a file for document intake." },
          { status: 400 }
        );
      }

      const result = await processAgentFile(file, note);
      return NextResponse.json(result, { status: result.ok ? 200 : 400 });
    }

    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { ok: false, message: "Type a request for GARUD AI Agent." },
        { status: 400 }
      );
    }

    const result = await processAgentText(message);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        title: "Agent failed",
        message: error instanceof Error ? error.message : "Unknown agent error",
        href: "/system-readiness",
        records: [],
      },
      { status: 500 }
    );
  }
}
