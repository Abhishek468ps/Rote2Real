"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "@/components/layout/Header/Header";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full min-h-screen">
      <ScrollIndicator />
      <Header />
      
      <main className="pt-20">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
