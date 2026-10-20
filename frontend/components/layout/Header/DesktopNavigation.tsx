"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import MegaMenu from "./MegaMenu";
import { MENU } from "./menu.config";

export default function DesktopNavigation() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  /* ==========================================
      Close Menu on Outside Click
  ========================================== */

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setActiveMenu(null);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  /* ==========================================
      ESC closes menu
  ========================================== */

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    }

    document.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleKey
      );
  }, []);

  /* ==========================================
      Arrow Navigation
  ========================================== */

  const moveLeft = () => {
    if (activeMenu === null) return;

    if (activeMenu === 0)
      setActiveMenu(MENU.length - 1);
    else
      setActiveMenu(activeMenu - 1);
  };

  const moveRight = () => {
    if (activeMenu === null) return;

    if (activeMenu === MENU.length - 1)
      setActiveMenu(0);
    else
      setActiveMenu(activeMenu + 1);
  };

  return (
    <nav
      ref={containerRef}
      className="
      hidden
      xl:flex
      items-center
      gap-2
      relative
    "
    >
      {MENU.map((menu, index) => (
        <div
          key={menu.title}
          className="relative"
          onMouseEnter={() =>
            setActiveMenu(index)
          }
          onMouseLeave={() =>
            setActiveMenu(null)
          }
        >
          {/* ================================= */}

          <button
            aria-haspopup="true"
            aria-expanded={
              activeMenu === index
            }
            onClick={() =>
              setActiveMenu(
                activeMenu === index
                  ? null
                  : index
              )
            }
            onKeyDown={(e) => {
              switch (e.key) {
                case "Enter":
                case " ":
                  e.preventDefault();

                  setActiveMenu(index);

                  break;

                case "Escape":
                  setActiveMenu(null);

                  break;

                case "ArrowRight":
                  moveRight();

                  break;

                case "ArrowLeft":
                  moveLeft();

                  break;
              }
            }}
            className={`
            group
            flex
            items-center
            gap-2
            rounded-2xl
            px-5
            py-3
            text-sm
            font-semibold
            transition-all
            duration-300

            ${
              activeMenu === index
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }
          `}
          >
            {menu.title}

            <motion.div
              animate={{
                rotate:
                  activeMenu === index
                    ? 180
                    : 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <ChevronDown
                size={16}
              />
            </motion.div>
          </button>

          {/* ================================= */}

          <AnimatePresence>
            {activeMenu === index && (
              <MegaMenu
                menu={menu}
                isOpen={
                  activeMenu === index
                }
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}