"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OTPVerification from "@/components/auth/common/OTPVerification";
import Link from "next/link";
import { Mail, IdCard, ArrowRight } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api";
import { toast } from "sonner";

export default function LoginForm() {
  const [brainTrainId, setBrainTrainId] = useState("");
  const [email, setEmail] = useState("");
const router = useRouter();

const [showOtp, setShowOtp] = useState(false);
  const sendOtp = async () => {
    if (!brainTrainId.trim()) {
      toast.error("Please enter your Brain Train ID.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        API_ENDPOINTS.LOGIN_SEND_OTP,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brainTrainId,
            email,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Unable to send OTP.");
        return;
      }

      toast.success("OTP sent successfully.");
   setShowOtp(true);
      // Next step:
      // Show OTP Verification Component
    } catch {
      toast.error("Something went wrong.");
    }
  };

  if (showOtp) {
  return (
    <OTPVerification
      type="login"
      email={email}
      brainTrainId={brainTrainId}
      onVerify={() => {

        const storedUser = localStorage.getItem("user");
          if (!storedUser) {
    console.error("User data not found in localStorage");
    toast.error("User data not found. Please login again.");
    return;
  }
         const user = JSON.parse(storedUser);

           console.log("LOGIN USER:", user);
  console.log("LOGIN ROLE:", user.role);

  // Save role separately for ProfileMenu
  if (user.role) {
    localStorage.setItem(
      "role",
      user.role.toUpperCase()
    );
  }

       switch (user.role?.toUpperCase()) {
          case "STUDENT":
            router.push("/dashboard/student");
            break;

          case "ADMIN":
            router.push("/dashboard/admin");
            break;

          case "MENTOR":
            router.push("/dashboard/mentor");
            break;

          case "TRAINER":
            router.push("/dashboard/trainer");
            break;

          case "RECRUITER":
            router.push("/dashboard/recruiter");
            break;

           default:
      console.error("Unknown user role:", user.role);
      router.push("/dashboard");
        }
      }}
    />
  );
}

  return (
    <div
      className="
      w-full
      max-w-xl
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-2xl
      p-10
      "
    >
      <div className="text-center">

        <h1 className="text-5xl font-black text-white">
          Welcome Back
        </h1>

        <p className="mt-4 text-gray-400">
          Login to your Brain Train account
        </p>

      </div>

      <div className="mt-10 space-y-6">

        <div>

          <label className="mb-3 block text-sm text-gray-400">
            Brain Train ID
          </label>

          <div
            className="
            flex
            items-center
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-4
            "
          >
            <IdCard
              className="text-indigo-400"
              size={20}
            />

            <input
              type="text"
              placeholder="BT-STU-2026-0001"
              value={brainTrainId}
              onChange={(e) =>
                setBrainTrainId(e.target.value)
              }
              className="
              w-full
              bg-transparent
              px-4
              py-4
              outline-none
              text-white
              "
            />
          </div>

        </div>

        <div>

          <label className="mb-3 block text-sm text-gray-400">
            Email Address
          </label>

          <div
            className="
            flex
            items-center
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-4
            "
          >
            <Mail
              className="text-cyan-400"
              size={20}
            />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
              w-full
              bg-transparent
              px-4
              py-4
              outline-none
              text-white
              "
            />
          </div>

        </div>

      </div>

      <button
        onClick={sendOtp}
        className="
        mt-10
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-indigo-600
        to-cyan-600
        py-4
        font-semibold
        text-white
        shadow-[0_0_50px_rgba(99,102,241,.35)]
        hover:opacity-90
        transition
        "
      >
        <span className="flex items-center justify-center gap-2">
          Send OTP
          <ArrowRight size={18} />
        </span>
      </button>

      <div className="mt-8 text-center">

        <p className="text-sm text-gray-400">
          Don't have an account?
        </p>

        <Link
          href="/register/student"
          className="
          mt-2
          inline-block
          text-indigo-400
          hover:text-indigo-300
          font-semibold
          "
        >
          Create a Brain Train Account →
        </Link>

      </div>

    </div>
  );
}