import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";
import LiveClient from "../live/LiveClient";
import type { Vehicle } from "../../types/vehicle";

export const dynamic = "force-dynamic";

export default async function LiveDashcamPage() {
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .order("id");

  const safeVehicles: Vehicle[] = Array.isArray(vehicles)
    ? (vehicles as Vehicle[])
    : [];

  return (
    <AppLayout>
      <LiveClient
        vehicles={safeVehicles}
        title="Live Dashcam Monitoring"
        subtitle="AI Safety module for 4-channel dashcam feed, cabin alerts, ADAS events, playback, evidence search, and GPS telemetry."
      />
    </AppLayout>
  );
}
