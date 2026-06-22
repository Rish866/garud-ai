import AppLayout from "../components/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout>

      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Vehicles</p>
          <h2 className="text-3xl font-bold">45</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Drivers</p>
          <h2 className="text-3xl font-bold">52</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">Customers</p>
          <h2 className="text-3xl font-bold">12</h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-slate-400">MRR</p>
          <h2 className="text-3xl font-bold text-green-500">
            ₹1.2L
          </h2>
        </div>

      </div>

    </AppLayout>
  );
}