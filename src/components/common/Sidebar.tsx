export default function Sidebar() {
  return (
    <div className="h-screen w-60 bg-zinc-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">StratoX</h1>

      <nav className="flex flex-col gap-4">
        <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
        <a href="/predictions" className="hover:text-blue-400">Predictions</a>
        <a href="/history" className="hover:text-blue-400">History</a>
        <a href="/settings" className="hover:text-blue-400">Settings</a>
      </nav>
    </div>
  );
}