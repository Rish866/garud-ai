"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AddInvoiceForm() {
  const router = useRouter();

  const [trips, setTrips] = useState<any[]>([]);

  const [tripId, setTripId] = useState("");
  const [invoiceNumber, setInvoiceNumber] =
    useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] =
    useState("Pending");

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
    const { data } = await supabase
      .from("trips")
      .select("*")
      .order("id", { ascending: false });

    setTrips(data || []);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("invoices")
      .insert([
        {
          trip_id: Number(tripId),
          invoice_number: invoiceNumber,
          amount,
          status,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Invoice Created");

    router.push("/invoices");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <select
        value={tripId}
        onChange={(e) =>
          setTripId(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      >
        <option value="">
          Select Trip
        </option>

        {trips.map((trip) => (
          <option
            key={trip.id}
            value={trip.id}
          >
            #{trip.id} | {trip.origin}
            {" → "}
            {trip.destination}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Invoice Number"
        value={invoiceNumber}
        onChange={(e) =>
          setInvoiceNumber(
            e.target.value
          )
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            Number(e.target.value)
          )
        }
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
        className="w-full p-3 rounded bg-slate-800"
      >
        <option>Pending</option>
        <option>Paid</option>
        <option>Overdue</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
      >
        Create Invoice
      </button>
    </form>
  );
}