
import { notFound } from "next/navigation";
import { FaBrain, FaLaptopCode, FaChartLine, FaCogs } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/layout/Header/Header";
import type { IconType } from "react-icons";
import Footer from "@/components/Footer";

const servicesDetails = {
  "ai-solutions": {
    title: "AI Solutions",
    icon: FaBrain,
    description:
      "We provide innovative AI-powered solutions for businesses looking to automate workflows, enhance accuracy, and unlock intelligent insights.",
    sections: [
      {
        heading: "What We Offer",
        points: [
          "Custom AI model development",
          "Machine learning implementation",
          "Natural language processing",
          "Computer vision automation",
        ],
      },
      {
        heading: "Why Choose Our AI Solutions?",
        points: [
          "Highly optimized, scalable models",
          "Enterprise-grade accuracy",
          "Fast deployment cycles",
          "End-to-end AI lifecycle support",
        ],
      },
    ],
    cta: "Get AI Consultation",
  },

  "software-development": {
    title: "Software Development",
    icon: FaLaptopCode,
    description:
      "Build modern, scalable and high-performance digital products with our end-to-end software engineering expertise.",
    sections: [
      {
        heading: "Our Capabilities",
        points: [
          "Full-stack web development",
          "Cloud-native applications",
          "API development",
          "DevOps automation",
        ],
      },
      {
        heading: "Why Us?",
        points: [
          "Clean architecture",
          "High performance systems",
          "Secure & scalable apps",
          "Agile development process",
        ],
      },
    ],
    cta: "Start Your Project",
  },

  "data-analytics": {
    title: "Data Analytics",
    icon: FaChartLine,
    description:
      "Transform raw data into powerful insights using advanced analytics and visualization tools.",
    sections: [
      {
        heading: "Analytics Expertise",
        points: [
          "Predictive analytics",
          "Business intelligence dashboards",
          "Data visualization",
          "Statistical modelling",
        ],
      },
      {
        heading: "Benefits",
        points: [
          "Improved decision-making",
          "Better forecasting",
          "Enhanced operational efficiency",
          "Real-time reporting",
        ],
      },
    ],
    cta: "Unlock Your Data",
  },

  automation: {
    title: "Automation",
    icon: FaCogs,
    description:
      "Automate repetitive tasks, streamline workflows and boost efficiency with intelligent automation tools.",
    sections: [
      {
        heading: "Automation Services",
        points: [
          "Process automation",
          "Workflow optimization",
          "RPA implementation",
          "System integration",
        ],
      },
      {
        heading: "Why Automate?",
        points: [
          "Reduced manual effort",
          "Cost optimization",
          "Faster operations",
          "Zero human errors",
        ],
      },
    ],
    cta: "Begin Automation",
  },
} as const;

type ServiceSlug = keyof typeof servicesDetails;

type PageProps = {
  params: Promise<{
    slug: ServiceSlug;
  }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const service = servicesDetails[slug];
  if (!service) notFound();

  const Icon: IconType = service.icon;

  return (
    <>
      <Header />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Top Section */}
          <div className="flex flex-col items-center text-center">
            <Icon className="text-indigo-600 mb-4" size={60} />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl">
              {service.description}
            </p>
          </div>

          {/* Sections */}
          {service.sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-md mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {sec.heading}
              </h2>
              <ul className="space-y-2">
                {sec.points.map((p, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition"
          >
            {service.cta} →
          </Link>
        </div>
      </section>
      <Footer/>
    </>
  );
}
