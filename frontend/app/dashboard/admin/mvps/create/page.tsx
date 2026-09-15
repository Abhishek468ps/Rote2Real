"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Loader2,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { API_ENDPOINTS } from "@/lib/api";


type Domain = {
  id: number;
  code: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  active?: boolean;
};

type Skill = {
  id: number;
  code: string;
  name: string;
  description?: string;
  category?: string;
  active?: boolean;
};

type Technology = {
  id: number;
  code: string;
  name: string;
  description?: string;
  category?: string;
  active?: boolean;
};

type Plan = {
 id? : number;
  name: string;
  code: string;
  durationHours: number;
  price: number;
  currency: string;
  free: boolean;
  description: string;
  maxTeamSize: number;
  certificateEnabled: boolean;
  portfolioEnabled: boolean;
  mentorEnabled: boolean;
  aiMentorEnabled: boolean;
  active:boolean;
  displayOrder: number;
};

type MvpTask = {
  id?: number;
  title: string;
  description: string;
  taskType: string;
  priority: string;
  difficulty: string;
  estimatedMinutes: number;
  sequenceNumber: number;
  mandatory: boolean;
  submissionRequired: boolean;
  githubRequired: boolean;
  deadlineOffsetHours: number;
  xpReward: number;
  status: string;
};

type MvpModule = {
  id?: number;
  title: string;
  description: string;
  moduleNumber: number;
  estimatedHours: number;
  difficulty: string;
  learningObjectives: string;
  deliverables: string;
  status: string;
  tasks: MvpTask[];
};

type MvpForm = {
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

  estimatedHours: number;

  minTeamSize: number;
  maxTeamSize: number;
  teamAllowed: boolean;

  rewardXp: number;

  certificateEnabled: boolean;
  portfolioEnabled: boolean;
  mentorEnabled: boolean;
  aiMentorEnabled: boolean;

  featured: boolean;
  status: string;
};

const DEFAULT_PLANS: Plan[] = [
  {
    name: "48 Hours",
    code: "MVP_48H",
    durationHours: 48,
    price: 0,
    currency: "INR",
    free: true,
    description: "Complete the MVP within 48 hours.",
    maxTeamSize: 4,
    certificateEnabled: true,
    portfolioEnabled: true,
    mentorEnabled: false,
    aiMentorEnabled: true,
    active: true,
    displayOrder: 1,
  },
  {
    name: "7 Days",
    code: "MVP_7D",
    durationHours: 168,
    price: 199,
    currency: "INR",
    free: false,
    description: "Complete the MVP within 7 days.",
    maxTeamSize: 4,
    certificateEnabled: true,
    portfolioEnabled: true,
    mentorEnabled: true,
    aiMentorEnabled: true,
    active: true,
    displayOrder: 2,
  },
  {
    name: "14 Days",
    code: "MVP_14D",
    durationHours: 336,
    price: 399,
    currency: "INR",
    free: false,
    description: "Complete the MVP within 14 days.",
    maxTeamSize: 4,
    certificateEnabled: true,
    portfolioEnabled: true,
    mentorEnabled: true,
    aiMentorEnabled: true,
     active: true,
    displayOrder: 3,
  },
  {
    name: "21 Days",
    code: "MVP_21D",
    durationHours: 504,
    price: 599,
    currency: "INR",
    free: false,
    description: "Complete the MVP within 21 days.",
    maxTeamSize: 4,
    certificateEnabled: true,
    portfolioEnabled: true,
    mentorEnabled: true,
    aiMentorEnabled: true,
    active: true,
    displayOrder: 4,
  },
  {
    name: "30 Days",
    code: "MVP_30D",
    durationHours: 720,
    price: 799,
    currency: "INR",
    free: false,
    description: "Complete the MVP within 30 days.",
    maxTeamSize: 4,
    certificateEnabled: true,
    portfolioEnabled: true,
    mentorEnabled: true,
    aiMentorEnabled: true,
    active: true,
    displayOrder: 5,
  },
  {
    name: "60 Days",
    code: "MVP_60D",
    durationHours: 1440,
    price: 1499,
    currency: "INR",
    free: false,
    description: "Complete the MVP within 60 days.",
    maxTeamSize: 4,
    certificateEnabled: true,
    portfolioEnabled: true,
    mentorEnabled: true,
    aiMentorEnabled: true,
    active: true,
    displayOrder: 6,
  },
];

const INITIAL_FORM: MvpForm = {
  mvpCode: "",
  title: "",
  slug: "",
  shortDescription: "",
  description: "",

  domainId: "",
  category: "",
  difficulty: "INTERMEDIATE",

  prerequisites: "",
  learningOutcomes: "",
  deliverables: "",

  estimatedHours: 40,

  minTeamSize: 1,
  maxTeamSize: 4,
  teamAllowed: true,

  rewardXp: 500,

  certificateEnabled: true,
  portfolioEnabled: true,
  mentorEnabled: true,
  aiMentorEnabled: true,

  featured: false,
  status: "DRAFT",
};

