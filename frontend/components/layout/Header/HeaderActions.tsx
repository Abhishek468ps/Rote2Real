"use client";

import Link from "next/link";
import { Search, ExternalLink, ArrowRight } from "lucide-react";

interface HeaderActionsProps {
  onSearchOpen: () => void;
}

export default function HeaderActions({
  onSearchOpen,
}: HeaderActionsProps) {
  return (
    <div className="hidden xl:flex items-center gap-4">

      {/* Search */}

      <button
        onClick={onSearchOpen}
        className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        px-4
        py-2.5
        hover:border-indigo-500/40
        hover:bg-white/[0.05]
        transition
        "
      >
        <Search
          size={18}
          className="text-gray-400 group-hover:text-indigo-400"
        />

        <span className="text-sm text-gray-300">
          Search
        </span>

        <kbd
          className="
          rounded-md
          border
          border-white/10
          bg-[#111827]
          px-2
          py-1
          text-[11px]
          text-gray-400
          "
        >
          Ctrl K
        </kbd>
      </button>

      {/* BrainzTalks */}

      <Link
        href="https://brainztalks.com"
        target="_blank"
        className="
        group
        flex
        items-center
        gap-2
        rounded-2xl
        border
        border-cyan-500/20
        bg-cyan-500/10
        px-5
        py-2.5
        hover:bg-cyan-500
        transition
        "
      >
        <span
          className="
          font-medium
          text-cyan-300
          group-hover:text-white
          "
        >
          BrainzTalks
        </span>

        <ExternalLink
          size={16}
          className="group-hover:text-white"
        />
      </Link>

       <Link
        href="/join"
        className="
          inline-flex
          items-center
          justify-center
          rounded-xl
          bg-indigo-600
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-indigo-500
          hover:scale-105
          shadow-lg
          shadow-indigo-600/30
        "
      >
        Join
      </Link>

    

    </div>
  );
}