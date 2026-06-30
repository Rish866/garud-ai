import Link from "next/link";
import AppLayout from "../components/AppLayout";
import { architectureModules } from "../lib/erpArchitecture";

export default function ERPArchitecturePage() {
  const groups = Array.from(new Set(architectureModules.map((item) => item.group)));
  const dedicated = architectureModules.filter((item) => item.level === "dedicated").length;
  const universal = architectureModules.length - dedicated;

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#05070d] text-white">
        <section className="mb-6 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#111827,#06131f_48%,#0f172a)] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Complete ERP architecture
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">
            GARUD AI Module Coverage
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            Every module from the transporter ERP architecture is listed here.
            Dedicated modules use deeper custom pages; universal modules use the
            shared live workbench with create, edit, delete, issue creation, and
            PDF/action exports.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            ["Total modules", architectureModules.length, "Architecture items"],
            ["Dedicated modules", dedicated, "Custom workflows"],
            ["Universal modules", universal, "Shared ERP workbench"],
            ["Groups", groups.length, "Operating areas"],
          ].map(([label, value, hint]) => (
            <div
              key={label}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-5"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <h2 className="mt-3 text-3xl font-black text-white">{value}</h2>
              <p className="mt-2 text-sm text-slate-500">{hint}</p>
            </div>
          ))}
        </section>

        <div className="space-y-6">
          {groups.map((group) => (
            <section
              key={group}
              className="rounded-lg border border-slate-800 bg-slate-900/80 p-6"
            >
              <h2 className="text-xl font-bold">{group}</h2>
              <div className="mt-5 grid gap-4 xl:grid-cols-3">
                {architectureModules
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-white">{item.title}</h3>
                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-black ${
                            item.level === "dedicated"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-cyan-400/10 text-cyan-300"
                          }`}
                        >
                          {item.level}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {item.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="rounded-md border border-slate-800 px-2 py-1 text-[10px] font-bold text-slate-300"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
