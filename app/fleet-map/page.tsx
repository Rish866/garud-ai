import FleetMapWrapper from "./FleetMapWrapper";
import { supabase } from "../lib/supabase";

export default async function FleetMapPage() {
  const { data: vehicles, error } = await supabase.from("vehicles").select("*");

  return <FleetMapWrapper vehicles={vehicles || []} error={error?.message} />;
}