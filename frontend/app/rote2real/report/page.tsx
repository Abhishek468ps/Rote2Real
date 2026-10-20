"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  formatCategory,
  getRote2RealSession,
  rote2realApi,
  type Rote2RealReport,
} from "@/lib/rote2real";

function levelStyles(level?: string) {
  const value = (level || "INCOMPLETE").toUpperCase();
  if (value === "GOLD") return "border-amber-400/40 bg-amber-400/10 text-amber-200";
  if (value === "SILVER") return "border-slate-300/40 bg-slate-300/10 text-slate-100";
  if (value === "BRONZE") return "border-orange-400/40 bg-orange-400/10 text-orange-200";
  return "border-slate-700 bg-slate-800/60 text-slate-300";
}

export default function Rote2RealReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Rote2RealReport | null>(null);

  useEffect(() => {
    const session = getRote2RealSession();
    if (!session?.studentId || !session.enrolled) {
      router.replace("/rote2real/register");
      return;
    }

    rote2realApi
      .getReport(session.studentId)
      .then(setReport)
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Report could not be generated.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Report unavailable</CardTitle>
          <CardDescription>
            Complete at least one exercise, then return to generate your evaluation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/rote2real/dashboard">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const skillAreas = Object.values(report.skillAreas || {});

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Evaluation report</h1>
          <p className="mt-1 text-sm text-slate-400">
            {report.studentName} · {report.studentEmail}
          </p>
        </div>
        <div
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${levelStyles(
            report.achievementLevel
          )}`}
        >
          {report.achievementLevel}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Final score</CardDescription>
            <CardTitle>{Number(report.finalScore || 0).toFixed(1)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Completion</CardDescription>
            <CardTitle>{Number(report.completionPercentage || 0).toFixed(0)}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Evidence score</CardDescription>
            <CardTitle>{Number(report.evidenceScore || 0).toFixed(1)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Consistency</CardDescription>
            <CardTitle>{Number(report.consistencyPercentage || 0).toFixed(0)}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Skill areas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {skillAreas.length === 0 && (
            <p className="text-sm text-slate-400">No skill-area data yet.</p>
          )}
          {skillAreas.map((area) => (
            <div key={area.category} className="rounded-xl border border-slate-800 p-4">
              <p className="font-medium text-white">{formatCategory(area.category)}</p>
              <p className="mt-1 text-sm text-slate-400">
                {area.completed}/{area.total} complete · avg {Number(area.averageScore || 0).toFixed(1)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exercise results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(report.exerciseResults || []).length === 0 && (
            <p className="text-sm text-slate-400">No submissions yet.</p>
          )}
          {(report.exerciseResults || []).map((item) => (
            <Link
              key={item.id}
              href={`/rote2real/exercise/${item.dayNumber}`}
              className="block rounded-xl border border-slate-800 p-4 hover:border-indigo-500/40"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-white">
                  Day {item.dayNumber}: {item.exerciseTitle}
                </p>
                <span className="text-xs uppercase text-slate-500">{item.status}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {formatCategory(item.category)}
                {item.qualityScore != null ? ` · quality ${item.qualityScore}/10` : ""}
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
