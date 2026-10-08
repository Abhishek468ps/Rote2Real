"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
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
  type Rote2RealExercise,
  type Rote2RealProgress,
} from "@/lib/rote2real";

function isComplete(status?: string | null) {
  return (status || "").toUpperCase() === "COMPLETED";
}

export default function Rote2RealDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<Rote2RealExercise[]>([]);
  const [progress, setProgress] = useState<Rote2RealProgress | null>(null);

  useEffect(() => {
    const session = getRote2RealSession();
    if (!session?.studentId || !session.enrolled) {
      router.replace("/rote2real/register");
      return;
    }

    Promise.all([
      rote2realApi.getExercises(session.studentId),
      rote2realApi.getProgress(session.studentId),
    ])
      .then(([exerciseList, progressData]) => {
        setExercises(exerciseList);
        setProgress(progressData);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Unable to load dashboard.");
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

  const percent = Number(progress?.completionPercentage ?? 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Your sprint</h1>
          <p className="mt-1 text-sm text-slate-400">
            {progress?.studentName
              ? `Welcome back, ${progress.studentName}.`
              : "Complete one exercise each day and attach evidence."}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/rote2real/report">
            Open report
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Completed</CardDescription>
            <CardTitle>
              {progress?.completedExercises ?? 0}/{progress?.totalExercises ?? 20}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending</CardDescription>
            <CardTitle>{progress?.pendingExercises ?? 20}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Completion</CardDescription>
            <CardTitle>{percent.toFixed(0)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {progress?.categoryProgress && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Category progress</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.keys(progress.categoryTotals || {}).map((category) => {
              const total = progress.categoryTotals?.[category] ?? 0;
              const done = progress.categoryProgress?.[category] ?? 0;
              return (
                <div key={category} className="rounded-xl border border-slate-800 p-3">
                  <p className="text-sm font-medium text-white">{formatCategory(category)}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {done} of {total} complete
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {exercises.map((exercise) => {
          const complete = isComplete(exercise.submissionStatus);
          return (
            <Link
              key={exercise.id}
              href={`/rote2real/exercise/${exercise.dayNumber}`}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 transition hover:border-indigo-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                    Day {exercise.dayNumber}
                  </p>
                  <h2 className="mt-1 font-semibold text-white">{exercise.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">{formatCategory(exercise.category)}</p>
                </div>
                {complete ? (
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
                ) : (
                  <Circle className="size-5 shrink-0 text-slate-600" />
                )}
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-slate-400">{exercise.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
