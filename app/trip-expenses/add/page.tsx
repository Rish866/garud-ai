import { supabase } from "../../lib/supabase";
import AddTripExpenseForm from "../../components/AddTripExpenseForm";

export default async function AddTripExpensePage() {
const { data: trips } = await supabase
.from("trips")
.select("*")
.order("id", { ascending: false });
return ( <main className="min-h-screen bg-slate-950 text-white p-6"> <h1 className="text-4xl font-bold text-blue-500 mb-8">
Add Trip Expense </h1>

  <div className="bg-slate-900 rounded-xl p-6 max-w-2xl">
    <AddTripExpenseForm trips={trips || []} />
  </div>
</main>

);
}
