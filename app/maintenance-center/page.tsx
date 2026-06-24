import MaintenanceEntryForm from "../components/MaintenanceEntryForm";
import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function MaintenanceCenterPage() {
  const { data: maintenance } = await supabase
    .from("maintenance_records")
    .select("*")
    .order("service_date", {
      ascending: false,
    });

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        🔧 Maintenance Center
      </h1>
<MaintenanceEntryForm
  vehicles={vehicles || []}
/>
      <div className="grid gap-6">

        {maintenance?.map((item: any) => {

          const vehicle =
            vehicles?.find(
              (v: any) =>
                v.id === item.vehicle_id
            );

          return (
            <div
              key={item.id}
              className="bg-slate-900 p-6 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-green-400">
                {vehicle?.vehicle_number}
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-4">

                <div>
                  <p>
                    <strong>Service:</strong>{" "}
                    {item.service_type}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {item.service_date}
                  </p>

                  <p>
                    <strong>Vendor:</strong>{" "}
                    {item.vendor}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Cost:</strong> ₹
                    {item.cost}
                  </p>

                  <p>
                    <strong>Current KM:</strong>{" "}
                    {item.current_odometer}
                  </p>

                  <p>
                    <strong>Next Due KM:</strong>{" "}
                    {item.next_due_km}
                  </p>

                  <p>
                    <strong>Next Due Date:</strong>{" "}
                    {item.next_due_date}
                  </p>
                </div>

              </div>

              <p className="mt-4 text-slate-400">
                {item.remarks}
              </p>
            </div>
          );
        })}

      </div>
    </AppLayout>
  );
}