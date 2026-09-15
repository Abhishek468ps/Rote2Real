"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        relative
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        text-gray-300
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-400/40
        hover:bg-white/[0.10]
        hover:text-white
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400/30
        dark:bg-white/[0.05]
      "
    >
      {theme === "dark" ? (
        <Sun
          size={20}
          strokeWidth={2}
          className="
            text-yellow-400
            transition-transform
            duration-300
            hover:rotate-90
          "
        />
      ) : (
        <Moon
          size={20}
          strokeWidth={2}
          className="
            text-indigo-500
            transition-transform
            duration-300
            hover:-rotate-12
          "
        />
      )}
    </button>
  );
}