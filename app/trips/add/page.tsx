import AddTripForm from "../../components/AddTripForm";

export default function AddTripPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        Add Trip
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl">
        <AddTripForm />
      </div>
    </main>
  );
}