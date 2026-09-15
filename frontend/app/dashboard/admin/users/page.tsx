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

type AdminUser = {
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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const loadUsers = async () => {
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
          `Failed to fetch users: ${response.status}`
        );
      }

      const data: AdminUser[] = await response.json();

      setUsers(data);
    } catch (err) {
      console.error("Users loading error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.fullName
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue) ||
        user.braintrainId
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const deleteUser = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
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
          `Failed to delete user: ${response.status}`
        );
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== id
        )
      );
    } catch (err) {
      console.error("Delete user error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete user"
      );
    }
  };

  return (
    <div className="space-y-8">

     

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>
          <p className="text-sm font-medium text-cyan-400">
            Brain Train Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            User Management
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            View and manage all registered platform users.
          </p>
        </div>

        <button
          onClick={loadUsers}
          disabled={loading}
          className="
            inline-flex
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
          "
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>

      </div>


     
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <SummaryCard
          title="Total Users"
          value={users.length}
          icon={<Users size={22} />}
        />

        <SummaryCard
  title="Active Users"
  value={
    users.filter(
      (user) => user.active
    ).length
  }
  icon={<Users size={22} />}
/>

<SummaryCard
  title="Verified Users"
  value={
    users.filter(
      (user) => user.emailVerified
    ).length
  }
  icon={<Users size={22} />}

/>
      </div>


      <div
        className="
          flex
          flex-col
          gap-4
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
          p-5
          md:flex-row
        "
      >

        <div className="relative flex-1">

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


        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
          className="
            rounded-2xl
            border
            border-white/10
            bg-[#111827]
            px-4
            py-3
            text-sm
            text-white
            outline-none
          "
        >
          <option value="ALL">
            All Roles
          </option>

          <option value="ADMIN">
            Admin
          </option>

          <option value="STUDENT">
            Student
          </option>

          <option value="MENTOR">
            Mentor
          </option>

          <option value="TRAINER">
            Trainer
          </option>

          <option value="RECRUITER">
            Recruiter
          </option>

          <option value="COMPANY">
            Company
          </option>

          <option value="INSTITUTION">
            Institution
          </option>

          <option value="DOCTOR">
            Doctor
          </option>

          <option value="LAWYER">
            Lawyer
          </option>

          <option value="JUDGE">
            Judge
          </option>

          <option value="VIEWER">
            Viewer
          </option>

        </select>

      </div>


     

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

          <table className="w-full min-w-[1000px]">

            <thead className="border-b border-white/10 bg-white/[0.03]">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
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
                    className="px-6 py-16 text-center text-sm text-slate-500"
                  >
                    Loading users...
                  </td>
                </tr>

              ) : filteredUsers.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-sm text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="transition hover:bg-white/[0.02]"
                  >

                   

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
                          {user.fullName
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="font-medium text-white">
                            {user.fullName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {user.email}
                          </p>

                        </div>

                      </div>

                    </td>


                   

                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-300">
                        {user.braintrainId || "Not assigned"}
                      </span>

                    </td>


                    

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
                        {user.role || "N/A"}
                      </span>

                    </td>


                   

                    <td className="px-6 py-5">

                      <div className="flex flex-col gap-1">

                        <span
                          className={
                            user.active
                              ? "text-xs font-medium text-emerald-400"
                              : "text-xs font-medium text-red-400"
                          }
                        >
                          {user.active
                            ? "Active"
                            : "Inactive"}
                        </span>

                        <span
                          className={
                            user.emailVerified
                              ? "text-[11px] text-cyan-400"
                              : "text-[11px] text-slate-500"
                          }
                        >
                          {user.emailVerified
                            ? "Email verified"
                            : "Email not verified"}
                        </span>

                      </div>

                    </td>


                    

                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-400">
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>

                    </td>


                   

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-2">

                        <Link
                          href={`/dashboard/admin/users/${user.id}`}
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
                          title="View user"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/dashboard/admin/users/${user.id}/edit`}
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
                          title="Edit user"
                        >
                          <Edit size={17} />
                        </Link>

                        <button
                          onClick={() =>
                            deleteUser(user.id)
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
                          title="Delete user"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}




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
        p-6
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

    </div>
  );
}

