/*"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    href: string;
    title: string;
    icon: LucideIcon;
    collapsed: boolean;
    badge?: number;
    onClick?: () => void;
}

export default function SidebarItem({
    href,
    title,
    icon: Icon,
    collapsed,
    badge,
    onClick,
}: SidebarItemProps) {

    const pathname = usePathname();

    const active =
        pathname === href ||
        pathname.startsWith(href + "/");

    return (

        <Link
            href={href}
            onClick={onClick}
            className="block"
        >

            <motion.div

                whileHover={{
                    scale: 1.02,
                    x: 4,
                }}

                whileTap={{
                    scale: 0.98,
                }}

                transition={{
                    duration: 0.18,
                }}

                title={collapsed ? title : ""}

                className={`
                    group
                    relative
                    mb-2
                    flex
                    items-center
                    rounded-2xl
                    px-4
                    py-3
                    transition-all
                    duration-200

                    ${
                        active
                            ? `
                            bg-gradient-to-r
                            from-indigo-600/25
                            to-cyan-500/20
                            border
                            border-indigo-500/40
                            shadow-[0_0_30px_rgba(99,102,241,.18)]
                            `
                            : `
                            hover:bg-white/5
                            border
                            border-transparent
                            `
                    }
                `}
            >

                

                {active && (

                    <motion.div

                        layoutId="activeSidebarIndicator"

                        className="
                        absolute
                        left-0
                        top-2
                        bottom-2
                        w-1
                        rounded-r-full
                        bg-gradient-to-b
                        from-indigo-500
                        to-cyan-500
                        "

                    />

                )}

                

                <Icon
                    size={20}
                    className={`
                        shrink-0
                        transition-colors

                        ${
                            active
                                ? "text-indigo-400"
                                : "text-gray-400 group-hover:text-white"
                        }
                    `}
                />


                {!collapsed && (

                    <motion.span

                        initial={{
                            opacity: 0,
                        }}

                        animate={{
                            opacity: 1,
                        }}

                        className={`
                            ml-4
                            flex-1
                            text-sm
                            font-medium

                            ${
                                active
                                    ? "text-white"
                                    : "text-gray-300 group-hover:text-white"
                            }
                        `}
                    >
                        {title}
                    </motion.span>

                )}

           

                {!collapsed &&
                    badge !== undefined &&
                    badge > 0 && (

                        <span
                            className="
                            ml-auto
                            flex
                            h-6
                            min-w-[24px]
                            items-center
                            justify-center
                            rounded-full
                            bg-red-500
                            px-2
                            text-xs
                            font-semibold
                            text-white
                            "
                        >
                            {badge > 99
                                ? "99+"
                                : badge}
                        </span>

                    )}

                

                {collapsed && (

                    <div
                        className="
                        pointer-events-none
                        absolute
                        left-20
                        top-1/2
                        -translate-y-1/2
                        whitespace-nowrap
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111827]
                        px-3
                        py-2
                        text-sm
                        text-white
                        opacity-0
                        shadow-xl
                        transition-all
                        duration-200
                        group-hover:opacity-100
                        z-50
                        "
                    >
                        {title}

                        {badge !== undefined &&
                            badge > 0 && (
                                <span
                                    className="
                                    ml-2
                                    rounded-full
                                    bg-red-500
                                    px-2
                                    py-0.5
                                    text-xs
                                    "
                                >
                                    {badge}
                                </span>
                            )}
                    </div>

                )}

            </motion.div>

        </Link>

    );

}*/



"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MenuItem } from "../menuConfig";

interface SidebarItemProps {
  item: MenuItem;
  collapsed: boolean;
}

export default function SidebarItem({
  item,
  collapsed,
}: SidebarItemProps) {

  const {
    title,
    href,
    icon: Icon,
    badge,
  } = item;
  const pathname = usePathname();

  const active =
    pathname === href ||
    pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      title={collapsed ? title : ""}
    >
      <motion.div
        whileHover={{
          x: 4,
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className={`
          group
          relative
          mb-2
          flex
          items-center
          rounded-2xl
          px-4
          py-3
          transition-all
          duration-300
          ${
            active
              ? "bg-gradient-to-r from-indigo-600/30 to-cyan-500/20 border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,.25)]"
              : "hover:bg-white/5"
          }
        `}
      >
        {/* Active Indicator */}
        {active && (
          <motion.div
            layoutId="activeSidebar"
            className="
            absolute
            left-0
            top-2
            bottom-2
            w-1
            rounded-r-full
            bg-gradient-to-b
            from-indigo-400
            to-cyan-400
            "
          />
        )}

        {/* Icon */}
        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            transition
            ${
              active
                ? "bg-indigo-500/20 text-cyan-300"
                : "bg-white/5 text-gray-400 group-hover:text-white"
            }
          `}
        >
          <Icon size={20} />
        </div>

        {/* Text */}
        {!collapsed && (
          <>
            <span
              className={`
                ml-4
                flex-1
                text-sm
                font-medium
                transition
                ${
                  active
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }
              `}
            >
              {title}
            </span>

            {badge !== undefined &&
              badge > 0 && (
                <div
                  className="
                  flex
                  min-w-[24px]
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-2
                  py-1
                  text-xs
                  font-semibold
                  text-white
                  "
                >
                  {badge}
                </div>
              )}
          </>
        )}
      </motion.div>
    </Link>
  );
}