"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Brain } from "lucide-react";

import AnnouncementBar from "./AnnouncementBar";
import DesktopNavigation from "./DesktopNavigation";
import HeaderActions from "./HeaderActions";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);

  /* ===============================
      Sticky + Hide on Scroll
  =============================== */

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 15);

      if (current > lastScrollY.current && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
      Body Scroll Lock
  =============================== */

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ===========================================
            TOP ANNOUNCEMENT BAR
      =========================================== */}

      <AnnouncementBar />

      {/* ===========================================
            HEADER
      =========================================== */}

      <header
        className={`
        fixed
        left-0
        top-10
        z-50
        w-full
        transition-all
        duration-500

        ${
          hidden
            ? "-translate-y-full"
            : "translate-y-0"
        }

        ${
          scrolled
            ? "backdrop-blur-xl bg-[#05070D]/85 border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }
      `}
      >
        <div className="mx-auto max-w-[1500px]">

          {/* ========================= */}

          <div
            className="
            flex
            items-center
            justify-between
            px-4
            sm:px-8
            py-3.5
            xl:px-12
          "
          >
            {/* =====================================
                    LOGO
            ===================================== */}

            <Link
              href="/"
              className="
              flex
              items-center
              gap-3
              shrink-0
            "
            >
              <div
                className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-gradient-to-br
                from-indigo-600
                via-indigo-500
                to-purple-600
                shadow-lg
                shadow-indigo-600/30
                ring-1
                ring-indigo-400/30
              "
              >
                <Brain className="h-5 w-5 text-white" />
              </div>

              <div>

                <h2
                  className="
                  text-lg
                  sm:text-xl
                  font-extrabold
                  tracking-wide
                  text-white
                "
                >
                  Brain Train
                </h2>

                <p
                  className="
                  text-[10px]
                  sm:text-xs
                  tracking-[0.18em]
                  uppercase
                  text-indigo-400
                  font-semibold
                "
                >
                  Consultancy Services LLP
                </p>

              </div>

            </Link>

            {/* =====================================
                  DESKTOP NAVIGATION
            ===================================== */}

            <DesktopNavigation />

            {/* =====================================
                  RIGHT SIDE
            ===================================== */}

            <HeaderActions
              onSearchOpen={() => {}}
            />

            {/* =====================================
                    MOBILE BUTTON
            ===================================== */}

            <button
              onClick={() =>
                setMobileOpen(true)
              }
              className="
              xl:hidden
              rounded-xl
              border
              border-slate-800
              bg-slate-900/80
              p-2.5
              text-slate-200
              hover:text-white
              hover:bg-slate-800
              transition
            "
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ===========================================
            MOBILE DRAWER
      =========================================== */}

      <MobileDrawer
  isOpen={mobileOpen}
  onClose={() => setMobileOpen(false)}
/>

     
    </>
  );
}