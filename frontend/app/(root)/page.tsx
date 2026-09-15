"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/layout/Header/Header";
import HeroSection from "@/components/landing/hero/HeroSection";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/InsightsSection";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import CeoNotePreview  from "@/components/CeoNotePreview";
import InnovationLabProjects from "@/components/InnovationLabProjects";
import TalentEcosystemImpact from "@/components/TalentEcosystemImpact";


export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Scroll Progress Indicator */}
      <ScrollIndicator />

      {/* Header */}
      <Header />

    
      <main className="flex-grow w-full">
        
        <section id="home" data-aos="fade-up" className="w-full">
          <HeroSection />
        </section>
{/*
        <section id="about" data-aos="fade-up" className="w-full">
          <AboutUs />
        </section>

        <section id="services" data-aos="fade-up" className="w-full">
          <Services />
        </section>

        <section data-aos="fade-up" className="w-full">
          <Industries />
        </section>

        <section data-aos="fade-up" className="w-full">
          <InnovationLabProjects />
        </section>


        <section data-aos="fade-up" className="w-full">
          <TalentEcosystemImpact />
        </section>

         <section data-aos="fade-up" className="w-full">
            <CeoNotePreview />
        </section>

        <section data-aos="fade-up" className="w-full">
          <Testimonials />
        </section>

        <section data-aos="fade-up" className="w-full">
          <Insights />
        </section>
        */}
      </main>

    </div>
  );
}
