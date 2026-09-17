"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, X, Brain } from "lucide-react";
import { MENU } from "./menu.config";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
}: MobileDrawerProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    if (openMenu === title) {
      setOpenMenu(null);
    } else {
      setOpenMenu(title);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90]"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
            }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-[#05070D]/95 backdrop-blur-2xl border-l border-white/10 z-[100] overflow-y-auto flex flex-col shadow-2xl"
          >
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-20 bg-[#05070D]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                  <Brain className="text-white" size={22} />
                </div>
                <div>
                  <h2 className="text-white font-extrabold text-base tracking-wide">Brain Train</h2>
                  <p className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">Consultancy Services LLP</p>
                </div>
              </Link>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* MENU ACCORDION ITEMS */}
            <div className="px-5 py-6 space-y-3.5 flex-1">
              {MENU.map((menu) => (
                <div
                  key={menu.title}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleMenu(menu.title)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left transition hover:bg-slate-800/40"
                  >
                    <div>
                      <h3 className="text-slate-100 font-bold text-base">{menu.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Explore {menu.title}</p>
                    </div>

                    {openMenu === menu.title ? (
                      <ChevronDown className="text-indigo-400" size={20} />
                    ) : (
                      <ChevronRight className="text-slate-500" size={20} />
                    )}
                  </button>

                  <AnimatePresence>
                    {openMenu === menu.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="border-t border-slate-800/60 bg-slate-950/60 overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                          {menu.sections.map((section) => (
                            <div key={section.title}>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
                                {section.title}
                              </p>

                              <div className="space-y-1.5">
                                {section.items.map((item) => {
                                  const Icon = item.icon;

                                  return (
                                    <Link
                                      key={item.title}
                                      href={item.href}
                                      onClick={() => {
                                        setOpenMenu(null);
                                        onClose();
                                      }}
                                      className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon className="text-indigo-400" size={16} />
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <p className="text-slate-200 font-semibold text-xs truncate">{item.title}</p>
                                          {item.badge && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-600/80 text-white font-bold">
                                              {item.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* DRAWER FOOTER CTAS */}
            <div className="p-5 border-t border-slate-800/80 bg-slate-950/80 space-y-2.5">
             <Link
  href="/login"
  onClick={() => {
    setOpenMenu(null);
    onClose();
  }}
  className="flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition"
>
  Login
</Link>
              <Link
                href="/join"
                onClick={() => {
                  setOpenMenu(null);
                  onClose();
                }}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-3 text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 hover:opacity-95 transition"
              >
                Join Brain Train
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
