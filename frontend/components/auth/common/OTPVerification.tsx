"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { API_ENDPOINTS } from "@/lib/api";

interface OTPVerificationProps {
  email: string;
  brainTrainId?: string;
  type: "register" | "login";
  onVerify: () => void;
}

export default function OTPVerification({
  email,
  brainTrainId,
  type,
  onVerify,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(
    Array(6).fill("")
  );

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [timer, setTimer] =
    useState(60);

  const inputsRef =
    useRef<(HTMLInputElement | null)[]>([]);

  const otpSentRef =
    useRef(false);

  /* ==========================
      SEND OTP ONLY ONCE
  ========================== */

 useEffect(() => {
  if (type !== "register") {
    return;
  }

  if (otpSentRef.current) {
    return;
  }

  otpSentRef.current = true;

  sendOtp();
}, [type]);

  /* ==========================
      SEND OTP
  ========================== */

  const sendOtp = async () => {

  const endpoint =
    type === "login"
      ? API_ENDPOINTS.LOGIN_SEND_OTP
      : API_ENDPOINTS.SEND_OTP;

  const body =
    type === "login"
      ? {
          brainTrainId,
          email,
        }
      : {
          email,
        };

  try {

    const response =
      await fetch(endpoint, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });

    if (response.ok) {

      setMessage("OTP sent successfully.");

    } else {

      setMessage("Failed to send OTP.");

    }

  } catch {

    setMessage("Failed to send OTP.");

  }

};

  /* ==========================
      VERIFY OTP
  ========================== */

 const verifyOtp = async () => {

  const finalOtp = otp.join("");

  if (finalOtp.length !== 6) {

    setMessage("Please enter complete OTP");

    return;

  }

  setLoading(true);

  try {

    const endpoint =
      type === "login"
        ? API_ENDPOINTS.LOGIN_VERIFY_OTP
        : API_ENDPOINTS.VERIFY_OTP;

    const body =
      type === "login"
        ? {
            brainTrainId,
            email,
            otp: finalOtp,
          }
        : {
            email,
            otp: finalOtp,
          };

    const response =
      await fetch(endpoint, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),

      });

    if (!response.ok) {

      setMessage("Invalid OTP");

      setLoading(false);

      return;

    }

    if (type === "login") {

      const data =
        await response.json();

        console.log("LOGIN RESPONSE:", data);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
    "role",
    data.role
  );

    }

    setMessage("OTP verified successfully");

    onVerify();

  } catch {

    setMessage("Verification failed");

  }

  setLoading(false);

};

  /* ==========================
      TIMER
  ========================== */

  useEffect(() => {
    if (timer <= 0) return;

    const interval =
      setInterval(() => {
        setTimer(
          (prev) => prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [timer]);

  /* ==========================
      INPUT CHANGE
  ========================== */

  const handleChange = (
    value: string,
    index: number
  ) => {
    if (!/^\d?$/.test(value))
      return;

    const updatedOtp =
      [...otp];

    updatedOtp[index] =
      value;

    setOtp(updatedOtp);

    if (
      value &&
      index < 5
    ) {
      inputsRef.current[
        index + 1
      ]?.focus();
    }

    const finalOtp =
      updatedOtp.join("");

    if (
      finalOtp.length === 6
    ) {
      verifyOtpAutomatically(
        finalOtp
      );
    }
  };

  /* ==========================
      AUTO VERIFY
  ========================== */

 const verifyOtpAutomatically = async (
  finalOtp: string
) => {

  setLoading(true);

  try {

    const endpoint =
      type === "login"
        ? API_ENDPOINTS.LOGIN_VERIFY_OTP
        : API_ENDPOINTS.VERIFY_OTP;

    const body =
      type === "login"
        ? {
            brainTrainId,
            email,
            otp: finalOtp,
          }
        : {
            email,
            otp: finalOtp,
          };

    const response = await fetch(
      endpoint,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {

      setMessage("Invalid OTP");

      setLoading(false);

      return;
    }

    if (type === "login") {

      const data =
        await response.json();

         console.log("LOGIN RESPONSE:", data);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

       localStorage.setItem(
    "role",
    data.role
  );

    }

    setMessage(
      "OTP verified successfully"
    );

    onVerify();

  } catch {

    setMessage(
      "Verification failed"
    );

  }

  setLoading(false);

};

  /* ==========================
      BACKSPACE
  ========================== */

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key ===
        "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputsRef.current[
        index - 1
      ]?.focus();
    }
  };

  /* ==========================
      PASTE OTP
  ========================== */

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted =
      e.clipboardData
        .getData("text")
        .trim();

    if (
      !/^\d{6}$/.test(
        pasted
      )
    ) {
      return;
    }

    const digits =
      pasted.split("");

    setOtp(digits);

    verifyOtpAutomatically(
      pasted
    );
  };

  /* ==========================
      RESEND OTP
  ========================== */

 const resendOTP = async () => {

  setTimer(60);

  setOtp(Array(6).fill(""));

  inputsRef.current[0]?.focus();

  const endpoint =
    type === "login"
      ? API_ENDPOINTS.LOGIN_SEND_OTP
      : API_ENDPOINTS.SEND_OTP;

  const body =
    type === "login"
      ? {
          brainTrainId,
          email,
        }
      : {
          email,
        };

  await fetch(endpoint, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),

  });

};

  return (
    <div className="max-w-2xl mx-auto">

      <div className="flex justify-center">
        <div
          className="
          h-24
          w-24
          rounded-3xl
          bg-gradient-to-br
          from-indigo-600
          to-cyan-600
          flex
          items-center
          justify-center
          shadow-[0_0_60px_rgba(99,102,241,.5)]
          "
        >
          <Mail
            size={40}
            className="text-white"
          />
        </div>
      </div>

      <h2
        className="
        mt-8
        text-center
        text-4xl
        font-black
        text-white
        "
      >
        Verify Your Email
      </h2>

      <p
        className="
        mt-4
        text-center
        text-gray-400
        text-lg
        "
      >
        We've sent a verification code to
      </p>

      <p
        className="
        text-center
        text-indigo-400
        font-semibold
        mt-2
        "
      >
        {email}
      </p>

      {message && (
        <p
          className="
          mt-4
          text-center
          text-sm
          text-indigo-400
          "
        >
          {message}
        </p>
      )}

      <div
        className="
        mt-12
        flex
        justify-center
        gap-4
        "
      >
        {otp.map(
          (
            digit,
            index
          ) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[
                  index
                ] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onPaste={
                handlePaste
              }
              onKeyDown={(
                e
              ) =>
                handleKeyDown(
                  e,
                  index
                )
              }
              onChange={(
                e
              ) =>
                handleChange(
                  e.target
                    .value,
                  index
                )
              }
              className="
              h-16
              w-16
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              text-center
              text-2xl
              font-bold
              text-white
              outline-none
              backdrop-blur-xl
              transition-all
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-500/20
              "
            />
          )
        )}
      </div>

      <div
        className="
        mt-10
        flex
        items-center
        justify-center
        gap-2
        text-emerald-400
        "
      >
        <ShieldCheck size={18} />
        Secure OTP Verification
      </div>

      <div className="mt-10 text-center">
        {timer > 0 ? (
          <p className="text-gray-400">
            Resend OTP in{" "}
            <span className="text-white font-bold">
              {timer}s
            </span>
          </p>
        ) : (
          <button
            onClick={
              resendOTP
            }
            disabled={
              loading
            }
            className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            border
            border-indigo-500/30
            bg-indigo-500/10
            px-6
            py-3
            text-indigo-300
            transition
            hover:bg-indigo-500/20
            "
          >
            <RotateCcw size={18} />
            Resend OTP
          </button>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={
            verifyOtp
          }
          disabled={
            loading
          }
          className="
          px-8
          py-4
          rounded-2xl
          bg-indigo-600
          text-white
          font-semibold
          hover:bg-indigo-700
          transition
          disabled:opacity-50
          "
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}