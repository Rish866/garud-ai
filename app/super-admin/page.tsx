import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { getCurrentTenant } from "../lib/tenant";
import SuperAdminClient from "./SuperAdminClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getCurrentTenant();

  if (!session?.isSuperAdmin) {
    redirect("/login");
  }

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("garud_tenants")
    .select("id, tenant_code, company_name, transporter_type, status, created_at")
    .order("created_at", { ascending: false });

  return <SuperAdminClient customers={data || []} />;
}
