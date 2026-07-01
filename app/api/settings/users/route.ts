import { NextResponse } from "next/server";
import { canManageSettings, manageableRoles } from "../../../lib/accessControl";
import { createPasswordHash } from "../../../lib/session";
import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";
import { getCurrentTenant } from "../../../lib/tenant";

export const dynamic = "force-dynamic";

function cleanEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

async function requireSettingsAccess() {
  const session = await getCurrentTenant();

  if (!session?.tenantId) {
    return { error: "Open a customer workspace first.", status: 403 };
  }

  if (!canManageSettings(session.role, session.isSuperAdmin)) {
    return { error: "Owner or admin role is required.", status: 403 };
  }

  return { session };
}

export async function GET() {
  const access = await requireSettingsAccess();

  if ("error" in access) {
    return NextResponse.json(
      { ok: false, message: access.error },
      { status: access.status },
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("garud_customer_users")
    .select("id, email, full_name, role, status, last_login_at, created_at")
    .eq("tenant_id", access.session.tenantId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, users: data || [] });
}

export async function POST(request: Request) {
  const access = await requireSettingsAccess();

  if ("error" in access) {
    return NextResponse.json(
      { ok: false, message: access.error },
      { status: access.status },
    );
  }

  const body = await request.json();
  const email = cleanEmail(body.email);
  const fullName = String(body.fullName || "").trim();
  const role = String(body.role || "viewer");
  const password = String(body.password || "");

  if (!email || !fullName || password.length < 8 || !manageableRoles.includes(role as any)) {
    return NextResponse.json(
      { ok: false, message: "Name, email, valid role, and 8+ character password are required." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("garud_customer_users")
    .insert({
      tenant_id: access.session.tenantId,
      email,
      full_name: fullName,
      role,
      password_hash: createPasswordHash(password),
      status: "active",
    })
    .select("id, email, full_name, role, status, last_login_at, created_at")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, user: data });
}

export async function PATCH(request: Request) {
  const access = await requireSettingsAccess();

  if ("error" in access) {
    return NextResponse.json(
      { ok: false, message: access.error },
      { status: access.status },
    );
  }

  const body = await request.json();
  const id = String(body.id || "");
  const role = body.role ? String(body.role) : undefined;
  const status = body.status ? String(body.status) : undefined;
  const password = body.password ? String(body.password) : "";
  const updates: Record<string, unknown> = {};

  if (!id) {
    return NextResponse.json({ ok: false, message: "User is required." }, { status: 400 });
  }

  if (role) {
    if (!manageableRoles.includes(role as any)) {
      return NextResponse.json({ ok: false, message: "Invalid role." }, { status: 400 });
    }
    updates.role = role;
  }

  if (status) {
    if (!["active", "inactive"].includes(status)) {
      return NextResponse.json({ ok: false, message: "Invalid status." }, { status: 400 });
    }
    updates.status = status;
  }

  if (password) {
    if (password.length < 8) {
      return NextResponse.json(
        { ok: false, message: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }
    updates.password_hash = createPasswordHash(password);
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("garud_customer_users")
    .update(updates)
    .eq("tenant_id", access.session.tenantId)
    .eq("id", id)
    .select("id, email, full_name, role, status, last_login_at, created_at")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, user: data });
}
