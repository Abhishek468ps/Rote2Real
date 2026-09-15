 "use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MenuGroup } from "./menu.config";
import NavigationCard from "./NavigationCard";

interface MegaMenuProps {
  menu: MenuGroup;
  isOpen: boolean;
}

const badgeColor = {
  NEW: "bg-emerald-500",
  BETA: "bg-amber-500",
  POPULAR: "bg-blue-500",
  SOON: "bg-slate-500",
};

export default function MegaMenu({
  menu,
  isOpen,
}: MegaMenuProps) {
  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
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
            y: 10,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
          absolute
          left-1/2
          -translate-x-1/2
          top-full
          mt-6
          w-[1180px]
          rounded-3xl
          border
          border-white/10
          bg-[#0B1220]/95
          backdrop-blur-3xl
          shadow-[0_30px_80px_rgba(0,0,0,.55)]
          overflow-hidden
          z-50
          "
        >
          <div className="grid grid-cols-12">

            {/* LEFT PANEL */}

            <div className="col-span-3 bg-gradient-to-b from-indigo-600/20 to-transparent border-r border-white/10 p-8">

              <h2 className="text-2xl font-bold text-white">
                {menu.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                Explore the complete Brain Train ecosystem
                built for AI Engineers, Software Developers,
                Students, Industry Professionals and
                Enterprises.
              </p>

              <div className="mt-10 space-y-5">

    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

        <div className="flex items-center gap-3">

            <Sparkles
                className="text-indigo-400"
                size={20}
            />

            <h4 className="text-white font-semibold">

                Featured

            </h4>

        </div>

        <p className="mt-3 text-sm text-gray-400">

            Join India's next-generation AI &
            Software Engineering ecosystem.

        </p>

    </div>

</div>

<div className="mt-10 grid grid-cols-2 gap-4">

  <div className="rounded-xl bg-white/5 p-4">

    <p className="text-3xl font-bold text-white">
      25+
    </p>

    <p className="text-xs text-gray-400">
      Enterprise Products
    </p>

  </div>

  <div className="rounded-xl bg-white/5 p-4">

    <p className="text-3xl font-bold text-white">
      10K+
    </p>

    <p className="text-xs text-gray-400">
      Future Learners
    </p>

  </div>

  <div className="rounded-xl bg-white/5 p-4">

    <p className="text-3xl font-bold text-white">
      100+
    </p>

    <p className="text-xs text-gray-400">
      Industry Projects
    </p>

  </div>

  <div className="rounded-xl bg-white/5 p-4">

    <p className="text-3xl font-bold text-white">
      AI
    </p>

    <p className="text-xs text-gray-400">
      Ready Platform
    </p>

  </div>

</div>

              <div className="mt-10">

                <Link
                   href={menu.href}
                  className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  hover:bg-indigo-500
                  transition
                  "
                >
                   Explore {menu.title}

                  <ChevronRight size={18} />
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <div className="col-span-9 p-8">

              <div className="grid grid-cols-2 gap-8">

                {menu.sections.map((section) => (

                  <div key={section.title}>

                    <h3 className="text-white font-semibold text-lg">

                      {section.title}

                    </h3>

                    <p className="text-gray-500 text-sm mt-1 mb-5">

                      {section.description}

                    </p>

                    <div className="space-y-3">

                      {section.items.map((item) => {

                        const Icon = item.icon;

                        return (

                          <Link
                            key={item.title}
                            href={item.href}
                           className="
group
relative
overflow-hidden
flex
items-start
gap-4
rounded-2xl
border
border-transparent
p-5
transition-all
duration-300
hover:border-indigo-500/30
hover:bg-gradient-to-r
hover:from-indigo-600/10
hover:to-transparent
hover:-translate-y-1
"
                          >

                            <div
                              className="
                              w-12
                              h-12
                              rounded-xl
                              bg-indigo-500/10
                              flex
                              items-center
                              justify-center
                              group-hover:bg-indigo-600
                              transition
                              "
                            >
                              <motion.div
whileHover={{
scale:1.15,
rotate:8
}}
transition={{
duration:.2
}}
>

<Icon
className="
h-6
w-6
text-indigo-400
group-hover:text-white
"
/>

</motion.div>
                            </div>

                            <div className="flex-1">

                              <div className="flex items-center gap-3">

                                <h4
                                  className="
                                  font-semibold
                                  text-white
                                  group-hover:text-indigo-300
                                  transition
                                  "
                                >
                                  {item.title}
                                </h4>

                                {item.badge && (

                                  <span
                                    className={`
                                    text-[10px]
                                    px-2
                                    py-1
                                    rounded-full
                                    text-white
                                    font-bold
                                    ${badgeColor[item.badge]}
                                    `}
                                  >
                                    {item.badge}
                                  </span>

                                )}

                              </div>

                              <p className="mt-2 text-sm leading-6 text-gray-400">

                                {item.description}

                              </p>

                            </div>

                            <ArrowRight
                              className="
mt-2
text-gray-600
group-hover:text-indigo-400
group-hover:translate-x-1
transition-all
duration-300
"
                            />

                          </Link>

                        );

                      })}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
} 