import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 border border-indigo-500/30",
        ai: "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:opacity-95 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 border border-purple-400/30",
        destructive: "bg-rose-600 text-white hover:bg-rose-500 shadow-md shadow-rose-600/20 border border-rose-500/30",
        outline: "border border-slate-700/80 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600 shadow-sm",
        secondary: "bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700/50",
        ghost: "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60",
        link: "text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-300",
      },
      size: {
        default: "h-10 px-4 py-2 text-xs sm:text-sm",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-6 text-base font-bold",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }