import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function CustomerProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (!customer) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-3xl font-bold text-red-500">
          Customer Not Found
        </h1>

        <Link
          href="/customers"
          className="text-blue-400"
        >
          Back to Customers
        </Link>
      </main>
    );
  }

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("customer_id", id);

  const tripIds =
    trips?.map((trip) => trip.id) || [];

  let invoices: any[] = [];

  if (tripIds.length > 0) {
    const { data } = await supabase
      .from("invoices")
      .select("*")
      .in("trip_id", tripIds);

    invoices = data || [];
  }

  const invoiceIds =
    invoices.map(
      (invoice) => invoice.id
    ) || [];

  let payments: any[] = [];

  if (invoiceIds.length > 0) {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .in("invoice_id", invoiceIds);

    payments = data || [];
  }

  const totalInvoiced =
    invoices.reduce(
      (sum, invoice) =>
        sum +
        Number(invoice.amount || 0),
      0
    );

  const totalCollected =
    payments.reduce(
      (sum, payment) =>
        sum +
        Number(payment.amount || 0),
      0
    );

  const outstanding =
    totalInvoiced -
    totalCollected;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            {customer.company_name}
          </h1>

          <p className="text-slate-400 mt-2">
            Customer Ledger
          </p>
        </div>

        <Link
          href="/customers"
          className="bg-slate-800 px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Invoiced
          </p>

          <h2 className="text-3xl font-bold text-blue-500">
            ₹{totalInvoiced.toLocaleString()}
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
            Outstanding
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            ₹{outstanding.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Company Information
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Company:</strong>{" "}
            {customer.company_name}
          </p>

          <p>
            <strong>Plan:</strong>{" "}
            {customer.plan}
          </p>

          <p>
            <strong>Fleet Size:</strong>{" "}
            {customer.vehicles}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {customer.status}
          </p>

          <p>
            <strong>Monthly Revenue:</strong>{" "}
            ₹
            {Number(
              customer.monthly_revenue
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Customer Invoices
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">
                Invoice
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map(
              (invoice: any) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-3">
                    {invoice.invoice_number}
                  </td>

                  <td>
                    ₹
                    {Number(
                      invoice.amount
                    ).toLocaleString()}
                  </td>

                  <td>
                    {invoice.status}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <p className="text-yellow-400 mt-4">
            No invoices found.
          </p>
        )}
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Payment History
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
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
            {payments.map(
              (payment: any) => (
                <tr
                  key={payment.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-3">
                    {payment.payment_date}
                  </td>

                  <td className="text-green-500">
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

        {payments.length === 0 && (
          <p className="text-yellow-400 mt-4">
            No payments found.
          </p>
        )}
      </div>
    </main>
  );
}