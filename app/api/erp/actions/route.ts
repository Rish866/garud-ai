import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";

type ActionBody = {
  moduleKey?: string;
  moduleTitle?: string;
  recordLabel?: string;
  actionType?: string;
  note?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ActionBody;

  if (!body.moduleTitle || !body.actionType) {
    return NextResponse.json(
      { ok: false, message: "Module and action type are required" },
      { status: 400 }
    );
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("erp_action_log").insert({
      module_key: body.moduleKey || body.moduleTitle,
      module_title: body.moduleTitle,
      record_label: body.recordLabel || null,
      action_type: body.actionType,
      note: body.note || null,
      assigned_to: body.actionType === "issue" ? "Control tower" : "Ops admin",
      status: body.actionType === "review" ? "reviewed" : "open",
      closed_at: body.actionType === "review" ? new Date().toISOString() : null,
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          setupRequired: true,
          message:
            "ERP action table is not ready. Run the Supabase backbone migration.",
        },
        { status: 503 }
      );
    }

    if (body.actionType === "issue") {
      const { error: issueError } = await supabase.from("erp_issues").insert({
        module_key: body.moduleKey || body.moduleTitle,
        record_label: body.recordLabel || null,
        severity: "medium",
        title: `${body.moduleTitle} action issue`,
        description: body.note || "Issue created from ERP action",
        owner: "Control tower",
        status: "open",
      });

      if (issueError) {
        return NextResponse.json(
          { ok: false, message: issueError.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        setupRequired: true,
        message: "Server Supabase credentials are not available.",
      },
      { status: 503 }
    );
  }
}
