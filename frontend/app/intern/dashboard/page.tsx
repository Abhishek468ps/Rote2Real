"use client";

import { useState, useEffect } from "react";
import Badge from "@/components/Badge";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Project = {
  id: string;
  title: string;
  techStack: string[];
  mentor: string;
  status: "in-progress" | "ready-for-evaluation" | "completed";
  progress: number;
  activityLogs: string[];
  githubRepo: string;
  is2FAEnabled: boolean;
};

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Central Facility Portal",
    techStack: ["Next.js", "MongoDB", "Leaflet"],
    mentor: "Rahul Sharma",
    status: "in-progress",
    progress: 45,
    activityLogs: [],
    githubRepo: "SinghMonika1324/central-facility-portal",
    is2FAEnabled: true,
  },
  {
    id: "2",
    title: "AI Resume Analyzer",
    techStack: ["Next.js", "Python", "OpenAI"],
    mentor: "Neha Gupta",
    status: "ready-for-evaluation",
    progress: 80,
    activityLogs: [],
    githubRepo: "SinghMonika1324/ai-resume-analyzer",
    is2FAEnabled: false,
  },
];

/* ===========================
   DASHBOARD UI ONLY
=========================== */

function InternDashboardUI() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("progress-desc");
  const [page, setPage] = useState(1);

  const projectsPerPage = 4;

  // Fetch GitHub data
  const fetchGitHubData = async (repo: string) => {
    try {
      const res = await fetch(`/api/github?repo=${repo}`);
      if (!res.ok) throw new Error("GitHub API failed");

      return await res.json();
    } catch {
      return { commits: [], is2FAEnabled: false };
    }
  };

  useEffect(() => {
    const load = async () => {
      const updated = await Promise.all(
        projects.map(async (p) => {
          const data = await fetchGitHubData(p.githubRepo);
          return {
            ...p,
            activityLogs: data.commits ?? [],
            is2FAEnabled: !!data.is2FAEnabled,
          };
        })
      );
      setProjects(updated);
    };

    load();
  }, []);

  const displayed = projects
    .filter((p) => filterStatus === "all" || p.status === filterStatus)
    .sort((a, b) =>
      sortBy === "progress-desc" ? b.progress - a.progress : a.progress - b.progress
    );

  const paginated = displayed.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Intern Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <select onChange={(e) => setFilterStatus(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="in-progress">In Progress</option>
          <option value="ready-for-evaluation">Ready</option>
          <option value="completed">Completed</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded">
          <option value="progress-desc">Progress ↓</option>
          <option value="progress-asc">Progress ↑</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginated.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="bg-white border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">{proj.title}</h3>
              <Badge text={proj.status} />
            </div>

            <p className="text-sm mt-2">Mentor. {proj.mentor}</p>

            <div className="mt-3 h-2 bg-zinc-200 rounded">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: `${proj.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">{selectedProject.title}</h2>

            <Line
              data={{
                labels: selectedProject.activityLogs.map((_, i) => `Commit ${i + 1}`),
                datasets: [
                  {
                    label: "Progress",
                    data: selectedProject.activityLogs.map((_, i) =>
                      Math.min(100, selectedProject.progress + i * 2)
                    ),
                  },
                ],
              }}
            />

            <button
              className="mt-4 text-blue-600"
              onClick={() => setSelectedProject(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===========================
   PROTECTED EXPORT
=========================== */

export default function InternDashboard() {
  return (
    <ProtectedRoute allowedRole="intern">
      <InternDashboardUI />
    </ProtectedRoute>
  );
}
