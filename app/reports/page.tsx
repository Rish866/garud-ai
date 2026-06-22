import AppLayout from "../components/AppLayout";

export default function ReportsPage() {
  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Reports & Analytics
      </h1>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Total Trips</p>
          <h2 className="text-3xl font-bold">1,248</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Distance Covered</p>
          <h2 className="text-3xl font-bold">98,500 km</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">AI Alerts</p>
          <h2 className="text-3xl font-bold text-red-500">327</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Safety Score</p>
          <h2 className="text-3xl font-bold text-green-500">89%</h2>
        </div>

      </div>

      {/* Monthly Summary */}
      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Monthly Fleet Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span>Total Vehicles</span>
            <span>45</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span>Active Drivers</span>
            <span>52</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span>Total Driving Hours</span>
            <span>4,320 hrs</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span>Fuel Saved</span>
            <span>₹1,45,000</span>
          </div>

          <div className="flex justify-between">
            <span>Accidents Prevented</span>
            <span>18</span>
          </div>
        </div>
      </div>

      {/* Driver Rankings */}
      <div className="bg-slate-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Top Drivers
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">Driver</th>
              <th className="text-left py-3">Vehicle</th>
              <th className="text-left py-3">Safety Score</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-slate-800">
              <td className="py-4">Rajesh Kumar</td>
              <td>MH46AB1234</td>
              <td className="text-green-500 font-bold">96</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="py-4">Amit Sharma</td>
              <td>MH04XY5678</td>
              <td className="text-yellow-400 font-bold">84</td>
            </tr>

            <tr>
              <td className="py-4">Sunil Patil</td>
              <td>MH12PQ7890</td>
              <td className="text-orange-500 font-bold">78</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Alert Breakdown */}
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Alert Breakdown
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-slate-800 p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">📱 Mobile Usage</h3>
            <p className="text-3xl mt-2">82</p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">😴 Fatigue</h3>
            <p className="text-3xl mt-2">61</p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">🚬 Smoking</h3>
            <p className="text-3xl mt-2">39</p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">⚠️ ADAS</h3>
            <p className="text-3xl mt-2">145</p>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}