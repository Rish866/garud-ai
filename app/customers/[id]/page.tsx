export default async function CustomerProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-2">
        Customer Profile
      </h1>

      <p className="text-slate-400 mb-8">
        Customer ID: {id}
      </p>

      {/* Customer Info */}
      <div className="bg-slate-900 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Company Information
        </h2>

        <div className="space-y-2">
          <p><strong>Company:</strong> ABC Logistics</p>
          <p><strong>Plan:</strong> Professional</p>
          <p><strong>Vehicles:</strong> 25</p>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Monthly Billing:</strong> ₹19,975</p>
        </div>
      </div>

      {/* Vehicles */}
      <div className="bg-slate-900 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Assigned Vehicles
        </h2>

        <ul className="space-y-2">
          <li>🚛 MH46AB1234</li>
          <li>🚛 MH04XY5678</li>
          <li>🚛 MH12PQ7890</li>
        </ul>
      </div>

      {/* AI Alerts */}
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent AI Alerts
        </h2>

        <div className="space-y-3">
          <div className="bg-red-900/30 p-4 rounded-lg">
            🔴 Mobile phone usage detected
          </div>

          <div className="bg-yellow-900/30 p-4 rounded-lg">
            🟠 Driver fatigue detected
          </div>

          <div className="bg-orange-900/30 p-4 rounded-lg">
            🟡 Harsh braking detected
          </div>
        </div>
      </div>
    </main>
  );
}