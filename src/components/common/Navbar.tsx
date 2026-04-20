"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, ChevronUp } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch() {
    const q = query.toLowerCase();

    if (q.includes("temp")) {
      router.push("/temperature");
    } else if (q.includes("humid")) {
      router.push("/humidity");
    } else if (q.includes("air") || q.includes("aqi")) {
      router.push("/air");
    } else {
      alert("Page not found.");
    }
  }

  return (
    <header className="relative bg-[#13151a] border-b border-white/[0.06]">
      <div className="flex items-center justify-between h-[60px] px-4 sm:px-6">
        <Link href="/dashboard">
          <span className="text-[17px] font-semibold text-white tracking-tight">
            StratoX
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-5">
          <span className="text-xs text-white/30">
            Last update: <span className="text-white/55">12:45 PM</span>
          </span>

          <div className="flex items-center gap-[7px] bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-[5px]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.6)] animate-pulse" />
            <span className="text-xs font-medium text-white/60">
              Device Online
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-[6px] px-2">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-transparent outline-none text-sm text-white placeholder:text-white/30 w-[170px] h-[27px]"
            />
          </div>

          <button
            onClick={handleSearch}
            className="flex items-center justify-center w-[34px] h-[34px] rounded-[10px] bg-white/[0.06] border border-white/[0.08] text-white/45 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Search size={16} />
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex items-center justify-center w-[34px] h-[34px] rounded-[10px] bg-white/[0.06] border border-white/[0.08] text-white"
        >
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden absolute top-[60px] left-0 w-full bg-[#13151a] border-t border-white/[0.06] px-4 py-4 flex flex-col gap-4 z-50">
          <span className="text-sm text-white/40">
            Last update: <span className="text-white/70">12:45 PM</span>
          </span>

          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-[6px] w-fit">
            <span className="w-[7px] h-[7px] rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-sm text-white/70">Device Online</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-[6px] px-2">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-transparent outline-none text-sm text-white placeholder:text-white/30 w-[200px] h-[27px]"
            />
          </div>

          <button
            onClick={handleSearch}
            className="flex items-center justify-center w-[34px] h-[34px] rounded-[10px] bg-white/[0.06] border border-white/[0.08] text-white/45 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Search size={16} />
          </button>
        </div>
      )}
    </header>
  );
}
