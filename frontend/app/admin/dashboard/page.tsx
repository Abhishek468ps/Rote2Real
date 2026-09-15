/*"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Stat = {
  title: string;
  value: number;
  href: string;
  tooltip?: string;
  key: string;
};

const initialStats: Stat[] = [
  { title: "Total Interns", value: 0, href: "/admin/interns", tooltip: "All interns", key: "totalInterns" },
  { title: "Active Projects", value: 0, href: "/admin/projects", tooltip: "Projects in progress", key: "activeProjects" },
  { title: "Pending Approvals", value: 0, href: "/admin/approvals", tooltip: "Awaiting admin approval", key: "pendingApprovals" },
  { title: "Mentors", value: 0, href: "/admin/mentors", tooltip: "Assigned mentors", key: "mentors" },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = display;
    const duration = 500;
    const increment = Math.ceil((value - start) / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{display}</span>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(initialStats);

  // Polling function
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();

        setStats((prev) =>
          prev.map((stat) => ({
            ...stat,
            value: data[stat.key] ?? stat.value,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats(); // initial fetch
    const interval = setInterval(fetchStats, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.key} href={stat.href}>
            <div className="relative bg-white border border-zinc-200 rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer hover:bg-blue-50">
              
              {stat.key === "pendingApprovals" && stat.value > 0 && (
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full animate-pulse">
                  {stat.value}
                </span>
              )}

              <p className="text-sm font-medium text-zinc-500" title={stat.tooltip}>
                {stat.title}
              </p>

              <p className="text-3xl font-bold text-zinc-900 mt-2">
                <AnimatedNumber value={stat.value} />
              </p>

              <p className="mt-2 text-xs text-blue-600 font-medium hover:underline">
                View Details
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}*/

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

type Stat = {
  title: string;
  value: number;
  href: string;
  tooltip?: string;
  key: string;
};

const initialStats: Stat[] = [
  { title: "Total Interns", value: 0, href: "/admin/interns", tooltip: "All interns", key: "totalInterns" },
  { title: "Active Projects", value: 0, href: "/admin/projects", tooltip: "Projects in progress", key: "activeProjects" },
  { title: "Pending Approvals", value: 0, href: "/admin/approvals", tooltip: "Awaiting admin approval", key: "pendingApprovals" },
  { title: "Mentors", value: 0, href: "/admin/mentors", tooltip: "Assigned mentors", key: "mentors" },
];

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 500;
    const step = Math.max(1, Math.ceil(value / (duration / 16)));

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplay(start);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{display}</span>;
}

/* ===========================
   REAL DASHBOARD UI
=========================== */

function AdminDashboardUI() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) return;

        const data = await res.json();

        setStats((prev) =>
          prev.map((stat) => ({
            ...stat,
            value: Number(data[stat.key]) || 0,
          }))
        );
      } catch (err) {
        console.error("Stats fetch failed", err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.key} href={stat.href}>
            <div className="relative bg-white border border-zinc-200 rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer hover:bg-blue-50">

              {stat.key === "pendingApprovals" && stat.value > 0 && (
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full animate-pulse">
                  {stat.value}
                </span>
              )}

              <p className="text-sm font-medium text-zinc-500" title={stat.tooltip}>
                {stat.title}
              </p>

              <p className="text-3xl font-bold text-zinc-900 mt-2">
                <AnimatedNumber value={stat.value} />
              </p>

              <p className="mt-2 text-xs text-blue-600 font-medium">
                View Details →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ===========================
   PROTECTED EXPORT
=========================== */

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRole="admin">
      <AdminDashboardUI />
    </ProtectedRoute>
  );
}


