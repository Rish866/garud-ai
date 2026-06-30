import AppLayout from "../components/AppLayout";
import DatabaseWorkbench from "../components/erp/DatabaseWorkbench";
import ModuleActions from "../components/erp/ModuleActions";
import { financeModules } from "../lib/erpModuleConfigs";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function DriverSalaryPage() {
  const config = financeModules["driver-salary"];
  const supabase = createSupabaseAdminClient();
  const { data: settlements } = await supabase
    .from("erp_driver_settlements")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (settlements || []).map((item) => [
    item.driver_label,
    item.period_label,
    item.base_salary || 0,
    item.advance_deduction || 0,
    item.net_payable || 0,
    item.status,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Payroll control
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Driver Salary & Settlement
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live settlement register for salary, bata, advances, incentives,
            penalties, net payable, approval, and PDF payroll exports.
          </p>
        </section>

        <ModuleActions
          moduleTitle={config.title}
          moduleKey="erp_driver_settlements"
          columns={["Driver", "Period", "Salary", "Advance", "Net", "Status"]}
          rows={rows}
          reports={config.reports}
        />

        <DatabaseWorkbench
          title="Driver Settlement"
          table="erp_driver_settlements"
          initialRows={settlements || []}
          fields={[
            { key: "driver_label", label: "Driver", required: true },
            { key: "period_label", label: "Period", required: true },
            { key: "base_salary", label: "Base Salary", type: "number" },
            { key: "trip_bata", label: "Trip Bata", type: "number" },
            { key: "advance_deduction", label: "Advance Deduction", type: "number" },
            { key: "incentive", label: "Incentive", type: "number" },
            { key: "penalty", label: "Penalty", type: "number" },
            { key: "status", label: "Status", type: "select", options: ["draft", "review", "approved", "paid"], required: true },
          ]}
        />
      </div>
    </AppLayout>
  );
}
