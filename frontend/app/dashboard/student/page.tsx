 "use client";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Brain,
  Coins,
  FileCheck2,
  FolderKanban,
  Sparkles,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api";

interface StudentProfile {
  id: number;
  fullName: string;
  email: string;
  role: string;
  braintrainId: string;
  online: boolean;
  wallet: number;
  brainCoins: number;
  xp: number;
  profileImage: string | null;
}

export default function StudentDashboardPage() {


  const [user, setUser] =
    useState<StudentProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadStudentProfile() {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response =
          await fetch(
            API_ENDPOINTS.STUDENT_ME,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to load student profile"
          );
        }

        const data =
          await response.json();

        setUser(data);

      } catch (error) {

        console.error(
          "Student profile error:",
          error
        );

      } finally {

        setLoading(false);

      }
    }

    loadStudentProfile();

  }, []);

  
  return (
    <div className="w-full space-y-8 overflow-x-hidden">

      {/* =========================
          Welcome Header
      ========================= */}

      <section
        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-br
        from-indigo-500/10
        via-white/[0.03]
        to-cyan-500/10
        p-6
        sm:p-8
        "
      >
        {/* Glow */}

        <div
          className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-cyan-500/10
          blur-3xl
          "
        />

        <div className="relative z-10">

          <div
            className="
            mb-3
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-cyan-400
            "
          >
            <Sparkles size={16} />

            Brain Train Student Workspace
          </div>

          <h1
            className="
            text-3xl
            font-black
            tracking-tight
            text-white
            sm:text-4xl
            lg:text-5xl
            "
          >
           Welcome back{user?.fullName ? `, ${user.fullName}` : ""} 👋
          </h1>

          <p
            className="
            mt-3
            max-w-2xl
            text-sm
            leading-6
            text-slate-400
            sm:text-base
            "
          >
            Track your learning journey, build projects,
            earn BrainCoins and grow your professional
            portfolio with Brain Train.
          </p>

        </div>

      </section>


      {/* =========================
          Student Stats
      ========================= */}

      <section
        className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
        "
      >

        {/* Brain Train ID */}

        <StatCard
  icon={<UserRound size={20} />}
  label="Brain Train ID"
  value={
    loading
      ? "Loading..."
      : user?.braintrainId || "Not Available"
  }
  description="Your unique identity"
  iconClass="bg-indigo-500/10 text-indigo-400"
/>

        {/* Wallet */}

       <StatCard
  icon={<Coins size={20} />}
  label="BrainCoins"
  value={loading ? "..." : `${user?.wallet ?? 0}`}
  description="Available rewards"
  iconClass="bg-amber-500/10 text-amber-400"
/>

        {/* XP */}

        <StatCard
  icon={<Zap size={20} />}
  label="Experience Points"
  value={loading ? "..." : `${user?.xp ?? 0} XP`}
  description="Keep building to level up"
  iconClass="bg-cyan-500/10 text-cyan-400"
/>

        {/* MVP */}

        <StatCard
          icon={<Trophy size={20} />}
          label="MVP Portfolio"
          value="0"
          description="Projects completed"
          iconClass="bg-emerald-500/10 text-emerald-400"
        />

      </section>


      {/* =========================
          Main Grid
      ========================= */}

      <section
        className="
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-3
        "
      >

        {/* =====================
            Srishtizia
        ====================== */}

        <div
          className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/20
          bg-gradient-to-br
          from-cyan-500/10
          via-white/[0.03]
          to-indigo-500/10
          p-6
          sm:p-7
          xl:col-span-2
          "
        >

          <div
            className="
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-cyan-400/10
            blur-3xl
            "
          />

          <div className="relative z-10">

            <div className="flex items-start justify-between gap-4">

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-cyan-400/10
                text-cyan-400
                "
              >
                <Brain size={24} />
              </div>

              <span
                className="
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-3
                py-1
                text-xs
                font-semibold
                text-cyan-300
                "
              >
                Srishtizia
              </span>

            </div>

            <h2
              className="
              mt-6
              text-2xl
              font-black
              text-white
              "
            >
              Assess. Discover. Build.
            </h2>

            <p
              className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-slate-400
              "
            >
              Explore your capabilities through Srishtizia
              assessments and discover opportunities to
              strengthen your professional readiness.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <a
                href="https://srishtizia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-cyan-500
                px-5
                py-3
                text-sm
                font-bold
                text-slate-950
                transition
                hover:bg-cyan-400
                "
              >
                Explore Srishtizia

                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://srishtizia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-white/10
                "
              >
                <FileCheck2 size={16} />

                Assessment
              </a>

            </div>

          </div>

        </div>


        {/* =====================
            Quick Actions
        ====================== */}

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-6
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-indigo-500/10
              text-indigo-400
              "
            >
              <Sparkles size={19} />
            </div>

            <div>

              <h2 className="font-bold text-white">
                Quick Actions
              </h2>

              <p className="text-xs text-slate-500">
                Continue your journey
              </p>

            </div>

          </div>


          <div className="mt-5 space-y-3">

            <QuickAction
              icon={<UserRound size={18} />}
              title="Complete Profile"
              description="Update your information"
              href="/dashboard/profile"
            />

            <QuickAction
              icon={<FolderKanban size={18} />}
              title="Explore MVPs"
              description="Build your portfolio"
              href="/dashboard/mvps"
            />

            <QuickAction
              icon={<Coins size={18} />}
              title="Open Wallet"
              description="View your BrainCoins"
              href="/dashboard/wallet"
            />

          </div>

        </div>

      </section>


      {/* =========================
          Activity
      ========================= */}

      <section
        className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
        sm:p-7
        "
      >

        <div
          className="
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
          "
        >

          <div>

            <h2
              className="
              text-xl
              font-black
              text-white
              "
            >
              Your Journey
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recent learning and portfolio activity
              will appear here.
            </p>

          </div>

          <div
            className="
            flex
            items-center
            gap-2
            text-xs
            text-slate-500
            "
          >
            <span
              className="
              h-2
              w-2
              rounded-full
              bg-emerald-400
              "
            />

            All systems ready
          </div>

        </div>


        <div
          className="
          mt-6
          rounded-2xl
          border
          border-dashed
          border-white/10
          bg-black/10
          p-8
          text-center
          "
        >

          <Trophy
            size={28}
            className="mx-auto text-slate-600"
          />

          <p className="mt-3 text-sm font-medium text-slate-400">
            Your first achievement is waiting.
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Complete an assessment or build your first
            MVP to start your journey.
          </p>

        </div>

      </section>

    </div>
  );
}


/* =================================
   Stat Card
================================= */

function StatCard({
  icon,
  label,
  value,
  description,
  iconClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  iconClass: string;
}) {
  return (
    <div
      className="
      group
      min-w-0
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      p-5
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-white/20
      hover:bg-white/[0.05]
      "
    >

      <div
        className={`
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        ${iconClass}
        `}
      >
        {icon}
      </div>

      <p
        className="
        mt-5
        text-xs
        font-medium
        uppercase
        tracking-wider
        text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
        mt-1
        truncate
        text-xl
        font-black
        text-white
        "
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* =================================
   Quick Action
================================= */

function QuickAction({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="
      flex
      items-center
      gap-3
      rounded-2xl
      border
      border-white/5
      bg-white/[0.02]
      p-3
      transition
      hover:border-white/10
      hover:bg-white/[0.06]
      "
    >

      <div
        className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-white/5
        text-slate-300
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-sm font-semibold text-white">
          {title}
        </p>

        <p className="truncate text-xs text-slate-500">
          {description}
        </p>

      </div>

      <ArrowUpRight
        size={16}
        className="
        shrink-0
        text-slate-600
        transition
        group-hover:text-cyan-400
        "
      />

    </a>
  );
}

