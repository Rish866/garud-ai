import Image from "next/image";
import Link from "next/link";

const proofPoints = [
  { label: "Fleet visibility", value: "24/7" },
  { label: "Camera channels", value: "4CH" },
  { label: "Risk detection", value: "ADAS + DMS" },
  { label: "Ops stack", value: "ERP ready" },
];

const platformModules = [
  "Live AI dashcam monitoring",
  "GPS tracking and route playback",
  "Driver risk scoring",
  "Incident evidence queue",
  "Fleet maintenance alerts",
  "Trips, invoices, payments",
];

const investorSignals = [
  "Solves safety, compliance, and profit leakage in one fleet operating system.",
  "Built for Indian transporters: trucks, tippers, buses, cold chain, and logistics.",
  "Demo-ready SaaS surface that can sell before every hardware integration is complete.",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-11 w-11 overflow-hidden rounded-lg border border-white/10 bg-white">
            <Image
              src="/logo.png"
              alt="GARUD AI"
              fill
              sizes="44px"
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="text-lg font-black tracking-wide">GARUD AI</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#platform" className="hover:text-white">
            Platform
          </a>
          <a href="#traction" className="hover:text-white">
            Investor view
          </a>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </div>

        <Link
          href="/command-center"
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Open demo
        </Link>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-10 px-5 pb-14 pt-8 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-5 w-fit rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
            Fleet intelligence SaaS
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            GARUD AI
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
            AI dashcams, live video, GPS tracking, driver safety intelligence,
            and transport ERP in one command center for commercial fleets.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/command-center"
              className="rounded-md bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
            >
              View command center
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View SaaS dashboard
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {proofPoints.map((point) => (
              <div
                key={point.label}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-2xl font-black text-cyan-200">
                  {point.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{point.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-cyan-950/30">
          <div className="rounded-md border border-white/10 bg-[#090d16]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Live command
                </p>
                <h2 className="text-lg font-bold">Western India fleet</h2>
              </div>
              <span className="rounded-md bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                Online
              </span>
            </div>

            <div className="grid gap-3 p-3 md:grid-cols-2">
              {["Road", "Cabin", "Left blind spot", "Cargo"].map((camera, index) => (
                <div
                  key={camera}
                  className="min-h-40 rounded-md border border-slate-800 bg-[radial-gradient(circle_at_30%_25%,rgba(34,211,238,0.18),transparent_28%),linear-gradient(135deg,#0f172a,#020617)] p-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{camera}</span>
                    <span className="text-emerald-300">REC 0{index + 1}</span>
                  </div>
                  <div className="mt-16 h-2 rounded-full bg-cyan-300/30" />
                  <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
                </div>
              ))}
            </div>

            <div className="grid gap-3 border-t border-white/10 p-3 md:grid-cols-3">
              {["Fatigue risk", "Route delay", "Revenue today"].map((item, index) => (
                <div key={item} className="rounded-md bg-white/[0.04] p-3">
                  <p className="text-xs text-slate-400">{item}</p>
                  <p className="mt-2 text-xl font-black">
                    {index === 0 ? "Low" : index === 1 ? "12 min" : "INR 1.94L"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
              Product
            </p>
            <h2 className="mt-3 text-3xl font-black">One operating layer for safer, more profitable fleets.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {platformModules.map((module) => (
              <div key={module} className="rounded-lg border border-white/10 bg-slate-950/80 p-4 text-slate-200">
                {module}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="traction" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {investorSignals.map((signal) => (
            <div key={signal} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm leading-6 text-slate-300">{signal}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
