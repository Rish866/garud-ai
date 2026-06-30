import AppLayout from "../components/AppLayout";
import GarudAgentClient from "../components/agent/GarudAgentClient";

export default function GarudAgentPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-slate-900">
        <section className="mb-6 rounded-lg border border-cyan-100 bg-[linear-gradient(135deg,#ffffff,#e8f7ff_52%,#f4fff8)] p-6 shadow-xl shadow-cyan-900/10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">
            GARUD AI Agent
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Natural Language ERP Operator
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
            Let a customer or operator type requests, upload bills, PODs,
            invoices, permits, and documents, then automatically classify and
            record them under the right ERP module.
          </p>
        </section>

        <GarudAgentClient />
      </div>
    </AppLayout>
  );
}
