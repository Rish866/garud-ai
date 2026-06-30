import { cookies } from "next/headers";
import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";
import { getCurrentTenant } from "../../../lib/tenant";
import { createSessionToken, SESSION_COOKIE } from "../../../lib/session";

export async function POST(request: Request) {
  const session = await getCurrentTenant();

  if (!session?.isSuperAdmin) {
    return Response.json(
      { ok: false, message: "Super admin access required." },
      { status: 403 },
    );
  }

  const body = await request.json();
  const tenantId = String(body.tenantId || "");

  if (!tenantId) {
    return Response.json(
      { ok: false, message: "Customer is required." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data: tenant, error } = await supabase
    .from("garud_tenants")
    .select("id, tenant_code, company_name, status")
    .eq("id", tenantId)
    .single();

  if (error || !tenant || tenant.status !== "active") {
    return Response.json(
      { ok: false, message: "Customer workspace not found or inactive." },
      { status: 404 },
    );
  }

  const token = createSessionToken({
    tenantId: tenant.id,
    tenantCode: tenant.tenant_code,
    userId: session.userId,
    email: session.email,
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

  return Response.json({
    ok: true,
    redirectTo: "/dashboard",
    tenantCode: tenant.tenant_code,
  });
}
