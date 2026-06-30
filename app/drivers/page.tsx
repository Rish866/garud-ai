import AppLayout from "../components/AppLayout";
import DriverTable from "../components/DriverTable";
import ModuleActions from "../components/erp/ModuleActions";
import { erpModules } from "../lib/erpModuleConfigs";
import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic";

export default async function DriversPage() {
  const [{ data: drivers }, { data: vehicles }] = await Promise.all([
    supabase.from("drivers").select("*").order("id", { ascending: false }),
    supabase.from("vehicles").select("id, vehicle_number").order("id"),
  ]);

  const rows = (drivers || []).map((driver) => [
    driver.name || `Driver ${driver.id}`,
    driver.phone || "-",
    driver.license_no || "-",
    driver.status || "Active",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Driver master
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Drivers</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live driver KYC, license, vehicle assignment, duty status, export,
            reporting, and action tracking.
          </p>
        </section>

        <ModuleActions
          moduleTitle={erpModules.drivers.title}
          moduleKey="drivers"
          columns={["Driver", "Phone", "License", "Status"]}
          rows={rows}
          reports={erpModules.drivers.reports}
        />

        <DriverTable drivers={drivers || []} vehicles={vehicles || []} />
      </div>
    </AppLayout>
  );
}
