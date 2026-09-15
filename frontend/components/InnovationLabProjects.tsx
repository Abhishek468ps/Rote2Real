import { Cpu, Database, Workflow, Bot } from "lucide-react";

const projects = [
  {
    title: "AI Demand Forecasting Prototype",
    description:
      "Developing predictive models to analyze manufacturing demand patterns and optimize inventory planning.",
    icon: Cpu,
  },
  {
    title: "Clinical Data Analysis Research",
    description:
      "Exploring AI-driven analytics to extract insights from biomedical and clinical research datasets.",
    icon: Database,
  },
  {
    title: "Automation Pipeline Framework",
    description:
      "Designing scalable automation workflows for enterprise operations and business processes.",
    icon: Workflow,
  },
  {
    title: "NLP Document Intelligence",
    description:
      "Building natural language processing systems to analyze documents, reports, and structured knowledge bases.",
    icon: Bot,
  },
];

export default function InnovationLabProjects() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Innovation Lab Projects
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
            Our internal research initiatives explore emerging technologies in AI,
            automation, and advanced analytics to develop scalable solutions for
            future industries.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <div
                key={index}
                className="group relative bg-white border border-gray-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >

                {/* Gradient hover border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition"></div>

                {/* Icon */}
                <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-6 shadow-md group-hover:scale-110 transition">
                  <Icon size={26} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Learn More */}
                <div className="mt-5 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition">
                  Learn More →
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}