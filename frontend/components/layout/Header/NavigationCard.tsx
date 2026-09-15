/*"use client";

import Link from "next/link";

export default function NavigationCard({ item }: any) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="
      group
      rounded-2xl
      p-5
      bg-white
      border
      border-gray-200
      hover:border-indigo-500
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      <div
        className="
        w-12
        h-12
        rounded-xl
        bg-indigo-100
        flex
        items-center
        justify-center
        group-hover:bg-indigo-600
        transition
        "
      >
        <Icon
          className="
          text-indigo-600
          group-hover:text-white
          text-xl
          "
        />
      </div>

      <h3 className="mt-4 font-bold text-gray-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {item.description}
      </p>
    </Link>
  );
}

*/

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { MenuItem } from "./menu.config";

interface Props {
  item: MenuItem;
}

const badgeStyles = {
  NEW: "bg-emerald-500",
  BETA: "bg-amber-500",
  POPULAR: "bg-blue-500",
  SOON: "bg-slate-500",
};

export default function NavigationCard({
  item,
}: Props) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        href={item.href}
        className="
        group
        relative
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-white/5
        bg-white/[0.02]
        p-5
        transition-all
        duration-300
        hover:border-indigo-500/40
        hover:bg-white/[0.05]
        hover:shadow-[0_20px_50px_rgba(79,70,229,.20)]
        "
      >
        {/* Animated Icon */}

        <div
          className="
          relative
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          bg-gradient-to-br
          from-indigo-600
          via-blue-600
          to-cyan-500
          "
        >
          <div
            className="
            absolute
            inset-0
            opacity-0
            transition
            duration-500
            group-hover:opacity-100
            bg-[radial-gradient(circle_at_top_left,#ffffff30,transparent)]
            "
          />

          <Icon
            size={26}
            className="relative text-white"
          />
        </div>

        {/* Content */}

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <h3
              className="
              font-semibold
              text-white
              transition
              group-hover:text-indigo-300
              "
            >
              {item.title}
            </h3>

            {item.badge && (
              <span
                className={`
                rounded-full
                px-2
                py-1
                text-[10px]
                font-bold
                uppercase
                text-white
                ${badgeStyles[item.badge]}
                `}
              >
                {item.badge}
              </span>
            )}
          </div>

          <p
            className="
            mt-2
            text-sm
            leading-6
            text-gray-400
            "
          >
            {item.description}
          </p>

          <div
            className="
            mt-4
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-indigo-400
            "
          >
            Explore

            <ArrowRight
              size={16}
              className="
              transition-transform
              duration-300
              group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}