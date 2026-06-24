import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function ReceivablesPage() {
  const { data: invoices } =
    await supabase
      .from("invoices")
      .select("*");

  const { data: payments } =
    await supabase
      .from("payments")
      .select("*");

  const rows =
    invoices?.map((invoice: any) => {
      const received =
        payments
          ?.filter(
            (p: any) =>
              p.invoice_id ===
              invoice.id
          )
          .reduce(
            (
              sum: number,
              p: any
            ) =>
              sum +
              Number(
                p.amount || 0
              ),
            0
          ) || 0;

      const outstanding =
        Number(
          invoice.amount
        ) - received;

      return {
        ...invoice,
        received,
        outstanding,
      };
    }) || [];

  const totalOutstanding =
    rows.reduce(
      (
        sum: number,
        row: any
      ) =>
        sum +
        row.outstanding,
      0
    );

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-6">
        Receivables
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl mb-6">
        <p>
          Total Outstanding
        </p>

        <h2 className="text-4xl font-bold text-red-500">
          ₹
          {totalOutstanding.toLocaleString()}
        </h2>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3">
                Invoice
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Received
              </th>

              <th className="text-left py-3">
                Outstanding
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(
              (row: any) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-800"
                >
                  <td className="py-3">
                    {
                      row.invoice_number
                    }
                  </td>

                  <td>
                    ₹
                    {Number(
                      row.amount
                    ).toLocaleString()}
                  </td>

                  <td>
                    ₹
                    {row.received.toLocaleString()}
                  </td>

                  <td>
                    ₹
                    {row.outstanding.toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}