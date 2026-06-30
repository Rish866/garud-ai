import AppLayout from "../components/AppLayout";
import ModuleActions from "../components/erp/ModuleActions";
import { createSupabaseAdminClient } from "../lib/supabaseAdmin";
import { filterByTenant, getTenantIdForData } from "../lib/tenantData";

export const dynamic = "force-dynamic";

export default async function CustomerPortalPage() {
  const supabase = createSupabaseAdminClient();
  const tenantId = await getTenantIdForData();
  const [{ data: trips }, { data: packs }, { data: invoices }] =
    await Promise.all([
      filterByTenant(
        supabase.from("trips").select("*").order("id", { ascending: false }),
        tenantId,
      ),
      filterByTenant(supabase.from("erp_billing_packs").select("*"), tenantId),
      filterByTenant(supabase.from("invoices").select("*"), tenantId),
    ]);
  const shipments = (trips || []).map((trip) => {
    const pack = (packs || []).find(
      (item) => String(item.trip_label) === String(trip.id)
    );
    const invoice = (invoices || []).find((item) => item.trip_id === trip.id);

    return {
      shipment: `SHP-${trip.id}`,
      customer: pack?.customer_label || `Customer ${trip.customer_id || "-"}`,
      trip: String(trip.id),
      status: trip.status || "Pending",
      eta: trip.destination || "-",
      pod: pack?.includes_pod ? "Available" : "Pending",
      invoice: invoice?.invoice_number || "Draft",
    };
  });
  const rows = shipments.map((shipment) => [
    shipment.shipment,
    shipment.customer,
    shipment.trip,
    shipment.status,
    shipment.pod,
    shipment.invoice,
  ]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">
            Customer visibility
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Customer Portal & Shipment Tracking
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Give customers live shipment status, ETA, POD downloads, invoice
            status, dispute workflow, and branded tracking links.
          </p>
        </section>

        <ModuleActions
          moduleTitle="Customer Portal & Shipment Tracking"
          moduleKey="customer-portal"
          columns={["Shipment", "Customer", "Trip", "Status", "POD", "Invoice"]}
          rows={rows}
          reports={["Customer shipment view", "POD download log", "Invoice status export", "Dispute queue"]}
        />

        <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-bold">Customer Shipment View</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-medium">Shipment</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Trip</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">ETA</th>
                  <th className="pb-3 font-medium">POD</th>
                  <th className="pb-3 font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.shipment}
                    className="border-b border-slate-800"
                  >
                    <td className="py-4 font-semibold text-white">
                      {shipment.shipment}
                    </td>
                    <td className="py-4 text-slate-300">{shipment.customer}</td>
                    <td className="py-4 text-slate-300">{shipment.trip}</td>
                    <td className="py-4 text-cyan-300">{shipment.status}</td>
                    <td className="py-4 text-slate-300">{shipment.eta}</td>
                    <td className="py-4 text-slate-300">{shipment.pod}</td>
                    <td className="py-4 text-slate-300">{shipment.invoice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
