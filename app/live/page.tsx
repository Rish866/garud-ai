import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";
import LiveClient from "./LiveClient";
import type { Vehicle } from "../types/vehicle";

export default async function LivePage() {
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .order("id");

  const safeVehicles: Vehicle[] = Array.isArray(vehicles)
    ? (vehicles as Vehicle[])
    : [];

  return (
    <AppLayout>
      <LiveClient vehicles={safeVehicles} />
    </AppLayout>
  );
}
