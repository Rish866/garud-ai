export default function VehiclesPage() {
  const vehicles = [
    {
      vehicle: "MH46AB1234",
      driver: "Rajesh",
      device: "LOTIM-40DAI-001",
      status: "Online",
    },
    {
      vehicle: "MH04XY5678",
      driver: "Amit",
      device: "LOTIM-40DAI-002",
      status: "Idle",
    },
    {
      vehicle: "MH12PQ7890",
      driver: "Sunil",
      device: "LOTIM-40DAI-003",
      status: "Offline",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">
          Vehicle Management
        </h1>

        <button className="bg-blue-600 px-4 py-2 rounded-lg">
          + Add Vehicle
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">Vehicle</th>
              <th className="text-left py-3">Driver</th>
              <th className="text-left py-3">Device</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v.vehicle} className="border-b border-slate-800">
                <td className="py-4">{v.vehicle}</td>
                <td>{v.driver}</td>
                <td>{v.device}</td>
                <td>
                  <span
                    className={
                      v.status === "Online"
                        ? "text-green-500"
                        : v.status === "Idle"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }
                  >
                    {v.status}
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