"use client";
import { useState } from "react";

const jobsData = [
  {
    id: 1,
    title: "Full Stack Developer",
    location: "Mumbai",
    type: "Full Time",
    experience: "2-5 years",
    category: "Software Engineering",
  },
  {
    id: 2,
    title: "DevOps Engineer",
    location: "Bangalore",
    type: "Full Time",
    experience: "2-5 years",
    category: "Cloud",
  },
  {
    id: 3,
    title: "AI/ML Engineer",
    location: "Delhi",
    type: "Full Time",
    experience: "0-2 years",
    category: "Artificial Intelligence",
  },
  {
    id: 4,
    title: "Backend Developer (Spring Boot)",
    location: "Pune",
    type: "Full Time",
    experience: "2-5 years",
    category: "Technology",
  },
];

export default function Careers() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const filteredJobs = jobsData.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (location ? job.location === location : true) &&
      (experience ? job.experience === experience : true)
    );
  });

  return (
    <div className="bg-[#0a0d14] min-h-screen px-12 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Find your next opportunity
      </h1>

      <p className="text-gray-400 mb-8">
        Explore roles across AI, Cloud, Software Engineering, and more.
      </p>

       {/* Filters Section */}
      <div className="bg-[#121826] border border-[#1e2535] p-6 rounded-xl shadow mb-10 grid md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Search jobs..."
          className="bg-[#0a0d14] border border-[#1e2535] p-2 rounded text-white placeholder-gray-500"
          onChange={(e) => setSearch(e.target.value)}
        />

       <select
          className="bg-[#0a0d14] border border-[#1e2535] p-2 rounded text-white"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
          <option>Delhi</option>
          <option>Pune</option>
        </select>

        <select
          className="bg-[#0a0d14] border border-[#1e2535] p-2 rounded text-white"
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">All Experience</option>
          <option>0-2 years</option>
          <option>2-5 years</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setLocation("");
            setExperience("");
          }}
          className="bg-[#1e2535] hover:bg-[#2a3245] rounded px-4 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Job Results */}
      <p className="mb-4 text-gray-700">
        {filteredJobs.length} Results
      </p>

      {/* Job Cards */}
      <div className="space-y-4">

        {filteredJobs.map((job) => (
          <div
            key={job.id}
             className="bg-[#121826] border border-[#1e2535] p-6 rounded-xl shadow hover:shadow-blue-500/10 hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {job.title}
            </h2>

            <div className="flex gap-6 text-gray-600 mt-2 text-sm">
              <span>{job.location}</span>
              <span>{job.type}</span>
              <span>Experience: {job.experience}</span>
            </div>

            <p className="mt-2 text-blue-600 text-sm">
              {job.category}
            </p>

            <button className="mt-4 text-blue-600 font-semibold hover:underline">
              View Details →
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}