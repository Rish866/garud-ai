export default function Navbar() {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-blue-500">
          GARUD AI
        </h1>
      </div>

      <div className="flex gap-6">
        <a href="/" className="hover:text-blue-400">
          Home
        </a>

        <a href="/dashboard" className="hover:text-blue-400">
          Dashboard
        </a>

        <a href="/live" className="hover:text-blue-400">
          Live Monitoring
        </a>

        <a href="/login" className="hover:text-blue-400">
          Login
        </a>
      </div>
    </div>
  );
}