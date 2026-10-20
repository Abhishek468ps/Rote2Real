/*"use client";

import Badge from "@/components/Badge";
import { useState } from "react";

type ApprovalProject = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  estimatedDays: number;
  status: "pending" | "approved" | "rejected";
  mentor?: string;
  remarks?: string;
};

export default function ApprovalsPage() {
  const [projects, setProjects] = useState<ApprovalProject[]>([
    {
      id: "1",
      title: "AI Resume Analyzer",
      description:
        "Analyze resumes using NLP and AI and match them with job requirements.",
      techStack: ["Next.js", "Python", "OpenAI"],
      estimatedDays: 14,
      status: "pending",
    },
    {
      id: "2",
      title: "Central Facility Locator",
      description:
        "Find nearby biotechnology instrumentation facilities based on location.",
      techStack: ["React", "MongoDB", "Leaflet"],
      estimatedDays: 20,
      status: "pending",
    },
  ]);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, status: action }
          : project
      )
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Project Approvals</h2>

      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-medium">{project.title}</p>
              <p className="text-sm text-zinc-400 mt-1">
                {project.description}
              </p>
            </div>
            <Badge text={project.status} />
          </div>

          <div className="text-sm text-zinc-300 space-y-1">
            <p>
              <b>Tech Stack</b>. {project.techStack.join(", ")}
            </p>
            <p>
              <b>Estimated Time</b>. {project.estimatedDays} days
            </p>
          </div>

          {project.status === "pending" && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleAction(project.id, "approved")}
                className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(project.id, "rejected")}
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
*/

"use client";

import { useState } from "react";
import Badge from "@/components/Badge";

const mentors = [
  "Rahul Sharma",
  "Ankit Verma",
  "Neha Gupta",
];

const PAGE_SIZE = 2;

export default function ApprovalsPage() {
  const [projects, setProjects] = useState<any[]>([
    {
      id: "1",
      title: "AI Resume Analyzer",
      description:
        "Analyze resumes using NLP, AI models and ranking algorithms. The system extracts skills, experience, education and matches them with job descriptions to improve hiring efficiency.",
      techStack: ["Next.js", "Python", "OpenAI"],
      estimatedDays: 14,
      status: "pending",
    },
    {
      id: "2",
      title: "Central Facility Locator",
      description:
        "Platform to locate nearby biotechnology instrumentation facilities across India based on district, availability, reviews, pricing and distance using map-based visualization.",
      techStack: ["React", "MongoDB", "Leaflet"],
      estimatedDays: 20,
      status: "pending",
    },
    {
      id: "3",
      title: "Intern Performance Tracker",
      description:
        "Dashboard to track intern login activity, GitHub commits, project progress and mentor evaluations in a centralized admin panel.",
      techStack: ["Next.js", "PostgreSQL"],
      estimatedDays: 18,
      status: "pending",
    },
  ]);

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any>(null);
  const [remarks, setRemarks] = useState("");
  const [mentor, setMentor] = useState("");

  const start = (page - 1) * PAGE_SIZE;
  const paginatedProjects = projects.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);

  const approveProject = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? {
              ...p,
              status: "approved",
              mentor,
              remarks,
            }
          : p
      )
    );
    closeModal();
  };

  const rejectProject = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? { ...p, status: "rejected", remarks }
          : p
      )
    );
    closeModal();
  };

  const closeModal = () => {
    setSelected(null);
    setRemarks("");
    setMentor("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 space-y-6">
  <h2 className="text-2xl font-semibold text-zinc-100">
    Project Approvals
  </h2>

      {paginatedProjects.map((project) => (
        <div
          key={project.id}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-md"
        >
          <div className="flex justify-between items-start">
            <p className="text-lg font-semibold text-zinc-100">{project.title}</p>
            <Badge text={project.status} />
          </div>

          <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
            {project.description}
          </p>

          <div className="font-medium text-zinc-400">
            <p>
              <b>Tech Stack</b>. {project.techStack.join(", ")}
            </p>
            <p>
              <b>Estimated Time</b>. {project.estimatedDays} days
            </p>
            {project.mentor && (
              <p>
                <b>Mentor</b>. {project.mentor}
              </p>
            )}
          </div>

          {project.status === "pending" && (
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setSelected(project)}
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  setSelected(project);
                  setMentor("NA");
                }}
                className="px-5 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex gap-2 pt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg text-sm transition  ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Approval Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-xl">
            <h3 className="text-xl font-semibold text-zinc-100">
              {selected.status === "pending" ? "Approve Project" : "Reject Project"}
            </h3>

            <textarea
              placeholder="Add remarks or feedback"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full min-h-[120px] bg-zinc-950 border border-zinc-700 p-3 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {mentor !== "NA" && (
              <select
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-lg text-sm text-zinc-200"
          >
            
                <option value="">Assign Mentor</option>
                {mentors.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={closeModal} className="px-4 py-2 rounded-lg  bg-zinc-700 text-zinc-200 hover:bg-zinc-600">
                Cancel
              </button>

              {mentor === "NA" ? (
                <button
                  onClick={rejectProject}
                  className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                >
                  Reject
                </button>
              ) : (
                <button
                  onClick={approveProject}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                  disabled={!mentor}
                >
                  Approve & Assign
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
