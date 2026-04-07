"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { getStudentResult } from "@/lib/cbt/session-storage";

export default function ExamResultPage() {
  const params = useParams<{ id: string }>();
  const examId = params.id;
  const result = getStudentResult<any>(examId);

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Exam Result</p>
        <h1 className="mt-3 text-4xl font-semibold">Your session has ended.</h1>
        {result ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5">
              <p className="text-sm text-[var(--muted)]">Status</p>
              <p className="mt-2 text-2xl font-semibold">{result.session?.status || result.status || "-"}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5">
              <p className="text-sm text-[var(--muted)]">Score</p>
              <p className="mt-2 text-2xl font-semibold">
                {result.score ?? "-"} / {result.totalPoints ?? "-"}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5 sm:col-span-2">
              <p className="text-sm text-[var(--muted)]">Percentage</p>
              <p className="mt-2 text-2xl font-semibold">{result.percentage ?? "-"}%</p>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm text-[var(--muted)]">No stored result was found for this session yet.</p>
        )}

        <div className="mt-8">
          <Link href={`/exam/${examId}`} className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-foreground)]">
            Back to Exam Page
          </Link>
        </div>
      </div>
    </main>
  );
}
