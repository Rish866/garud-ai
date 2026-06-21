export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-slate-900 p-6">
          <h1 className="text-3xl font-bold text-blue-500">
            GARUD AI
          </h1>

          <nav className="mt-10 space-y-4">
            <div>Dashboard</div>
            <div>Fleet</div>
            <div>Live View</div>
            <div>Alerts</div>
            <div>Playback</div>
            <div>Reports</div>
            <div>Settings</div>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-8">

          <h2 className="text-4xl font-bold mb-8">
            Fleet Monitoring Dashboard
          </h2>

          <div className="grid grid-cols-4 gap-4 mb-8">

            <div className="bg-slate-800 p-6 rounded-xl">
              <h3>Total Vehicles</h3>
              <p className="text-3xl font-bold">125</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <h3>Online</h3>
              <p className="text-3xl font-bold text-green-400">108</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <h3>Offline</h3>
              <p className="text-3xl font-bold text-red-400">17</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <h3>AI Alerts</h3>
              <p className="text-3xl font-bold text-yellow-400">23</p>
            </div>

          </div>

          <div className="bg-slate-800 rounded-xl p-8 h-96">
            Live Fleet Map Coming Soon
          </div>

        </section>

      </div>
    </main>
  );
}