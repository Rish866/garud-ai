import { getCurrentTenant } from "./tenant";

const EMPTY_TENANT_ID = "00000000-0000-0000-0000-000000000000";

export async function getTenantIdForData() {
  const session = await getCurrentTenant();
  return session?.tenantId || null;
}

export function filterByTenant(
  query: any,
  tenantId: string | null,
): Promise<{
  data: Array<Record<string, any>> | null;
  error: { message: string } | null;
}> {
  return query.eq("tenant_id", tenantId || EMPTY_TENANT_ID);
}

export async function withTenantId<T extends Record<string, unknown>>(payload: T) {
  const tenantId = await getTenantIdForData();
  return tenantId ? { ...payload, tenant_id: tenantId } : payload;
}