export default function CreateMvpPage() {
  const router = useRouter();

  const [form, setForm] = useState<MvpForm>(INITIAL_FORM);

  const [domains, setDomains] = useState<Domain[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>(
    []
  );

  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
    const [modules, setModules] = useState<MvpModule[]>([]);

  const [skillSearch, setSkillSearch] = useState("");
  const [technologySearch, setTechnologySearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [openSkillDropdown, setOpenSkillDropdown] = useState(false);
  const [openTechnologyDropdown, setOpenTechnologyDropdown] = useState(false);



  /*
   * ============================================================
   * AUTH HEADER
   * ============================================================
   */

  const getAuthHeaders = () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") ||
          localStorage.getItem("accessToken")
        : null;

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  /*
   * ============================================================
   * LOAD DOMAINS / SKILLS / TECHNOLOGIES
   * ============================================================
   */

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError("");

      const headers = getAuthHeaders();

      const [domainResponse, skillResponse, technologyResponse] =
        await Promise.all([
          fetch(API_ENDPOINTS.MVP_DOMAINS, {
            headers,
          }),
          fetch(API_ENDPOINTS.MVP_SKILLS, {
            headers,
          }),
          fetch(API_ENDPOINTS.MVP_TECHNOLOGIES, {
            headers,
          }),
        ]);

      if (!domainResponse.ok) {
        throw new Error("Failed to load domains");
      }

      if (!skillResponse.ok) {
        throw new Error("Failed to load skills");
      }

      if (!technologyResponse.ok) {
        throw new Error("Failed to load technologies");
      }

      const domainData = await domainResponse.json();
      const skillData = await skillResponse.json();
      const technologyData = await technologyResponse.json();

      setDomains(Array.isArray(domainData) ? domainData : []);
      setSkills(Array.isArray(skillData) ? skillData : []);
      setTechnologies(
        Array.isArray(technologyData) ? technologyData : []
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load MVP configuration data."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * SLUG GENERATOR
   * ============================================================
   */

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  /*
   * ============================================================
   * FORM UPDATE
   * ============================================================
   */

  const updateField = <K extends keyof MvpForm>(
    field: K,
    value: MvpForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleTitleChange = (value: string) => {
    setForm((previous) => ({
      ...previous,
      title: value,
      slug: generateSlug(value),
    }));
  };

  /*
   * ============================================================
   * SKILLS
   * ============================================================
   */

  const toggleSkill = (skillId: number) => {
    setSelectedSkills((previous) =>
      previous.includes(skillId)
        ? previous.filter((id) => id !== skillId)
        : [...previous, skillId]
    );
  };

  const removeSkill = (skillId: number) => {
    setSelectedSkills((previous) =>
      previous.filter((id) => id !== skillId)
    );
  };

  const filteredSkills = useMemo(() => {
    const search = skillSearch.toLowerCase().trim();

    if (!search) {
      return skills;
    }

    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(search) ||
        skill.code.toLowerCase().includes(search) ||
        skill.category?.toLowerCase().includes(search)
    );
  }, [skills, skillSearch]);

  const selectedSkillObjects = skills.filter((skill) =>
    selectedSkills.includes(skill.id)
  );

  /*
   * ============================================================
   * TECHNOLOGIES
   * ============================================================
   */

  const toggleTechnology = (technologyId: number) => {
    setSelectedTechnologies((previous) =>
      previous.includes(technologyId)
        ? previous.filter((id) => id !== technologyId)
        : [...previous, technologyId]
    );
  };

  const removeTechnology = (technologyId: number) => {
    setSelectedTechnologies((previous) =>
      previous.filter((id) => id !== technologyId)
    );
  };

  const filteredTechnologies = useMemo(() => {
    const search = technologySearch.toLowerCase().trim();

    if (!search) {
      return technologies;
    }

    return technologies.filter(
      (technology) =>
        technology.name.toLowerCase().includes(search) ||
        technology.code.toLowerCase().includes(search) ||
        technology.category?.toLowerCase().includes(search)
    );
  }, [technologies, technologySearch]);

  const selectedTechnologyObjects = technologies.filter((technology) =>
    selectedTechnologies.includes(technology.id)
  );

  /*
   * ============================================================
   * PLAN MANAGEMENT
   * ============================================================
   */

  const updatePlan = <K extends keyof Plan>(
    index: number,
    field: K,
    value: Plan[K]
  ) => {
    setPlans((previous) =>
      previous.map((plan, planIndex) =>
        planIndex === index
          ? {
              ...plan,
              [field]: value,
            }
          : plan
      )
    );
  };

  const removePlan = (index: number) => {
    setPlans((previous) =>
      previous.filter((_, planIndex) => planIndex !== index)
    );
  };

  const addCustomPlan = () => {
    setPlans((previous) => [
      ...previous,
      {
        name: "Custom Plan",
        code: `CUSTOM_${Date.now()}`,
        durationHours: 168,
        price: 199,
        currency: "INR",
        free: false,
        description: "Custom MVP execution plan.",
        maxTeamSize: 4,
        certificateEnabled: true,
        portfolioEnabled: true,
        mentorEnabled: true,
        aiMentorEnabled: true,
         active: true,
      displayOrder: previous.length + 1, 
      },
    ]);
  };

  // ============================================================
// MODULE MANAGEMENT
// ============================================================

const addModule = () => {
  setModules((previous) => [
    ...previous,
    {
      title: "",
      description: "",
      moduleNumber: previous.length + 1,
      estimatedHours: 8,
      difficulty: "INTERMEDIATE",
      learningObjectives: "",
      deliverables: "",
      status: "ACTIVE",
      tasks: [],
    },
  ]);
};

const updateModule = <K extends keyof MvpModule>(
  index: number,
  field: K,
  value: MvpModule[K]
) => {
  setModules((previous) =>
    previous.map((module, moduleIndex) =>
      moduleIndex === index
        ? {
            ...module,
            [field]: value,
          }
        : module
    )
  );
};

const removeModule = (index: number) => {
  setModules((previous) =>
    previous
      .filter((_, moduleIndex) => moduleIndex !== index)
      .map((module, moduleIndex) => ({
        ...module,
        moduleNumber: moduleIndex + 1,
      }))
  );
};

const addTask = (moduleIndex: number) => {
  setModules((previous) =>
    previous.map((module, index) => {
      if (index !== moduleIndex) {
        return module;
      }

      return {
        ...module,
        tasks: [
          ...module.tasks,
          {
            title: "",
            description: "",
            taskType: "PRACTICAL",
            priority: "MEDIUM",
            difficulty: "INTERMEDIATE",
            estimatedMinutes: 60,
            sequenceNumber: module.tasks.length + 1,
            mandatory: true,
            submissionRequired: false,
            githubRequired: false,
            deadlineOffsetHours: 24,
            xpReward: 50,
            status: "ACTIVE",
          },
        ],
      };
    })
  );
};

const updateTask = <K extends keyof MvpTask>(
  moduleIndex: number,
  taskIndex: number,
  field: K,
  value: MvpTask[K]
) => {
  setModules((previous) =>
    previous.map((module, index) => {
      if (index !== moduleIndex) {
        return module;
      }

      return {
        ...module,
        tasks: module.tasks.map((task, index2) =>
          index2 === taskIndex
            ? {
                ...task,
                [field]: value,
              }
            : task
        ),
      };
    })
  );
};

const removeTask = (
  moduleIndex: number,
  taskIndex: number
) => {
  setModules((previous) =>
    previous.map((module, index) => {
      if (index !== moduleIndex) {
        return module;
      }

      return {
        ...module,
        tasks: module.tasks
          .filter((_, index2) => index2 !== taskIndex)
          .map((task, index2) => ({
            ...task,
            sequenceNumber: index2 + 1,
          })),
      };
    })
  );
};

  /*
   * ============================================================
   * VALIDATION
   * ============================================================
   */

  const validateForm = () => {
    if (!form.mvpCode.trim()) {
      return "MVP code is required.";
    }

    if (!form.title.trim()) {
      return "MVP title is required.";
    }

    if (!form.domainId) {
      return "Please select an MVP domain.";
    }

    if (!form.category.trim()) {
      return "Category is required.";
    }

    if (selectedSkills.length === 0) {
      return "Please select at least one skill.";
    }

    if (selectedTechnologies.length === 0) {
      return "Please select at least one technology.";
    }

    if (plans.length === 0) {
      return "Please add at least one MVP plan.";
    }

    if (modules.length === 0) {
  return "Please add at least one MVP module.";
}

for (const [moduleIndex, module] of modules.entries()) {
  if (!module.title.trim()) {
    return `Module ${moduleIndex + 1} title is required.`;
  }

  if (module.tasks.length === 0) {
    return `Please add at least one task to Module ${
      moduleIndex + 1
    }.`;
  }

  for (const [taskIndex, task] of module.tasks.entries()) {
    if (!task.title.trim()) {
      return `Task ${taskIndex + 1} in Module ${
        moduleIndex + 1
      } requires a title.`;
    }
  }
}

    if (form.minTeamSize < 1) {
      return "Minimum team size must be at least 1.";
    }

    if (form.maxTeamSize < form.minTeamSize) {
      return "Maximum team size cannot be smaller than minimum team size.";
    }

    return null;
  };

  /*
   * ============================================================
   * CREATE MVP
   * ============================================================
   */

  const createMvp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    try {
      setSaving(true);

      const headers = getAuthHeaders();

      /*
       * --------------------------------------------------------
       * STEP 1
       * CREATE MVP
       * --------------------------------------------------------
       */

      const mvpPayload = {
        mvpCode: form.mvpCode.trim(),
        title: form.title.trim(),
        slug: form.slug.trim(),

        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),

        domainId: Number(form.domainId),

        category: form.category.trim(),
        difficulty: form.difficulty,

        prerequisites: form.prerequisites.trim(),
        learningOutcomes: form.learningOutcomes.trim(),
        deliverables: form.deliverables.trim(),

        estimatedHours: Number(form.estimatedHours),

        minTeamSize: Number(form.minTeamSize),
        maxTeamSize: Number(form.maxTeamSize),
        teamAllowed: form.teamAllowed,

        rewardXp: Number(form.rewardXp),

        certificateEnabled: form.certificateEnabled,
        portfolioEnabled: form.portfolioEnabled,
        mentorEnabled: form.mentorEnabled,
        aiMentorEnabled: form.aiMentorEnabled,

        featured: form.featured,

        status: form.status,
      };

      const mvpResponse = await fetch(API_ENDPOINTS.MVPS, {
        method: "POST",
        headers,
        body: JSON.stringify(mvpPayload),
      });

      if (!mvpResponse.ok) {
        const responseText = await mvpResponse.text();

        throw new Error(
          responseText || "Failed to create MVP."
        );
      }

      const createdMvp = await mvpResponse.json();

      /*
       * Backend response can be:
       *
       * {
       *   id: 1,
       *   ...
       * }
       *
       * OR
       *
       * {
       *   data: {
       *      id: 1
       *   }
       * }
       */

      const mvpId =
        createdMvp?.id ??
        createdMvp?.data?.id ??
        createdMvp?.mvp?.id;

      if (!mvpId) {
        throw new Error(
          "MVP was created but backend did not return MVP ID."
        );
      }

      /*
       * --------------------------------------------------------
       * STEP 2
       * MAP SKILLS
       * --------------------------------------------------------
       */

      for (const skillId of selectedSkills) {
        const response = await fetch(
          API_ENDPOINTS.MVP_SKILLS_BY_ID(mvpId , skillId),
          {
            method: "POST",
            headers: getAuthHeaders(),
            
          }
        );

        if (!response.ok) {
          const text = await response.text();

          throw new Error(
            text ||
              `Failed to map skill ID ${skillId}.`
          );
        }
      }

      /*
       * --------------------------------------------------------
       * STEP 3
       * MAP TECHNOLOGIES
       * --------------------------------------------------------
       */

      for (const technologyId of selectedTechnologies) {
        const response = await fetch(
           API_ENDPOINTS.MVP_TECHNOLOGIES_BY_ID(mvpId , technologyId),
          {
            method: "POST",
            headers: getAuthHeaders(),
          }
        );

        if (!response.ok) {
          const text = await response.text();

          throw new Error(
            text ||
              `Failed to map technology ID ${technologyId}.`
          );
        }
      }

      /*
       * --------------------------------------------------------
       * STEP 4
       * CREATE PLANS
       * --------------------------------------------------------
       */

      for (const plan of plans) {
        const response = await fetch(
          API_ENDPOINTS.MVP_PLANS_BY_ID(mvpId),
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              name: plan.name,
              code: plan.code,
              durationHours: Number(plan.durationHours),
              price: Number(plan.price),
              currency: plan.currency,
              free: plan.free,
              description: plan.description,

              maxTeamSize: Number(plan.maxTeamSize),

              certificateEnabled:
                plan.certificateEnabled,

              portfolioEnabled:
                plan.portfolioEnabled,

              mentorEnabled:
                plan.mentorEnabled,

              aiMentorEnabled:
                plan.aiMentorEnabled,

                active: plan.active,
        displayOrder: plan.displayOrder,
            }),
          }
        );

        if (!response.ok) {
          const text = await response.text();

          throw new Error(
            text ||
              `Failed to create plan ${plan.name}.`
          );
        }
      }

      // --------------------------------------------------------
// STEP 5
// CREATE MODULES AND TASKS
// --------------------------------------------------------

for (const mvpModule of modules) {
  const moduleResponse = await fetch(
    API_ENDPOINTS.MVP_MODULES(mvpId),
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: mvpModule.title.trim(),
        description: mvpModule.description.trim(),
        moduleNumber: Number(mvpModule.moduleNumber),
        estimatedHours: Number(mvpModule.estimatedHours),
        difficulty: mvpModule.difficulty,
        learningObjectives:
          mvpModule.learningObjectives.trim(),
        deliverables:
          mvpModule.deliverables.trim(),
        status: mvpModule.status,
      }),
    }
  );
