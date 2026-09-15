"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  ExternalLink,
  Github,
  Loader2,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api";

interface Mvp {
  id: number;
  mvpCode: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  difficulty?: string;
  estimatedHours?: number;
  minTeamSize?: number;
  maxTeamSize?: number;
  teamAllowed: boolean;
  rewardXp: number;
  certificateEnabled: boolean;
  portfolioEnabled: boolean;
  mentorEnabled: boolean;
  aiMentorEnabled: boolean;
  featured: boolean;
  status: string;
}

interface MvpEnrollment {
  id: number;
  mvpId?: number;
  planId?: number;

  mvpTitle?: string;
  mvpCode?: string;

  planName?: string;
  planCode?: string;

   durationHours?: number;
  price?: number;
  currency?: string;
  free?: boolean;

  paymentStatus?: string;
  enrollmentStatus?: string;

  progressPercentage?: number;
  completedTasks?: number;
  totalTasks?: number;

  startedAt?: string;
  deadlineAt?: string;

 githubRepoName?: string;
  githubRepoUrl?: string;
  githubRepoCreatedAt?: string;

  liveDemoUrl?: string;
  repositoryUrl?: string;
  finalSubmissionUrl?: string;

  score?: number;
  xpEarned?: number;

  teamId?: number;

  createdAt?: string;
  updatedAt?: string;
}

