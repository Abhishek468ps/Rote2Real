"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import {
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineCode,
  AiOutlineBarChart,
  AiOutlineCreditCard,
  AiOutlineLock,
  AiOutlineCheck,
} from "react-icons/ai";

type StepStatus = "completed" | "active" | "locked";

type Step = {
  label: string;
  icon: React.ReactNode;
  status: StepStatus;
};

export default function TestInstructionsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [personalityPassed, setPersonalityPassed] = useState(false);

   useEffect(() => {
    const passed =
      typeof window !== "undefined" &&
      localStorage.getItem("personalityPassed") === "true";
    setPersonalityPassed(passed);
  }, []);

  const handleStartTest = () => {
    if (agreed) router.push("/test/personality");
  };

  const steps: {
    label: string;
    icon: React.ReactNode;
    status: StepStatus;
  }[] = [
    {
      label: "Registration",
      icon: <AiOutlineUser />,
      status: "completed",
    },
    {
      label: "Personality Test",
      icon: <AiOutlineFileText />,
      status: "active",
    },
    {
      label: "Coding Test",
      icon: <AiOutlineCode />,
      status: personalityPassed ? "active" : "locked",
    },
    {
      label: "Score Evaluation",
      icon: <AiOutlineBarChart />,
      status: personalityPassed ? "locked" : "locked",
    },
    {
      label: "Payment / Reattempt",
      icon: <AiOutlineCreditCard />,
      status: "locked",
    },
  ];

  const getStepStyle = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "active":
        return "bg-blue-100 text-blue-600";
      case "locked":
        return "bg-gray-200 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-10 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Test Instructions
          </h1>
          <p className="text-gray-600 text-lg">
            Read carefully before starting the assessment
          </p>
        </div>

        {/* Stepper */}
        <div className="relative flex items-center justify-between">
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center z-10">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getStepStyle(
                  step.status
                )}`}
              >
                {step.status === "completed" ? (
                  <AiOutlineCheck />
                ) : step.status === "locked" ? (
                  <AiOutlineLock />
                ) : (
                  step.icon
                )}
              </div>

              <span
                className={`mt-2 text-sm font-medium ${
                  step.status === "locked"
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Important Rules */}
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-2xl space-y-2">
          <h2 className="text-xl font-semibold text-red-800">
            Important Rules
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            <li>AI tools are strictly prohibited during the assessment.</li>
            <li>Any form of plagiarism leads to immediate disqualification.</li>
            <li>Navigation tricks or random clicks are monitored.</li>
            <li>Tests must be completed in a single uninterrupted session.</li>
            <li>Violations may result in permanent rejection.</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-blue-800">
            Performance Guidelines
          </h2>
          <p className="text-gray-700 text-sm mt-1">
            Choose a quiet environment. Answer honestly. Personality score
            determines eligibility for the coding round.
          </p>
        </div>

        {/* Agreement */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-5 h-5 text-blue-600 rounded border-gray-300"
          />
          <label className="text-gray-700 text-sm">
            I agree to all rules and acknowledge the evaluation policy
          </label>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <button
            onClick={handleStartTest}
            disabled={!agreed}
            className={`px-12 py-3 w-48 rounded-xl text-lg font-semibold transition shadow-md ${
              agreed
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Start Personality Test
          </button>
        </div>
      </div>
    </div>
  );
}
