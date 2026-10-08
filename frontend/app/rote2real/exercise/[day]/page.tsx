"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/lib/rote2real";

export default function Rote2RealExercisePage() {
  const params = useParams<{ day: string }>();
  const router = useRouter();
  const dayParam = Array.isArray(params.day) ? params.day[0] : params.day;
  const day = Number(dayParam);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exercise, setExercise] = useState<Rote2RealExercise | null>(null);
  const [evidenceText, setEvidenceText] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    const session = getRote2RealSession();
    if (!session?.studentId || !session.enrolled) {
      router.replace("/rote2real/register");
      return;
    }
    if (!Number.isInteger(day) || day < 1 || day > 20) {
      router.replace("/rote2real/dashboard");
      return;
    }

    rote2realApi
      .getExerciseByDay(day, session.studentId)
      .then((data) => {
        setExercise(data);
        setEvidenceText(data.evidenceText || "");
        setEvidenceUrl(data.evidenceUrl || "");
        setFilePath(data.evidenceFilePath || "");
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Exercise could not be loaded.");
        router.replace("/rote2real/dashboard");
      })
      .finally(() => setLoading(false));
  }, [day, router]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const session = getRote2RealSession();
    if (!session || !exercise) return;

    const type = (exercise.evidenceType || "text").toLowerCase();
    if (type === "link" && !evidenceUrl.trim() && !file && !filePath) {
      toast.error("Add a link or upload a file as evidence.");
      return;
    }
    if (type !== "link" && !evidenceText.trim() && !evidenceUrl.trim() && !file && !filePath) {
      toast.error("Add text, a link, or a file as evidence.");
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("File size must not exceed 10 MB.");
      return;
    }

    setSaving(true);
    try {
      let uploadedPath = filePath;
      if (file) {
        uploadedPath = await rote2realApi.uploadEvidence(
          session.studentId,
          exercise.id,
          file
        );
        setFilePath(uploadedPath);
      }

      await rote2realApi.submitEvidence(session.studentId, {
        exerciseId: exercise.id,
        evidenceText: evidenceText.trim(),
        evidenceUrl: evidenceUrl.trim(),
        evidenceFilePath: uploadedPath,
      });
      toast.success(`Day ${day} submitted.`);
      router.push("/rote2real/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Submission failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !exercise) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const prevDay = day > 1 ? day - 1 : null;
  const nextDay = day < 20 ? day + 1 : null;
  const complete = (exercise.submissionStatus || "").toUpperCase() === "COMPLETED";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/rote2real/dashboard">
            <ArrowLeft className="size-4" />
            Dashboard
          </Link>
        </Button>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {complete ? "Submitted" : "Not submitted"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
            Day {exercise.dayNumber} · {formatCategory(exercise.category)}
          </p>
          <CardTitle>{exercise.title}</CardTitle>
          <CardDescription>{exercise.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="evidenceText">Written evidence</Label>
              <textarea
                id="evidenceText"
                rows={7}
                value={evidenceText}
                onChange={(e) => setEvidenceText(e.target.value)}
                placeholder="Describe what you did, what you learned, and what you would improve."
                className="w-full rounded-xl border border-slate-800/80 bg-slate-900/80 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evidenceUrl">Evidence link</Label>
              <Input
                id="evidenceUrl"
                type="url"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder="https://github.com/... or a demo URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evidenceFile">Upload file (optional, max 10 MB)</Label>
              <Input
                id="evidenceFile"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {filePath && (
                <p className="text-xs text-slate-500">Previously uploaded: {filePath}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving…" : complete ? "Update submission" : "Submit evidence"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {prevDay ? (
          <Button asChild variant="outline" size="sm">
            <Link href={`/rote2real/exercise/${prevDay}`}>
              <ArrowLeft className="size-4" />
              Day {prevDay}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {nextDay ? (
          <Button asChild variant="outline" size="sm">
            <Link href={`/rote2real/exercise/${nextDay}`}>
              Day {nextDay}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href="/rote2real/report">View report</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
