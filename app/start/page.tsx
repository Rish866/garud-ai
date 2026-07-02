import Link from "next/link";
import AppLayout from "../components/AppLayout";

const dailyActions = [
  {
    title: "1. Setup masters",
    copy: "Create the base data used everywhere: vehicles, drivers, customers, ledgers, documents, and rate charts.",
    href: "/vehicles",
    action: "Open master setup",
    items: ["Vehicles", "Drivers", "Customers", "Ledgers", "Rate Charts"],
  },
  {
    title: "2. Run operations",
    copy: "Book PTL or FTL consignments, assign owned or hired vehicles, create challans, and capture E-POD.",
    href: "/trips",
    action: "Open operations desk",
    items: ["Trips", "Owned Ops", "Hired Ops", "Challan", "E-POD"],
  },
  {
    title: "3. Settle and bill",
    copy: "Close trip settlement, recover detention, generate freight bills, collect payments, and update receivables.",
    href: "/erp/trip-settlement",
    action: "Open settlement desk",
    items: ["Settlement", "Freight Bill", "Receipts", "Receivables", "Trip P&L"],
  },
  {
    title: "4. Control assets",
    copy: "Manage maintenance, tyre, battery, parts, fuel, inventory, documents, AI safety, and cost of ownership.",
    href: "/erp/maintenance-erp",
    action: "Open asset control",
    items: ["Maintenance", "Inventory", "Fuel", "Documents", "AI Safety"],
  },
];

const setupSteps = [
  { label: "1", title: "Create vehicles", href: "/vehicles", copy: "Add truck number, model, driver, GPS and status." },
  { label: "2", title: "Create drivers", href: "/drivers", copy: "Add license, phone, assigned vehicle and duty status." },
  { label: "3", title: "Create customers", href: "/customers", copy: "Add customer accounts before creating trips and invoices." },
  { label: "4", title: "Load ledgers and rates", href: "/erp/account-management-erp", copy: "Create cash, bank, vendor, customer, expense and income ledgers." },
  { label: "5", title: "Create first trip", href: "/trips", copy: "Assign customer, vehicle, driver, origin, destination and revenue." },
  { label: "6", title: "Close settlement", href: "/erp/trip-settlement", copy: "Record advance, expenses, POD, invoice, receipt and driver balance." },
  { label: "7", title: "Connect devices", href: "/integrations", copy: "Map GPS, dashcam, fuel sensor, e-lock and temperature device IDs." },
  { label: "8", title: "Invite users", href: "/settings", copy: "Give operations, accounts, workshop, safety and viewer access." },
];

const departments = [
  ["Owner", "Dashboard, Control Tower, Cost of Ownership, Profitability, Reports"],
  ["Operations", "Trips, TMS Lifecycle, Owned Vehicle Ops, Hired Vehicle Ops, PTL / FTL"],
  ["Settlement", "Trip Settlement, Challan & E-POD, Billing Packs, Invoices, Receivables"],
  ["Accounts", "Accounting, Account Management ERP, Statements, Payments, Driver Salary"],
  ["Workshop", "Maintenance ERP, Maintenance, Tyres, Inventory, Documents"],
  ["Safety / IT", "Live Dashcam, Safety Events, Video Requests, Integrations, Device Mapping"],
];

export const dynamic = "force-dynamic";

export default function StartPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#f6fbff] text-slate-950">
        <section className="mb-6 rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">
            ERP Home
          </p>
          <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Start your transport workflow here
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                GARUD AI is arranged around daily transporter work: add master
                data, run owned or hired vehicle operations, settle trips,
                bill customers, manage accounts, control maintenance, and
                monitor AI safety from one workspace.
              </p>
            </div>
            <Link
              href="/garud-agent"
              className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-400"
            >
              Ask GARUD Agent
            </Link>
          </div>
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-4">
          {dailyActions.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100"
            >
              <h2 className="text-xl font-black">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.copy}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-black text-cyan-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm font-black text-cyan-700">
                {card.action}
              </p>
            </Link>
          ))}
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">New customer setup checklist</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {setupSteps.map((step) => (
              <Link
                key={step.title}
                href={step.href}
                className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500 text-sm font-black text-slate-950">
                  {step.label}
                </span>
                <span>
                  <span className="block font-black">{step.title}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-600">
                    {step.copy}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Department map</h2>
            <div className="mt-4 space-y-3">
              {departments.map(([team, modules]) => (
                <div key={team} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-black">{team}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{modules}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Fastest way to enter data</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use the Quick Add box in the sidebar for common records. For messy
              documents or natural language requests, use GARUD Agent and type
              what you want to create.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Type request", "Add diesel bill INR 12500 for MH04XY5678"],
                ["Upload file", "Invoice, POD, permit, insurance, fuel bill"],
                ["Connect GPS", "Map vehicle number to device ID, IMEI, SIM"],
                ["Review issue", "Open Control Tower for SLA and escalations"],
                ["Export report", "Use Reports or module PDF/CSV actions"],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-4">
                  <p className="font-black">{title}</p>
                  <p className="mt-2 text-sm leading-5 text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
