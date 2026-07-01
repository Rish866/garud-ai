import { redirect } from "next/navigation";
import AppLayout from "../components/AppLayout";
import { canManageSettings, roleDefinitions } from "../lib/accessControl";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { getCurrentTenant } from "../lib/tenant";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getCurrentTenant();

  if (!session?.tenantId) {
    redirect("/super-admin");
  }

  const supabase = createSupabaseAdminClient();
  const [{ data: tenant }, { data: users }] = await Promise.all([
    supabase
      .from("garud_tenants")
      .select("id, tenant_code, company_name, transporter_type, status")
      .eq("id", session.tenantId)
      .single(),
    supabase
      .from("garud_customer_users")
      .select("id, email, full_name, role, status, last_login_at, created_at")
      .eq("tenant_id", session.tenantId)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AppLayout>
      <SettingsClient
        tenant={tenant}
        users={users || []}
        roles={roleDefinitions}
        canManage={canManageSettings(session.role, session.isSuperAdmin)}
        currentRole={session.role}
      />
    </AppLayout>
  );
}
