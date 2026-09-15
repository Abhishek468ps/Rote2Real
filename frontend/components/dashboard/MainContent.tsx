/*"use client";

import { motion } from "framer-motion";

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({
  children,
}: MainContentProps) {
  return (
    <main
      className="
      flex-1
      overflow-y-auto
      bg-slate-100
      px-6
      py-6
      transition-colors
      duration-300
      dark:bg-[#050B16]
      "
    >
     

      <div
        className="
        fixed
        inset-0
        -z-10
        overflow-hidden
        "
      >
        <div
          className="
          absolute
          -left-20
          top-10
          h-80
          w-80
          rounded-full
          bg-cyan-500/10
          blur-[120px]
          "
        />

        <div
          className="
          absolute
          right-0
          top-40
          h-[400px]
          w-[400px]
          rounded-full
          bg-indigo-500/10
          blur-[150px]
          "
        />

        <div
          className="
          absolute
          bottom-0
          left-1/3
          h-[350px]
          w-[350px]
          rounded-full
          bg-purple-500/10
          blur-[140px]
          "
        />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
        mx-auto
        flex
        w-full
        max-w-[1700px]
        flex-col
        gap-6
        "
      >
        {children}
      </motion.div>
    </main>
  );
}*/

"use client";

import { ReactNode } from "react";

interface MainContentProps {
  children?: ReactNode;
}

export default function MainContent({
  children,
}: MainContentProps) {
  return (
    <main
      className="
        w-full
        min-w-0
        space-y-6
        overflow-x-hidden
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-8
        xl:px-10
      "
    >
      {children}
    </main>
  );
}