export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold text-blue-500">
          GARUD AI
        </h1>

        <div className="space-x-6">
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>

          <a
            href="/login"
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center mt-32 px-6">
        <h1 className="text-6xl font-bold mb-6">
          Monitor. Protect. Prevent.
        </h1>

        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          AI Dashcams, Live Video Monitoring, GPS Tracking and Driver Safety Intelligence for Commercial Fleets.
        </p>

        <div className="mt-10">
          <button className="bg-blue-600 px-6 py-3 rounded-lg">
            Request Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-8 px-6"
      >
        <div className="bg-slate-900 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">
            AI Dashcams
          </h3>

          <p className="text-slate-400">
            Live video monitoring with ADAS and DMS safety alerts.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">
            GPS Tracking
          </h3>

          <p className="text-slate-400">
            Real-time vehicle tracking and route playback.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Driver Safety
          </h3>

          <p className="text-slate-400">
            Detect fatigue, phone usage, smoking and risky behavior.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-6xl mx-auto mt-32 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Industries We Serve
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h3 className="font-bold">🚛 Truck Fleets</h3>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h3 className="font-bold">⛏️ Mining & Tippers</h3>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h3 className="font-bold">🚌 School Buses</h3>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-center">
            <h3 className="font-bold">📦 Logistics Fleets</h3>
          </div>
        </div>
      </section>

      {/* Why Choose Garud AI */}
      <section className="max-w-6xl mx-auto mt-24 px-6 text-center pb-24">
        <h2 className="text-4xl font-bold mb-4">
          Why Choose Garud AI?
        </h2>

        <p className="text-slate-400 mb-12">
          AI-powered dashcams designed to improve safety, reduce accidents,
          and give fleet owners complete visibility.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-500">
              24/7
            </h3>
            <p>Live Video Monitoring</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-500">
              ADAS
            </h3>
            <p>Forward Collision & Lane Alerts</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-500">
              DMS
            </h3>
            <p>Fatigue & Mobile Usage Detection</p>
          </div>
        </div>
      </section>

    </main>
  );
}