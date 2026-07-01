import { getCurrentTenant } from "../../../lib/tenant";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCurrentTenant();

  return Response.json({
    ok: true,
    session: session
      ? {
          role: session.role,
          tenantCode: session.tenantCode,
          isSuperAdmin: Boolean(session.isSuperAdmin),
        }
      : null,
  });
}
