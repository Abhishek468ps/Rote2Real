"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Edit3,
  Layers3,
  Loader2,
  Users,
  Zap,
  XCircle,
} from "lucide-react";

import { API_ENDPOINTS } from "@/lib/api";

type Plan = {
  id?: number;
  name?: string;
  code?: string;
  durationHours?: number;
  price?: number;
  currency?: string;
  free?: boolean;
  description?: string;
  maxTeamSize?: number;
  certificateEnabled?: boolean;
  portfolioEnabled?: boolean;
  mentorEnabled?: boolean;
  aiMentorEnabled?: boolean;
  active?: boolean;
};

type Module = {
  id?: number;
  title?: string;
  moduleNumber?: number;
  description?: string;
  tasks?: Task[];
};

type Task = {
  id?: number;
  title?: string;
  description?: string;
  taskNumber?: number;
};

type Mvp = {
  id: number;
  mvpCode?: string;
  code?: string;
  title: string;
  slug?: string;
  shortDescription?: string;
  description?: string;

  category?: string;
  difficulty?: string;
  status?: string;

  estimatedHours?: number;

  minTeamSize?: number;
  maxTeamSize?: number;
  teamAllowed?: boolean;

  rewardXp?: number;

  certificateEnabled?: boolean;
  portfolioEnabled?: boolean;
  mentorEnabled?: boolean;
  aiMentorEnabled?: boolean;

  featured?: boolean;

  prerequisites?: string;
  learningOutcomes?: string;
  deliverables?: string;

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  completedAt?: string;

  domain?: {
    id?: number;
    name?: string;
    code?: string;
    description?: string;
  };

  plans?: Plan[];
  modules?: Module[];
};

