import AppLayout from "../components/AppLayout";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";
import LiveClient from "./LiveClient";
import type { Vehicle } from "../../types/vehicle";

export const dynamic = "force-dynamic";

export default async function LivePage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const { data: vehicles } = await filterByTenant(
    supabase.from("vehicles").select("*").order("id"),
    tenantId,
  );

  const safeVehicles: Vehicle[] = Array.isArray(vehicles)
    ? (vehicles as Vehicle[])
    : [];

  return (
    <AppLayout>
      <LiveClient vehicles={safeVehicles} />
    </AppLayout>
  );
}
