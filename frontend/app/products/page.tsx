"use client";

import { motion } from "framer-motion";

const products = [
  "Self Learning Courses",
  "DevOps Deployment",
  "Hackathon Programs",
  "AI Marketplace",
  "AI Job Marketplace",
  "Cosmetology Training",
  "Skill Development Programs",
  "Portfolio Build-up",
  "DevOps Training",
  "AI/ML Applications",
  "MVP Build-up",
  "SME 7, 14 & 21 Days Sprint Industrial Projects",
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-white px-6 py-16">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Our Products & Solutions
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Enterprise-grade solutions designed to bridge the gap between
          learning and industry. Build skills, deploy real systems, and
          accelerate your career with real-world exposure.
        </p>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#121826] border border-[#1e2535] p-6 rounded-2xl shadow-lg hover:shadow-blue-500/10 hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-3">{item}</h2>
            <p className="text-gray-400 text-sm">
              High-quality, industry-aligned solution designed for practical
              implementation and career growth.
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Future?
        </h2>
        <p className="text-gray-400 mb-6">
          Join our ecosystem of learners, developers, and innovators building
          real-world impactful solutions.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-medium transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
