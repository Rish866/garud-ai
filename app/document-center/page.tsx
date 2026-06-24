import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function DocumentCenterPage() {
  const { data: docs } = await supabase
    .from("vehicle_documents")
    .select("*")
    .order("expiry_date");

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-red-500 mb-8">
        📄 Document Center
      </h1>

      <div className="grid gap-6">

        {docs?.map((doc: any) => {

          const vehicle =
            vehicles?.find(
              (v: any) =>
                v.id === doc.vehicle_id
            );

          return (
            <div
              key={doc.id}
              className="bg-slate-900 p-6 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-green-400">
                {vehicle?.vehicle_number}
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-4">

                <div>
                  <p>
                    <strong>Document:</strong>{" "}
                    {doc.document_type}
                  </p>

                  <p>
                    <strong>Number:</strong>{" "}
                    {doc.document_number}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Issue Date:</strong>{" "}
                    {doc.issue_date}
                  </p>

                  <p>
                    <strong>Expiry:</strong>{" "}
                    {doc.expiry_date}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {doc.status}
                  </p>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </AppLayout>
  );
}