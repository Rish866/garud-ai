import AppLayout from "../components/AppLayout";
import { supabase } from "../lib/supabase";

export default async function DocumentAlertsPage() {
  const { data: docs } = await supabase
    .from("vehicle_documents")
    .select("*");

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  const today = new Date();

  const processedDocs =
    docs?.map((doc: any) => {
      const expiryDate = new Date(doc.expiry_date);

      const daysLeft = Math.ceil(
        (expiryDate.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const vehicle =
        vehicles?.find(
          (v: any) => v.id === doc.vehicle_id
        );

      return {
        ...doc,
        daysLeft,
        vehicleNumber:
          vehicle?.vehicle_number ||
          `Vehicle #${doc.vehicle_id}`,
      };
    }) || [];

  const expiredDocs = processedDocs.filter(
    (d: any) => d.daysLeft < 0
  );

  const urgentDocs = processedDocs.filter(
    (d: any) =>
      d.daysLeft >= 0 &&
      d.daysLeft <= 7
  );

  const warningDocs = processedDocs.filter(
    (d: any) =>
      d.daysLeft > 7 &&
      d.daysLeft <= 30
  );

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-red-500 mb-8">
        🚨 Document Expiry Alerts
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-red-900 p-6 rounded-xl">
          <p className="text-slate-300">
            Expired Documents
          </p>

          <h2 className="text-5xl font-bold">
            {expiredDocs.length}
          </h2>
        </div>

        <div className="bg-orange-900 p-6 rounded-xl">
          <p className="text-slate-300">
            Expiring Within 7 Days
          </p>

          <h2 className="text-5xl font-bold">
            {urgentDocs.length}
          </h2>
        </div>

        <div className="bg-yellow-700 p-6 rounded-xl">
          <p className="text-slate-300">
            Expiring Within 30 Days
          </p>

          <h2 className="text-5xl font-bold">
            {warningDocs.length}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Alert List
        </h2>

        <div className="space-y-4">

          {processedDocs
            .sort(
              (a: any, b: any) =>
                a.daysLeft - b.daysLeft
            )
            .map((doc: any) => (
              <div
                key={doc.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <p className="font-bold text-cyan-400">
                      {doc.vehicleNumber}
                    </p>

                    <p>
                      {doc.document_type}
                    </p>

                    <p className="text-slate-400 text-sm">
                      {doc.document_number}
                    </p>
                  </div>

                  <div className="text-right">

                    <p>
                      Expiry:
                    </p>

                    <p className="font-bold">
                      {doc.expiry_date}
                    </p>

                    <p
                      className={
                        doc.daysLeft < 0
                          ? "text-red-400"
                          : doc.daysLeft <= 7
                          ? "text-orange-400"
                          : "text-yellow-400"
                      }
                    >
                      {doc.daysLeft < 0
                        ? `Expired ${Math.abs(
                            doc.daysLeft
                          )} days ago`
                        : `${doc.daysLeft} days left`}
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