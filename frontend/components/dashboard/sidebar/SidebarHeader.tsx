"use client";

import { motion } from "framer-motion";
import { BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function SidebarHeader({
  collapsed,
  onToggle,
}: SidebarHeaderProps) {
  return (
    <div
      className="
      relative
      flex
      items-center
      justify-between
      px-4
      py-5
      border-b
      border-white/10
      "
    >
      {/* Left Side */}
      <div className="flex items-center gap-3 overflow-hidden">

        {/* Animated AI Orb */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500
          via-cyan-500
          to-violet-600
          shadow-[0_0_35px_rgba(99,102,241,.45)]
          "
        >
          <BrainCircuit
            size={24}
            className="text-white"
          />

          {/* Online Pulse */}
          <span
            className="
            absolute
            -right-1
            -top-1
            h-3
            w-3
            rounded-full
            bg-emerald-400
            "
          />

          <span
            className="
            absolute
            -right-1
            -top-1
            h-3
            w-3
            rounded-full
            bg-emerald-400
            animate-ping
            "
          />
        </motion.div>

        {/* Brand Text */}
        {!collapsed && (
          <motion.div
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: .25,
            }}
            className="overflow-hidden"
          >
            <h2
              className="
              text-lg
              font-black
              tracking-wide
              bg-gradient-to-r
              from-white
              via-cyan-200
              to-indigo-400
              bg-clip-text
              text-transparent
              "
            >
              Brain Train
            </h2>

            <p
              className="
              text-xs
              text-gray-400
              tracking-wide
              "
            >
              AI Execution Workspace
            </p>
          </motion.div>
        )}
      </div>

      {/* Collapse Button */}
      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: .92,
        }}
        onClick={onToggle}
        className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/5
        text-gray-300
        transition-all
        hover:border-indigo-500/40
        hover:bg-indigo-500/10
        hover:text-white
        "
      >
        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </motion.button>
    </div>
  );
}