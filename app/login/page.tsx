export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md shadow-xl">

        <h1 className="text-3xl font-bold text-center text-blue-500 mb-2">
          GARUD AI
        </h1>

        <p className="text-center text-slate-400 mb-8">
          AI Dashcam Monitoring Platform
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 mb-4"
        />

        <a
  href="/dashboard"
  className="block w-full bg-blue-600 p-3 rounded-lg font-semibold text-center"
>
  Enter Dashboard
</a>

        <div className="text-center mt-6">
          <a href="/" className="text-blue-400">
            ← Back to Home
          </a>
        </div>

      </div>
    </main>
  );
}