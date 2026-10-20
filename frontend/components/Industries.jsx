/*"use client";
import { FaIndustry, FaFlask, FaHospital, FaUniversity } from "react-icons/fa";
import { motion } from "framer-motion";

const industries = [
  {
    icon: FaIndustry,
    title: "Manufacturing",
    description: "AI-driven automation and predictive analytics to optimize production efficiency and reduce downtime."
  },
  {
    icon: FaFlask,
    title: "Biotechnology",
    description: "Advanced data analytics and AI support for research, experiments, and innovative biotech solutions."
  },
  {
    icon: FaHospital,
    title: "Healthcare",
    description: "Intelligent healthcare solutions enhancing patient care, operations, and medical data insights."
  },
  {
    icon: FaUniversity,
    title: "Education",
    description: "Next-gen learning tools, AI-powered analytics, and digital solutions to empower students and educators."
  }
];

const Industries = () => {
  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Industries We Serve
        </motion.h2>
        <motion.p
          className="text-gray-700 mb-16 max-w-3xl mx-auto text-lg sm:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Brain Train Consultancy Services LLP delivers tailored AI, automation, and analytics solutions across industries, helping organizations innovate, scale, and achieve measurable growth.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 border border-indigo-200 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-3 hover:shadow-2xl hover:scale-105 hover:border-indigo-300"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-100 mb-5 shadow-inner">
                  <IconComponent size={36} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{industry.title}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
                <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-indigo-400/50">
                  Explore →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

     
      <div className="absolute top-0 left-0 w-36 h-36 bg-indigo-100 rounded-full opacity-15 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-indigo-200 rounded-full opacity-10 -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-44 h-44 bg-purple-100 rounded-full opacity-10 -z-10"></div>
    </section>
  );
};

export default Industries;*/


"use client";

import { FaIndustry, FaFlask, FaHospital, FaUniversity } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const industries = [
  {
    icon: FaIndustry,
    title: "Manufacturing",
    slug: "manufacturing",
    description:
      "AI-driven automation and predictive analytics to optimize production efficiency and reduce downtime.",
  },
  {
    icon: FaFlask,
    title: "Biotechnology",
    slug: "biotechnology",
    description:
      "Advanced data analytics and AI support for research, experiments, and innovative biotech solutions.",
  },
  {
    icon: FaHospital,
    title: "Healthcare",
    slug: "healthcare",
    description:
      "Intelligent healthcare solutions enhancing patient care, operations, and medical data insights.",
  },
  {
    icon: FaUniversity,
    title: "Education",
    slug: "education",
    description:
      "Next-gen learning tools, AI-powered analytics, and digital solutions to empower students and educators.",
  },
];

const Industries = () => {
  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Industries We Serve
        </motion.h2>

        <motion.p
          className="text-gray-700 mb-16 max-w-3xl mx-auto text-lg sm:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Brain Train Consultancy Services LLP delivers tailored AI, automation,
          and analytics solutions across industries, helping organizations
          innovate, scale, and achieve measurable growth.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 border border-indigo-200 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-3 hover:shadow-2xl hover:scale-105 hover:border-indigo-300"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-100 mb-5 shadow-inner">
                  <IconComponent size={36} className="text-indigo-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {industry.title}
                </h3>

                <p className="text-gray-600 text-sm">{industry.description}</p>

                {/* EXPLORE BUTTON WITH LINK */}
                <Link
                  href={`/industries/${industry.slug}`}
                  className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-indigo-400/50 block"
                >
                  Explore →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-indigo-100 rounded-full opacity-15 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-indigo-200 rounded-full opacity-10 -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-44 h-44 bg-purple-100 rounded-full opacity-10 -z-10"></div>
    </section>
  );
};

export default Industries;





//bg-gradient-to-br from-gray-800 via-gray-900 to-black
