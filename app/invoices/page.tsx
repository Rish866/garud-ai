import Link from "next/link";
import { supabase } from "../lib/supabase";
import InvoiceTable from "../components/InvoiceTable";

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

  const { data: balances } =
    await supabase
      .from("invoice_balances")
      .select("*");

  const enrichedInvoices =
    invoices?.map((invoice: any) => {
      const balance =
        balances?.find(
          (b: any) =>
            b.id === invoice.id
        );

      return {
        ...invoice,
        invoice_amount:
          balance?.invoice_amount ||
          invoice.amount,
        amount_paid:
          balance?.amount_paid || 0,
        outstanding_amount:
          balance?.outstanding_amount ||
          invoice.amount,
      };
    }) || [];

  const totalInvoices =
    enrichedInvoices.length;

  const paidInvoices =
    enrichedInvoices.filter(
      (invoice: any) =>
        Number(
          invoice.outstanding_amount
        ) <= 0
    ).length;

  const pendingInvoices =
    enrichedInvoices.filter(
      (invoice: any) =>
        Number(
          invoice.outstanding_amount
        ) > 0
    ).length;

  const totalRevenue =
    enrichedInvoices.reduce(
      (sum: number, invoice: any) =>
        sum +
        Number(
          invoice.invoice_amount || 0
        ),
      0
    );

  const collectedRevenue =
    enrichedInvoices.reduce(
      (sum: number, invoice: any) =>
        sum +
        Number(
          invoice.amount_paid || 0
        ),
      0
    );

  const outstandingRevenue =
    enrichedInvoices.reduce(
      (sum: number, invoice: any) =>
        sum +
        Number(
          invoice.outstanding_amount ||
            0
        ),
      0
    );

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

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Invoices
          </p>

          <h2 className="text-3xl font-bold">
            {totalInvoices}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Fully Paid
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            {paidInvoices}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Outstanding
          </p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {pendingInvoices}
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-blue-500">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">
            Collected Revenue
          </p>

          <h2 className="text-3xl font-bold text-green-500">
            ₹{collectedRevenue.toLocaleString()}
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
        <InvoiceTable
          invoices={enrichedInvoices}
        />
      </div>
    </main>
  );
}