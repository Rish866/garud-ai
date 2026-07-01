import { NextResponse } from "next/server";
import { canWriteTable } from "../../../lib/accessControl";
import { erpTableRequirements } from "../../../lib/erpSchema";
import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData, withTenantId } from "../../../lib/tenantData";
import { getCurrentTenant } from "../../../lib/tenant";

const allowedTables = new Set(erpTableRequirements.map((item) => item.table));

function getTable(value: unknown) {
  if (typeof value !== "string" || !allowedTables.has(value)) {
    throw new Error("Table is not allowed");
  }

  return value;
}

async function requireWriteAccess(table: string) {
  const session = await getCurrentTenant();

  if (!session?.tenantId && !session?.isSuperAdmin) {
    return NextResponse.json(
      { ok: false, message: "Login session is required." },
      { status: 401 },
    );
  }

  if (!canWriteTable(table, session.role, session.isSuperAdmin)) {
    return NextResponse.json(
      { ok: false, message: "Your role does not have permission for this action." },
      { status: 403 },
    );
  }

  return null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const table = getTable(url.searchParams.get("table"));
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data, error } = await filterByTenant(
    supabase.from(table).select("*").order("created_at", { ascending: false }),
    tenantId,
  );

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const table = getTable(body.table);
  const denied = await requireWriteAccess(table);
  if (denied) return denied;
  const values = body.values;

  if (!values || typeof values !== "object") {
    return NextResponse.json(
      { ok: false, message: "Record values are required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const scopedValues = await withTenantId(values);
  const { data, error } = await supabase
    .from(table)
    .insert(scopedValues)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const table = getTable(body.table);
  const denied = await requireWriteAccess(table);
  if (denied) return denied;

  if (!body.id || !body.values || typeof body.values !== "object") {
    return NextResponse.json(
      { ok: false, message: "Record id and values are required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data, error } = await supabase
    .from(table)
    .update(body.values)
    .eq("id", body.id)
    .eq("tenant_id", tenantId || "00000000-0000-0000-0000-000000000000")
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const table = getTable(body.table);
  const denied = await requireWriteAccess(table);
  if (denied) return denied;

  if (!body.id) {
    return NextResponse.json(
      { ok: false, message: "Record id is required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", body.id)
    .eq("tenant_id", tenantId || "00000000-0000-0000-0000-000000000000");

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
