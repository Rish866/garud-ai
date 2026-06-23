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
            Invoice Amount
          </th>

          <th className="text-left py-3">
            Paid
          </th>

          <th className="text-left py-3">
            Outstanding
          </th>

          <th className="text-left py-3">
            Status
          </th>

          <th className="text-left py-3">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((invoice: any) => {
          const paidAmount =
            Number(invoice.amount_paid || 0);

          const invoiceAmount =
            Number(invoice.invoice_amount || invoice.amount || 0);

          const outstandingAmount =
            Number(invoice.outstanding_amount ??
              invoiceAmount - paidAmount);

          let paymentStatus = "Unpaid";
          let statusClass =
            "text-red-500";

          if (
            outstandingAmount <= 0 &&
            invoiceAmount > 0
          ) {
            paymentStatus = "Paid";
            statusClass =
              "text-green-500";
          } else if (
            paidAmount > 0
          ) {
            paymentStatus =
              "Partial";
            statusClass =
              "text-yellow-500";
          }

          return (
            <tr
              key={invoice.id}
              className="border-b border-slate-800"
            >
              <td className="py-4">
                {invoice.invoice_number}
              </td>

              <td>
                {invoice.trips?.origin}
                {" -> "}
                {invoice.trips?.destination}
              </td>

              <td>
                ₹
                {invoiceAmount.toLocaleString()}
              </td>

              <td className="text-green-500">
                ₹
                {paidAmount.toLocaleString()}
              </td>

              <td className="text-red-500">
                ₹
                {outstandingAmount.toLocaleString()}
              </td>

              <td>
                <span
                  className={
                    statusClass
                  }
                >
                  {paymentStatus}
                </span>
              </td>

              <td className="space-x-2">
                {paymentStatus !==
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

                <a
                  href={`/api/invoices/${invoice.id}/pdf`}
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Download PDF
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}