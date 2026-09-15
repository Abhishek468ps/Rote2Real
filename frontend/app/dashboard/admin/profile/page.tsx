"use client";

import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  ShieldCheck,
  User,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/api";

type AdminProfile = {
  id: number;
  braintrainId: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  role: string | null;
  emailVerified: boolean;
  active: boolean;
  createdAt: string | null;
};

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        /*
         * IMPORTANT:
         * This assumes your backend has:
         *
         * GET /api/admin/profile
         *
         * If your backend uses another endpoint,
         * change API_ENDPOINTS.ADMIN_PROFILE in api.ts
         */

        const response = await fetch(
          API_ENDPOINTS.ADMIN_ME,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const message = await response.text();

          throw new Error(
            message ||
              `Failed to load profile: ${response.status}`
          );
        }

        const data: AdminProfile =
          await response.json();

        setProfile(data);
      } catch (err) {
        console.error(
          "Admin profile loading error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load admin profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-slate-400">
          Loading admin profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/admin"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2.5
            text-sm
            text-slate-300
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        <div
          className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            p-4
            text-sm
            text-red-400
          "
        >
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-sm text-slate-400">
        Admin profile not found.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div className="flex items-center gap-3 sm:gap-4">

          <Link
            href="/dashboard/admin"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-slate-400
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="min-w-0">
            <p className="text-sm font-medium text-cyan-400">
              Brain Train Administration
            </p>

            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Admin Profile
            </h1>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Manage your administrator account information.
            </p>
          </div>

        </div>

        <Link
          href={`/dashboard/admin/users/${profile.id}/edit`}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-cyan-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-indigo-500/20
            transition
            hover:opacity-90
            sm:w-auto
          "
        >
          <Edit size={17} />
          Edit Profile
        </Link>

      </div>


      {/* PROFILE HERO */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
        "
      >

        <div
          className="
            bg-gradient-to-r
            from-indigo-600/10
            via-cyan-500/10
            to-purple-600/10
            p-5
            sm:p-8
          "
        >

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* AVATAR */}

            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-indigo-500
                via-cyan-500
                to-purple-600
                p-[2px]
                sm:h-24
                sm:w-24
              "
            >
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0f172a]
                  text-3xl
                  font-bold
                  text-white
                  sm:text-4xl
                "
              >
                {profile.fullName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            </div>


            {/* NAME */}

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {profile.fullName}
                </h2>

                {profile.emailVerified && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-lg
                      bg-cyan-500/10
                      px-2
                      py-1
                      text-[11px]
                      font-medium
                      text-cyan-400
                    "
                  >
                    <BadgeCheck size={13} />
                    Verified
                  </span>
                )}

              </div>

              <p className="mt-1 text-sm text-slate-400">
                {profile.role || "ADMIN"}
              </p>

              <p className="mt-2 break-all text-xs text-indigo-400">
                {profile.braintrainId || "Brain Train ID not assigned"}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ACCOUNT INFORMATION */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        <ProfileInfoCard
          icon={<User size={20} />}
          title="Personal Information"
        >

          <InfoRow
            label="Full Name"
            value={profile.fullName}
          />

          <InfoRow
            label="Role"
            value={profile.role || "ADMIN"}
          />

          <InfoRow
            label="Brain Train ID"
            value={
              profile.braintrainId || "Not assigned"
            }
          />

        </ProfileInfoCard>


        <ProfileInfoCard
          icon={<ShieldCheck size={20} />}
          title="Account Information"
        >

          <InfoRow
            icon={<Mail size={16} />}
            label="Email"
            value={profile.email}
          />

          <InfoRow
            icon={<Phone size={16} />}
            label="Phone"
            value={profile.phone || "Not provided"}
          />

          <InfoRow
            icon={<CalendarDays size={16} />}
            label="Joined"
            value={
              profile.createdAt
                ? new Date(
                    profile.createdAt
                  ).toLocaleDateString()
                : "N/A"
            }
          />

        </ProfileInfoCard>

      </div>


      {/* STATUS */}

      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
          p-5
          sm:p-6
        "
      >

        <h3 className="text-lg font-semibold text-white">
          Account Status
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <StatusCard
            title="Account Status"
            value={
              profile.active
                ? "Active"
                : "Inactive"
            }
            active={profile.active}
          />

          <StatusCard
            title="Email Status"
            value={
              profile.emailVerified
                ? "Verified"
                : "Not Verified"
            }
            active={profile.emailVerified}
          />

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   PROFILE INFO CARD
============================================================ */

function ProfileInfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-[#111827]
        p-5
        sm:p-6
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-cyan-500/10
            text-cyan-400
          "
        >
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

      </div>

      <div className="mt-6 space-y-5">
        {children}
      </div>

    </div>
  );
}


/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-1
        border-b
        border-white/5
        pb-4
        last:border-0
        last:pb-0
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:gap-4
      "
    >

      <div className="flex items-center gap-2 text-sm text-slate-500">
        {icon}
        {label}
      </div>

      <p
        className="
          break-all
          text-sm
          font-medium
          text-slate-200
          sm:text-right
        "
      >
        {value}
      </p>

    </div>
  );
}


/* ============================================================
   STATUS CARD
============================================================ */

function StatusCard({
  title,
  value,
  active,
}: {
  title: string;
  value: string;
  active: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/5
        bg-white/[0.03]
        p-4
      "
    >

      <div>
        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p
          className={`mt-1 text-sm font-semibold ${
            active
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {value}
        </p>
      </div>

      <div
        className={`h-2.5 w-2.5 rounded-full ${
          active
            ? "bg-emerald-400"
            : "bg-red-400"
        }`}
      />

    </div>
  );
}