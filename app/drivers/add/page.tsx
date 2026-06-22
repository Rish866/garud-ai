import AppLayout from "../../components/AppLayout";
import AddDriverForm from "../../components/AddDriverForm";
import { supabase } from "../../lib/supabase";

export default async function AddDriverPage() {
  const { data: vehicles } =
    await supabase
      .from("vehicles")
      .select("*");

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Add Driver
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl">
        <AddDriverForm
          vehicles={vehicles || []}
        />
      </div>
    </AppLayout>
  );
}