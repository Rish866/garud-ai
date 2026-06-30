import { NextResponse } from "next/server";
import { erpTableRequirements } from "../../../lib/erpSchema";
import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const checks = await Promise.all(
      erpTableRequirements.map(async (item) => {
        const { count, error } = await supabase
          .from(item.table)
          .select("*", { count: "exact", head: true });

        return {
          ...item,
          ready: !error,
          count: count || 0,
          error: error?.message || null,
        };
      })
    );

    const critical = checks.filter((item) => item.critical);
    const readyCritical = critical.filter((item) => item.ready).length;
    const score = Math.round((readyCritical / critical.length) * 100);

    return NextResponse.json({ ok: true, score, checks });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        score: 0,
        checks: [],
        message: "Server Supabase credentials are not available.",
      },
      { status: 503 }
    );
  }
}
