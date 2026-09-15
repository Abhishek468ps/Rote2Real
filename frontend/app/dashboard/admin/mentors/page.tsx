"use client";

import {
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { API_ENDPOINTS } from "@/lib/api";

type AdminMentor = {
  id: number;
  braintrainId: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  role: string | null;
  emailVerified: boolean;
  active: boolean;
  createdAt: string | null;
  paymentCompleted?: boolean;
};

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<AdminMentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadMentors = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Authentication token not found"
        );
      }

      const response = await fetch(
        API_ENDPOINTS.ADMIN_USERS,
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
          `Failed to fetch mentors: ${response.status}`
        );
      }

      const data: AdminMentor[] =
        await response.json();

      /*
       * Only MENTOR users
       */

      const mentorUsers = data.filter(
        (user) => user.role === "MENTOR"
      );

      setMentors(mentorUsers);
    } catch (err) {
      console.error(
        "Mentors loading error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load mentors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentors();
  }, []);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const searchValue =
        search.toLowerCase().trim();

      if (!searchValue) {
        return true;
      }

      return (
        mentor.fullName
          ?.toLowerCase()
          .includes(searchValue) ||
        mentor.email
          ?.toLowerCase()
          .includes(searchValue) ||
        mentor.braintrainId
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [mentors, search]);

  const deleteMentor = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this mentor?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Authentication token not found"
        );
      }

      const response = await fetch(
        `${API_ENDPOINTS.ADMIN_USERS}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete mentor: ${response.status}`
        );
      }

      setMentors((currentMentors) =>
        currentMentors.filter(
          (mentor) => mentor.id !== id
        )
      );
    } catch (err) {
      console.error(
        "Delete mentor error:",
        err
      );

      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete mentor"
      );
    }
  };

  const activeMentors = mentors.filter(
    (mentor) => mentor.active
  ).length;

  const verifiedMentors = mentors.filter(
    (mentor) => mentor.emailVerified
  ).length;

  return (
    <div className="w-full space-y-6 sm:space-y-8">

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          justify-between
          gap-4
          lg:flex-row
          lg:items-center
        "
      >

        <div className="min-w-0">

          <p className="text-sm font-medium text-cyan-400">
            Brain Train Administration
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Mentor Management
          </h1>

          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
            View and manage all registered mentors.
          </p>

        </div>

        <button
          onClick={loadMentors}
          disabled={loading}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-white/10
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:w-auto
          "
        >

          <RefreshCw
            size={17}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* SUMMARY */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >

        <SummaryCard
          title="Total Mentors"
          value={mentors.length}
        />

        <SummaryCard
          title="Active Mentors"
          value={activeMentors}
        />

        <SummaryCard
          title="Verified Mentors"
          value={verifiedMentors}
        />

      </div>


      {/* SEARCH */}

      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
          p-4
          sm:p-5
        "
      >

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            type="text"
            placeholder="Search by name, email or Brain Train ID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/5
              py-3
              pl-11
              pr-4
              text-sm
              text-white
              outline-none
              placeholder:text-slate-600
              focus:border-cyan-500/50
            "
          />

        </div>

      </div>


      {/* ERROR */}

      {error && (
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
      )}


      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead
              className="
                border-b
                border-white/10
                bg-white/[0.03]
              "
            >

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Mentor
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Brain Train ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-white/5">

              {loading ? (

                <tr>
                  <td
                    colSpan={6}
                    className="
                      px-6
                      py-16
                      text-center
                      text-sm
                      text-slate-500
                    "
                  >
                    Loading mentors...
                  </td>
                </tr>

              ) : filteredMentors.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
                    className="
                      px-6
                      py-16
                      text-center
                      text-sm
                      text-slate-500
                    "
                  >
                    No mentors found.
                  </td>
                </tr>

              ) : (

                filteredMentors.map(
                  (mentor) => (

                    <tr
                      key={mentor.id}
                      className="
                        transition
                        hover:bg-white/[0.02]
                      "
                    >

                      {/* MENTOR */}

                      <td className="px-6 py-5">

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
                              text-sm
                              font-bold
                              text-cyan-400
                            "
                          >
                            {mentor.fullName
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">

                            <p className="font-medium text-white">
                              {mentor.fullName}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {mentor.email}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* ID */}

                      <td className="px-6 py-5">

                        <span className="text-sm text-slate-300">
                          {mentor.braintrainId ||
                            "Not assigned"}
                        </span>

                      </td>


                      {/* ROLE */}

                      <td className="px-6 py-5">

                        <span
                          className="
                            rounded-lg
                            bg-indigo-500/10
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-indigo-400
                          "
                        >
                          MENTOR
                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <div className="flex flex-col gap-1">

                          <span
                            className={
                              mentor.active
                                ? "text-xs font-medium text-emerald-400"
                                : "text-xs font-medium text-red-400"
                            }
                          >
                            {mentor.active
                              ? "Active"
                              : "Inactive"}
                          </span>

                          <span
                            className={
                              mentor.emailVerified
                                ? "text-[11px] text-cyan-400"
                                : "text-[11px] text-slate-500"
                            }
                          >
                            {mentor.emailVerified
                              ? "Email verified"
                              : "Email not verified"}
                          </span>

                        </div>

                      </td>


                      {/* JOINED */}

                      <td className="px-6 py-5">

                        <span className="text-sm text-slate-400">
                          {mentor.createdAt
                            ? new Date(
                                mentor.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <Link
                            href={`/dashboard/admin/users/${mentor.id}`}
                            className="
                              rounded-xl
                              border
                              border-white/10
                              bg-white/5
                              p-2.5
                              text-slate-400
                              transition
                              hover:bg-white/10
                              hover:text-white
                            "
                            title="View mentor"
                          >
                            <Eye size={17} />
                          </Link>

                          <Link
                            href={`/dashboard/admin/users/${mentor.id}/edit`}
                            className="
                              rounded-xl
                              border
                              border-white/10
                              bg-white/5
                              p-2.5
                              text-slate-400
                              transition
                              hover:bg-white/10
                              hover:text-cyan-400
                            "
                            title="Edit mentor"
                          >
                            <Edit size={17} />
                          </Link>

                          <button
                            onClick={() =>
                              deleteMentor(
                                mentor.id
                              )
                            }
                            className="
                              rounded-xl
                              border
                              border-red-500/10
                              bg-red-500/5
                              p-2.5
                              text-red-400
                              transition
                              hover:bg-red-500/10
                            "
                            title="Delete mentor"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
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

      <div className="flex items-center justify-between">

        <div className="text-cyan-400">
          <Users size={22} />
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

    </div>
  );
}