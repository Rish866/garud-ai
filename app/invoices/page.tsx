import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function InvoicesPage() {
  const { data: invoices, error } =
    await supabase
      .from("invoices")
      .select(`
        *,
        trips(
          origin,
          destination
        )
      `)
      .order("id", {
        ascending: false,
      });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Invoices
          </h1>

          <p className="text-slate-400 mt-2">
            Manage customer invoices
          </p>
        </div>

        <Link
          href="/invoices/add"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
        >
          + Create Invoice
        </Link>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg mb-6">
          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-slate-900 rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">
                Invoice
              </th>
              <th className="text-left py-3">
                Trip
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
            {invoices?.map(
              (invoice: any) => (
                <tr
                  key={invoice.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-4">
                    {
                      invoice.invoice_number
                    }
                  </td>

                  <td>
                    {
                      invoice.trips
                        ?.origin
                    }
                    {" → "}
                    {
                      invoice.trips
                        ?.destination
                    }
                  </td>

                  <td>
                    ₹
                    {Number(
                      invoice.amount
                    ).toLocaleString()}
                  </td>

                  <td>
                    {
                      invoice.status
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {invoices?.length === 0 && (
          <p className="mt-4 text-yellow-400">
            No invoices found.
          </p>
        )}
      </div>
    </main>
  );
}