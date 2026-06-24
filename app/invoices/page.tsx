import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function InvoicesPage() {
  const { data: invoices } = await supabase
    .from("customer_invoices")
    .select("*")
    .order("invoice_date", {
      ascending: false,
    });

  const totalInvoices =
    invoices?.length || 0;

  const totalAmount =
    invoices?.reduce(
      (sum: number, invoice: any) =>
        sum +
        Number(invoice.total_amount || 0),
      0
    ) || 0;

  const paidAmount =
    invoices?.reduce(
      (sum: number, invoice: any) =>
        invoice.status === "Paid"
          ? sum +
            Number(
              invoice.total_amount || 0
            )
          : sum,
      0
    ) || 0;

  const pendingAmount =
    invoices?.reduce(
      (sum: number, invoice: any) =>
        invoice.status === "Pending"
          ? sum +
            Number(
              invoice.total_amount || 0
            )
          : sum,
      0
    ) || 0;

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        🧾 Invoice Management
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Invoices
          </p>

          <h2 className="text-4xl font-bold text-cyan-400">
            {totalInvoices}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Billing
          </p>

          <h2 className="text-4xl font-bold text-blue-400">
            ₹{totalAmount.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Paid Amount
          </p>

          <h2 className="text-4xl font-bold text-green-400">
            ₹{paidAmount.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Pending Amount
          </p>

          <h2 className="text-4xl font-bold text-red-400">
            ₹{pendingAmount.toLocaleString()}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Invoice List
        </h2>

        <div className="space-y-4">

          {invoices?.map(
            (invoice: any) => (
              <div
                key={invoice.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <p className="font-bold text-cyan-400">
                      {
                        invoice.customer_name
                      }
                    </p>

                    <p>
                      {
                        invoice.invoice_number
                      }
                    </p>

                    <p className="text-slate-400 text-sm">
                      {
                        invoice.invoice_date
                      }
                    </p>
                  </div>

                  <div className="text-right">

                    <p>
                      Amount: ₹
                      {Number(
                        invoice.amount
                      ).toLocaleString()}
                    </p>

                    <p>
                      GST: ₹
                      {Number(
                        invoice.gst_amount
                      ).toLocaleString()}
                    </p>

                    <p className="font-bold">
                      Total: ₹
                      {Number(
                        invoice.total_amount
                      ).toLocaleString()}
                    </p>

                    <p
                      className={
                        invoice.status ===
                        "Paid"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {invoice.status}
                    </p>

                  </div>

                </div>
              </div>
            )
          )}

        </div>

      </div>
    </AppLayout>
  );
}