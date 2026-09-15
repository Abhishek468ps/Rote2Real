"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Eye,
  Filter,
  Layers3,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Users,
  XCircle,
  Zap,
  X
} from "lucide-react";

import { API_ENDPOINTS } from "@/lib/api";

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

  createdAt?: string;
  updatedAt?: string;

  domain?: {
    id?: number;
    name?: string;
    code?: string;
  };

  plans?: Plan[];
  modules?: Module[];
};

type Plan = {
  id?: number;
  name?: string;
  code?: string;
  durationHours?: number;
  price?: number;
  currency?: string;
  free?: boolean;
  active?: boolean;
};

type Module = {
  id?: number;
  title?: string;
  moduleNumber?: number;
  tasks?: unknown[];
};

type Stats = {
  total: number;
  active: number;
  draft: number;
  featured: number;
};

type FilterStatus = "ALL" | "PUBLISHED" | "DRAFT" | "INACTIVE";

export default function AdminMvpsPage() {
  const router = useRouter();

  const [mvps, setMvps] = useState<Mvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<FilterStatus>("ALL");

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

  const loadMvps = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const response = await fetch(API_ENDPOINTS.MVPS, {
        method: "GET",
        headers: getAuthHeaders(),
        cache: "no-store",
      });

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          text || `Failed to load MVPs. Status: ${response.status}`
        );
      }

      const data = await response.json();

      /*
       * Backend may return:
       *
       * [
       *   {...},
       *   {...}
       * ]
       *
       * OR
       *
       * {
       *   data: [...]
       * }
       *
       * OR
       *
       * {
       *   content: [...]
       * }
       */

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.content)
        ? data.content
        : Array.isArray(data?.mvps)
        ? data.mvps
        : [];

      setMvps(list);
    } catch (err) {
      console.error("Load MVPs error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load MVPs."
      );

      setMvps([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMvps();
  }, []);

  const stats: Stats = useMemo(() => {
    return {
      total: mvps.length,

      active: mvps.filter(
        (mvp) => mvp.status?.toUpperCase() === "PUBLISHED"
      ).length,

      draft: mvps.filter(
        (mvp) => mvp.status?.toUpperCase() === "DRAFT"
      ).length,

      featured: mvps.filter(
        (mvp) => mvp.featured === true
      ).length,
    };
  }, [mvps]);

  const filteredMvps = useMemo(() => {
    const query = search.toLowerCase().trim();

    return mvps.filter((mvp) => {
      const status =
        mvp.status?.toUpperCase() || "UNKNOWN";

      const matchesSearch =
        !query ||
        mvp.title?.toLowerCase().includes(query) ||
        mvp.mvpCode?.toLowerCase().includes(query) ||
        mvp.code?.toLowerCase().includes(query) ||
        mvp.category?.toLowerCase().includes(query) ||
        mvp.slug?.toLowerCase().includes(query);

      let matchesStatus = true;

      if (statusFilter === "PUBLISHED") {
        matchesStatus = status === "PUBLISHED";
      }

      if (statusFilter === "DRAFT") {
        matchesStatus = status === "DRAFT";
      }

      if (statusFilter === "INACTIVE") {
        matchesStatus =
          status === "INACTIVE" ||
          status === "ARCHIVED" ||
          status === "DISABLED";
      }

      return matchesSearch && matchesStatus;
    });
  }, [mvps, search, statusFilter]);

  const getMvpCode = (mvp: Mvp) => {
    return mvp.mvpCode || mvp.code || `MVP-${mvp.id}`;
  };

  const getStatus = (mvp: Mvp) => {
    return mvp.status?.toUpperCase() || "UNKNOWN";
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PUBLISHED":
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

  const formatDuration = (hours?: number) => {
    if (!hours || hours <= 0) {
      return "Not specified";
    }

    if (hours < 24) {
      return `${hours} hours`;
    }

    const days = Math.round(hours / 24);

    return `${days} ${days === 1 ? "day" : "days"}`;
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return "N/A";
    }

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

  const getPriceRange = (mvp: Mvp) => {
    if (!mvp.plans || mvp.plans.length === 0) {
      return null;
    }

    const activePlans = mvp.plans.filter(
      (plan) => plan.active !== false
    );

    if (activePlans.length === 0) {
      return null;
    }

    const prices = activePlans
      .map((plan) => Number(plan.price || 0))
      .filter((price) => !Number.isNaN(price));

    if (prices.length === 0) {
      return null;
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const freePlan = activePlans.some(
      (plan) =>
        plan.free === true ||
        Number(plan.price || 0) === 0
    );

    if (freePlan && max === 0) {
      return "FREE";
    }

    if (freePlan) {
      return `Free • ₹${max}+`;
    }

    if (min === max) {
      return `₹${min}`;
    }

    return `₹${min} - ₹${max}`;
  };

  const getModuleCount = (mvp: Mvp) => {
    return mvp.modules?.length || 0;
  };

  const getPlanCount = (mvp: Mvp) => {
    return mvp.plans?.length || 0;
  };

  const handleDelete = async (mvp: Mvp) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${mvp.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        API_ENDPOINTS.MVP_BY_ID(mvp.id),
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          text || "Failed to delete MVP."
        );
      }

      setMvps((previous) =>
        previous.filter((item) => item.id !== mvp.id)
      );
    } catch (err) {
      console.error("Delete MVP error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete MVP."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">

            <div className="h-10 w-64 rounded-xl bg-white/10" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-2xl border border-white/10 bg-white/[0.04]"
                />
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-80 rounded-2xl border border-white/10 bg-white/[0.04]"
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
              <Sparkles size={14} />
              MVP Management
            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/20">
                <Layers3 size={26} />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  All MVPs
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Manage and monitor all your database-driven MVPs.
                </p>
              </div>

            </div>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() => loadMvps(false)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/admin/mvps/create"
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02] hover:opacity-95"
            >
              <Plus size={17} />
              Create New MVP
            </button>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">

            <div className="flex items-center gap-3">
              <XCircle size={18} />
              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-300 transition hover:text-white"
            >
              <X size={17} />
            </button>

          </div>
        )}

        {/* STATS */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<Layers3 size={20} />}
            label="Total MVPs"
            value={stats.total}
            description="All created MVPs"
          />

          <StatCard
            icon={<Activity size={20} />}
            label="Active"
            value={stats.active}
            description="Currently available"
            positive
          />

          <StatCard
            icon={<BookOpen size={20} />}
            label="Drafts"
            value={stats.draft}
            description="Still in development"
          />

          <StatCard
            icon={<Zap size={20} />}
            label="Featured"
            value={stats.featured}
            description="Featured MVPs"
          />

        </div>

        {/* SEARCH + FILTER */}

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-xl">

              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search MVP by title, code, category..."
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}

            </div>

            <div className="flex flex-wrap items-center gap-2">

              <div className="mr-1 flex items-center gap-2 text-xs text-slate-500">
                <Filter size={15} />
                Status
              </div>

              {(
                [
                  "ALL",
                  "PUBLISHED",
                  "DRAFT",
                  "INACTIVE",
                ] as FilterStatus[]
              ).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setStatusFilter(status)
                  }
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    statusFilter === status
                      ? "bg-indigo-500 text-white"
                      : "border border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {status === "ALL"
                    ? "All"
                    : status.charAt(0) +
                      status.slice(1).toLowerCase()}
                </button>
              ))}

            </div>

          </div>

        </div>

        {/* RESULT COUNT */}

        <div className="mb-4 flex items-center justify-between">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-300">
              {filteredMvps.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-300">
              {mvps.length}
            </span>{" "}
            MVPs
          </p>

        </div>

        {/* EMPTY */}

        {filteredMvps.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <Layers3 size={28} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">
              {mvps.length === 0
                ? "No MVPs created yet"
                : "No MVPs found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {mvps.length === 0
                ? "Create your first MVP and it will appear here automatically."
                : "Try changing your search or status filter."}
            </p>

            {mvps.length === 0 ? (
              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/dashboard/admin/mvps/create"
                  )
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white"
              >
                <Plus size={17} />
                Create First MVP
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("ALL");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          /* MVP GRID */

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredMvps.map((mvp) => {

              const status = getStatus(mvp);
              const priceRange = getPriceRange(mvp);

              return (
                <div
                  key={mvp.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-indigo-500/5"
                >

                  {/* TOP GLOW */}

                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition group-hover:bg-indigo-500/20" />

                  <div className="relative p-5">

                    {/* CARD HEADER */}

                    <div className="mb-5 flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-300 ring-1 ring-indigo-500/20">
                          <Code2 size={20} />
                        </div>

                        <div className="min-w-0">

                          <div className="mb-1 flex items-center gap-2">

                            <span className="truncate font-mono text-xs font-semibold text-indigo-300">
                              {getMvpCode(mvp)}
                            </span>

                            {mvp.featured && (
                              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                                FEATURED
                              </span>
                            )}

                          </div>

                          <h2 className="truncate text-base font-semibold text-white">
                            {mvp.title}
                          </h2>

                        </div>

                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusStyle(
                          status
                        )}`}
                      >
                        {status}
                      </span>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="mb-5 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-400">
                      {mvp.shortDescription ||
                        mvp.description ||
                        "No description available for this MVP."}
                    </p>

                    {/* TAGS */}

                    <div className="mb-5 flex flex-wrap gap-2">

                      {mvp.category && (
                        <span className="rounded-lg border border-white/10 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300">
                          {mvp.category}
                        </span>
                      )}

                      {mvp.difficulty && (
                        <span className="rounded-lg border border-white/10 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300">
                          {mvp.difficulty}
                        </span>
                      )}

                    </div>

                    {/* INFO GRID */}

                    <div className="grid grid-cols-2 gap-2">

                      <InfoBox
                        icon={<Clock3 size={14} />}
                        label="Duration"
                        value={formatDuration(
                          mvp.estimatedHours
                        )}
                      />

                      <InfoBox
                        icon={<Users size={14} />}
                        label="Team"
                        value={
                          mvp.minTeamSize &&
                          mvp.maxTeamSize
                            ? `${mvp.minTeamSize}-${mvp.maxTeamSize}`
                            : "N/A"
                        }
                      />

                      <InfoBox
                        icon={<Layers3 size={14} />}
                        label="Modules"
                        value={String(
                          getModuleCount(mvp)
                        )}
                      />

                      <InfoBox
                        icon={<BookOpen size={14} />}
                        label="Plans"
                        value={String(
                          getPlanCount(mvp)
                        )}
                      />

                    </div>

                    {/* BOTTOM META */}

                    <div className="my-5 border-t border-white/10" />

                    <div className="flex items-center justify-between gap-3">

                      <div>

                        {priceRange ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-emerald-300">
                              {priceRange}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">
                            No pricing data
                          </span>
                        )}

                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600">
                          <CalendarDays size={12} />
                          {formatDate(mvp.createdAt)}
                        </div>

                      </div>

                      {mvp.rewardXp !== undefined && (
                        <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/10 bg-amber-500/5 px-2.5 py-1.5 text-xs text-amber-300">
                          <Zap size={13} />
                          {mvp.rewardXp} XP
                        </div>
                      )}

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/mvps/${mvp.id}`
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-2.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20 hover:text-white"
                      >
                        <Eye size={15} />
                        View
                        <ChevronRight size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/mvps/${mvp.id}/edit`
                          )
                        }
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(mvp)
                        }
                        className="rounded-xl border border-red-500/10 bg-red-500/5 px-3 py-2.5 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                        title="Delete MVP"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */

function StatCard({
  icon,
  label,
  value,
  description,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-white/15 hover:bg-white/[0.06]">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-500/10 text-emerald-300"
              : "bg-indigo-500/10 text-indigo-300"
          }`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-3 text-xs text-slate-600">
        {description}
      </p>

    </div>
  );
}

/* ============================================================
   INFO BOX
   ============================================================ */

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-950/50 p-3">

      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-600">
        {icon}
        {label}
      </div>

      <p className="mt-1 text-xs font-medium text-slate-300">
        {value}
      </p>

    </div>
  );
}