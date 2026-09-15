"use client";

import { use } from "react";
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header/Header";
import { Cpu, Activity, Target, TestTube, Microscope, Database, Heart, Stethoscope, Pause, BookOpen, UserCheck, ChartBar } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
type IndustryKey = "manufacturing" | "biotechnology" | "healthcare" | "education";

const industryData: Record<
  IndustryKey,
  {
    title: string;
    subtitle: string;
    description: string;
    bg: string;
    cta: string;
    whyHeading: string;
    whyPoints: string[];
    features: { icon: any; title: string; text: string }[];
  }
> = {
  manufacturing: {
    title: "Manufacturing",
    subtitle: "Smart Factory Transformation",
    description:
      "AI-driven automation, predictive maintenance and process intelligence that elevate throughput, quality and uptime.",
    bg: "from-gray-900 via-gray-800 to-black",
    cta: "Optimize Your Factory with AI →",
    whyHeading: "Why AI in Manufacturing?",
    whyPoints: [
      "Reduce downtime with predictive analytics",
      "Eliminate defects via computer-vision inspection",
      "Optimize production and material flow with AI-driven planning",
    ],
    features: [
      {
        icon: Cpu,
        title: "Predictive Maintenance",
        text: "Real-time sensor analytics and failure forecasting to cut downtime and maintenance cost.",
      },
      {
        icon: Activity,
        title: "Quality Automation",
        text: "Computer vision inspects parts at scale — faster and more accurate than manual checks.",
      },
      {
        icon: Target,
        title: "Smart Scheduling",
        text: "AI optimizes shifts, throughput and inventory for higher yield and lower waste.",
      },
    ],
  },

  biotechnology: {
    title: "Biotechnology",
    subtitle: "Accelerate Discovery",
    description:
      "AI-assisted lab automation, genomic analytics and predictive modeling to accelerate research and reduce cycle time.",
    bg: "from-purple-900 via-purple-800 to-black",
    cta: "Boost Your Research with AI →",
    whyHeading: "Why AI in Biotechnology?",
    whyPoints: [
      "Process large omics datasets with AI models",
      "Automate routine lab workflows for reproducibility",
      "Predict biological interactions faster than conventional methods",
    ],
    features: [
      {
        icon: TestTube,
        title: "Lab Automation",
        text: "Automate pipetting, logging and routine experiments for consistent results.",
      },
      {
        icon: Microscope,
        title: "Genomic Insights",
        text: "AI models for sequence analysis, variant prioritization and hypothesis generation.",
      },
      {
        icon: Database,
        title: "Data-Powered Decisions",
        text: "Integrate experiments, metadata and analytics into a single research workflow.",
      },
    ],
  },

  healthcare: {
    title: "Healthcare",
    subtitle: " Intelligent Patient Care",
    description:
      "AI-enhanced diagnostics, workflow automation and patient risk prediction that improve outcomes and operational efficiency.",
    bg: "from-blue-900 via-blue-800 to-black",
    cta: "Enhance Patient Care with AI →",
    whyHeading: "Why AI in Healthcare?",
    whyPoints: [
      "Faster, more accurate image & pathology analysis",
      "Better patient flow and capacity planning",
      "Early detection and risk scoring for better outcomes",
    ],
    features: [
      {
        icon: Heart,
        title: "Diagnostics AI",
        text: "Assist radiologists & pathologists with high-accuracy image analysis.",
      },
      {
        icon: Stethoscope,
        title: "Patient Flow",
        text: "Predict wait times and optimize scheduling for better patient experience.",
      },
      {
        icon: Pause,
        title: "Risk Prediction",
        text: "Identify patients at risk earlier using multi-modal clinical data.",
      },
    ],
  },

  education: {
    title: "Education",
    subtitle: "Next-Gen Learning",
    description:
      "Personalized learning paths, actionable insights and campus automation that improve student outcomes and institutional efficiency.",
    bg: "from-green-900 via-green-800 to-black",
    cta: "Transform Learning with AI →",
    whyHeading: "Why AI in Education?",
    whyPoints: [
      "Personalize content and pacing per student",
      "Give teachers real-time student performance insights",
      "Automate administrative workflows to focus on teaching",
    ],
    features: [
      {
        icon: BookOpen,
        title: "Adaptive Learning",
        text: "Personalized lessons adapt to progress and learning style.",
      },
      {
        icon: UserCheck,
        title: "Performance Dashboards",
        text: "Actionable analytics for teachers, admins and parents.",
      },
      {
        icon: ChartBar,
        title: "Smart Assessments",
        text: "Auto-grading, skill mapping and plagiarism checks at scale.",
      },
    ],
  },
};

