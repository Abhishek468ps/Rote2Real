"use client";
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-xl border border-slate-800/80 bg-slate-900/80 px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 shadow-sm backdrop-blur-md transition-all duration-200 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }