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

type AdminStudent = {
  id: number;
  braintrainId: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  role: string | null;
  emailVerified: boolean;
  active: boolean;
  createdAt: string | null;
  paymentCompleted: boolean;
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
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
          `Failed to fetch students: ${response.status}`
        );
      }

      const data: AdminStudent[] =
        await response.json();

      /*
       * Only STUDENT users are shown
       */
      const studentUsers = data.filter(
        (user) => user.role === "STUDENT"
      );

      setStudents(studentUsers);
    } catch (err) {
      console.error(
        "Students loading error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load students"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  /*
   * SEARCH
   */

  const filteredStudents = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    if (!searchValue) {
      return students;
    }

    return students.filter((student) => {
      return (
        student.fullName
          ?.toLowerCase()
          .includes(searchValue) ||
        student.email
          ?.toLowerCase()
          .includes(searchValue) ||
        student.braintrainId
          ?.toLowerCase()
          .includes(searchValue) ||
        student.phone
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [students, search]);

  /*
   * DELETE STUDENT
   */

  const deleteStudent = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

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
        const message =
          await response.text();

        throw new Error(
          message ||
            `Failed to delete student: ${response.status}`
        );
      }

      /*
       * Remove deleted student immediately
       * from UI without another API request.
       */

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) => student.id !== id
        )
      );
    } catch (err) {
      console.error(
        "Delete student error:",
        err
      );

      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete student"
      );
    }
  };

  /*
   * SUMMARY COUNTS
   */

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.active
  ).length;

  const verifiedStudents = students.filter(
    (student) => student.emailVerified
  ).length;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div className="min-w-0">

          <p className="text-sm font-medium text-cyan-400">
            Brain Train Administration
          </p>

          <h1
            className="
              mt-1
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            "
          >
            Student Management
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-400
            "
          >
            View and manage all registered
            students on the platform.
          </p>

        </div>


        {/* REFRESH */}

        <button
          type="button"
          onClick={loadStudents}
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


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

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
          title="Total Students"
          value={totalStudents}
          icon={<Users size={22} />}
        />

        <SummaryCard
          title="Active Students"
          value={activeStudents}
          icon={<Users size={22} />}
        />

        <SummaryCard
          title="Verified Students"
          value={verifiedStudents}
          icon={<Users size={22} />}
        />

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

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

        <div className="relative w-full">

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
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="
              Search by name, email, phone or Brain Train ID...
            "
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


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            p-4
            text-sm
            leading-6
            text-red-400
          "
        >
          {error}
        </div>
      )}


      {/* =====================================================
          STUDENTS TABLE
      ===================================================== */}

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

          <table
            className="
              w-full
              min-w-[900px]
            "
          >

            {/* TABLE HEADER */}

            <thead
              className="
                border-b
                border-white/10
                bg-white/[0.03]
              "
            >

              <tr>

                <th
                  className="
                    px-4
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    sm:px-6
                  "
                >
                  Student
                </th>

                <th
                  className="
                    px-4
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    sm:px-6
                  "
                >
                  Brain Train ID
                </th>

                <th
                  className="
                    px-4
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    sm:px-6
                  "
                >
                  Phone
                </th>

                <th
                  className="
                    px-4
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    sm:px-6
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-4
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    sm:px-6
                  "
                >
                  Joined
                </th>

                <th
                  className="
                    px-4
                    py-4
                    text-right
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    sm:px-6
                  "
                >
                  Actions
                </th>

              </tr>

            </thead>


            {/* TABLE BODY */}

            <tbody
              className="
                divide-y
                divide-white/5
              "
            >

              {/* LOADING */}

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
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3
                      "
                    >

                      <RefreshCw
                        size={22}
                        className="
                          animate-spin
                          text-cyan-400
                        "
                      />

                      Loading students...

                    </div>
                  </td>

                </tr>

              ) : filteredStudents.length === 0 ? (

                /* EMPTY */

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

                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3
                      "
                    >

                      <Users
                        size={30}
                        className="text-slate-600"
                      />

                      <span>
                        {search
                          ? "No students match your search."
                          : "No students found."
                        }
                      </span>

                    </div>

                  </td>

                </tr>

              ) : (

                /* STUDENTS */

                filteredStudents.map(
                  (student) => (

                    <tr
                      key={student.id}
                      className="
                        transition
                        hover:bg-white/[0.02]
                      "
                    >

                      {/* STUDENT */}

                      <td className="px-4 py-5 sm:px-6">

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          {/* AVATAR */}

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
                            {student.fullName
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>


                          {/* NAME + EMAIL */}

                          <div className="min-w-0">

                            <p
                              className="
                                truncate
                                font-medium
                                text-white
                              "
                            >
                              {student.fullName}
                            </p>

                            <p
                              className="
                                mt-1
                                max-w-[220px]
                                truncate
                                text-xs
                                text-slate-500
                              "
                            >
                              {student.email}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* BRAIN TRAIN ID */}

                      <td className="px-4 py-5 sm:px-6">

                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            text-slate-300
                          "
                        >
                          {student.braintrainId ||
                            "Not assigned"}
                        </span>

                      </td>


                      {/* PHONE */}

                      <td className="px-4 py-5 sm:px-6">

                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            text-slate-400
                          "
                        >
                          {student.phone ||
                            "Not provided"}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-4 py-5 sm:px-6">

                        <div
                          className="
                            flex
                            flex-col
                            gap-1
                          "
                        >

                          <span
                            className={
                              student.active
                                ? `
                                  text-xs
                                  font-medium
                                  text-emerald-400
                                `
                                : `
                                  text-xs
                                  font-medium
                                  text-red-400
                                `
                            }
                          >
                            {student.active
                              ? "Active"
                              : "Inactive"}
                          </span>

                          <span
                            className={
                              student.emailVerified
                                ? `
                                  text-[11px]
                                  text-cyan-400
                                `
                                : `
                                  text-[11px]
                                  text-slate-500
                                `
                            }
                          >
                            {student.emailVerified
                              ? "Email verified"
                              : "Email not verified"}
                          </span>

                        </div>

                      </td>


                      {/* JOINED */}

                      <td className="px-4 py-5 sm:px-6">

                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            text-slate-400
                          "
                        >
                          {student.createdAt
                            ? new Date(
                                student.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td className="px-4 py-5 sm:px-6">

                        <div
                          className="
                            flex
                            justify-end
                            gap-2
                          "
                        >

                          {/* VIEW */}

                          <Link
                            href={`/dashboard/admin/users/${student.id}`}
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
                            title="View student"
                          >
                            <Eye size={17} />
                          </Link>


                          {/* EDIT */}

                          <Link
                            href={`/dashboard/admin/users/${student.id}/edit`}
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
                            title="Edit student"
                          >
                            <Edit size={17} />
                          </Link>


                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              deleteStudent(
                                student.id
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
                            title="Delete student"
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


      {/* =====================================================
          MOBILE TABLE NOTE
      ===================================================== */}

      {!loading &&
        filteredStudents.length > 0 && (
          <p
            className="
              text-center
              text-xs
              text-slate-600
              lg:hidden
            "
          >
            Swipe horizontally to view all
            student details.
          </p>
        )}

    </div>
  );
}


/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
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

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

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

      <p
        className="
          mt-1
          text-2xl
          font-bold
          text-white
          sm:text-3xl
        "
      >
        {value}
      </p>

    </div>
  );
}