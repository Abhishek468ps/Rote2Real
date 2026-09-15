"use client";

import { useState } from "react";

const newsData = [
  {
    id: 1,
    title: "🚀 AI Marketplace Launch",
    date: "Q2 2026",
    category: "Featured",
    description: "Launching our flagship AI marketplace to connect students with real-world projects and hiring opportunities.",
    featured: true,
  },
  {
    id: 2,
    title: "DevOps Training Program",
    date: "Q2 2026",
    category: "Training",
    description: "Hands-on DevOps program with real deployment, CI/CD pipelines, and cloud infrastructure.",
  },
  {
    id: 3,
    title: "National Hackathon",
    date: "Q3 2026",
    category: "Event",
    description: "A 48-hour hackathon to solve real-world problems using AI and modern tech.",
  },
  {
    id: 4,
    title: "Sprint Industrial Projects",
    date: "Q2 2026",
    category: "Program",
    description: "7, 14, 21 days sprint programs for real industry exposure.",
  },
];

const roadmap = [
  { quarter: "Q2 2026", items: ["AI Marketplace", "DevOps Training", "Sprint Projects"] },
  { quarter: "Q3 2026", items: ["National Hackathon", "AI Job Marketplace"] },
  { quarter: "Q4 2026", items: ["Global Expansion", "Advanced AI Tools"] },
];

export default function NewsPage() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  const filteredNews = newsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white px-6 py-16">

      {/* FEATURED BANNER */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-2">
            🚀 Upcoming: AI Marketplace Launch
          </h2>
          <p className="text-gray-200">
            Our biggest platform is launching soon. Connecting talent, projects, and companies in one ecosystem.
          </p>
        </div>
      </div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          News & Roadmap
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Follow our journey as we build next-gen learning and industry solutions.
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto mt-10">
        <input
          type="text"
          placeholder="Search updates..."
          className="w-full bg-[#121826] border border-[#1e2535] p-3 rounded-xl text-white"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ROADMAP */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Product Roadmap</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {roadmap.map((phase, index) => (
            <div key={index} className="bg-[#121826] border border-[#1e2535] p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-blue-400">{phase.quarter}</h3>
              <ul className="space-y-2 text-gray-400">
                {phase.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* NEWS GRID */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-[#121826] border border-[#1e2535] p-6 rounded-2xl hover:scale-105 transition"
          >
            <p className="text-sm text-blue-400 mb-2">{item.category}</p>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{item.date}</p>
            <p className="text-gray-400 text-sm">{item.description}</p>

            <button className="mt-4 text-blue-400 hover:underline">
              Learn More →
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Stay connected with us
        </h2>
        <p className="text-gray-400 mb-6">
          Be the first to know about launches, events, and opportunities.
        </p>
        <div className="flex gap-4 justify-center">
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="bg-[#121826] border border-[#1e2535] px-4 py-2 rounded text-white"
  />

  <button
    onClick={() => {
      if (!email) return alert("Enter email first");
      alert(`Subscribed with ${email}`);
    }}
    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
  >
    Subscribe
  </button>
</div>
      </div>

    </div>
  );
}
