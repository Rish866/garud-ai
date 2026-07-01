import Link from "next/link";
import AppLayout from "../components/AppLayout";

const dailyActions = [
  {
    title: "Add fleet master data",
    copy: "Start here for new vehicles, drivers, customers, and documents.",
    href: "/vehicles",
    action: "Open master data",
    items: ["Vehicles", "Drivers", "Customers", "Documents"],
  },
  {
    title: "Run a trip",
    copy: "Plan lane, assign truck/driver, track trip, and capture expenses.",
    href: "/trips",
    action: "Create or manage trips",
    items: ["Trips", "Route Planner", "Trip Expenses", "POD"],
  },
  {
    title: "Bill and collect",
    copy: "Generate invoices, build billing packs, receive payments, and control credit.",
    href: "/invoices",
    action: "Open billing desk",
    items: ["Invoices", "Payments", "Receivables", "Billing Packs"],
  },
  {
    title: "Keep fleet safe",
    copy: "Monitor dashcams, review AI alerts, request clips, and close safety issues.",
    href: "/live-dashcam",
    action: "Open AI safety",
    items: ["Live Dashcam", "Safety Events", "Video Requests", "Risk Engine"],
  },
];

const setupSteps = [
  { label: "1", title: "Create vehicles", href: "/vehicles", copy: "Add truck number, model, driver, GPS and status." },
  { label: "2", title: "Create drivers", href: "/drivers", copy: "Add license, phone, assigned vehicle and duty status." },
  { label: "3", title: "Create customers", href: "/customers", copy: "Add customer accounts before creating trips and invoices." },
  { label: "4", title: "Create first trip", href: "/trips", copy: "Assign customer, vehicle, driver, origin, destination and revenue." },
  { label: "5", title: "Upload documents", href: "/document-center", copy: "Store RC, permit, insurance, POD, invoice and fuel bills." },
  { label: "6", title: "Map GPS/devices", href: "/integrations", copy: "Add GPS vendor, API credentials, IMEI and device IDs." },
  { label: "7", title: "Invite users", href: "/settings", copy: "Give operations, finance, safety and viewer access." },
];

const departments = [
  ["Owner", "Dashboard, Control Tower, Reports, Settings"],
  ["Dispatch", "Trips, Route Planner, Vehicles, Drivers"],
  ["Accounts", "Invoices, Payments, Receivables, Driver Salary"],
  ["Workshop", "Maintenance, Tyres, Documents"],
  ["Safety", "Live Dashcam, Safety Events, Video Requests"],
  ["IT / Vendor", "Integrations, Device Mapping, API Health"],
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
                data, run trips, bill customers, collect money, manage safety,
                and control users.
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
