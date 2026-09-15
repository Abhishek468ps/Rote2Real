"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "@/components/layout/Header/Header";
import ScrollIndicator from "@/components/ui/scroll-indicator";

export default function TrainingPage() {
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
        <section className="relative w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-24 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-indigo-800 animate-fade-in-up">
              Professional Training Programs
            </h1>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg animate-fade-in-up animate-stagger-1">
              Enhance your skills with our comprehensive AI and technology training programs designed for professionals and students.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Training cards will be added here */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-indigo-200 hover-lift hover-glow animate-fade-in-up animate-stagger-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Bootcamp</h3>
                <p className="text-gray-600 mb-4">Comprehensive AI training program covering machine learning, deep learning, and AI applications.</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    
    </div>
  );
}
