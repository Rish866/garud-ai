import Link from "next/link";

export default function DashboardAIStatus() {
  const aiModules = [
    {
      name: "Driver Fatigue Detection",
      status: "Online",
      color: "text-green-400",
    },
    {
      name: "Phone Usage Detection",
      status: "Online",
      color: "text-green-400",
    },
    {
      name: "Smoking Detection",
      status: "Pending",
      color: "text-yellow-400",
    },
    {
      name: "Seatbelt Detection",
      status: "Online",
      color: "text-green-400",
    },
    {
      name: "Harsh Braking AI",
      status: "Online",
      color: "text-green-400",
    },
    {
      name: "Collision Warning",
      status: "Offline",
      color: "text-red-400",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            AI Engine Status
          </h2>

          <p className="text-slate-400 mt-1">
            Real-time health of all AI safety services.
          </p>
        </div>

        <Link
          href="/risk-engine"
          className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl hover:bg-blue-500/20"
        >
          AI Risk Engine →
        </Link>

      </div>

      <div className="space-y-4">

        {aiModules.map((module) => (

          <div
            key={module.name}
            className="flex justify-between items-center rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <span className="font-medium text-white">
              {module.name}
            </span>

            <span className={`font-bold ${module.color}`}>
              ● {module.status}
            </span>
          </div>

        ))}

      </div>

      <div className="mt-6 rounded-xl bg-blue-500/10 p-5">

        <p className="text-blue-400 font-semibold">
          AI Health Score
        </p>

        <h1 className="text-5xl font-black mt-2 text-white">
          92%
        </h1>

        <p className="text-slate-400 mt-2">
          All critical AI engines are operational.
        </p>

      </div>

    </div>
  );
}