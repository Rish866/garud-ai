import AddTripForm from "../../components/AddTripForm";
import AppLayout from "../../components/AppLayout";

export default function AddTripPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            TMS booking
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            Create Load, Trip & Billing Workflow
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Book a customer load with lane, rate, vehicle, driver, geofence,
            POD requirements, detention rules, and billing readiness.
          </p>
        </section>

        <AddTripForm />
      </div>
    </AppLayout>
  );
}
