type Trip = {
  id: number;
  origin: string | null;
  destination: string | null;
  revenue: number | string | null;
  status: string | null;
  customers?: {
    company_name: string | null;
  } | null;
  vehicles?: {
    vehicle_number: string | null;
  } | null;
  drivers?: {
    name: string | null;
  } | null;
};

export default function DashboardRecentTrips({
  trips = [],
}: {
  trips?: Trip[];
  customers?: unknown[];
  vehicles?: unknown[];
  drivers?: unknown[];
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">Recent Trips</h2>
        <p className="mt-1 text-sm text-slate-400">
          Latest transport trips with demo data when the database is empty.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="pb-3 font-medium">Origin</th>
              <th className="pb-3 font-medium">Destination</th>
              <th className="pb-3 font-medium">Revenue</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {trips.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500">
                  No recent trips found.
                </td>
              </tr>
            )}

            {trips.map((trip) => (
              <tr key={trip.id} className="border-b border-slate-800">
                <td className="py-4 text-white">{trip.origin || "-"}</td>
                <td className="py-4 text-slate-300">
                  {trip.destination || "-"}
                </td>
                <td className="py-4 text-green-400">
                  INR {Number(trip.revenue || 0).toLocaleString("en-IN")}
                </td>
                <td className="py-4">
                  <span className="rounded-md border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                    {trip.status || "Unknown"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
