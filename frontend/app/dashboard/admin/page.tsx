


"use client";

import {
  Users,
  GraduationCap,
  UserRoundCheck,
  FileText,
  Settings,
  ShieldCheck,
  ScrollText,
  Trophy,
  Plus,
  Clock3,
  ChevronRight,
  Activity,
  DollarSign,
  Layers3,
  BookOpenCheck,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/api";

export default function AdminDashboard() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUserCount = async () => {

      try {

        const token =
          localStorage.getItem("token");
    console.log("TOKEN:", token);
    
       const response = await fetch(
        API_ENDPOINTS.ADMIN_USER_COUNT,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("STATUS:", response.status);

         if (!response.ok) {
        throw new Error(
          `Failed to fetch user count: ${response.status}`
        );
      }


        const count =
          await response.json();
     console.log("TOTAL USERS :", count);
        setTotalUsers(count);

      } catch (error) {

        console.error(
          "User count error:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    loadUserCount();

  }, []);

  return (

    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>
          <p className="text-sm font-medium text-cyan-400">
            Brain Train Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Welcome Super Admin 👋
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage users, mentors, students, MVPs, reports and
            system operations from one place.
          </p>
        </div>

        <Link
          href="/dashboard/admin/mvps/create"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-cyan-600
            px-5
            py-3
            font-semibold
            text-white
            shadow-lg
            shadow-indigo-500/20
            transition
            hover:scale-[1.02]
            hover:opacity-90
          "
        >
          <Plus size={18} />
          Add New MVP
        </Link>

      </div>


      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <div>

        <h2 className="mb-4 text-lg font-semibold text-white">
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Users */}

        <StatCard
  title="Total Users"
  value={
    loading
      ? "..."
      : String(totalUsers)
  }
  icon={<Users size={22} />}
  description="Registered platform users"
/>

          {/* Students */}

          <StatCard
            title="Students"
            value="0"
            icon={<GraduationCap size={22} />}
            description="Active students"
          />

          {/* Mentors */}

          <StatCard
            title="Mentors"
            value="0"
            icon={<UserRoundCheck size={22} />}
            description="Active mentors"
          />

          {/* Revenue */}

          <StatCard
            title="Revenue"
            value="₹0"
            icon={<DollarSign size={22} />}
            description="Total platform revenue"
          />

        </div>

      </div>


      {/* =====================================================
          ADMIN MANAGEMENT
      ====================================================== */}

      <div>

        <h2 className="mb-4 text-lg font-semibold text-white">
          Administration
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          <AdminModule
            href="/dashboard/admin/users"
            icon={<Users size={22} />}
            title="User Management"
            description="Manage all platform users"
          />

          <AdminModule
            href="/dashboard/admin/students"
            icon={<GraduationCap size={22} />}
            title="Student Management"
            description="Manage students and profiles"
          />

          <AdminModule
            href="/dashboard/admin/mentors"
            icon={<UserRoundCheck size={22} />}
            title="Mentor Management"
            description="Manage mentors and assignments"
          />

          <AdminModule
            href="/dashboard/admin/reports"
            icon={<FileText size={22} />}
            title="Reports"
            description="View platform reports"
          />

          <AdminModule
            href="/dashboard/admin/settings"
            icon={<Settings size={22} />}
            title="Admin Settings"
            description="Configure admin preferences"
          />

          <AdminModule
            href="/dashboard/admin/system"
            icon={<ShieldCheck size={22} />}
            title="System Settings"
            description="Configure platform settings"
          />

          <AdminModule
            href="/dashboard/admin/audit-logs"
            icon={<ScrollText size={22} />}
            title="Audit Logs"
            description="Track admin and system activity"
          />

          <AdminModule
            href="/dashboard/admin/profile"
            icon={<BookOpenCheck size={22} />}
            title="Admin Profile"
            description="View and manage admin profile"
          />

        </div>

      </div>


      {/* =====================================================
          MVP MANAGEMENT
      ====================================================== */}

      <div>

        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-lg font-semibold text-white">
              MVP Management
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Create, schedule and manage student MVP challenges.
            </p>
          </div>

          <Link
            href="/dashboard/admin/mvps"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-cyan-400
              hover:text-cyan-300
            "
          >
            View All MVPs
            <ChevronRight size={16} />
          </Link>

        </div>


        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Active MVPs */}

          <MVPStatusCard
            title="Active MVPs"
            value="0"
            icon={<Activity size={22} />}
            description="Currently running MVPs"
            href="/dashboard/admin/mvps?status=active"
          />

          {/* Draft MVPs */}

          <MVPStatusCard
            title="Draft MVPs"
            value="0"
            icon={<Layers3 size={22} />}
            description="MVPs waiting to be published"
            href="/dashboard/admin/mvps?status=draft"
          />

          {/* Completed */}

          <MVPStatusCard
            title="Completed MVPs"
            value="0"
            icon={<Trophy size={22} />}
            description="Successfully completed MVPs"
            href="/dashboard/admin/mvps?status=completed"
          />

        </div>

      </div>


      {/* =====================================================
          CREATE MVP QUICK SECTION
      ====================================================== */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-indigo-950/70
          via-[#111827]
          to-cyan-950/40
          p-6
          lg:p-8
        "
      >

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-500/20
                  text-indigo-400
                "
              >
                <Trophy size={24} />
              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  Create a New MVP
                </h2>

                <p className="text-sm text-slate-400">
                  Launch a challenge for students
                </p>

              </div>

            </div>


            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400">
              Create an MVP challenge, select its duration,
              define requirements, assign skills and publish it
              to students.
            </p>

          </div>


          <Link
            href="/dashboard/admin/mvps/create"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-white
              px-6
              py-3
              font-semibold
              text-slate-900
              transition
              hover:bg-slate-100
            "
          >
            <Plus size={18} />
            Create MVP
          </Link>

        </div>


        {/* Duration options */}

        <div className="mt-8">

          <p className="mb-3 text-sm font-medium text-slate-300">
            Available MVP Durations
          </p>

          <div className="flex flex-wrap gap-3">

            <DurationBadge label="48 Hours" />

            <DurationBadge label="7 Days" />

            <DurationBadge label="14 Days" />

            <DurationBadge label="21 Days" />

            <DurationBadge label="30 Days" />

            <DurationBadge label="60 Days" />

            <DurationBadge label="Custom" />

          </div>

        </div>

      </div>


      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <div>

        <h2 className="mb-4 text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <QuickAction
            href="/dashboard/admin/users"
            icon={<Users size={20} />}
            label="Manage Users"
          />

          <QuickAction
            href="/dashboard/admin/mvps/create"
            icon={<Plus size={20} />}
            label="Create MVP"
          />

          <QuickAction
            href="/dashboard/admin/reports"
            icon={<FileText size={20} />}
            label="Generate Report"
          />

          <QuickAction
            href="/dashboard/admin/audit-logs"
            icon={<ScrollText size={20} />}
            label="View Audit Logs"
          />

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-[#111827]
        p-6
        transition
        hover:border-cyan-500/30
        hover:bg-[#151e2e]
      "
    >

      <div className="flex items-center justify-between">

        <div className="text-cyan-400">
          {icon}
        </div>

        <span className="text-xs text-slate-500">
          Live
        </span>

      </div>

      <p className="mt-5 text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* ============================================================
   ADMIN MODULE
============================================================ */

function AdminModule({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        rounded-3xl
        border
        border-white/10
        bg-[#111827]
        p-5
        transition
        hover:-translate-y-1
        hover:border-indigo-500/40
        hover:bg-[#151e2e]
      "
    >

      <div className="flex items-center justify-between">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-indigo-500/10
            text-indigo-400
            transition
            group-hover:bg-indigo-500/20
          "
        >
          {icon}
        </div>

        <ChevronRight
          size={18}
          className="
            text-slate-600
            transition
            group-hover:translate-x-1
            group-hover:text-cyan-400
          "
        />

      </div>

      <h3 className="mt-5 font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        {description}
      </p>

    </Link>
  );
}


/* ============================================================
   MVP STATUS CARD
============================================================ */

function MVPStatusCard({
  title,
  value,
  icon,
  description,
  href,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        rounded-3xl
        border
        border-white/10
        bg-[#111827]
        p-6
        transition
        hover:-translate-y-1
        hover:border-cyan-500/30
      "
    >

      <div className="flex items-center justify-between">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-cyan-500/10
            text-cyan-400
          "
        >
          {icon}
        </div>

        <ChevronRight
          size={18}
          className="
            text-slate-600
            transition
            group-hover:translate-x-1
            group-hover:text-cyan-400
          "
        />

      </div>

      <p className="mt-5 text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>

    </Link>
  );
}


/* ============================================================
   DURATION BADGE
============================================================ */

function DurationBadge({
  label,
}: {
  label: string;
}) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-4
        py-2
        text-sm
        text-slate-300
      "
    >
      <Clock3 size={15} className="text-cyan-400" />
      {label}
    </div>
  );
}


/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        px-5
        py-4
        text-sm
        font-medium
        text-slate-300
        transition
        hover:border-cyan-500/30
        hover:bg-white/[0.06]
        hover:text-white
      "
    >
      <span className="text-cyan-400">
        {icon}
      </span>

      {label}
    </Link>
  );
}