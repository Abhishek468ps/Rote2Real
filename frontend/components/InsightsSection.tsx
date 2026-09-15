"use client";

import { motion } from "framer-motion";
import { HiLightBulb, HiChartBar, HiDocumentSearch } from "react-icons/hi";
import Image from "next/image";

const insights = [
  {
    title: "AI Transformation Insights",
    description:
      "Strategic insights on enterprise AI adoption, governance, and digital transformation. (Coming Soon)",
    icon: <HiLightBulb className="text-indigo-500" size={34} />,
    bg: "/assets/images/insights1.png",
  },
  {
    title: "Industry Research & Whitepapers",
    description:
      "Deep-dive market reports and whitepapers on automation, analytics, and cloud AI. (Coming Soon)",
    icon: <HiDocumentSearch className="text-blue-500" size={34} />,
    bg: "/assets/images/insights2.png",
  },
  {
    title: "Automation Case Studies",
    description:
      "Real-world enterprise automation journeys, outcomes, and proven frameworks. (Coming Soon)",
    icon: <HiChartBar className="text-green-500" size={34} />,
    bg: "/assets/images/insights3.png",
  },
];

export default function InsightsSection() {
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-12"
        >
          Insights & Reports
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {insights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -12 }} // Lift animation
              className="relative backdrop-blur-xl bg-white/20 border border-white/30 
                         rounded-3xl shadow-xl overflow-hidden 
                         group cursor-pointer transition-all duration-300"
            >
              {/* Background Image */}
              <div className="h-44 sm:h-48 md:h-52 lg:h-56 w-full relative">
                <Image
                  src={item.bg}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-7 text-left">
                <div className="mb-4">{item.icon}</div>

                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>

                <button
                  onClick={(e) => e.preventDefault()}
                  className="mt-4 md:mt-5 text-indigo-600 font-medium hover:underline cursor-default"
                >
                  Coming Soon →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
