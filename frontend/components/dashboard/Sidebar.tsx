"use client";



import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  Menu,
  X,
} from "lucide-react";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarItem from "./sidebar/SidebarItem";
import { MENU_CONFIG } from "./menuConfig";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Trophy,
  Wallet,
  CalendarDays,
  MessageSquare,
  Settings,
} from "lucide-react";

import SidebarFooter from "./sidebar/SidebarFooter";

interface SidebarProps {
  collapsed: boolean;

  setCollapsed: Dispatch<
    SetStateAction<boolean>
  >;

  mobileOpen: boolean;

  setMobileOpen: Dispatch<
    SetStateAction<boolean>
  >;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {

 const [role, setRole] = useState<string | null>(null);

useEffect(() => {
    const storedRole =
        localStorage.getItem("role");

    if (storedRole) {
        setRole(storedRole.toUpperCase());
    }
}, []);
   
 

  return (
    <>

      {/* ===========================
          Mobile Open Button
      ============================ */}

      <button
        onClick={() =>
          setMobileOpen(true)
        }
        className="
        fixed
        left-4
        top-5
        z-[60]
        rounded-xl
        border
        border-white/10
        bg-white
dark:bg-white/10

text-slate-800
dark:text-white

shadow-lg
        p-2
        backdrop-blur-xl
        lg:hidden
        "
      >
        <Menu size={22} />
      </button>

      {/* ===========================
            Desktop Sidebar
      ============================ */}

      <motion.aside
        animate={{
          width: collapsed
            ? 92
            : 290,
        }}
        transition={{
          duration: 0.25,
        }}
       className="
hidden
lg:flex
h-screen
sticky
top-0
flex-col

border-r
border-slate-200
dark:border-white/10

bg-white/80
dark:bg-white/[0.04]

backdrop-blur-3xl

shadow-xl

transition-colors
duration-300
"
      >

        {/* Header */}

       
<SidebarHeader
  collapsed={collapsed}
  onToggle={() => setCollapsed(!collapsed)}
/>
          

          
          

        {/* Navigation */}

        <div
          className="
          flex-1
          overflow-y-auto
          p-4
          "
        >
<div className="space-y-6">
   {(MENU_CONFIG[role ?? "STUDENT"] ?? []).map((section) => (
    <div key={section.title}>

      {!collapsed && (
        <p
          className="
          mb-2
          px-3
          text-[10px]
          font-bold
          tracking-[0.18em]
          text-slate-400
          dark:text-slate-500
          "
        >
          {section.title}
        </p>
      )}

      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </div>

    </div>
  ))}
</div>

        </div>

        {/* Footer */}

        <div
          className="
          border-t
          border-white/10
          p-4
          "
        >

     <SidebarFooter
    collapsed={false}
    onLogout={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
    }}
/>

        </div>

      </motion.aside>

      {/* ===========================
           Mobile Drawer
      ============================ */}

      <AnimatePresence>

        {mobileOpen && (

          <>

            {/* Overlay */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
              fixed
              inset-0
              z-40
              bg-black/70
              backdrop-blur-sm
              lg:hidden
              "
            />

            {/* Drawer */}

            <motion.aside
              initial={{
                x: -320,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -320,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
              fixed
              left-0
              top-0
              z-50
              flex
              h-screen
              w-[290px]
              flex-col
              border-r
              border-white/10
              bg-[#09101f]
              dark:bg-[#09101f]
              shadow-2xl
              backdrop-blur-3xl
              lg:hidden
              "
            >

              {/* Mobile Header */}

              <div
                className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
dark:border-white/10
                p-5
                "
              >

                <div>

                  <h2
                    className="
                    text-xl
                    font-black
                    "
                  >
                    Brain Train
                  </h2>

                  <p
                    className="
                    text-xs
                text-slate-500
dark:text-slate-400
                    "
                  >
                    Adaptive Intelligence
                  </p>

                </div>

                <button
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className="
                  rounded-xl
                  bg-white/10
                  p-2
                  "
                >
                  <X size={20} />
                </button>

              </div>

              {/* Navigation */}

              <div
                className="
                flex-1
                overflow-y-auto
                p-4
                "
              >

   <div className="space-y-6">
   {(MENU_CONFIG[role ?? "STUDENT"] ?? []).map((section) => (
    <div key={section.title}>

      <p
        className="
        mb-2
        px-3
        text-[10px]
        font-bold
        tracking-[0.18em]
        text-slate-500
        "
      >
        {section.title}
      </p>

      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            collapsed={false}
          />
        ))}
      </div>

    </div>
  ))}
</div>

              </div>

              {/* Footer */}

              <div
                className="
                border-t
                border-white/10
                p-4
                "
              >

           <SidebarFooter
    collapsed={collapsed}
    onLogout={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
    }}
/>

              </div>

            </motion.aside>

          </>

        )}

      </AnimatePresence>

    </>
  );

}