import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function MaintenancePage() {
  const { data: records } = await supabase
    .from("vehicle_maintenance")
    .select(`
      *,
      vehicles(
        vehicle_number
      )
    `)
    .order("id", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-500">
            Vehicle Maintenance
          </h1>

          <p className="text-slate-400 mt-2">
            Manage expiry dates and servicing
          </p>
        </div>

        <Link
          href="/maintenance/add"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
        >
          + Add Record
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3">Vehicle</th>
              <th className="text-left py-3">Insurance</th>
              <th className="text-left py-3">Fitness</th>
              <th className="text-left py-3">Permit</th>
              <th className="text-left py-3">PUC</th>
              <th className="text-left py-3">Service</th>
            </tr>
          </thead>

          <tbody>
            {records?.map((record: any) => (
              <tr
                key={record.id}
                className="border-b border-slate-800"
              >
                <td className="py-4">
                  {record.vehicles?.vehicle_number}
                </td>

                <td>{record.insurance_expiry}</td>
                <td>{record.fitness_expiry}</td>
                <td>{record.permit_expiry}</td>
                <td>{record.puc_expiry}</td>
                <td>{record.next_service_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}