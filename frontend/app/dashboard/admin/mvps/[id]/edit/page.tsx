"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Loader2,
  Save,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { API_ENDPOINTS } from "@/lib/api";

interface MvpDomain {
  id: number;
  code: string;
  name: string;
}

interface Mvp {
  id: number;
  mvpCode: string;
  title: string;
  slug: string;

  shortDescription?: string;
  description?: string;

  domain?: MvpDomain;

  category?: string;
  difficulty?: string;

  prerequisites?: string;
  learningOutcomes?: string;
  deliverables?: string;

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
  status?: string;
}

interface FormState {
  mvpCode: string;
  title: string;
  slug: string;

  shortDescription: string;
  description: string;

  domainId: string;

  category: string;
  difficulty: string;

  prerequisites: string;
  learningOutcomes: string;
  deliverables: string;

  estimatedHours: string;

  minTeamSize: string;
  maxTeamSize: string;

  teamAllowed: boolean;

  rewardXp: string;

  certificateEnabled: boolean;
  portfolioEnabled: boolean;
  mentorEnabled: boolean;
  aiMentorEnabled: boolean;

  featured: boolean;

  status: string;
}

const initialForm: FormState = {
  mvpCode: "",
  title: "",
  slug: "",

  shortDescription: "",
  description: "",

  domainId: "",

  category: "",
  difficulty: "",

  prerequisites: "",
  learningOutcomes: "",
  deliverables: "",

  estimatedHours: "0",

  minTeamSize: "1",
  maxTeamSize: "1",

  teamAllowed: false,

  rewardXp: "0",

  certificateEnabled: false,
  portfolioEnabled: false,
  mentorEnabled: false,
  aiMentorEnabled: false,

  featured: false,

  status: "DRAFT",
};

