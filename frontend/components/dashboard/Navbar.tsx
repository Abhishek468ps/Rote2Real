"use client";

import { motion } from "framer-motion";
import Breadcrumbs from "./navbar/Breadcrumbs";
import SearchBar from "./navbar/SearchBar";
import NotificationButton from "./navbar/NotificationButton";
import WalletButton from "./navbar/WalletButton";
import ThemeToggle from "./navbar/ThemeToggle";
import AIAssistantButton from "./navbar/AIAssistantButton";
import ProfileMenu from "./navbar/ProfileMenu";
import { Dispatch, SetStateAction } from "react";


interface NavbarProps {
  collapsed: boolean;
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({
  collapsed,
  setMobileSidebarOpen,
}: NavbarProps) {
  return (
    <motion.header
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.35,
      }}
className="
sticky
top-0
z-40
min-h-20
lg:h-20

border-b
border-slate-200
dark:border-white/10

bg-white/80
dark:bg-[#09101f]/70

backdrop-blur-3xl

transition-colors
duration-300
      "
    >
       <div
        className="
          flex
          min-h-20
          items-center
          justify-between
          gap-2
          px-3
          sm:gap-4
          sm:px-4
          lg:h-20
          lg:gap-6
          lg:px-6
        "
      >
        {/* ==========================
            Left Section
        ========================== */}

    <div
          className="
            flex
            min-w-0
            shrink
            items-center
          "
        >
  <Breadcrumbs />
</div>

<div
          className="
            hidden
            min-w-0
            flex-1
            justify-center
            px-4
            lg:flex
            xl:px-6
          "
        >
  <SearchBar />
</div>

        {/* ==========================
            Right Section
        ========================== */}

        <div
          className="
          flex
         shrink-0
  items-center
  gap-1.5
  sm:gap-2
  lg:gap-3
          "
        >
          {/* AI */}

          <AIAssistantButton />

          {/* Wallet */}

          <WalletButton />

          {/* Notifications */}

          <NotificationButton />

          {/* Theme */}

          <ThemeToggle />

          {/* Profile */}

          <ProfileMenu />
        </div>
      </div>

      {/* ==========================
          Mobile Search
      ========================== */}

     <div
        className="
          border-t
          border-white/10
          px-3
          py-2.5
          sm:px-4
          sm:py-3
          lg:hidden
        "
      >
        <SearchBar />
      </div>
    </motion.header>
  );
}