"use client";

import { useState, useMemo } from "react";

type User = {
  id: string;
  name: string;
  github: string;
  is2FAEnabled: boolean;
  lastLogin: string;
};

const PAGE_SIZE = 5;

export default function InternsPage() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Monika Singh",
      github: "SinghMonika1324",
      is2FAEnabled: false,
      lastLogin: "Today, 10:40 AM",
    },
    {
      id: "2",
      name: "Rahul Sharma",
      github: "rahul-dev",
      is2FAEnabled: true,
      lastLogin: "Yesterday, 6:15 PM",
    },
    {
      id: "3",
      name: "Neha Gupta",
      github: "nehagupta",
      is2FAEnabled: true,
      lastLogin: "2 days ago",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter2FA, setFilter2FA] = useState<"all" | "enabled" | "disabled">("all");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.github.toLowerCase().includes(search.toLowerCase());

      const match2FA =
        filter2FA === "all"
          ? true
          : filter2FA === "enabled"
          ? u.is2FAEnabled
          : !u.is2FAEnabled;

      return matchSearch && match2FA;
    });
  }, [users, search, filter2FA]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedUsers = filteredUsers.slice(start, start + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-zinc-100 p-8 text-zinc-900">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold">Intern Management</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Manage intern access, security and project assignment
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or GitHub username"
          className="w-72 px-4 py-2 border border-zinc-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filter2FA}
          onChange={(e) => {
            setFilter2FA(e.target.value as any);
            setPage(1);
          }}
          className="px-4 py-2 border border-zinc-300 rounded-lg bg-white"
        >
          <option value="all">All 2FA Status</option>
          <option value="enabled">2FA Enabled</option>
          <option value="disabled">2FA Not Enabled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="p-4 text-left">Intern</th>
              <th className="p-4 text-left">GitHub</th>
              <th className="p-4 text-left">Security</th>
              <th className="p-4 text-left">Last Login</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                <td className="p-4 font-medium">{user.name}</td>

                <td className="p-4 text-blue-600">@{user.github}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.is2FAEnabled
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.is2FAEnabled ? "2FA Enabled" : "2FA Required"}
                  </span>
                </td>

                <td className="p-4 text-zinc-500">{user.lastLogin}</td>

                <td className="p-4">
                  <button
                    disabled={!user.is2FAEnabled}
                    onClick={() => setSelectedUser(user)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      user.is2FAEnabled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    Assign Project
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-zinc-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Assign Project Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Assign Project</h3>

            <p className="text-sm text-zinc-600">
              Assigning project to <b>{selectedUser.name}</b>
            </p>

            <input
              placeholder="Project name"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2"
            />

            <textarea
              placeholder="Project description"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-zinc-200 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
