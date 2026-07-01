import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { getCurrentTenant } from "../lib/tenant";
import OnboardingClient from "./OnboardingClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getCurrentTenant();
  const supabase = createSupabaseAdminClient();
  const { count } = await supabase
    .from("garud_super_users")
    .select("id", { count: "exact", head: true });

  if ((count || 0) > 0 && !session?.isSuperAdmin) {
    redirect("/start");
  }

  return <OnboardingClient />;
}
