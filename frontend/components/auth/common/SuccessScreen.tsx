"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  User,
  Sparkles,
  Building2,
} from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api"; 

interface SuccessScreenProps {
  fullName: string;
  role: string;
  brainTrainId: string;
  dashboardUrl: string;
}

export default function SuccessScreen({
  fullName,
  role,
  brainTrainId,
  dashboardUrl,
}: SuccessScreenProps) {
  const [countdown, setCountdown] =
    useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href =
        dashboardUrl;
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 2000);

    return () =>
      clearInterval(interval);
  }, [countdown, dashboardUrl]);

  return (
    <div className="max-w-4xl mx-auto">

      {/* Success Icon */}

      <div className="flex justify-center">

        <div
          className="
          relative
          h-32
          w-32
          rounded-full
          bg-gradient-to-br
          from-emerald-500
          to-green-600
          flex
          items-center
          justify-center
          shadow-[0_0_80px_rgba(34,197,94,.45)]
          "
        >
          <CheckCircle2
            size={72}
            className="text-white"
          />

          <div
            className="
            absolute
            inset-0
            rounded-full
            animate-ping
            bg-emerald-500/20
            "
          />
        </div>

      </div>

      {/* Heading */}

      <h1
        className="
        mt-10
        text-center
        text-5xl
        font-black
        text-white
        "
      >
        Welcome to
        {" "}
        <span
          className="
          bg-gradient-to-r
          from-indigo-400
          via-cyan-400
          to-blue-500
          bg-clip-text
          text-transparent
          "
        >
          Brain Train
        </span>
      </h1>

      <p
        className="
        mt-6
        text-center
        text-xl
        text-gray-400
        "
      >
        Your account has been created successfully.
      </p>

      {/* User Card */}

      <div
        className="
        mt-14
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-10
        "
      >
        <div className="grid md:grid-cols-3 gap-6">

          <div
            className="
            rounded-2xl
            bg-white/[0.03]
            p-6
            "
          >
            <User
              className="text-indigo-400"
              size={28}
            />

            <p className="mt-4 text-sm text-gray-400">
              Full Name
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              {fullName}
            </h3>
          </div>

          <div
            className="
            rounded-2xl
            bg-white/[0.03]
            p-6
            "
          >
            <Building2
              className="text-cyan-400"
              size={28}
            />

            <p className="mt-4 text-sm text-gray-400">
              Role
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              {role}
            </h3>
          </div>

          <div
            className="
            rounded-2xl
            bg-white/[0.03]
            p-6
            "
          >
            <Sparkles
              className="text-emerald-400"
              size={28}
            />

            <p className="mt-4 text-sm text-gray-400">
              Brain Train ID
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              {brainTrainId}
            </h3>
          </div>

        </div>
      </div>

      {/* Countdown */}

      <div className="mt-10 text-center">

        <p className="text-gray-400">
          Redirecting to dashboard in
        </p>

        <h2
          className="
          mt-2
          text-6xl
          font-black
          text-indigo-400
          "
        >
          {countdown}
        </h2>

      </div>

      {/* Actions */}

      <div
        className="
        mt-12
        flex
        flex-wrap
        justify-center
        gap-5
        "
      >
        <button
         onClick={() =>
    window.open(
      API_ENDPOINTS.DOWNLOAD_WELCOME_KIT(brainTrainId),
      "_blank"
    )
  }
          className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          px-8
          py-4
          text-white
          hover:bg-white/[0.05]
          transition
          "
        >
          <Download size={20} />

          Download Welcome Kit
        </button>

        <Link
          href="/profile/complete"
          className="
          flex
          items-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-cyan-600
          px-8
          py-4
          font-semibold
          text-white
          shadow-[0_0_50px_rgba(99,102,241,.35)]
          "
        >
          Complete Profile

          <ArrowRight size={20} />
        </Link>

        <Link
          href="/dashboard/community"
          className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-indigo-500/30
          bg-indigo-500/10
          px-8
          py-4
          text-indigo-300
          hover:bg-indigo-500/20
          transition
          "
        >
          Join Community
        </Link>

        <Link
  href="/login"
  className="
    flex
    items-center
    gap-3
    rounded-2xl
    border
    border-green-500/30
    bg-green-500/10
    px-8
    py-4
    text-green-300
    hover:bg-green-500/20
    transition
  "
>
  Login
</Link>

      </div>

    </div>
  );
}