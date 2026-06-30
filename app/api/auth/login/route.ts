import { cookies } from "next/headers";
import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";
import {
  createSessionToken,
  SESSION_COOKIE,
  verifyPassword,
} from "../../../lib/session";

type TenantJoin = {
  tenant_code: string;
  company_name: string;
  status: string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return Response.json(
      { ok: false, message: "Enter email and password." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data: superUser } = await supabase
    .from("garud_super_users")
    .select("id, email, full_name, password_hash, status")
    .eq("email", email)
    .maybeSingle();

  if (
    superUser &&
    superUser.status === "active" &&
    verifyPassword(password, superUser.password_hash)
  ) {
    const token = createSessionToken({
      userId: superUser.id,
      email: superUser.email,
      role: "super_admin",
      isSuperAdmin: true,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    await supabase
      .from("garud_super_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", superUser.id);

    return Response.json({
      ok: true,
      redirectTo: "/super-admin",
      tenantCode: "GARUD-SUPER",
    });
  }

  const { data: user, error } = await supabase
    .from("garud_customer_users")
    .select(
      "id, tenant_id, email, full_name, role, password_hash, status, garud_tenants(tenant_code, company_name, status)",
    )
    .eq("email", email)
    .maybeSingle();

  if (error || !user || user.status !== "active") {
    return Response.json(
      { ok: false, message: "Login not found or inactive." },
      { status: 401 },
    );
  }

  if (!verifyPassword(password, user.password_hash)) {
    return Response.json(
      { ok: false, message: "Wrong email or password." },
      { status: 401 },
    );
  }

  const tenant = (
    Array.isArray(user.garud_tenants)
      ? user.garud_tenants[0]
      : user.garud_tenants
  ) as TenantJoin | null;

  if (!tenant || tenant.status !== "active") {
    return Response.json(
      { ok: false, message: "Customer workspace is inactive." },
      { status: 403 },
    );
  }

  const token = createSessionToken({
    tenantId: user.tenant_id,
    tenantCode: tenant.tenant_code,
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  await supabase
    .from("garud_customer_users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", user.id);

  return Response.json({
    ok: true,
    redirectTo: "/dashboard",
    tenantCode: tenant.tenant_code,
  });
}
