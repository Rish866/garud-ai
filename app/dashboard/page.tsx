"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-blue-500 mb-10">
          GARUD AI
        </h1>

        <nav className="space-y-4">
          <div className="cursor-pointer hover:text-blue-400">
            Dashboard
          </div>
          <div className="cursor-pointer hover:text-blue-400">
            Live View
          </div>
          <div className="cursor-pointer hover:text-blue-400">
            Vehicles
          </div>
          <div className="cursor-pointer hover:text-blue-400">
            Playback
          </div>
          <div className="cursor-pointer hover:text-blue-400">
            AI Alerts
          </div>
          <div className="cursor-pointer hover:text-blue-400">
            Reports
          </div>
          <div className="cursor-pointer hover:text-blue-400">
            Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">
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

        {/* Map */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Live Vehicle Map
          </h2>

          <div className="h-[450px] rounded-xl overflow-hidden">
            <Map />
          </div>
        </div>

        {/* Vehicles */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Active Vehicles
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3">Vehicle</th>
                <th className="text-left py-3">Driver</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Speed</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-3">MH46AB1234</td>
                <td>Rajesh</td>
                <td className="text-green-500">Online</td>
                <td>54 km/h</td>
              </tr>

              <tr>
                <td className="py-3">MH04XY5678</td>
                <td>Amit</td>
                <td className="text-green-500">Online</td>
                <td>42 km/h</td>
              </tr>

              <tr>
                <td className="py-3">MH12PQ7890</td>
                <td>Sunil</td>
                <td className="text-red-500">Offline</td>
                <td>0 km/h</td>
              </tr>
            </tbody>
          </table>
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