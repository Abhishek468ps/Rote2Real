"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* ---------------- TYPES ---------------- */

type Trait = "logic" | "leadership" | "stress" | "ethics";

type ResultPayload = {
  traitScores: Record<Trait, number>;
  totalScore: number;
  avgResponseTime: number;
  suspicious: boolean;
};

/* ---------------- CONSTANTS ---------------- */

const PASS_SCORE = 120;
const MAX_SCORE = 200;
const TRAIT_BENCHMARK = 40;

/* ---------------- COMPONENT ---------------- */

export default function PersonalityFailedPage() {
  const router = useRouter();
  const [result, setResult] = useState<ResultPayload | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("personalityResult");
    if (!stored) {
      router.replace("/");
      return;
    }
    setResult(JSON.parse(stored));
  }, []);

  if (!result) return null;

  /* ---------------- DERIVED METRICS ---------------- */

  const confidenceLevel =
    result.suspicious || result.avgResponseTime < 4
      ? "Low"
      : result.totalScore > PASS_SCORE - 10
      ? "Medium"
      : "High";

  const reasons: string[] = [];

  if (result.totalScore < PASS_SCORE) {
    reasons.push(
      "Overall assessment score did not meet the minimum qualification threshold."
    );
  }

  if (result.avgResponseTime < 5) {
    reasons.push(
      "Response timing indicates rapid decision making with limited evaluation depth."
    );
  }

  if (result.suspicious) {
    reasons.push(
      "Automated integrity signals were triggered based on response patterns."
    );
  }

  const traitAnalysis = Object.entries(result.traitScores).map(
    ([trait, score]) => ({
      trait,
      score,
      benchmark: TRAIT_BENCHMARK,
      status: score >= 30 ? "Acceptable" : "Needs Improvement",
    })
  );

  /* ---------------- PDF EXPORT ---------------- */

  const downloadPDF = async () => {
    const element = document.getElementById("report");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("personality-assessment-report.pdf");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div
        id="report"
        className="w-full max-w-4xl bg-white rounded-xl shadow p-8"
      >
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Assessment Outcome
        </h1>
        <p className="text-gray-600 mb-6">
          Status. Not selected for next evaluation stage
        </p>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <SummaryItem label="Final Score" value={`${result.totalScore} / ${MAX_SCORE}`} />
          <SummaryItem label="Required Score" value={PASS_SCORE} />
          <SummaryItem label="Confidence Level" value={confidenceLevel} />
          <SummaryItem label="Coding Round" value="Locked" />
        </div>

        {/* Trait Breakdown */}
        <div className="mb-6">
          <h2 className="font-medium mb-3">Trait Evaluation</h2>
          {traitAnalysis.map((t) => (
            <div key={t.trait} className="mb-3">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{t.trait}</span>
                <span>
                  {t.score} / {t.benchmark}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-600 rounded"
                  style={{
                    width: `${Math.min(
                      (t.score / t.benchmark) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{t.status}</p>
            </div>
          ))}
        </div>

        {/* Observations */}
        <div className="mb-6">
          <h2 className="font-medium mb-2">Assessment Observations</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 mb-6">
          This evaluation is generated through automated behavioral analysis.
          Scores are indicative and subject to organizational assessment policies.
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t pt-4">
          <button
            onClick={downloadPDF}
            className="px-5 py-2 rounded bg-blue-600 text-white"
          >
            Download PDF Report
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded bg-gray-900 text-white"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-gray-50 border rounded-lg p-4 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
}

