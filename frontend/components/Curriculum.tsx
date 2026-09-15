"use client";
import { useState } from "react";

const weeks = [
  {
    title: "Week 1",
    topic: "Business Process Intelligence",
    details:
      "Learn process mapping, ROI calculation, and automation feasibility analysis.",
  },
  {
    title: "Week 2",
    topic: "Prompt Engineering",
    details:
      "Design production-grade prompts and build AI agents with structured outputs.",
  },
  {
    title: "Week 3",
    topic: "API Orchestration",
    details:
      "Build multi-service workflows using APIs, webhooks, and automation tools.",
  },
  {
    title: "Week 4",
    topic: "Document AI",
    details:
      "Create OCR pipelines with validation, confidence scoring, and HITL systems.",
  },
  {
    title: "Week 5",
    topic: "CRM / ERP Automation",
    details:
      "Automate lead scoring, workflows, and enterprise systems.",
  },
  {
    title: "Week 6",
    topic: "KPI Dashboards",
    details:
      "Build automated reporting systems with real-time dashboards.",
  },
  {
    title: "Week 7",
    topic: "Industry Adaptation",
    details:
      "Adapt automation systems across different domains and constraints.",
  },
  {
    title: "Week 8",
    topic: "Capstone Deployment",
    details:
      "Deploy full production system using Docker and present business ROI.",
  },
];

export default function Curriculum() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="px-10 py-20 max-w-6xl">
      <h2 className="text-3xl font-semibold mb-10">
        Curriculum Breakdown
      </h2>

      <div className="space-y-4">
        {weeks.map((week, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-lg overflow-hidden"
          >
            <div
              onClick={() =>
                setActive(active === index ? null : index)
              }
              className="p-6 cursor-pointer flex justify-between items-center hover:bg-white/10 transition"
            >
              <div>
                <h3 className="text-xl font-medium">
                  {week.title} - {week.topic}
                </h3>
              </div>

              <span className="text-xl">
                {active === index ? "-" : "+"}
              </span>
            </div>

            {active === index && (
              <div className="px-6 pb-6 text-gray-300">
                {week.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}