export default function ViewMvpPage() {
  const params = useParams();
  const router = useRouter();

  const [mvp, setMvp] = useState<Mvp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mvpId = params?.id as string;

  const getAuthHeaders = () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") ||
          localStorage.getItem("accessToken")
        : null;

    return {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  };

  const loadMvp = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        API_ENDPOINTS.MVP_BY_ID(mvpId),
        {
          method: "GET",
          headers: getAuthHeaders(),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          text ||
            `Failed to load MVP. Status: ${response.status}`
        );
      }

      const data = await response.json();

      setMvp(data);
    } catch (err) {
      console.error("Load MVP error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load MVP."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mvpId) {
      loadMvp();
    }
  }, [mvpId]);

  const getStatusStyle = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";

      case "DRAFT":
        return "border-amber-500/20 bg-amber-500/10 text-amber-300";

      case "INACTIVE":
      case "DISABLED":
        return "border-red-500/20 bg-red-500/10 text-red-300";

      case "ARCHIVED":
        return "border-slate-500/20 bg-slate-500/10 text-slate-300";

      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "N/A";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDuration = (hours?: number) => {
    if (!hours || hours <= 0) {
      return "Not specified";
    }

    if (hours < 24) {
      return `${hours} hours`;
    }

    const days = Math.round(hours / 24);

    return `${days} ${
      days === 1 ? "day" : "days"
    }`;
  };

  const formatPrice = (plan: Plan) => {
    if (
      plan.free === true ||
      Number(plan.price || 0) === 0
    ) {
      return "FREE";
    }

    return `${plan.currency || "₹"}${plan.price}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2
              size={24}
              className="animate-spin"
            />
            Loading MVP...
          </div>
        </div>
      </div>
    );
  }

  if (error || !mvp) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <XCircle
            size={40}
            className="mx-auto text-red-400"
          />

          <h1 className="mt-4 text-xl font-semibold">
            Unable to load MVP
          </h1>

          <p className="mt-2 text-sm text-red-300">
            {error || "MVP not found."}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/admin/mvps"
              )
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to MVPs
          </button>
        </div>
      </div>
    );
  }

  const mvpCode =
    mvp.mvpCode ||
    mvp.code ||
    `MVP-${mvp.id}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/admin/mvps"
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-indigo-300">
                  {mvpCode}
                </span>

                {mvp.featured && (
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                    FEATURED
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl">
                {mvp.title}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/admin/mvps/${mvp.id}/edit`
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
          >
            <Edit3 size={16} />
            Edit MVP
          </button>

        </div>

        {/* HERO */}

        <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="p-6 sm:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              <div className="flex gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-300 ring-1 ring-indigo-500/20">
                  <Code2 size={28} />
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap gap-2">

                    {mvp.category && (
                      <Tag text={mvp.category} />
                    )}

                    {mvp.difficulty && (
                      <Tag text={mvp.difficulty} />
                    )}

                    {mvp.domain?.name && (
                      <Tag
                        text={
                          mvp.domain.name
                        }
                      />
                    )}

                  </div>

                  <p className="max-w-3xl text-sm leading-6 text-slate-400">
                    {mvp.shortDescription ||
                      mvp.description ||
                      "No description available."}
                  </p>
                </div>

              </div>

              <span
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                  mvp.status
                )}`}
              >
                {mvp.status ||
                  "UNKNOWN"}
              </span>

            </div>

          </div>
        </div>

        {/* BASIC INFO */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            icon={<Clock3 size={18} />}
            label="Duration"
            value={formatDuration(
              mvp.estimatedHours
            )}
          />

          <InfoCard
            icon={<Users size={18} />}
            label="Team Size"
            value={
              mvp.minTeamSize &&
              mvp.maxTeamSize
                ? `${mvp.minTeamSize} - ${mvp.maxTeamSize}`
                : "N/A"
            }
          />

          <InfoCard
            icon={<Layers3 size={18} />}
            label="Modules"
            value={String(
              mvp.modules?.length || 0
            )}
          />

          <InfoCard
            icon={<BookOpen size={18} />}
            label="Plans"
            value={String(
              mvp.plans?.length || 0
            )}
          />

        </div>

        {/* DESCRIPTION */}

        <Section title="Description">
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-400">
            {mvp.description ||
              "No detailed description available."}
          </p>
        </Section>

        {/* DETAILS */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <Section title="Prerequisites">
            <TextBlock
              value={
                mvp.prerequisites
              }
            />
          </Section>

          <Section title="Learning Outcomes">
            <TextBlock
              value={
                mvp.learningOutcomes
              }
            />
          </Section>

          <Section title="Deliverables">
            <TextBlock
              value={mvp.deliverables}
            />
          </Section>

          <Section title="Domain">
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <span className="text-slate-500">
                  Name:
                </span>{" "}
                {mvp.domain?.name ||
                  "N/A"}
              </p>

              <p className="text-slate-300">
                <span className="text-slate-500">
                  Code:
                </span>{" "}
                {mvp.domain?.code ||
                  "N/A"}
              </p>
            </div>
          </Section>

        </div>

        {/* FEATURES */}

        <Section
          title="Features"
          className="mt-6"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              enabled={
                mvp.certificateEnabled
              }
              label="Certificate"
            />

            <Feature
              enabled={
                mvp.portfolioEnabled
              }
              label="Portfolio"
            />

            <Feature
              enabled={
                mvp.mentorEnabled
              }
              label="Mentor"
            />

            <Feature
              enabled={
                mvp.aiMentorEnabled
              }
              label="AI Mentor"
            />

          </div>
        </Section>

        {/* PLANS */}

        <Section
          title="Plans"
          className="mt-6"
        >
          {!mvp.plans ||
          mvp.plans.length === 0 ? (
            <EmptyState text="No plans found." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

              {mvp.plans.map(
                (plan, index) => (
                  <div
                    key={
                      plan.id ||
                      index
                    }
                    className="rounded-xl border border-white/10 bg-slate-950/50 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <p className="font-semibold text-white">
                          {plan.name ||
                            "Unnamed Plan"}
                        </p>

                        <p className="mt-1 font-mono text-[11px] text-indigo-300">
                          {plan.code ||
                            "NO-CODE"}
                        </p>
                      </div>

                      <span className="text-lg font-bold text-emerald-300">
                        {formatPrice(
                          plan
                        )}
                      </span>

                    </div>

                    <div className="mt-4 space-y-2 text-xs text-slate-400">

                      <p>
                        Duration:{" "}
                        <span className="text-slate-200">
                          {formatDuration(
                            plan.durationHours
                          )}
                        </span>
                      </p>

                      <p>
                        Max Team:{" "}
                        <span className="text-slate-200">
                          {plan.maxTeamSize ||
                            "N/A"}
                        </span>
                      </p>

                      <p>
                        Status:{" "}
                        <span
                          className={
                            plan.active ===
                            false
                              ? "text-red-300"
                              : "text-emerald-300"
                          }
                        >
                          {plan.active ===
                          false
                            ? "Inactive"
                            : "Active"}
                        </span>
                      </p>

                    </div>
                  </div>
                )
              )}

            </div>
          )}
        </Section>

        {/* MODULES */}

        <Section
          title="Modules & Tasks"
          className="mt-6"
        >
          {!mvp.modules ||
          mvp.modules.length === 0 ? (
            <EmptyState text="No modules found." />
          ) : (
            <div className="space-y-4">

              {mvp.modules.map(
                (module, index) => (
                  <div
                    key={
                      module.id ||
                      index
                    }
                    className="rounded-xl border border-white/10 bg-slate-950/50 p-5"
                  >

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300">
                        {module.moduleNumber ||
                          index + 1}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">
                          {module.title ||
                            `Module ${
                              index + 1
                            }`}
                        </h3>

                        {module.description && (
                          <p className="mt-1 text-sm text-slate-500">
                            {
                              module.description
                            }
                          </p>
                        )}
                      </div>

                    </div>

                    {module.tasks &&
                      module.tasks.length >
                        0 && (
                        <div className="mt-4 space-y-2 border-t border-white/10 pt-4">

                          {module.tasks.map(
                            (
                              task,
                              taskIndex
                            ) => (
                              <div
                                key={
                                  task.id ||
                                  taskIndex
                                }
                                className="rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3"
                              >
                                <p className="text-sm font-medium text-slate-200">
                                  {task.title ||
                                    `Task ${
                                      taskIndex +
                                      1
                                    }`}
                                </p>

                                {task.description && (
                                  <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {
                                      task.description
                                    }
                                  </p>
                                )}
                              </div>
                            )
                          )}

                        </div>
                      )}

                  </div>
                )
              )}

            </div>
          )}
        </Section>

        {/* META */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <MetaCard
            icon={
              <CalendarDays
                size={16}
              />
            }
            label="Created"
            value={formatDate(
              mvp.createdAt
            )}
          />

          <MetaCard
            icon={
              <CalendarDays
                size={16}
              />
            }
            label="Updated"
            value={formatDate(
              mvp.updatedAt
            )}
          />

        </div>

      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTS
   ============================================================ */

function Tag({
  text,
}: {
  text: string;
}) {
  return (
    <span className="rounded-lg border border-white/10 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300">
      {text}
    </span>
  );
}

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
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 ${className}`}
    >
      <h2 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h2>

      {children}
    </section>
  );
}

function TextBlock({
  value,
}: {
  value?: string;
}) {
  if (!value) {
    return (
      <p className="text-sm text-slate-600">
        Not specified.
      </p>
    );
  }

  return (
    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
      {value}
    </p>
  );
}

function Feature({
  enabled,
  label,
}: {
  enabled?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/50 p-4">
      {enabled ? (
        <CheckCircle2
          size={18}
          className="text-emerald-400"
        />
      ) : (
        <XCircle
          size={18}
          className="text-slate-600"
        />
      )}

      <span
        className={
          enabled
            ? "text-sm text-slate-200"
            : "text-sm text-slate-600"
        }
      >
        {label}
      </span>
    </div>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}

function MetaCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-4">
      <div className="text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-600">
          {label}
        </p>

        <p className="mt-1 text-sm text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}