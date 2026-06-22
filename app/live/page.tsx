export default function LiveMonitoringPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            GARUD AI
          </h1>

          <p className="text-slate-400">
            Live Dashcam Monitoring Center
          </p>
        </div>

        <div className="bg-green-600 px-4 py-2 rounded-lg">
          ● System Online
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="bg-slate-900 rounded-xl p-4 mb-6">
        <h2 className="text-xl font-bold mb-3">
          Selected Vehicle
        </h2>

        <div className="text-lg">
          🚛 MH46AB1234
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Camera 1 */}
        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 1 - Road View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">🎥</div>

              <div className="bg-green-600 px-3 py-1 rounded inline-block">
                Connected
              </div>
            </div>
          </div>
        </div>

        {/* Camera 2 */}
        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 2 - Driver View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">🎥</div>

              <div className="bg-green-600 px-3 py-1 rounded inline-block">
                Connected
              </div>
            </div>
          </div>
        </div>

        {/* Camera 3 */}
        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 3 - Cabin View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">🎥</div>

              <div className="bg-green-600 px-3 py-1 rounded inline-block">
                Connected
              </div>
            </div>
          </div>
        </div>

        {/* Camera 4 */}
        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="font-bold mb-3">
            Camera 4 - Rear View
          </h3>

          <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">🎥</div>

              <div className="bg-green-600 px-3 py-1 rounded inline-block">
                Connected
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Live AI Alerts */}
      <div className="bg-slate-900 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Live AI Alerts
        </h2>

        <div className="space-y-3">

          <div className="bg-red-900/30 p-4 rounded-lg">
            🔴 Driver using mobile phone detected
          </div>

          <div className="bg-yellow-900/30 p-4 rounded-lg">
            🟠 Driver fatigue detected
          </div>

          <div className="bg-orange-900/30 p-4 rounded-lg">
            🟡 Harsh braking event detected
          </div>

        </div>
      </div>

      {/* Event Timeline */}
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Event Timeline
        </h2>

        <div className="space-y-4">

          <div className="border-l-4 border-red-500 pl-4">
            10:42 AM - Mobile phone usage detected
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            10:28 AM - Driver fatigue warning
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            10:11 AM - Harsh braking detected
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            09:58 AM - Vehicle ignition ON
          </div>

        </div>
      </div>

    </main>
  );
}