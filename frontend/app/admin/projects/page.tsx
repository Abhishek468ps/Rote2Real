"use client";

import { useState, useMemo } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  estimatedDays: number;
  status: "pending" | "approved" | "rejected";
  mentor?: string;
};

const initialProjects: Project[] = [
  {
    id: "1",
    title: "AI Resume Analyzer",
    description:
      "Analyze resumes using NLP, AI models and match with job requirements.",
    techStack: ["Next.js", "Python", "OpenAI"],
    estimatedDays: 14,
    status: "pending",
  },
  {
    id: "2",
    title: "Central Facility Locator",
    description:
      "Locate nearby biotechnology instrumentation facilities across India.",
    techStack: ["React", "MongoDB", "Leaflet"],
    estimatedDays: 20,
    status: "approved",
    mentor: "Rahul Sharma",
  },
  {
    id: "3",
    title: "Intern Performance Tracker",
    description:
      "Track intern login, GitHub commits, project progress, and evaluations.",
    techStack: ["Next.js", "PostgreSQL"],
    estimatedDays: 18,
    status: "pending",
  },
];

const PAGE_SIZE = 2;

const mentors = ["Rahul Sharma", "Ankit Verma", "Neha Gupta"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [assignedMentor, setAssignedMentor] = useState("");
  const [remarks, setRemarks] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, projects]);

  const start = (page - 1) * PAGE_SIZE;
  const paginatedProjects = filteredProjects.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

  const approveProject = () => {
    if (!selectedProject) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, status: "approved", mentor: assignedMentor }
          : p
      )
    );
    closeModal();
  };

  const rejectProject = () => {
    if (!selectedProject) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, status: "rejected", mentor: assignedMentor }
          : p
      )
    );
    closeModal();
  };

  const closeModal = () => {
    setSelectedProject(null);
    setAssignedMentor("");
    setRemarks("");
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-zinc-900">Projects</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-2 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-zinc-200 rounded-xl shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-100 text-zinc-600">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Tech Stack</th>
              <th className="p-4">Est. Days</th>
              <th className="p-4">Status</th>
              <th className="p-4">Mentor</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProjects.map((project) => (
              <tr key={project.id} className="border-t border-zinc-200">
                <td className="p-4 font-medium text-zinc-900">{project.title}</td>
                <td className="p-4 text-zinc-700">{project.techStack.join(", ")}</td>
                <td className="p-4 text-zinc-700">{project.estimatedDays}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : project.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">{project.mentor || "-"}</td>
                <td className="p-4 space-x-2">
                  {project.status === "pending" && (
                    <>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setAssignedMentor("NA");
                        }}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : "bg-zinc-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">
              {assignedMentor === "NA" ? "Reject Project" : "Approve Project"}
            </h3>

            <p className="text-sm text-zinc-700">{selectedProject.description}</p>

            <textarea
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {assignedMentor !== "NA" && (
              <select
                value={assignedMentor}
                onChange={(e) => setAssignedMentor(e.target.value)}
                className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Assign Mentor</option>
                {mentors.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-3 py-1 rounded bg-zinc-300 hover:bg-zinc-400"
              >
                Cancel
              </button>

              {assignedMentor === "NA" ? (
                <button
                  onClick={rejectProject}
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Reject
                </button>
              ) : (
                <button
                  onClick={approveProject}
                  className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                  disabled={!assignedMentor}
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
