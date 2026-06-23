import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function PaymentsPage() {
  const { data: payments, error } =
    await supabase
      .from("payments")
      .select(`
        *,
        invoices(
          invoice_number,
          amount,
          status
        )
      `)
      .order("id", {
        ascending: false,
      });

  const totalPayments =
    payments?.length || 0;

  const totalCollected =
    payments?.reduce(
      (sum, payment) =>
        sum +
        Number(payment.amount || 0),
      0
    ) || 0;

  const { data: invoices } =
    await supabase
      .from("invoices")
      .select("*");

  const totalInvoiceValue =
    invoices?.reduce(
      (sum, invoice) =>
        sum +
        Number(invoice.amount || 0),
      0
    ) || 0;

  const outstandingRevenue =
    totalInvoiceValue -
    totalCollected;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Payments
          </h1>

          <p className="text-slate-400 mt-2">
            Track invoice collections
          </p>
        </div>

        <Link
          href="/payments/add"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
        >
          + Add Payment
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Payments
          </p>

          <h2 className="text-3xl font-bold">
            {totalPayments}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Collected
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            ₹{totalCollected.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Outstanding Revenue
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            ₹{outstandingRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg mb-6">
          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Payment History
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">
                Invoice
              </th>

              <th className="text-left py-3">
                Date
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Method
              </th>

              <th className="text-left py-3">
                UTR
              </th>
            </tr>
          </thead>

          <tbody>
            {payments?.map(
              (payment: any) => (
                <tr
                  key={payment.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-4">
                    {payment.invoices
                      ?.invoice_number ||
                      "-"}
                  </td>

                  <td>
                    {payment.payment_date}
                  </td>

                  <td className="text-green-500 font-semibold">
                    ₹
                    {Number(
                      payment.amount
                    ).toLocaleString()}
                  </td>

                  <td>
                    {payment.payment_method ||
                      "-"}
                  </td>

                  <td>
                    {payment.utr_number ||
                      "-"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {payments?.length === 0 && (
          <p className="text-yellow-400 mt-4">
            No payments found.
          </p>
        )}
      </div>
    </main>
  );
}