"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/rote2real", label: "Program" },
  { href: "/rote2real/register", label: "Register" },
  { href: "/rote2real/dashboard", label: "Dashboard" },
  { href: "/rote2real/report", label: "Report" },
];

export default function Rote2RealShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/rote2real";

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-[#05070D] text-slate-100">
      <ScrollIndicator />
      <Header />

      <div className="pt-28 sm:pt-32">
        <div className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-400">
                Brain Train
              </p>
              <p className="text-sm font-semibold text-white">Rote2Real 20-Day Sprint</p>
            </div>
            <nav className="flex flex-wrap gap-1.5">
              {NAV.map((item) => {
                const active =
                  item.href === "/rote2real"
                    ? pathname === "/rote2real"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                      active
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
