export default function Navbar() {
  return (
    <div className="w-full h-16 bg-zinc-900 text-white flex items-center justify-between px-6 border-b border-zinc-700">
    
      <div className="text-xl font-semibold">
        StratoX Dashboard
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-400">
          Last update: 12:45
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm">Device Online</span>
        </div>

        <div className="w-8 h-8 bg-zinc-700 rounded-full"></div>
      </div>
    </div>
  );
}