if (!moduleResponse.ok) {
    const text = await moduleResponse.text();

    throw new Error(
      text ||
        `Failed to create module ${mvpModule.moduleNumber}.`
    );
  }

  const createdModule = await moduleResponse.json();

  const moduleId =
    createdModule?.id ??
    createdModule?.data?.id ??
    createdModule?.module?.id;

   if (!moduleId) {
    throw new Error(
      `Module ${mvpModule.moduleNumber} was created but backend did not return module ID.`
    );
  }

  // CREATE TASKS
  for (const task of mvpModule.tasks) {
    const taskResponse = await fetch(
      API_ENDPOINTS.MVP_TASKS(moduleId),
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: task.title.trim(),
          description: task.description.trim(),
          taskType: task.taskType,
          priority: task.priority,
          difficulty: task.difficulty,
          estimatedMinutes: Number(
            task.estimatedMinutes
          ),
          sequenceNumber: Number(
            task.sequenceNumber
          ),
          mandatory: task.mandatory,
          submissionRequired:
            task.submissionRequired,
          githubRequired:
            task.githubRequired,
          deadlineOffsetHours: Number(
            task.deadlineOffsetHours
          ),
          xpReward: Number(task.xpReward),
          status: task.status,
        }),
      }
    );

    if (!taskResponse.ok) {
      const text = await taskResponse.text();

      throw new Error(
        text ||
          `Failed to create task "${task.title}".`
      );
    }
  }
}

      /*
       * --------------------------------------------------------
       * SUCCESS
       * --------------------------------------------------------
       */

      setSuccess(
        `MVP "${form.title}" created successfully.`
      );

      setTimeout(() => {
        router.push("/dashboard/admin/mvps");
      }, 1200);
    } catch (err) {
      console.error("Create MVP error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating MVP."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSaving(false);
    }
  };

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-300">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading MVP configuration...
          </div>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <button
              type="button"
              onClick={() =>
                router.push("/dashboard/admin/mvps")
              }
              className="mb-4 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to MVP Management
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
                <Sparkles size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Create MVP
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Create a complete database-driven MVP.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================== */}
        {/* ALERTS */}
        {/* ================================================== */}

        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 text-red-300 hover:text-white"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <Check size={18} />
            {success}
          </div>
        )}

        <form onSubmit={createMvp}>

          {/* ================================================== */}
          {/* BASIC INFORMATION */}
          {/* ================================================== */}

          <section className=" relative z-50 mb-6 overflow-visible rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">

            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Define the core identity of your MVP.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* MVP CODE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  MVP Code *
                </label>

                <input
                  value={form.mvpCode}
                  onChange={(e) =>
                    updateField(
                      "mvpCode",
                      e.target.value.toUpperCase()
                    )
                  }
                  placeholder="SD-001"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              {/* TITLE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  MVP Title *
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    handleTitleChange(e.target.value)
                  }
                  placeholder="SaaS User Management System"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              {/* SLUG */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Slug
                </label>

                <input
                  value={form.slug}
                  onChange={(e) =>
                    updateField("slug", e.target.value)
                  }
                  placeholder="saas-user-management-system"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category *
                </label>

                <input
                  value={form.category}
                  onChange={(e) =>
                    updateField(
                      "category",
                      e.target.value
                    )
                  }
                  placeholder="Full Stack Development"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              {/* DOMAIN */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Domain *
                </label>

                <div className="relative">
                  <select
                    value={form.domainId}
                    onChange={(e) =>
                      updateField(
                        "domainId",
                        e.target.value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-indigo-500"
                  >
                    <option value="">
                      Select Domain
                    </option>

                    {domains
                      .filter(
                        (domain) =>
                          domain.active !== false
                      )
                      .map((domain) => (
                        <option
                          key={domain.id}
                          value={domain.id}
                        >
                          {domain.name}
                        </option>
                      ))}
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              {/* DIFFICULTY */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Difficulty *
                </label>

                <div className="relative">
                  <select
                    value={form.difficulty}
                    onChange={(e) =>
                      updateField(
                        "difficulty",
                        e.target.value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-indigo-500"
                  >
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

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              {/* SHORT DESCRIPTION */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Short Description
                </label>

                <input
                  value={form.shortDescription}
                  onChange={(e) =>
                    updateField(
                      "shortDescription",
                      e.target.value
                    )
                  }
                  placeholder="Build a production-ready SaaS user management system."
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Describe what students will build, what problem it solves and what the final outcome should be."
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

            </div>
          </section>

          {/* ================================================== */}
          {/* LEARNING INFORMATION */}
          {/* ================================================== */}

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">

            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Learning & Execution
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Define prerequisites, outcomes and deliverables.
              </p>
            </div>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
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
                  rows={3}
                  placeholder="Basic Java, SQL and programming knowledge."
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
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
                  rows={3}
                  placeholder="Students will learn Spring Boot, REST APIs, PostgreSQL and authentication."
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
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
                  rows={3}
                  placeholder="Source code, GitHub repository, documentation and deployed application."
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">

                <NumberField
                  label="Estimated Hours"
                  value={form.estimatedHours}
                  onChange={(value) =>
                    updateField(
                      "estimatedHours",
                      value
                    )
                  }
                />

                <NumberField
                  label="Reward XP"
                  value={form.rewardXp}
                  onChange={(value) =>
                    updateField(
                      "rewardXp",
                      value
                    )
                  }
                />

                <NumberField
                  label="Minimum Team Size"
                  value={form.minTeamSize}
                  min={1}
                  onChange={(value) =>
                    updateField(
                      "minTeamSize",
                      value
                    )
                  }
                />

                <NumberField
                  label="Maximum Team Size"
                  value={form.maxTeamSize}
                  min={1}
                  onChange={(value) =>
                    updateField(
                      "maxTeamSize",
                      value
                    )
                  }
                />

              </div>

            </div>
          </section>

          {/* ================================================== */}
          {/* SKILLS */}
          {/* ================================================== */}

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">

            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Skills
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Select the skills required to complete this MVP.
              </p>
            </div>

            {/* SELECTED SKILLS */}

            <div className="mb-4 flex flex-wrap gap-2">
              {selectedSkillObjects.length === 0 ? (
                <span className="text-sm text-slate-500">
                  No skills selected.
                </span>
              ) : (
                selectedSkillObjects.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-sm text-indigo-300"
                  >
                    {skill.name}

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(skill.id)
                      }
                      className="text-indigo-400 transition hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* DROPDOWN */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setOpenSkillDropdown(
                    !openSkillDropdown
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-indigo-500"
              >
                <span>
                  {selectedSkills.length > 0
                    ? `${selectedSkills.length} skill${
                        selectedSkills.length > 1
                          ? "s"
                          : ""
                      } selected`
                    : "Select skills"}
                </span>

                <ChevronDown size={17} />
              </button>

              {openSkillDropdown && (
                <div className="absolute z-[9999] mt-2 max-h-80 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">

                  <div className="border-b border-white/10 p-3">
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        value={skillSearch}
                        onChange={(e) =>
                          setSkillSearch(
                            e.target.value
                          )
                        }
                        placeholder="Search skills..."
                        className="w-full rounded-lg border border-white/10 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto p-2">

                    {filteredSkills.length === 0 ? (
                      <div className="px-3 py-5 text-center text-sm text-slate-500">
                        No skills found.
                      </div>
                    ) : (
                      filteredSkills.map((skill) => {
                        const selected =
                          selectedSkills.includes(
                            skill.id
                          );

                        return (
                          <button
                            type="button"
                            key={skill.id}
                            onClick={() =>
                              toggleSkill(skill.id)
                            }
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5"
                          >
                            <div>
                              <p className="text-sm text-white">
                                {skill.name}
                              </p>

                              {skill.category && (
                                <p className="text-xs text-slate-500">
                                  {skill.category}
                                </p>
                              )}
                            </div>

                            {selected && (
                              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500">
                                <Check size={13} />
                              </div>
                            )}
                          </button>
                        );
                      })
                    )}

                  </div>
                </div>
              )}

            </div>
          </section>

          {/* ================================================== */}
          {/* TECHNOLOGIES */}
          {/* ================================================== */}

          <section className="relative z-40 mb-6 overflow-visible  rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">

            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Technologies
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Select the technologies used in this MVP.
              </p>
            </div>

            {/* SELECTED TECHNOLOGIES */}

            <div className="mb-4 flex flex-wrap gap-2">
              {selectedTechnologyObjects.length === 0 ? (
                <span className="text-sm text-slate-500">
                  No technologies selected.
                </span>
              ) : (
                selectedTechnologyObjects.map(
                  (technology) => (
                    <div
                      key={technology.id}
                      className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-300"
                    >
                      {technology.name}

                      <button
                        type="button"
                        onClick={() =>
                          removeTechnology(
                            technology.id
                          )
                        }
                        className="text-cyan-400 transition hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )
                )
              )}
            </div>

            {/* DROPDOWN */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setOpenTechnologyDropdown(
                    !openTechnologyDropdown
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-500"
              >
                <span>
                  {selectedTechnologies.length > 0
                    ? `${selectedTechnologies.length} technolog${
                        selectedTechnologies.length > 1
                          ? "ies"
                          : "y"
                      } selected`
                    : "Select technologies"}
                </span>

                <ChevronDown size={17} />
              </button>

              {openTechnologyDropdown && (
                <div className="absolute z-[9999] mt-2 max-h-80 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">

                  <div className="border-b border-white/10 p-3">
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        value={technologySearch}
                        onChange={(e) =>
                          setTechnologySearch(
                            e.target.value
                          )
                        }
                        placeholder="Search technologies..."
                        className="w-full rounded-lg border border-white/10 bg-slate-950 py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto p-2">

                    {filteredTechnologies.length === 0 ? (
                      <div className="px-3 py-5 text-center text-sm text-slate-500">
                        No technologies found.
                      </div>
                    ) : (
                      filteredTechnologies.map(
                        (technology) => {
                          const selected =
                            selectedTechnologies.includes(
                              technology.id
                            );

                          return (
                            <button
                              type="button"
                              key={technology.id}
                              onClick={() =>
                                toggleTechnology(
                                  technology.id
                                )
                              }
                              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5"
                            >
                              <div>
                                <p className="text-sm text-white">
                                  {technology.name}
                                </p>

                                {technology.category && (
                                  <p className="text-xs text-slate-500">
                                    {
                                      technology.category
                                    }
                                  </p>
                                )}
                              </div>

                              {selected && (
                                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-500">
                                  <Check size={13} />
                                </div>
                              )}
                            </button>
                          );
                        }
                      )
                    )}

                  </div>
                </div>
              )}

            </div>
          </section>

          {/* ================================================== */}
{/* MVP MODULES & TASKS */}
{/* ================================================== */}

<section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">

  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <h2 className="text-lg font-semibold">
        MVP Modules & Tasks
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Break the MVP into modules and define the tasks
        students must complete.
      </p>
    </div>

    <button
      type="button"
      onClick={addModule}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20"
    >
      <Plus size={16} />
      Add Module
    </button>

  </div>

  {modules.length === 0 ? (

    <div className="rounded-xl border border-dashed border-white/10 bg-slate-900/40 px-5 py-10 text-center">

      <p className="text-sm text-slate-500">
        No modules added yet.
      </p>

      <button
        type="button"
        onClick={addModule}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
      >
        <Plus size={16} />
        Add First Module
      </button>

    </div>

  ) : (

    <div className="space-y-5">

      {modules.map((module, moduleIndex) => (

        <div
          key={module.id ?? `module-${moduleIndex}`}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
        >

          {/* MODULE HEADER */}

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-semibold text-indigo-300">
                {module.moduleNumber}
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Module {module.moduleNumber}
                </h3>

                <p className="text-xs text-slate-500">
                  {module.tasks.length} task
                  {module.tasks.length !== 1 ? "s" : ""}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                removeModule(moduleIndex)
              }
              className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={17} />
            </button>

          </div>

          {/* MODULE INFORMATION */}

          <div className="grid gap-4 md:grid-cols-2">

            <TextField
              label="Module Title"
              value={module.title}
              onChange={(value) =>
                updateModule(
                  moduleIndex,
                  "title",
                  value
                )
              }
            />

            <NumberField
              label="Module Number"
              value={module.moduleNumber}
              min={1}
              onChange={(value) =>
                updateModule(
                  moduleIndex,
                  "moduleNumber",
                  value
                )
              }
            />

            <NumberField
              label="Estimated Hours"
              value={module.estimatedHours}
              min={1}
              onChange={(value) =>
                updateModule(
                  moduleIndex,
                  "estimatedHours",
                  value
                )
              }
            />

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Difficulty
              </label>

              <select
                value={module.difficulty}
                onChange={(e) =>
                  updateModule(
                    moduleIndex,
                    "difficulty",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
              >
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

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>

              <textarea
                value={module.description}
                onChange={(e) =>
                  updateModule(
                    moduleIndex,
                    "description",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                placeholder="Explain what this module covers."
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Learning Objectives
              </label>

              <textarea
                value={module.learningObjectives}
                onChange={(e) =>
                  updateModule(
                    moduleIndex,
                    "learningObjectives",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                placeholder="What should the student learn?"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Deliverables
              </label>

              <textarea
                value={module.deliverables}
                onChange={(e) =>
                  updateModule(
                    moduleIndex,
                    "deliverables",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                placeholder="What should the student submit?"
              />

            </div>

          </div>

          {/* TASKS */}

          <div className="mt-6 border-t border-white/10 pt-5">

            <div className="mb-4 flex items-center justify-between">

              <div>
                <h4 className="font-semibold text-white">
                  Tasks
                </h4>

                <p className="mt-1 text-xs text-slate-500">
                  Define the individual activities for this module.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  addTask(moduleIndex)
                }
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20"
              >
                <Plus size={14} />
                Add Task
              </button>

            </div>

            {module.tasks.length === 0 ? (

              <div className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-500">
                No tasks added to this module.
              </div>

            ) : (

              <div className="space-y-4">

                {module.tasks.map(
                  (task, taskIndex) => (

                    <div
                      key={
                        task.id ??
                        `task-${moduleIndex}-${taskIndex}`
                      }
                      className="rounded-xl border border-white/10 bg-slate-950/70 p-4"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/10 text-xs font-semibold text-cyan-300">
                            {task.sequenceNumber}
                          </div>

                          <span className="text-sm font-medium text-white">
                            Task {task.sequenceNumber}
                          </span>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeTask(
                              moduleIndex,
                              taskIndex
                            )
                          }
                          className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                        <div className="lg:col-span-2">
                          <TextField
                            label="Task Title"
                            value={task.title}
                            onChange={(value) =>
                              updateTask(
                                moduleIndex,
                                taskIndex,
                                "title",
                                value
                              )
                            }
                          />
                        </div>

                        <NumberField
                          label="Sequence"
                          value={task.sequenceNumber}
                          min={1}
                          onChange={(value) =>
                            updateTask(
                              moduleIndex,
                              taskIndex,
                              "sequenceNumber",
                              value
                            )
                          }
                        />

                        <NumberField
                          label="Estimated Minutes"
                          value={task.estimatedMinutes}
                          min={1}
                          onChange={(value) =>
                            updateTask(
                              moduleIndex,
                              taskIndex,
                              "estimatedMinutes",
                              value
                            )
                          }
                        />

                        <div>

                          <label className="mb-2 block text-sm font-medium text-slate-300">
                            Task Type
                          </label>

                          <select
                            value={task.taskType}
                            onChange={(e) =>
                              updateTask(
                                moduleIndex,
                                taskIndex,
                                "taskType",
                                e.target.value
                              )
                            }
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                          >
                            <option value="PRACTICAL">
                              Practical
                            </option>

                            <option value="CODING">
                              Coding
                            </option>

                            <option value="DOCUMENTATION">
                              Documentation
                            </option>

                            <option value="RESEARCH">
                              Research
                            </option>

                            <option value="DESIGN">
                              Design
                            </option>
                          </select>

                        </div>

                        <div>

                          <label className="mb-2 block text-sm font-medium text-slate-300">
                            Priority
                          </label>

                          <select
                            value={task.priority}
                            onChange={(e) =>
                              updateTask(
                                moduleIndex,
                                taskIndex,
                                "priority",
                                e.target.value
                              )
                            }
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                          >
                            <option value="LOW">
                              Low
                            </option>

                            <option value="MEDIUM">
                              Medium
                            </option>

                            <option value="HIGH">
                              High
                            </option>

                            <option value="CRITICAL">
                              Critical
                            </option>
                          </select>

                        </div>

                        <NumberField
                          label="XP Reward"
                          value={task.xpReward}
                          min={0}
                          onChange={(value) =>
                            updateTask(
                              moduleIndex,
                              taskIndex,
                              "xpReward",
                              value
                            )
                          }
                        />

                        <NumberField
                          label="Deadline Offset Hours"
                          value={task.deadlineOffsetHours}
                          min={0}
                          onChange={(value) =>
                            updateTask(
                              moduleIndex,
                              taskIndex,
                              "deadlineOffsetHours",
                              value
                            )
                          }
                        />

                        <div>

                          <label className="mb-2 block text-sm font-medium text-slate-300">
                            Difficulty
                          </label>

                          <select
                            value={task.difficulty}
                            onChange={(e) =>
                              updateTask(
                                moduleIndex,
                                taskIndex,
                                "difficulty",
                                e.target.value
                              )
                            }
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                          >
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

                        <div className="md:col-span-2 lg:col-span-4">

                          <label className="mb-2 block text-sm font-medium text-slate-300">
                            Task Description
                          </label>

                          <textarea
                            value={task.description}
                            onChange={(e) =>
                              updateTask(
                                moduleIndex,
                                taskIndex,
                                "description",
                                e.target.value
                              )
                            }
                            rows={3}
                            className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                            placeholder="Describe exactly what the student needs to do."
                          />

                        </div>

                      </div>

                      <div className="mt-4 flex flex-wrap gap-4 border-t border-white/5 pt-4">

                        <Toggle
                          label="Mandatory"
                          checked={task.mandatory}
                          onChange={(value) =>
                            updateTask(
                              moduleIndex,
                              taskIndex,
                              "mandatory",
                              value
                            )
                          }
                        />

                        <Toggle
                          label="Submission Required"
                          checked={
                            task.submissionRequired
                          }
                          onChange={(value) =>
                            updateTask(
                              moduleIndex,
                              taskIndex,
                              "submissionRequired",
                              value
                            )
                          }
                        />

                        <Toggle
                          label="GitHub Required"
                          checked={
                            task.githubRequired
                          }
                          onChange={(value) =>
                            updateTask(
                              moduleIndex,
                              taskIndex,
                              "githubRequired",
                              value
                            )
                          }
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      ))}

    </div>

  )}

</section>

          {/* ================================================== */}
          {/* PLANS */}
          {/* ================================================== */}

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  MVP Plans
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Configure duration, pricing and execution features.
                </p>
              </div>

              <button
                type="button"
                onClick={addCustomPlan}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20"
              >
                <Plus size={16} />
                Add Plan
              </button>

            </div>

            <div className="space-y-4">

              {plans.map((plan, index) => (
                <div
                  key={`${plan.code}-${index}`}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                >

                  <div className="mb-4 flex items-center justify-between">

                    <div>
                      <h3 className="font-semibold text-white">
                         {plan.name || "Unnamed Plan"}
        </h3>

        <p className="text-xs text-slate-500">
          {plan.code || "NO_CODE"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removePlan(index)
                      }
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    <TextField
                      label="Plan Name"
                      value={plan.name}
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "name",
                          value
                        )
                      }
                    />

                    <TextField
                      label="Plan Code"
                      value={plan.code}
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "code",
                          value.toUpperCase()
                        )
                      }
                    />

                    <NumberField
                      label="Duration Hours"
                      value={plan.durationHours}
                      min={1}
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "durationHours",
                          value
                        )
                      }
                    />

                    <NumberField
                      label="Price"
                      value={plan.price}
                      min={0}
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "price",
                          value
                        )
                      }
                    />

                    <TextField
                      label="Currency"
                      value={plan.currency}
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "currency",
                          value.toUpperCase()
                        )
                      }
                    />

                    <NumberField
                      label="Max Team Size"
                      value={plan.maxTeamSize}
                      min={1}
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "maxTeamSize",
                          value
                        )
                      }
                    />

                    
                 <NumberField
        label="Display Order"
        value={plan.displayOrder}
        min={1}
        onChange={(value) =>
          updatePlan(
            index,
            "displayOrder",
            value
          )
        }
      />

                    <div className="md:col-span-2">
                      <TextField
                        label="Description"
                        value={plan.description}
                        onChange={(value) =>
                          updatePlan(
                            index,
                            "description",
                            value
                          )
                        }
                      />
                    </div>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-4">

                    <Toggle
                      label="Free"
                      checked={plan.free}
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "free",
                          value
                        )
                      }
                    />

                    <Toggle
                      label="Certificate"
                      checked={
                        plan.certificateEnabled
                      }
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "certificateEnabled",
                          value
                        )
                      }
                    />

                    <Toggle
                      label="Portfolio"
                      checked={
                        plan.portfolioEnabled
                      }
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "portfolioEnabled",
                          value
                        )
                      }
                    />

                    <Toggle
                      label="Mentor"
                      checked={
                        plan.mentorEnabled
                      }
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "mentorEnabled",
                          value
                        )
                      }
                    />

                    <Toggle
                      label="AI Mentor"
                      checked={
                        plan.aiMentorEnabled
                      }
                      onChange={(value) =>
                        updatePlan(
                          index,
                          "aiMentorEnabled",
                          value
                        )
                      }
                    />

                     <Toggle
        label="Active"
        checked={plan.active}
        onChange={(value) =>
          updatePlan(
            index,
            "active",
            value
          )
        }
      />

                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* ================================================== */}
          {/* PLATFORM SETTINGS */}
          {/* ================================================== */}

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">

            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Platform Settings
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Configure publishing and MVP features.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">

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
                label="Certificate"
                checked={form.certificateEnabled}
                onChange={(value) =>
                  updateField(
                    "certificateEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="Portfolio"
                checked={form.portfolioEnabled}
                onChange={(value) =>
                  updateField(
                    "portfolioEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="Mentor"
                checked={form.mentorEnabled}
                onChange={(value) =>
                  updateField(
                    "mentorEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="AI Mentor"
                checked={form.aiMentorEnabled}
                onChange={(value) =>
                  updateField(
                    "aiMentorEnabled",
                    value
                  )
                }
              />

              <Toggle
                label="Featured"
                checked={form.featured}
                onChange={(value) =>
                  updateField(
                    "featured",
                    value
                  )
                }
              />

            </div>

            <div className="mt-6 max-w-sm">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Initial Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option value="DRAFT">
                  Draft
                </option>

                <option value="PUBLISHED">
                  Published
                </option>
              </select>
            </div>

          </section>

          {/* ================================================== */}
          {/* SAVE */}
          {/* ================================================== */}

          <div className="sticky bottom-4 z-20 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="text-sm text-slate-400">
                <span className="text-white">
                  {selectedSkills.length}
                </span>{" "}
                skills ·{" "}
                <span className="text-white">
                  {selectedTechnologies.length}
                </span>{" "}
                technologies ·{" "}
                <span className="text-white">
                  {plans.length}
                </span>{" "}
                plans
              </div>

              <div className="flex gap-3">

                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    router.push(
                      "/dashboard/admin/mvps"
                    )
                  }
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Creating MVP...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Create MVP
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>

        </form>
      </div>
    </div>
  );
}

/*
 * ============================================================
 * REUSABLE NUMBER FIELD
 * ============================================================
 */

function NumberField({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
      />
    </div>
  );
}

/*
 * ============================================================
 * REUSABLE TEXT FIELD
 * ============================================================
 */

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
      />
    </div>
  );
}

/*
 * ============================================================
 * REUSABLE TOGGLE
 * ============================================================
 */

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
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span
        className={`relative h-6 w-11 rounded-full transition ${
          checked
            ? "bg-indigo-500"
            : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </span>

      <span className="text-sm text-slate-300">
        {label}
      </span>
    </button>
  );
}