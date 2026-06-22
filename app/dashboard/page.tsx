"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const vehicles = [
  {
    number: "MH46AB1234",
    driver: "Rajesh",
    status: "Online",
    speed: "54 km/h",
  },
  {
    number: "MH04XY5678",
    driver: "Amit",
    status: "Idle",
    speed: "0 km/h",
  },
  {
    number: "MH12PQ7890",
    driver: "Sunil",
    status: "Offline",
    speed: "0 km/h",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-blue-500 mb-10">
          GARUD AI
        </h1>

        <nav className="space-y-4">
          <div>📊 Dashboard</div>
          <div>📍 Live Tracking</div>
          <div>🚛 Vehicles</div>
          <div>🎥 Live View</div>
          <div>📹 Playback</div>
          <div>⚠️ AI Alerts</div>
          <div>📈 Reports</div>
          <div>⚙️ Settings</div>
        </nav>
      </aside>

      {/* Main */}
      <section className="flex-1 p-6">

        <h1 className="text-4xl font-bold mb-8">
          Fleet Monitoring Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-slate-400">Vehicles</h3>
            <p className="text-3xl font-bold">125</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-slate-400">Online</h3>
            <p className="text-3xl font-bold text-green-500">108</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-slate-400">Offline</h3>
            <p className="text-3xl font-bold text-red-500">17</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3 className="text-slate-400">AI Alerts</h3>
            <p className="text-3xl font-bold text-yellow-400">23</p>
          </div>
        </div>

        {/* Fleet + Map */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">

          {/* Vehicle Panel */}
          <div className="bg-slate-900 rounded-xl p-4">
            <h2 className="text-xl font-bold mb-4">
              Fleet Vehicles
            </h2>

            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.number}
                  className="bg-slate-800 p-3 rounded-lg"
                >
                  <div className="font-semibold">
                    {vehicle.number}
                  </div>

                  <div className="text-sm text-slate-400">
                    {vehicle.driver}
                  </div>

                  <div className="text-sm mt-2">
                    {vehicle.status}
                  </div>

                  <div className="text-xs text-slate-500">
                    {vehicle.speed}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 bg-slate-900 rounded-xl p-4">
            <h2 className="text-xl font-bold mb-4">
              Live Vehicle Tracking
            </h2>

            <div className="h-[500px] rounded-xl overflow-hidden">
              <Map />
            </div>
          </div>
        </div>

        {/* AI Alerts */}
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Recent AI Alerts
          </h2>

          <div className="space-y-3">

            <div className="bg-red-900/30 p-4 rounded-lg">
              🔴 Driver using mobile phone detected
            </div>

            <div className="bg-yellow-900/30 p-4 rounded-lg">
              🟠 Driver fatigue warning
            </div>

            <div className="bg-orange-900/30 p-4 rounded-lg">
              🟡 Harsh braking detected
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}