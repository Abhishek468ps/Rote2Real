"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Sparkles,
  Brain,
  GraduationCap,
  Cpu,
  ChevronRight,
} from "lucide-react";

interface Announcement {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    icon: <Rocket size={16} />,
    title: "Admissions Open 2026",
    description:
      "Join India's AI & Software Engineering Ecosystem.",
    href: "/admissions",
    badge: "OPEN",
  },

  {
    id: 2,
    icon: <Brain size={16} />,
    title: "Free AI Evaluation",
    description:
      "Get your competency report powered by AI.",
    href: "/evaluation",
    badge: "FREE",
  },

  {
    id: 3,
    icon: <GraduationCap size={16} />,
    title: "Weekend MVP Challenge",
    description:
      "Build real Micro MVPs in 48 Hours.",
    href: "/srishtizia",
    badge: "NEW",
  },

  {
    id: 4,
    icon: <Cpu size={16} />,
    title: "Thin Client Labs",
    description:
      "Cloud Development Workspace for Students.",
    href: "/thin-client",
    badge: "BETA",
  },

  {
    id: 5,
    icon: <Sparkles size={16} />,
    title: "Srishtizia Product 2",
    description:
      "Industry Readiness & Portfolio Building Platform.",
    href: "/products/srishtizia-product-2",
    badge: "NEW",
  },
];

const badgeColor: Record<string, string> = {
  OPEN: "bg-green-500",
  FREE: "bg-blue-500",
  NEW: "bg-indigo-500",
  BETA: "bg-orange-500",
};

export default function AnnouncementBar() {
  const announcements = useMemo(() => ANNOUNCEMENTS, []);

  const [index, setIndex] = useState(0);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused, announcements.length]);

  const active = announcements[index];

  return (
    <div
      className="
      relative
      z-[60]
      w-full
      overflow-hidden
      border-b
      border-indigo-500/20
      bg-gradient-to-r
      from-[#050816]
      via-[#0B1220]
      to-[#050816]
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex h-12 max-w-[1500px] items-center justify-between px-6">

        {/* LEFT */}

        <div className="hidden lg:flex items-center gap-3">

          <div
            className="
            rounded-full
            bg-indigo-500/20
            p-2
            text-indigo-400
            "
          >
            <Rocket size={15} />
          </div>

          <span className="text-sm text-gray-300">

            Brain Train Enterprise Ecosystem

          </span>

        </div>

        {/* CENTER */}

        <div className="flex-1 flex justify-center">

          <AnimatePresence mode="wait">

            <motion.div
              key={active.id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <Link
                href={active.href}
                className="
                flex
                items-center
                gap-3
                rounded-full
                px-4
                py-1.5
                transition
                hover:bg-white/5
                "
              >
                <span className="text-indigo-400">

                  {active.icon}

                </span>

                <span className="font-medium text-white">

                  {active.title}

                </span>

                {active.badge && (

                  <span
                    className={`
                    rounded-full
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    text-white
                    ${badgeColor[active.badge]}
                    `}
                  >
                    {active.badge}
                  </span>

                )}

                <span className="hidden xl:block text-sm text-gray-400">

                  {active.description}

                </span>

                <ChevronRight
                  size={15}
                  className="text-indigo-400"
                />

              </Link>

            </motion.div>

          </AnimatePresence>

        </div>

        {/* RIGHT */}

        <div className="hidden lg:flex items-center gap-2">

          {announcements.map((_, i) => (

            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
              h-2
              rounded-full
              transition-all
              duration-300
              ${
                index === i
                  ? "w-8 bg-indigo-500"
                  : "w-2 bg-gray-600 hover:bg-gray-400"
              }
              `}
            />

          ))}

        </div>

      </div>
    </div>
  );
}