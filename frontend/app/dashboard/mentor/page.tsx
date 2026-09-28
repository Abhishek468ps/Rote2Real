"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Coins,
  FolderKanban,
  Handshake,
  MessageSquareText,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api";

interface MentorProfile {
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

  // Mentor-specific fields
  expertiseDomain?: string;
  yearsOfExperience?: string;
  organizationName?: string;
  designation?: string;
  mentoringHoursPerWeek?: string;
  maximumStudents?: string;
  mentoringMode?: string;
  preferredStudentLevels?: string[];
  mvpTypes?: string[];
  availabilityDays?: string[];
  availabilityTime?: string;
  contributionTypes?: string[];
  sponsorshipType?: string;
  canReviewProjects?: boolean;
  canDemonstrateProjects?: boolean;
  canProvideIndustryProblem?: boolean;
  canProvideNetworking?: boolean;
}

export default function MentorPage() {
  const [user, setUser] =
    useState<MentorProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadMentorProfile() {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          API_ENDPOINTS.MENTOR_ME,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load mentor profile"
          );
        }

        const data =
          await response.json();

        console.log(
          "MENTOR PROFILE:",
          data
        );

        setUser(data);
      } catch (error) {
        console.error(
          "Mentor profile error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadMentorProfile();
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
            Brain Train Mentor Workspace
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
            Welcome back
            {user?.fullName
              ? `, ${user.fullName}`
              : ""}{" "}
            👋
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
            Guide students, review projects,
            contribute industry knowledge and
            help build the next generation of
            MVPs through the Brain Train mentor
            ecosystem.
          </p>

        </div>
      </section>

      {/* =========================
          Mentor Stats
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

        <StatCard
          icon={<UserRound size={20} />}
          label="Brain Train ID"
          value={
            loading
              ? "Loading..."
              : user?.braintrainId ||
                "Not Available"
          }
          description="Your mentor identity"
          iconClass="bg-indigo-500/10 text-indigo-400"
        />

        <StatCard
          icon={<Users size={20} />}
          label="Students Mentored"
          value="0"
          description="Students supported"
          iconClass="bg-cyan-500/10 text-cyan-400"
        />

        <StatCard
          icon={<Coins size={20} />}
          label="Mentor Credits"
          value={
            loading
              ? "..."
              : `${user?.brainCoins ?? 0}`
          }
          description="Contribution rewards"
          iconClass="bg-amber-500/10 text-amber-400"
        />

        <StatCard
          icon={<Trophy size={20} />}
          label="Mentor XP"
          value={
            loading
              ? "..."
              : `${user?.xp ?? 0} XP`
          }
          description="Build your mentor reputation"
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
            Mentor Mission
        ====================== */}
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-indigo-400/20
            bg-gradient-to-br
            from-indigo-500/10
            via-white/[0.03]
            to-cyan-500/10
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
              bg-indigo-400/10
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-400/10
                  text-indigo-400
                "
              >
                <Handshake size={24} />
              </div>

              <span
                className="
                  rounded-full
                  border
                  border-indigo-400/20
                  bg-indigo-400/10
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-indigo-300
                "
              >
                Mentor Ecosystem
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
              Guide. Review. Build. Empower.
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
              Share your expertise with students,
              review their MVPs, provide real-world
              guidance and contribute to meaningful
              industry opportunities.
            </p>

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-3
              "
            >

              <a
                href="/dashboard/mentor/students"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-indigo-500
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-indigo-400
                "
              >
                View Students
                <ArrowUpRight size={16} />
              </a>

              <a
                href="/dashboard/mentor/projects"
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
                <FolderKanban size={16} />
                Review Projects
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
                Manage your mentoring
              </p>
            </div>

          </div>

          <div className="mt-5 space-y-3">

            <QuickAction
              icon={<UserRound size={18} />}
              title="My Profile"
              description="Update mentor information"
              href="/dashboard/profile"
            />

            <QuickAction
              icon={<Users size={18} />}
              title="My Students"
              description="View assigned students"
              href="/dashboard/mentor/students"
            />

            <QuickAction
              icon={<FolderKanban size={18} />}
              title="Project Reviews"
              description="Review student MVPs"
              href="/dashboard/mentor/projects"
            />

            <QuickAction
              icon={<Wallet size={18} />}
              title="Mentor Credits"
              description="View your contribution credits"
              href="/dashboard/wallet"
            />

          </div>

        </div>

      </section>

      {/* =========================
          Contribution Overview
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
              Your Mentor Contributions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your mentoring capabilities and
              contribution preferences.
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
            Mentor profile active
          </div>

        </div>

        <div
          className="
            mt-6
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          <ContributionCard
            icon={<MessageSquareText size={20} />}
            title="Mentoring"
            enabled={
              user?.contributionTypes?.includes(
                "Mentoring time"
              ) ?? false
            }
          />

          <ContributionCard
            icon={<BookOpenCheck size={20} />}
            title="Project Review"
            enabled={
              user?.canReviewProjects ?? false
            }
          />

          <ContributionCard
            icon={<BriefcaseBusiness size={20} />}
            title="Industry Problems"
            enabled={
              user?.canProvideIndustryProblem ??
              false
            }
          />

          <ContributionCard
            icon={<Handshake size={20} />}
            title="Networking"
            enabled={
              user?.canProvideNetworking ??
              false
            }
          />

        </div>

      </section>

      {/* =========================
          Mentor Activity
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

        <div>

          <h2
            className="
              text-xl
              font-black
              text-white
            "
          >
            Mentor Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your mentoring and student-support
            activity will appear here.
          </p>

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

          <Award
            size={28}
            className="mx-auto text-slate-600"
          />

          <p
            className="
              mt-3
              text-sm
              font-medium
              text-slate-400
            "
          >
            Your first mentoring activity
            is waiting.
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-600
            "
          >
            Start mentoring, review an MVP or
            contribute an industry problem to
            begin building your mentor journey.
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
        group
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

        <p
          className="
            truncate
            text-sm
            font-semibold
            text-white
          "
        >
          {title}
        </p>

        <p
          className="
            truncate
            text-xs
            text-slate-500
          "
        >
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

/* =================================
   Contribution Card
================================= */

function ContributionCard({
  icon,
  title,
  enabled,
}: {
  icon: React.ReactNode;
  title: string;
  enabled: boolean;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        p-5
      "
    >

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
        {icon}
      </div>

      <p
        className="
          mt-4
          text-sm
          font-semibold
          text-white
        "
      >
        {title}
      </p>

      <div
        className="
          mt-3
          flex
          items-center
          gap-2
          text-xs
        "
      >

        <CheckCircle2
          size={14}
          className={
            enabled
              ? "text-emerald-400"
              : "text-slate-600"
          }
        />

        <span
          className={
            enabled
              ? "text-emerald-400"
              : "text-slate-500"
          }
        >
          {enabled
            ? "Available"
            : "Not enabled"}
        </span>

      </div>

    </div>
  );
}
