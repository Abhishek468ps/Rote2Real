"use client";

import { useState } from "react";

export default function SubmitProject() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    techStack: "",
    estimatedDays: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.techStack) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    // API integration later
    setTimeout(() => {
      setLoading(false);
      alert("Project proposal submitted for admin approval");
      setForm({
        name: "",
        description: "",
        techStack: "",
        estimatedDays: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-xl bg-white rounded-xl shadow-md border border-zinc-200 p-6">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-1">
          Propose New Project
        </h2>
        <p className="text-sm text-zinc-600 mb-6">
          Submit your project idea for mentor and admin approval
        </p>

        <div className="space-y-5">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Project Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Central Facility Portal"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Project Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Briefly explain what this project does and the problem it solves"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Tech Stack *
            </label>
            <input
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
              placeholder="Next.js, MongoDB, Tailwind"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Estimated Days */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Estimated Duration (Days)
            </label>
            <input
              name="estimatedDays"
              value={form.estimatedDays}
              onChange={handleChange}
              type="number"
              placeholder="30"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit for Approval"}
          </button>
        </div>
      </div>
    </div>
  );
}


