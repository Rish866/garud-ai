import { getCurrentTenant } from "../../../lib/tenant";
import { createSupabaseAdminClient } from "../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCurrentTenant();
  let tenantBrand = null;

  if (session?.tenantId && !session.isSuperAdmin) {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from("garud_tenants")
      .select("company_name, transporter_type, logo_url, brand_color, portal_title, workflow_template")
      .eq("id", session.tenantId)
      .maybeSingle();

    tenantBrand = data || null;
  }

  return Response.json({
    ok: true,
    session: session
      ? {
          role: session.role,
          tenantCode: session.tenantCode,
          isSuperAdmin: Boolean(session.isSuperAdmin),
          tenantBrand,
        }
      : null,
  });
}