export default function IndustryPage(props: any) {
  // React.use-style unwrap for Next 15 params (works with 'use' import above)
  const { slug } = use(props.params) as { slug: IndustryKey };
  // fallback guard (TS)
  if (!slug || !(slug in industryData)) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Industry Not Found</h2>
          <Link href="/" className="text-indigo-600 underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const data = industryData[slug];

  return (
    <>
      <Header />

      {/* HERO */}
      <section
        className={`relative w-full py-20 sm:py-28 bg-gradient-to-br ${data.bg} text-white overflow-hidden`}
      >
        {/* visual glows */}
        <div className="absolute -left-10 -top-8 w-44 h-44 bg-white/8 rounded-full blur-3xl animate-floating-slow pointer-events-none" />
        <div className="absolute right-8 bottom-8 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-slowspin pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-wider text-sm text-indigo-300 mb-3">
              {data.subtitle}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              {data.title}
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">
              {data.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <Link
                href="/contact"
                className="mt-8 inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-2xl transform hover:scale-[1.03] transition-all"
                aria-label={data.cta}
              >
                {data.cta}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY SECTION (compact bullets + illustrative box) */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {data.whyHeading}
            </motion.h2>

            <motion.ul
              className="space-y-3 text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {data.whyPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-indigo-600" />
                  <span>{p}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Industry Snapshot
            </h3>
            <p className="text-gray-600 mb-4">
              Practical, data-driven AI use cases that deliver measurable ROI —
              tailored to {data.title.toLowerCase()} operations.
            </p>

            <div className="flex gap-3">
              <div className="flex-1 bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-indigo-700">Impact</p>
                <p className="text-sm text-gray-700 mt-1">+30% efficiency</p>
              </div>
              <div className="flex-1 bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-indigo-700">Speed</p>
                <p className="text-sm text-gray-700 mt-1">Faster decision cycles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES (3 cards) */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3
            className="text-2xl font-bold text-center text-gray-900 mb-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What we deliver
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {data.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:scale-[1.03] transform transition-all"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {f.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{f.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASE STUDY / APPROACH (small, compact) */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <motion.h4
              className="text-xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Implementation approach
            </motion.h4>
            <motion.p
              className="text-gray-700 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              We work in short sprints — discovery, prototyping, pilot, and
              production — to deliver value early and continuously improve with real data.
            </motion.p>

            <div className="flex gap-3">
              <div className="flex-1 bg-white p-3 rounded-lg border">
                <p className="text-sm font-medium text-gray-800">Sprint</p>
                <p className="text-sm text-gray-600">2–4 weeks</p>
              </div>
              <div className="flex-1 bg-white p-3 rounded-lg border">
                <p className="text-sm font-medium text-gray-800">Pilot</p>
                <p className="text-sm text-gray-600">1–3 months</p>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-2xl p-6 text-white shadow-xl"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h5 className="text-lg font-semibold mb-2">Ready to start?</h5>
            <p className="text-sm mb-4">
              Book a free discovery call and we’ll propose a tailored roadmap.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white/95 text-black px-4 py-2 rounded-md font-medium hover:scale-[1.02] transition"
            >
              {data.cta}
            </Link>
          </motion.div>
        </div>
      
      </section>

      <Footer/>
    </>
  );
}
