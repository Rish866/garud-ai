export default function DriversPage() {
  const drivers = [
    {
      name: "Rajesh Kumar",
      vehicle: "MH46AB1234",
      score: 92,
      alerts: 2,
      status: "Excellent",
    },
    {
      name: "Amit Sharma",
      vehicle: "MH04XY5678",
      score: 78,
      alerts: 5,
      status: "Average",
    },
    {
      name: "Sunil Patil",
      vehicle: "MH12PQ7890",
      score: 65,
      alerts: 9,
      status: "Needs Attention",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Driver Management
          </h1>

          <p className="text-slate-400">
            AI Driver Safety Scorecards
          </p>
        </div>

        <button className="bg-blue-600 px-4 py-2 rounded-lg">
          + Add Driver
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Drivers</p>
          <h2 className="text-3xl font-bold">3</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Average Safety Score</p>
          <h2 className="text-3xl font-bold text-green-500">
            78
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Today's Alerts</p>
          <h2 className="text-3xl font-bold text-red-500">
            16
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Driver Scorecards
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">Driver</th>
              <th className="text-left py-3">Vehicle</th>
              <th className="text-left py-3">Safety Score</th>
              <th className="text-left py-3">Alerts</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {drivers.map((driver) => (
              <tr
                key={driver.name}
                className="border-b border-slate-800"
              >
                <td className="py-4">{driver.name}</td>
                <td>{driver.vehicle}</td>

                <td>
                  <span
                    className={
                      driver.score >= 90
                        ? "text-green-500 font-bold"
                        : driver.score >= 75
                        ? "text-yellow-400 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >
                    {driver.score}
                  </span>
                </td>

                <td>{driver.alerts}</td>

                <td>
                  <span
                    className={
                      driver.status === "Excellent"
                        ? "text-green-500"
                        : driver.status === "Average"
                        ? "text-yellow-400"
                        : "text-red-500"
                    }
                  >
                    {driver.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </main>
  );
}