"use client";

import { useEffect, useRef } from "react";

import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search projects, MVPs, teams, mentors...",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform
        .toUpperCase()
        .includes("MAC");

      const shortcut =
        (isMac ? event.metaKey : event.ctrlKey) &&
        event.key.toLowerCase() === "k";

      if (!shortcut) return;

      event.preventDefault();

      inputRef.current?.focus();
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  return (
    <div
      className="
      group
      relative
      hidden
      w-full
      max-w-xl
      md:flex
      "
    >
      {/* Search Icon */}

      <Search
        size={18}
        className="
        pointer-events-none
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-400
        transition-colors
        group-focus-within:text-cyan-400
        "
      />

      {/* Input */}

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        placeholder={placeholder}
        className="
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        py-3
        pl-12
        pr-20
        text-sm
        text-white
        placeholder:text-gray-500
        outline-none
        backdrop-blur-xl
        transition-all
        duration-300
        focus:border-cyan-500/60
        focus:bg-white/[0.08]
        focus:ring-4
        focus:ring-cyan-500/10
        "
      />

      {/* Shortcut */}

      <div
        className="
        pointer-events-none
        absolute
        right-3
        top-1/2
        flex
        -translate-y-1/2
        items-center
        gap-1
        rounded-lg
        border
        border-white/10
        bg-white/5
        px-2
        py-1
        text-[11px]
        text-gray-400
        backdrop-blur-xl
        "
      >
        <span>Ctrl</span>

        <span
          className="
          rounded
          bg-white/10
          px-1.5
          py-0.5
          text-white
          "
        >
          K
        </span>
      </div>
    </div>
  );
}