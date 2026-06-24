import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function VideoRequestsPage() {
  const { data: requests } = await supabase
    .from("video_requests")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-cyan-500 mb-8">
        📤 Video Requests
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl mb-8">

        <h2 className="text-xl font-bold mb-4">
          New Video Request
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Customer Name"
            className="bg-slate-800 p-3 rounded"
          />

          <input
            placeholder="Vehicle Number"
            className="bg-slate-800 p-3 rounded"
          />

          <input
            type="date"
            className="bg-slate-800 p-3 rounded"
          />

          <input
            type="time"
            className="bg-slate-800 p-3 rounded"
          />

          <input
            type="time"
            className="bg-slate-800 p-3 rounded"
          />

          <input
            placeholder="Reason"
            className="bg-slate-800 p-3 rounded"
          />

        </div>

        <button className="mt-4 bg-blue-600 px-6 py-2 rounded-lg">
          Submit Request
        </button>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Request History
        </h2>

        <div className="space-y-4">

          {requests?.map((request: any) => {

            const vehicle =
              vehicles?.find(
                (v: any) =>
                  v.id === request.vehicle_id
              );

            return (
              <div
                key={request.id}
                className="border border-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">
                      {request.customer_name}
                    </h3>

                    <p className="text-slate-400">
                      {vehicle?.vehicle_number ||
                        `Vehicle #${request.vehicle_id}`}
                    </p>

                    <p className="text-slate-400">
                      {request.request_date}
                    </p>

                    <p className="text-slate-400">
                      {request.from_time} → {request.to_time}
                    </p>

                    <p className="text-slate-300 mt-2">
                      {request.reason}
                    </p>

                  </div>

                  <div>

                    <span className="bg-yellow-600 px-3 py-1 rounded">
                      {request.status}
                    </span>

                  </div>

                </div>
              </div>
            );
          })}

          {requests?.length === 0 && (
            <div>
              No requests found.
            </div>
          )}

        </div>

      </div>
    </AppLayout>
  );
}