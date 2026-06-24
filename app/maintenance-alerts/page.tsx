import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function MaintenanceAlertsPage() {
  const { data: maintenance } = await supabase
  .from("maintenance_records")
  .select("*");

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  const today = new Date();

  const records =
    maintenance?.map((item: any) => {
      const vehicle =
        vehicles?.find(
          (v: any) => v.id === item.vehicle_id
        );

      const nextServiceDate = new Date(
        item.next_service_date
      );

      const daysLeft = Math.ceil(
        (nextServiceDate.getTime() -
          today.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return {
        ...item,
        vehicleNumber:
          vehicle?.vehicle_number ||
          `Vehicle #${item.vehicle_id}`,
        daysLeft,
      };
    }) || [];

  const overdue = records.filter(
    (r: any) => r.daysLeft < 0
  );

  const urgent = records.filter(
    (r: any) =>
      r.daysLeft >= 0 &&
      r.daysLeft <= 7
  );

  const warning = records.filter(
    (r: any) =>
      r.daysLeft > 7 &&
      r.daysLeft <= 30
  );

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        🔧 Maintenance Alerts
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-red-900 p-6 rounded-xl">
          <p className="text-slate-300">
            Overdue Services
          </p>

          <h2 className="text-5xl font-bold">
            {overdue.length}
          </h2>
        </div>

        <div className="bg-orange-900 p-6 rounded-xl">
          <p className="text-slate-300">
            Due Within 7 Days
          </p>

          <h2 className="text-5xl font-bold">
            {urgent.length}
          </h2>
        </div>

        <div className="bg-yellow-700 p-6 rounded-xl">
          <p className="text-slate-300">
            Due Within 30 Days
          </p>

          <h2 className="text-5xl font-bold">
            {warning.length}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Service Schedule
        </h2>

        <div className="space-y-4">

          {records
            .sort(
              (a: any, b: any) =>
                a.daysLeft - b.daysLeft
            )
            .map((record: any) => (
              <div
                key={record.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <p className="font-bold text-cyan-400">
                      {record.vehicleNumber}
                    </p>

                    <p>
                      Last Service:
                    </p>

                    <p className="text-slate-400">
                      {record.last_service_date}
                    </p>
                  </div>

                  <div className="text-right">

                    <p>
                      Next Service:
                    </p>

                    <p className="font-bold">
                      {record.next_service_date}
                    </p>

                    <p
                      className={
                        record.daysLeft < 0
                          ? "text-red-400"
                          : record.daysLeft <= 7
                          ? "text-orange-400"
                          : "text-yellow-400"
                      }
                    >
                      {record.daysLeft < 0
                        ? `Overdue by ${Math.abs(
                            record.daysLeft
                          )} days`
                        : `${record.daysLeft} days left`}
                    </p>

                  </div>

                </div>
              </div>
            ))}

        </div>

      </div>
    </AppLayout>
  );
}