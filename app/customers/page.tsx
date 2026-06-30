import AppLayout from "../components/AppLayout";
import CustomerTable from "../components/CustomerTable";
import ModuleActions from "../components/erp/ModuleActions";
import { erpModules } from "../lib/erpModuleConfigs";
import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("id", { ascending: false });

  const rows = (customers || []).map((customer) => [
    customer.company_name || `Customer ${customer.id}`,
    customer.plan || "-",
    customer.vehicles || 0,
    customer.monthly_revenue || 0,
    customer.status || "Active",
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Customer control
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Customers
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Live customer master with plan, fleet size, monthly revenue,
            credit follow-up, export, and account actions.
          </p>
        </section>

        <ModuleActions
          moduleTitle={erpModules.customers.title}
          moduleKey="customers"
          columns={["Customer", "Plan", "Vehicles", "Monthly Revenue", "Status"]}
          rows={rows}
          reports={erpModules.customers.reports}
        />

        <CustomerTable customers={customers || []} />
      </div>
    </AppLayout>
  );
}