export default function EditMvpPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [domains, setDomains] =
    useState<MvpDomain[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (!id) return;

    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      /*
       * Load MVP
       */
      const mvpResponse =
        await fetch(
          API_ENDPOINTS.MVP_BY_ID(id),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

      if (!mvpResponse.ok) {
        const text =
          await mvpResponse.text();

        throw new Error(
          text ||
            `Failed to load MVP. Status: ${mvpResponse.status}`
        );
      }

      const mvp: Mvp =
        await mvpResponse.json();

      /*
       * Load domains
       */
      let domainList: MvpDomain[] = [];

      try {
        const domainResponse =
          await fetch(
            API_ENDPOINTS.MVP_DOMAINS,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

        if (domainResponse.ok) {
          const data =
            await domainResponse.json();

          if (Array.isArray(data)) {
            domainList = data;
          }
        }
      } catch (domainError) {
        console.error(
          "Failed to load domains:",
          domainError
        );
      }

      setDomains(domainList);

      setForm({
        mvpCode: mvp.mvpCode || "",
        title: mvp.title || "",
        slug: mvp.slug || "",

        shortDescription:
          mvp.shortDescription || "",

        description:
          mvp.description || "",

        domainId:
          mvp.domain?.id
            ? String(mvp.domain.id)
            : "",

        category:
          mvp.category || "",

        difficulty:
          mvp.difficulty || "",

        prerequisites:
          mvp.prerequisites || "",

        learningOutcomes:
          mvp.learningOutcomes || "",

        deliverables:
          mvp.deliverables || "",

        estimatedHours:
          String(mvp.estimatedHours ?? 0),

        minTeamSize:
          String(mvp.minTeamSize ?? 1),

        maxTeamSize:
          String(mvp.maxTeamSize ?? 1),

        teamAllowed:
          Boolean(mvp.teamAllowed),

        rewardXp:
          String(mvp.rewardXp ?? 0),

        certificateEnabled:
          Boolean(mvp.certificateEnabled),

        portfolioEnabled:
          Boolean(mvp.portfolioEnabled),

        mentorEnabled:
          Boolean(mvp.mentorEnabled),

        aiMentorEnabled:
          Boolean(mvp.aiMentorEnabled),

        featured:
          Boolean(mvp.featured),

        status:
          mvp.status || "DRAFT",
      });
    } catch (err) {
      console.error(
        "Failed to load edit data:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load MVP"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = <
    K extends keyof FormState
  >(
    field: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      if (!form.title.trim()) {
        throw new Error(
          "MVP title is required."
        );
      }

      if (!form.mvpCode.trim()) {
        throw new Error(
          "MVP code is required."
        );
      }

      if (!form.domainId) {
        throw new Error(
          "Please select a domain."
        );
      }

      const payload = {
        mvpCode: form.mvpCode.trim(),

        title: form.title.trim(),

        slug: form.slug.trim(),

        shortDescription:
          form.shortDescription.trim(),

        description:
          form.description.trim(),

        domainId:
          Number(form.domainId),

        category:
          form.category.trim(),

        difficulty:
          form.difficulty,

        prerequisites:
          form.prerequisites.trim(),

        learningOutcomes:
          form.learningOutcomes.trim(),

        deliverables:
          form.deliverables.trim(),

        estimatedHours:
          Number(form.estimatedHours) || 0,

        minTeamSize:
          Number(form.minTeamSize) || 1,

        maxTeamSize:
          Number(form.maxTeamSize) || 1,

        teamAllowed:
          form.teamAllowed,

        rewardXp:
          Number(form.rewardXp) || 0,

        certificateEnabled:
          form.certificateEnabled,

        portfolioEnabled:
          form.portfolioEnabled,

        mentorEnabled:
          form.mentorEnabled,

        aiMentorEnabled:
          form.aiMentorEnabled,

        featured:
          form.featured,

        status:
          form.status,
      };

      console.log(
        "Updating MVP:",
        payload
      );

      const response =
        await fetch(
          API_ENDPOINTS.MVP_BY_ID(id),
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

      const text =
        await response.text();

      if (!response.ok) {
        console.error(
          "Update MVP error:",
          text
        );

        throw new Error(
          text ||
            `Failed to update MVP. Status: ${response.status}`
        );
      }

      setSuccess(
        "MVP updated successfully."
      );

      setTimeout(() => {
        router.push(
          `/dashboard/admin/mvps/${id}`
        );

        router.refresh();
      }, 800);
    } catch (err) {
      console.error(
        "Failed to update MVP:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update MVP"
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 transition";

  const labelClass =
    "block text-sm font-medium text-slate-300 mb-2";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">

        <div className="flex items-center gap-3 text-slate-300">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading MVP...
        </div>

      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div className="min-h-screen bg-[#020617] text-white p-8">

        <div className="max-w-3xl mx-auto">

          <button
            onClick={() =>
              router.push(
                "/dashboard/admin/mvps"
              )
            }
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MVPs
          </button>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">

            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />

            <h1 className="text-xl font-semibold mb-2">
              Unable to load MVP
            </h1>

            <p className="text-red-300">
              {error}
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/admin/mvps/${id}`
              )
            }
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MVP
          </button>

          <h1 className="text-2xl font-bold">
            Edit MVP
          </h1>

        </div>

        {/* ALERTS */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFORMATION */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>
                  MVP Code *
                </label>

                <input
                  value={form.mvpCode}
                  onChange={(e) =>
                    updateField(
                      "mvpCode",
                      e.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="MVP_001"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Title *
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    updateField(
                      "title",
                      e.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="Build a Full Stack Application"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Slug
                </label>

                <input
                  value={form.slug}
                  onChange={(e) =>
                    updateField(
                      "slug",
                      e.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="build-full-stack-application"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Domain *
                </label>

                <select
                  value={form.domainId}
                  onChange={(e) =>
                    updateField(
                      "domainId",
                      e.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select domain
                  </option>

                  {domains.map((domain) => (
                    <option
                      key={domain.id}
                      value={domain.id}
                    >
                      {domain.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Category
                </label>

                <input
                  value={form.category}
                  onChange={(e) =>
                    updateField(
                      "category",
                      e.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="Software Development"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Difficulty
                </label>

                <select
                  value={form.difficulty}
                  onChange={(e) =>
                    updateField(
                      "difficulty",
                      e.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select difficulty
                  </option>

                  <option value="BEGINNER">
                    Beginner
                  </option>

                  <option value="INTERMEDIATE">
                    Intermediate
                  </option>

                  <option value="ADVANCED">
                    Advanced
                  </option>

                  <option value="EXPERT">
                    Expert
                  </option>
                </select>
              </div>

            </div>

          </section>

          {/* DESCRIPTION */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold mb-6">
              Description
            </h2>

            <div className="space-y-5">

              <div>
                <label className={labelClass}>
                  Short Description
                </label>

                <textarea
                  value={form.shortDescription}
                  onChange={(e) =>
                    updateField(
                      "shortDescription",
                      e.target.value
                    )
                  }
                  rows={3}
                  className={inputClass}
                  placeholder="Short description of the MVP"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Full Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                  rows={7}
                  className={inputClass}
                  placeholder="Detailed description..."
                />
              </div>

            </div>

          </section>

          {/* LEARNING */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold mb-6">
              Learning & Deliverables
            </h2>

            <div className="space-y-5">

              <div>
                <label className={labelClass}>
                  Prerequisites
                </label>

                <textarea
                  value={form.prerequisites}
                  onChange={(e) =>
                    updateField(
                      "prerequisites",
                      e.target.value
                    )
                  }
                  rows={4}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Learning Outcomes
                </label>

                <textarea
                  value={form.learningOutcomes}
                  onChange={(e) =>
                    updateField(
                      "learningOutcomes",
                      e.target.value
                    )
                  }
                  rows={5}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Deliverables
                </label>

                <textarea
                  value={form.deliverables}
                  onChange={(e) =>
                    updateField(
                      "deliverables",
                      e.target.value
                    )
                  }
                  rows={5}
                  className={inputClass}
                />
              </div>

            </div>

          </section>

          {/* CONFIGURATION */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h2 className="text-xl font-semibold mb-6">
              Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div>
                <label className={labelClass}>
                  Estimated Hours
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.estimatedHours}
                  onChange={(e) =>
                    updateField(
                      "estimatedHours",
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Minimum Team Size
                </label>

                <input
                  type="number"
                  min="1"
                  value={form.minTeamSize}
                  onChange={(e) =>
                    updateField(
                      "minTeamSize",
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Maximum Team Size
                </label>

                <input
                  type="number"
                  min="1"
                  value={form.maxTeamSize}
                  onChange={(e) =>
                    updateField(
                      "maxTeamSize",
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Reward XP
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.rewardXp}
                  onChange={(e) =>
                    updateField(
                      "rewardXp",
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value
                    )
                  }
                  className={inputClass}
                >
                  <option value="DRAFT">
                    DRAFT
                  </option>

                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="PUBLISHED">
                    PUBLISHED
                  </option>

                  <option value="ARCHIVED">
                    ARCHIVED
                  </option>
                </select>
              </div>

            </div>

            {/* CHECKBOXES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

              <Toggle
                label="Team Allowed"
                checked={form.teamAllowed}
                onChange={(value) =>
                  updateField(
                    "teamAllowed",
                    value
                  )
                }
              />

              <Toggle
                label="Certificate Enabled"
                checked={form.certificateEnabled}
                onChange={(value) =>
                  updateField(
                    "certificateEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="Portfolio Enabled"
                checked={form.portfolioEnabled}
                onChange={(value) =>
                  updateField(
                    "portfolioEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="Mentor Enabled"
                checked={form.mentorEnabled}
                onChange={(value) =>
                  updateField(
                    "mentorEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="AI Mentor Enabled"
                checked={form.aiMentorEnabled}
                onChange={(value) =>
                  updateField(
                    "aiMentorEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="Featured MVP"
                checked={form.featured}
                onChange={(value) =>
                  updateField(
                    "featured",
                    value
                  )
                }
              />

            </div>

          </section>

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-4 pb-10">

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/dashboard/admin/mvps/${id}`
                )
              }
              disabled={saving}
              className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!checked)
      }
      className={`flex items-center justify-between rounded-xl border px-4 py-4 transition ${
        checked
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <span className="text-slate-300">
        {label}
      </span>

      {checked ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      ) : (
        <XCircle className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}