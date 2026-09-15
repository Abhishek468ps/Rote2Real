"use client";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Rajendran M",
    role: "Founder & CEO",
    message:
      "At BrainTrain, we believe AI should simplify, not complicate, enterprise systems. Our mission is to make innovation accessible for every business.",
    rating: 5,
  },
  {
    name: "Monika Singh",
    role: "Tech Lead",
    message:
      "We’re building products that help teams think smarter, move faster, and transform ideas into real impact with AI-driven efficiency.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "AI Engineer",
    message:
      "Our vision is to merge innovation with purpose. Developing intelligent tools that empower people, not replace them.",
    rating: 5,
  },
  {
    name: "Aman Gupta",
    role: "Design Head",
    message:
      "Every design decision we make reflects empathy. Our goal is to build AI that feels human, not mechanical.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const total = testimonials.length;

  const goTo = (index) => {
    setActiveIndex((index + total) % total);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo(activeIndex + 1);
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, [activeIndex]);

  const t = testimonials[activeIndex];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-16">
          What Our Teams Say
        </h2>

        <div className="relative flex justify-center items-center">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-xl max-w-2xl w-full p-10 md:p-12"
          >
            {/* Accent bar */}
            <div className="absolute top-0 left-0 h-full w-1 bg-indigo-600 rounded-l-2xl" />

            {/* Quote icon */}
            <div className="flex justify-center mb-6 text-indigo-600 text-4xl">
              <FaQuoteLeft />
            </div>

            {/* Message */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
              “{t.message}”
            </p>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400 mx-0.5" />
              ))}
            </div>

            {/* Author */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.name}
              </h3>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="hidden md:flex absolute -left-20 items-center justify-center bg-white border border-gray-200 p-3 rounded-full shadow hover:bg-indigo-600 hover:text-white transition"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => goTo(activeIndex + 1)}
            className="hidden md:flex absolute -right-20 items-center justify-center bg-white border border-gray-200 p-3 rounded-full shadow hover:bg-indigo-600 hover:text-white transition"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === activeIndex
                  ? "bg-indigo-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
