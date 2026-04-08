"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckSquare, ArrowLeft, Trophy, XCircle } from "lucide-react";

import { getStudentResult } from "@/lib/cbt/session-storage";

export default function ExamResultPage() {
  const params = useParams<{ id: string }>();
  const examId = params.id;
  const result = getStudentResult<any>(examId);

  const percentage = result?.percentage ?? null;
  const isPassed = percentage !== null && percentage >= (result?.passingScore ?? 50);

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg fade-in">
        {/* Branding */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-[6px]"
            style={{ background: "var(--accent)" }}
          >
            <CheckSquare size={13} strokeWidth={2.5} color="white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Standalone CBT
          </span>
        </div>

        <div className="section-card" style={{ padding: "32px" }}>
          <span className="section-label">Exam result</span>
          <h1
            className="mt-2 text-xl font-semibold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your session has ended
          </h1>

          {result ? (
            <>
              {/* Status indicator */}
              <div
                className="mt-6 flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3"
                style={{
                  background: isPassed ? "var(--success-bg)" : "var(--danger-ghost)",
                  border: `1px solid ${isPassed ? "var(--success-border)" : "rgba(185, 28, 28, 0.15)"}`,
                }}
              >
                {isPassed ? (
                  <Trophy size={18} strokeWidth={1.5} style={{ color: "var(--success-fg)" }} />
                ) : (
                  <XCircle size={18} strokeWidth={1.5} style={{ color: "var(--danger)" }} />
                )}
                <span
                  className="text-sm font-medium"
                  style={{ color: isPassed ? "var(--success-fg)" : "var(--danger)" }}
                >
                  {result.session?.status || result.status || "Completed"}
                </span>
              </div>

              {/* Score grid */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="metric-block">
                  <p className="metric-label">Score</p>
                  <p className="metric-value" style={{ fontSize: "1.75rem", marginTop: "4px" }}>
                    {result.score ?? "-"}
                    <span className="text-base font-normal" style={{ color: "var(--fg-muted)" }}>
                      {" "}/ {result.totalPoints ?? "-"}
                    </span>
                  </p>
                </div>
                <div className="metric-block">
                  <p className="metric-label">Percentage</p>
                  <p
                    className="metric-value"
                    style={{
                      fontSize: "1.75rem",
                      marginTop: "4px",
                      color: isPassed ? "var(--success-fg)" : "var(--danger)",
                    }}
                  >
                    {result.percentage ?? "-"}%
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm" style={{ color: "var(--fg-muted)" }}>
              No stored result was found for this session.
            </p>
          )}

          <div className="mt-8">
            <Link href={`/exam/${examId}`} className="btn btn-ghost">
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back to exam page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
