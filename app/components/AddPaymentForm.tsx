"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddPaymentForm({
  invoices,
}: {
  invoices: any[];
}) {
  const router = useRouter();

  const [invoiceId, setInvoiceId] =
    useState("");

  const [paymentDate, setPaymentDate] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [utrNumber, setUtrNumber] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("payments")
      .insert([
        {
          invoice_id: Number(invoiceId),
          payment_date: paymentDate,
          amount: Number(amount),
          payment_method: paymentMethod,
          utr_number: utrNumber,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Payment Added");

    router.push("/payments");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-6 rounded-xl space-y-4"
    >
      <div>
        <label className="block mb-2">
          Invoice
        </label>

        <select
          value={invoiceId}
          onChange={(e) =>
            setInvoiceId(e.target.value)
          }
          className="w-full bg-slate-800 p-3 rounded"
          required
        >
          <option value="">
            Select Invoice
          </option>

          {invoices.map(
            (invoice: any) => (
              <option
                key={invoice.id}
                value={invoice.id}
              >
                {invoice.invoice_number}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="block mb-2">
          Payment Date
        </label>

        <input
          type="date"
          value={paymentDate}
          onChange={(e) =>
            setPaymentDate(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">
          Amount
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full bg-slate-800 p-3 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2">
          Payment Method
        </label>

        <input
          type="text"
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>

      <div>
        <label className="block mb-2">
          UTR Number
        </label>

        <input
          type="text"
          value={utrNumber}
          onChange={(e) =>
            setUtrNumber(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
      >
        Add Payment
      </button>
    </form>
  );
}