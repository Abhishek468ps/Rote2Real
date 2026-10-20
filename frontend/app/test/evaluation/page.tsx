"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const PDFPreview = dynamic(
  () => import("@/components/pdf/PDFPreview"),
  { ssr: false }
);

import RazorpayButton from "@/components/payment/RazorpayButton";


/* ================= TYPES ================= */
type CandidateCategory = "intern" | "contributor";

type PersonalityResult = {
  score: number;
  traits: {
    logic: number;
    ethics: number;
    leadership: number;
    stress: number;
  };
};

type CodingResult = {
  totalScore: number;
  plagiarismRisk: "low" | "medium" | "high";
};

/* ================= MOCK DATA ================= */
const candidateCategory: CandidateCategory = "intern"; 

const personalityResult: PersonalityResult = {
  score: 72,
  traits: {
    logic: 75,
    ethics: 60,
    leadership: 70,
    stress: 83,
  },
};

const codingResult: CodingResult = {
  totalScore: 138,
  plagiarismRisk: "low",
};

/* ================= PAGE ================= */

export default function EvaluationPage() {
  const [paid, setPaid] = useState(false);

  const evaluation = useMemo(() => {
    const personalityPercent = personalityResult.score;
    const codingPercent = (codingResult.totalScore / 200) * 100;

    const finalScore =
      personalityPercent * 0.4 + codingPercent * 0.6;

    let status: "Recommended" | "Borderline" | "Not Recommended";

    if (codingResult.plagiarismRisk === "high") {
      status = "Not Recommended";
    } else if (finalScore >= 75) {
      status = "Recommended";
    } else if (finalScore >= 60) {
      status = "Borderline";
    } else {
      status = "Not Recommended";
    }

    return {
      finalScore: Math.round(finalScore),
      status,
    };
  }, []);

  const requiresPayment =
    candidateCategory === "intern" &&
    evaluation.status !== "Not Recommended";

  const reportUnlocked =
    candidateCategory === "contributor" || paid;

  const reportData = {
     category: candidateCategory,
    personalityScore: personalityResult.score,
    codingScore: codingResult.totalScore,
    finalScore: evaluation.finalScore,
    plagiarismRisk: codingResult.plagiarismRisk,
    recommendation: evaluation.status,
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Assessment Evaluation
          </h1>
          <p className="text-gray-600 mt-2">
            Category. {candidateCategory.toUpperCase()}
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Final Score</p>
            <p className="text-4xl font-bold">
              {evaluation.finalScore} / 100
            </p>
            <p className="mt-2 text-sm">
              Status:{" "}
              <span
                className={`font-semibold ${
                  evaluation.status === "Recommended"
                    ? "text-green-600"
                    : evaluation.status === "Borderline"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {evaluation.status}
              </span>
            </p>
          </div>

           {requiresPayment && !paid && (
            <RazorpayButton
              amount={499}
              onSuccess={() => setPaid(true)}
            />
          )}

          {!requiresPayment && (
            <span className="text-green-600 font-semibold">
              Payment Not Required
            </span>
          )}

          {paid && (
            <span className="text-green-600 font-semibold">
              Payment Completed
            </span>
          )}
        </div>

        {/* Personality Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Personality Summary
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(personalityResult.traits).map(
              ([trait, value]) => (
                <div key={trait}>
                  <p className="text-sm capitalize">{trait}</p>
                  <div className="w-full bg-gray-200 rounded h-2 mt-1">
                    <div
                      className="bg-indigo-600 h-2 rounded"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        

        {/* PDF REPORT */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Evaluation Report
          </h2>

          <PDFPreview
            data={reportData}
            unlocked={reportUnlocked}
          />
        </div>

        {/* Footer Explanation */}
        <div className="bg-indigo-50 border border-indigo-200 rounded p-6">
          <p className="text-sm text-indigo-900">
            This report is system generated using behavioral analysis,
            plagiarism signals, and performance scoring. Payment is
            required only to unlock downloadable reports and
            certificates.
          </p>
        </div>
      </div>
    </div>
  );
}
