/*"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#020617]
      text-white
      "
    >
     
      <div
        className="
        absolute
        inset-0
        -z-10
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-black
        "
      />

     
      <div
        className="
        absolute
        top-0
        left-1/2
        h-[500px]
        w-[500px]
        -translate-x-1/2
        rounded-full
        bg-indigo-600/20
        blur-[140px]
        -z-10
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        h-[450px]
        w-[450px]
        rounded-full
        bg-cyan-500/10
        blur-[120px]
        -z-10
        "
      />

      <div
        className="
        flex
        min-h-screen
        "
      >
       

        <Sidebar />

       

        <div
          className="
          flex
          flex-1
          flex-col
          "
        >
        

          <Navbar />

         

          <main
            className="
            mt-20
            flex-1
            overflow-y-auto
            p-8
            "
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}*/


"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainContent from "./MainContent";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (

    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#050816]
      text-white
      "
    >

      {/* Animated Background */}

      <div
        className="
        absolute
        inset-0
        -z-10
        "
      >

        <div
          className="
          absolute
          top-0
          left-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-indigo-700/20
          blur-[180px]
          "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-600/20
          blur-[180px]
          "
        />

      </div>

      {/* Main Dashboard */}

      <div
        className="
        flex
        min-h-screen
        "
      >

        {/* Sidebar */}

        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        {/* Right Side */}

        <div
          className="
          flex
          flex-1
          flex-col
          transition-all
          duration-300
          "
        >

          <Navbar
            collapsed={sidebarCollapsed}
            setMobileSidebarOpen={
              setMobileSidebarOpen
            }
          />

          <MainContent>

            {children}

          </MainContent>

        </div>

      </div>

    </div>

  );

}