export default function AlertsPage() {
  const alerts = [
    {
      time: "10:42 AM",
      vehicle: "MH46AB1234",
      driver: "Rajesh",
      alert: "Mobile Phone Usage",
      severity: "Critical",
    },
    {
      time: "10:28 AM",
      vehicle: "MH04XY5678",
      driver: "Amit",
      alert: "Driver Fatigue",
      severity: "High",
    },
    {
      time: "10:11 AM",
      vehicle: "MH12PQ7890",
      driver: "Sunil",
      alert: "Harsh Braking",
      severity: "Medium",
    },
    {
      time: "09:58 AM",
      vehicle: "MH46AB1234",
      driver: "Rajesh",
      alert: "Forward Collision Warning",
      severity: "Critical",
    },
    {
      time: "09:41 AM",
      vehicle: "MH04XY5678",
      driver: "Amit",
      alert: "Smoking Detected",
      severity: "High",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            AI Alerts Center
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time safety and driver behavior alerts
          </p>
        </div>

        <button className="bg-red-600 px-4 py-2 rounded-lg">
          5 Active Alerts
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Critical Alerts</p>
          <h2 className="text-3xl font-bold text-red-500">2</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">High Priority</p>
          <h2 className="text-3xl font-bold text-orange-500">2</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Medium Priority</p>
          <h2 className="text-3xl font-bold text-yellow-400">1</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Today Total</p>
          <h2 className="text-3xl font-bold text-blue-500">5</h2>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Live Alert Feed
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">Time</th>
              <th className="text-left py-3">Vehicle</th>
              <th className="text-left py-3">Driver</th>
              <th className="text-left py-3">Alert</th>
              <th className="text-left py-3">Severity</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert, index) => (
              <tr
                key={index}
                className="border-b border-slate-800"
              >
                <td className="py-4">{alert.time}</td>
                <td>{alert.vehicle}</td>
                <td>{alert.driver}</td>
                <td>{alert.alert}</td>

                <td>
                  <span
                    className={
                      alert.severity === "Critical"
                        ? "text-red-500 font-bold"
                        : alert.severity === "High"
                        ? "text-orange-500 font-bold"
                        : "text-yellow-400 font-bold"
                    }
                  >
                    {alert.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alert Types */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h3 className="font-bold mb-2">
            📱 Mobile Usage
          </h3>
          <p>Driver distracted by phone</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h3 className="font-bold mb-2">
            😴 Fatigue
          </h3>
          <p>Driver drowsiness detected</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h3 className="font-bold mb-2">
            🚬 Smoking
          </h3>
          <p>Smoking inside vehicle</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h3 className="font-bold mb-2">
            ⚠️ ADAS
          </h3>
          <p>Collision & lane warnings</p>
        </div>

      </div>
    </main>
  );
}