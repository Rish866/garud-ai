import AppLayout from "../components/AppLayout";
import TripTable from "../components/TripTable";
import ModuleActions from "../components/erp/ModuleActions";
import { erpModules } from "../lib/erpModuleConfigs";
import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  const [
    { data: trips },
    { data: customers },
    { data: vehicles },
    { data: drivers },
  ] = await Promise.all([
    supabase.from("trips").select("*").order("id", { ascending: false }),
    supabase.from("customers").select("id, company_name").order("id"),
    supabase.from("vehicles").select("id, vehicle_number").order("id"),
    supabase.from("drivers").select("id, name").order("id"),
  ]);

  const rows = (trips || []).map((trip) => [
    `Trip #${trip.id}`,
    trip.origin || "-",
    trip.destination || "-",
    trip.revenue || 0,
    trip.status || "Pending",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            TMS operations
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Trips</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live trip desk with customer, vehicle, driver, lane, revenue,
            status, edit, delete, export, and POD-to-billing workflow actions.
          </p>
        </section>

        <ModuleActions
          moduleTitle={erpModules.trips.title}
          moduleKey="trips"
          columns={["Trip", "Origin", "Destination", "Revenue", "Status"]}
          rows={rows}
          reports={erpModules.trips.reports}
        />

        <TripTable
          trips={trips || []}
          customers={customers || []}
          vehicles={vehicles || []}
          drivers={drivers || []}
        />
      </div>
    </AppLayout>
  );
}