interface MvpModule {
  id: number;
  mvpId: number;
  mvpTitle?: string;
  title: string;
  description?: string;
  moduleNumber?: number;
  estimatedHours?: number;
  difficulty?: string;
  learningObjectives?: string;
  deliverables?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MvpTask {
  id: number;
  moduleId: number;
  moduleTitle?: string;
  mvpId: number;
  title: string;
  description?: string;
  taskType?: string;
  priority?: string;
  difficulty?: string;
  estimatedMinutes?: number;
  sequenceNumber?: number;
  mandatory: boolean;
  submissionRequired: boolean;
  githubRequired: boolean;
  deadlineOffsetHours?: number;
  xpReward?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function MvpWorkspacePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const mvpId = Number(params.id);
  const enrollmentId = Number(
    searchParams.get("enrollmentId")
  );

  const [mvp, setMvp] = useState<Mvp | null>(null);
  const [enrollment, setEnrollment] =
    useState<MvpEnrollment | null>(null);

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const [modules, setModules] = useState<MvpModule[]>([]);
const [tasks, setTasks] = useState<Record<number, MvpTask[]>>({});
const [expandedModule, setExpandedModule] = useState<number | null>(null);
const [loadingModules, setLoadingModules] = useState(false);
const [loadingTasks, setLoadingTasks] = useState<number | null>(null);

  useEffect(() => {
    if (!mvpId || !enrollmentId) {
      setError(
        "Invalid MVP or enrollment information."
      );
      setLoading(false);
      return;
    }

    loadWorkspace();
  }, [mvpId, enrollmentId]);

  async function loadWorkspace() {
    try {
      setLoading(true);
      setLoadingModules(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      console.log("=================================");
      console.log("MVP WORKSPACE");
      console.log("MVP ID:", mvpId);
      console.log("Enrollment ID:", enrollmentId);
      console.log("=================================");

      // ============================================================
      // LOAD ENROLLMENT
      // ============================================================

      const enrollmentResponse = await fetch(
        API_ENDPOINTS.MVP_MY_ENROLLMENT(enrollmentId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const enrollmentText =
        await enrollmentResponse.text();

      console.log(
        "Enrollment status:",
        enrollmentResponse.status
      );

      console.log(
        "Enrollment response:",
        enrollmentText
      );

      if (!enrollmentResponse.ok) {
        throw new Error(
          enrollmentText ||
            "Unable to load enrollment."
        );
      }

      const enrollmentData =
        JSON.parse(enrollmentText);

      setEnrollment(enrollmentData);

      // ============================================================
      // LOAD MVP
      // ============================================================

      const mvpResponse = await fetch(
        API_ENDPOINTS.STUDENT_MVPS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const mvpText = await mvpResponse.text();

      console.log(
        "MVP status:",
        mvpResponse.status
      );

      if (!mvpResponse.ok) {
        throw new Error(
          mvpText || "Unable to load MVP."
        );
      }

      const mvpData = mvpText
        ? JSON.parse(mvpText)
        : [];

      const foundMvp = Array.isArray(mvpData)
        ? mvpData.find(
            (item: Mvp) => item.id === mvpId
          )
        : null;

      if (!foundMvp) {
        throw new Error(
          "MVP details could not be found."
        );
      }

      setMvp(foundMvp);
// ============================================================
// LOAD MVP MODULES
// ============================================================

const modulesResponse = await fetch(
  API_ENDPOINTS.STUDENT_MVP_WORKSPACE_MODULES(
    mvpId,
    enrollmentId
  ),
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

const modulesText = await modulesResponse.text();

console.log(
  "Modules status:",
  modulesResponse.status
);

console.log(
  "Modules response:",
  modulesText
);

if (!modulesResponse.ok) {
  throw new Error(
    modulesText || "Unable to load MVP modules."
  );
}

const modulesData = modulesText
  ? JSON.parse(modulesText)
  : [];

setModules(
  Array.isArray(modulesData)
    ? modulesData
    : []
);

    } catch (error) {
      console.error(
        "LOAD WORKSPACE ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load MVP workspace."
      );
    } finally {
      setLoading(false);
      setLoadingModules(false);
    }
  }

  async function loadTasks(moduleId: number) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoadingTasks(moduleId);

    const response = await fetch(
      API_ENDPOINTS.STUDENT_MVP_WORKSPACE_TASKS(
        moduleId,
        enrollmentId
      ),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = await response.text();

    console.log(
      "Tasks status:",
      response.status
    );

    console.log(
      "Tasks response:",
      text
    );

    if (!response.ok) {
      throw new Error(
        text || "Unable to load module tasks."
      );
    }

    const data = text
      ? JSON.parse(text)
      : [];

    setTasks((previous) => ({
      ...previous,
      [moduleId]: Array.isArray(data)
        ? data
        : [],
    }));
  } catch (error) {
    console.error(
      "LOAD TASKS ERROR:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Unable to load tasks."
    );
  } finally {
    setLoadingTasks(null);
  }
}

  async function startMvp() {
    if (!enrollment) return;

    try {
      setStarting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        API_ENDPOINTS.MVP_START(enrollment.id),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = await response.text();

      console.log(
        "Start MVP status:",
        response.status
      );

      console.log(
        "Start MVP response:",
        text
      );

      if (!response.ok) {
        throw new Error(
          text || "Unable to start MVP."
        );
      }

      const updatedEnrollment =
        JSON.parse(text);

      setEnrollment(updatedEnrollment);

      alert("MVP started successfully!");

    } catch (error) {
      console.error(
        "START MVP ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to start MVP."
      );
    } finally {
      setStarting(false);
    }
  }

  function toggleModule(moduleId: number) {
  if (expandedModule === moduleId) {
    setExpandedModule(null);
    return;
  }

  setExpandedModule(moduleId);

  if (!tasks[moduleId]) {
    loadTasks(moduleId);
  }
}

  function formatDate(
    value?: string
  ) {
    if (!value) return "Not started";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function getStatusLabel() {
    if (!enrollment?.enrollmentStatus) {
      return "UNKNOWN";
    }

    return enrollment.enrollmentStatus
      .replaceAll("_", " ")
      .toUpperCase();
  }

  const progress =
    enrollment?.progressPercentage ?? 0;

  if (loading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-purple-600" />

          <p className="mt-3 text-sm text-slate-500">
            Loading your MVP workspace...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
            <h1 className="text-xl font-bold text-red-700 dark:text-red-400">
              Unable to load workspace
            </h1>

            <p className="mt-2 text-sm text-red-600 dark:text-red-300">
              {error}
            </p>

            <button
              onClick={() => router.back()}
              className="mt-5 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!mvp || !enrollment) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <p className="text-slate-500">
          Workspace information is unavailable.
        </p>
      </div>
    );
  }

  const canStart =
    enrollment.enrollmentStatus === "READY_TO_START";

  const isInProgress =
    enrollment.enrollmentStatus === "IN_PROGRESS";

  const isCompleted =
    enrollment.enrollmentStatus === "COMPLETED";

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        {/* ============================================================
            BACK
        ============================================================ */}

        <button
          onClick={() => router.push("/dashboard/student/mvps")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to MVPs
        </button>

        {/* ============================================================
            HERO
        ============================================================ */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />

                  <span className="text-sm font-semibold uppercase tracking-wider">
                    MVP Workspace
                  </span>
                </div>

                <h1 className="text-3xl font-bold md:text-4xl">
                  {mvp.title || mvp.mvpCode}
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-purple-100 md:text-base">
                  {mvp.description ||
                    mvp.shortDescription ||
                    "Build and complete this real-world MVP project."}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                    {mvp.mvpCode}
                  </span>

                  {mvp.category && (
                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                      {mvp.category}
                    </span>
                  )}

                  {mvp.difficulty && (
                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                      {mvp.difficulty}
                    </span>
                  )}

                </div>
              </div>

              <div className="shrink-0 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-medium text-purple-100">
                  Enrollment
                </p>

                <p className="mt-1 text-2xl font-bold">
                  #{enrollment.id}
                </p>

                <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {getStatusLabel()}
                </span>
              </div>

            </div>
          </div>

          {/* ============================================================
              MAIN GRID
          ============================================================ */}

          <div className="grid gap-6 p-6 lg:grid-cols-3">

            {/* ========================================================
                LEFT. PROGRESS
            ======================================================== */}

            <div className="lg:col-span-2">

              <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Your Progress
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Track your MVP execution progress.
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {progress}%
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all"
                    style={{
                      width: `${Math.min(
                        Math.max(progress, 0),
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                  <InfoCard
                    icon={<Target className="h-5 w-5" />}
                    label="Progress"
                    value={`${progress}%`}
                  />

                  <InfoCard
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    label="Completed Tasks"
                    value={`${enrollment.completedTasks ?? 0}`}
                  />

                  <InfoCard
                    icon={<Code2 className="h-5 w-5" />}
                    label="Total Tasks"
                    value={`${enrollment.totalTasks ?? 0}`}
                  />

                </div>

              </div>

              {/* ======================================================
                  PROJECT DETAILS
              ====================================================== */}

              <div className="mt-6 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <Rocket className="h-5 w-5 text-purple-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Project Details
                    </h2>

                    <p className="text-sm text-slate-500">
                      Your selected MVP configuration.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  <DetailItem
                    label="MVP Code"
                    value={mvp.mvpCode}
                  />

                  <DetailItem
                    label="Plan"
                    value={
                      enrollment.planName ||
                      enrollment.planCode ||
                      "Selected Plan"
                    }
                  />

                  <DetailItem
                    label="Estimated Hours"
                    value={
                      mvp.estimatedHours
                        ? `${mvp.estimatedHours} hours`
                        : "Not specified"
                    }
                  />

                  <DetailItem
                    label="Reward XP"
                    value={`${mvp.rewardXp} XP`}
                  />

                  <DetailItem
                    label="Team"
                    value={
                      mvp.teamAllowed
                        ? `${mvp.minTeamSize ?? 1} - ${
                            mvp.maxTeamSize ?? "Multiple"
                          } members`
                        : "Individual"
                    }
                  />

                  <DetailItem
                    label="Enrollment Status"
                    value={getStatusLabel()}
                  />

                </div>

              </div>

              {/* ============================================================
    MVP MODULES & TASKS
============================================================ */}

<div className="mt-6 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">

  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        MVP Modules
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Follow the modules and complete the assigned tasks.
      </p>
    </div>

    <div className="rounded-full bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
      {modules.length} Modules
    </div>
  </div>

  {loadingModules ? (
    <div className="flex items-center justify-center py-10">
      <Loader2 className="h-6 w-6 animate-spin text-purple-600" />

      <span className="ml-2 text-sm text-slate-500">
        Loading modules...
      </span>
    </div>
  ) : modules.length === 0 ? (
    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <Code2 className="mx-auto h-8 w-8 text-slate-400" />

      <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
        No modules have been added yet.
      </p>

      <p className="mt-1 text-xs text-slate-500">
        Your MVP modules will appear here once they are published.
      </p>
    </div>
  ) : (
    <div className="space-y-4">

      {modules.map((module) => {
        const isExpanded =
          expandedModule === module.id;

        const moduleTasks =
          tasks[module.id] ?? [];

        return (
          <div
            key={module.id}
            className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
          >

            {/* MODULE HEADER */}

            <button
              type="button"
              onClick={() =>
                toggleModule(module.id)
              }
              className="flex w-full items-center justify-between gap-4 bg-white p-5 text-left transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/60"
            >

              <div className="flex min-w-0 items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  {module.moduleNumber ?? "-"}
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {module.title}
                    </h3>

                    {module.status && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold uppercase text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {module.status}
                      </span>
                    )}

                  </div>

                  {module.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {module.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">

                    {module.estimatedHours !== undefined &&
                      module.estimatedHours !== null && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {module.estimatedHours} hours
                        </span>
                      )}

                    {module.difficulty && (
                      <span>
                        Difficulty: {module.difficulty}
                      </span>
                    )}

                    {tasks[module.id] && (
                      <span>
                        {moduleTasks.length} tasks
                      </span>
                    )}

                  </div>

                </div>

              </div>

              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                  isExpanded
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>


            {/* MODULE CONTENT */}

            {isExpanded && (
              <div className="border-t border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">

                {/* Learning Objectives */}

                {module.learningObjectives && (
                  <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">

                    <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300">
                      Learning Objectives
                    </h4>

                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-blue-700 dark:text-blue-300">
                      {module.learningObjectives}
                    </p>

                  </div>
                )}


                {/* Deliverables */}

                {module.deliverables && (
                  <div className="mb-5 rounded-xl border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-900/20">

                    <h4 className="text-sm font-bold text-purple-800 dark:text-purple-300">
                      Deliverables
                    </h4>

                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-purple-700 dark:text-purple-300">
                      {module.deliverables}
                    </p>

                  </div>
                )}


                {/* TASKS */}

                <div>

                  <div className="mb-4 flex items-center justify-between">

                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Tasks
                    </h4>

                    {loadingTasks === module.id && (
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    )}

                  </div>


                  {loadingTasks === module.id ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">

                      <Loader2 className="mx-auto h-6 w-6 animate-spin text-purple-600" />

                      <p className="mt-2 text-sm text-slate-500">
                        Loading tasks...
                      </p>

                    </div>
                  ) : moduleTasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900">

                      <p className="text-sm text-slate-500">
                        No tasks available for this module.
                      </p>

                    </div>
                  ) : (
                    <div className="space-y-3">

                      {moduleTasks.map((task) => (

                        <div
                          key={task.id}
                          className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                        >

                          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

                            <div className="flex gap-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {task.sequenceNumber ?? "-"}
                              </div>

                              <div>

                                <div className="flex flex-wrap items-center gap-2">

                                  <h5 className="font-semibold text-slate-900 dark:text-white">
                                    {task.title}
                                  </h5>

                                  {task.mandatory && (
                                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                      Mandatory
                                    </span>
                                  )}

                                </div>

                                {task.description && (
                                  <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {task.description}
                                  </p>
                                )}

                                <div className="mt-3 flex flex-wrap gap-2">

                                  {task.taskType && (
                                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                      {task.taskType}
                                    </span>
                                  )}

                                  {task.priority && (
                                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                      {task.priority}
                                    </span>
                                  )}

                                  {task.difficulty && (
                                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                      {task.difficulty}
                                    </span>
                                  )}

                                  {task.status && (
                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                      {task.status}
                                    </span>
                                  )}

                                </div>

                              </div>

                            </div>


                            {/* TASK META */}

                            <div className="shrink-0 text-left md:text-right">

                              {task.estimatedMinutes !== undefined &&
                                task.estimatedMinutes !== null && (
                                  <p className="flex items-center gap-1 text-xs text-slate-500 md:justify-end">
                                    <Clock className="h-3.5 w-3.5" />
                                    {task.estimatedMinutes} min
                                  </p>
                                )}

                              {task.xpReward !== undefined &&
                                task.xpReward !== null && (
                                  <p className="mt-1 text-xs font-semibold text-purple-600">
                                    +{task.xpReward} XP
                                  </p>
                                )}

                              {task.githubRequired && (
                                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 md:justify-end">
                                  <Github className="h-3.5 w-3.5" />
                                  GitHub required
                                </p>
                              )}

                              {task.submissionRequired && (
                                <p className="mt-1 text-xs font-medium text-orange-600">
                                  Submission required
                                </p>
                              )}

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>
        );
      })}

    </div>
  )}

</div>

              {/* ======================================================
                  GITHUB
              ====================================================== */}

              <div className="mt-6 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                      <Github className="h-6 w-6" />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900 dark:text-white">
                        GitHub Repository
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Your project repository created by Brain Train.
                      </p>
                    </div>

                  </div>

                  {enrollment.githubRepoUrl ? (
                    <a
                      href={enrollment.githubRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      Open Repository
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                      Repository not created yet
                    </div>
                  )}

                </div>

                {enrollment.githubRepoName && (
                  <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-xs font-medium text-slate-500">
                      Repository
                    </p>

                    <p className="mt-1 break-all font-mono text-sm text-slate-800 dark:text-slate-200">
                      {enrollment.githubRepoName}
                    </p>
                  </div>
                )}

              </div>

            </div>

            {/* ========================================================
                RIGHT. ACTION PANEL
            ======================================================== */}

            <div>

              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                    <Sparkles className="h-5 w-5 text-green-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Ready to Build?
                    </h2>

                    <p className="text-xs text-slate-500">
                      Start your MVP journey.
                    </p>
                  </div>
                </div>

                {/* STATUS */}

                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Status
                    </span>

                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {getStatusLabel()}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Payment
                    </span>

                    <span className="text-sm font-bold text-green-600">
                      {enrollment.paymentStatus ||
                        "PAID"}
                    </span>
                  </div>

                </div>

                {/* START */}

                {canStart && (
                  <button
                    onClick={startMvp}
                    disabled={starting}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {starting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4" />
                        Start MVP
                      </>
                    )}
                  </button>
                )}

                {isInProgress && (
                  <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20">

                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />

                      <span className="font-semibold">
                        MVP is in progress
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                      Continue working on your project and complete the assigned tasks.
                    </p>

                  </div>
                )}

                {isCompleted && (
                  <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20">

                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />

                      <span className="font-semibold">
                        MVP Completed
                      </span>
                    </div>

                  </div>
                )}

                {/* TIME */}

                <div className="mt-6 space-y-4">

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Started At
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                        {formatDate(
                          enrollment.startedAt
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarClock className="mt-0.5 h-5 w-5 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Deadline
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                        {formatDate(
                          enrollment.deadlineAt
                        )}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ============================================================
              NEXT STEPS
          ============================================================ */}

          <div className="border-t border-slate-200 p-6 dark:border-slate-800">

            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Your MVP Journey
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete these stages to finish your MVP.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">

              <JourneyStep
                number="01"
                title="Understand"
                description="Review the MVP requirements and objectives."
                active
              />

              <JourneyStep
                number="02"
                title="Build"
                description="Develop the project and complete assigned tasks."
              />

              <JourneyStep
                number="03"
                title="Submit"
                description="Push your implementation and submit the final work."
              />

              <JourneyStep
                number="04"
                title="Complete"
                description="Get your result, portfolio and certificate where applicable."
              />

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INFO CARD
============================================================ */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
      <div className="mb-2 text-purple-600">
        {icon}
      </div>

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   DETAIL ITEM
============================================================ */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   JOURNEY STEP
============================================================ */

function JourneyStep({
  number,
  title,
  description,
  active = false,
}: {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        active
          ? "border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-900/20"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`text-xs font-bold ${
            active
              ? "text-purple-600"
              : "text-slate-400"
          }`}
        >
          {number}
        </span>

        {active && (
          <CheckCircle2 className="h-5 w-5 text-purple-600" />
        )}
      </div>

      <h3 className="font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}