"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function InvoiceTable({
  invoices,
}: {
  invoices: any[];
}) {
  const router = useRouter();

  async function markPaid(id: number) {
    const { error } = await supabase
      .from("invoices")
      .update({
        status: "Paid",
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
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

          <th className="text-left py-3">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((invoice: any) => (
          <tr
            key={invoice.id}
            className="border-b border-slate-800"
          >
            <td className="py-4">
              {invoice.invoice_number}
            </td>

            <td>
              {invoice.trips?.origin}
              {" → "}
              {invoice.trips?.destination}
            </td>

            <td>
              ₹
              {Number(
                invoice.amount
              ).toLocaleString()}
            </td>

            <td>
              <span
                className={
                  invoice.status ===
                  "Paid"
                    ? "text-green-500"
                    : "text-yellow-500"
                }
              >
                {invoice.status}
              </span>
            </td>

            <td>
              {invoice.status !==
                "Paid" && (
                <button
                  onClick={() =>
                    markPaid(
                      invoice.id
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                >
                  Mark Paid
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}