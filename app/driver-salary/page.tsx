import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function DriverSalaryPage() {
  const { data: salaries } =
    await supabase
      .from("driver_salary")
      .select("*")
      .order("id", {
        ascending: false,
      });

  const totalSalary =
    salaries?.reduce(
      (sum: number, row: any) =>
        sum + Number(row.salary || 0),
      0
    ) || 0;

  const totalAdvance =
    salaries?.reduce(
      (sum: number, row: any) =>
        sum +
        Number(
          row.advance_paid || 0
        ),
      0
    ) || 0;

  const totalBalance =
    salaries?.reduce(
      (sum: number, row: any) =>
        sum +
        Number(row.balance || 0),
      0
    ) || 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-500">
          Driver Salary
        </h1>

        <Link
          href="/driver-salary/add"
          className="bg-blue-600 px-5 py-3 rounded"
        >
          + Add Salary
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-900 p-4 rounded-xl">
          <p>Total Salary</p>
          <h2 className="text-3xl font-bold text-yellow-500">
            ₹{totalSalary.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <p>Advance Paid</p>
          <h2 className="text-3xl font-bold text-blue-500">
            ₹{totalAdvance.toLocaleString()}
          </h2>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <p>Outstanding</p>
          <h2 className="text-3xl font-bold text-red-500">
            ₹{totalBalance.toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3">
                Driver ID
              </th>

              <th className="text-left py-3">
                Month
              </th>

              <th className="text-left py-3">
                Salary
              </th>

              <th className="text-left py-3">
                Advance
              </th>

              <th className="text-left py-3">
                Balance
              </th>

              <th className="text-left py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {salaries?.map(
              (row: any) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-800"
                >
                  <td className="py-3">
                    {row.driver_id}
                  </td>

                  <td>
                    {row.month}
                  </td>

                  <td>
                    ₹{Number(
                      row.salary
                    ).toLocaleString()}
                  </td>

                  <td>
                    ₹{Number(
                      row.advance_paid
                    ).toLocaleString()}
                  </td>

                  <td>
                    ₹{Number(
                      row.balance
                    ).toLocaleString()}
                  </td>

                  <td>
                    {row.status}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}