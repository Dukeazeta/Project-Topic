"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Circle,
  Send,
  Loader2,
  Timer,
} from "lucide-react";

import { clearStudentToken, getStudentToken, setStudentResult } from "@/lib/cbt/session-storage";
import { useAntiCheat } from "@/lib/hooks/use-anti-cheat";
import { useExamTimer } from "@/lib/hooks/use-exam-timer";

/* ── Confirmation modal ─────────────────────── */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-text">{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-accent btn-sm">
            {confirmLabel || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExamTakePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const examId = params.id;
  const [data, setData] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const token = useMemo(() => getStudentToken(examId), [examId]);

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      "x-cbt-token": token || "",
    }),
    [token],
  );

  const load = useCallback(async () => {
    if (!token) {
      router.replace(`/exam/${examId}`);
      return;
    }

    const startResponse = await fetch(`/api/exam/${examId}/start`, {
      method: "POST",
      headers,
    });
    const startData = await startResponse.json();
    if (!startResponse.ok || !startData.success) {
      router.replace(`/exam/${examId}`);
      return;
    }

    setData(startData.data);

    const sessionResponse = await fetch(`/api/exam/${examId}/session`, {
      headers: { "x-cbt-token": token },
      cache: "no-store",
    });
    const sessionData = await sessionResponse.json();
    if (sessionResponse.ok && sessionData.success) {
      const answerMap = Object.fromEntries(
        (sessionData.data.answers || []).map((item: any) => [item.questionId, item.selectedOption]),
      );
      setAnswers(answerMap);
      setData((current: any) => ({
        ...(current || {}),
        ...sessionData.data,
        remainingSeconds: sessionData.data.remainingSeconds,
        questions: sessionData.data.questions,
      }));
    }
  }, [examId, headers, router, token]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSubmit = useCallback(
    async (auto = false, terminated = false) => {
      if (!token) return;
      setSubmitting(true);
      const response = await fetch(`/api/exam/${examId}/submit`, {
        method: "POST",
        headers,
        body: JSON.stringify({ auto, terminated }),
      });
      const payload = await response.json();
      if (response.ok && payload.success) {
        setStudentResult(examId, payload.data);
        clearStudentToken(examId);
        router.replace(`/exam/${examId}/result`);
      }
      setSubmitting(false);
    },
    [examId, headers, router, token],
  );

  const { formatted, remainingSeconds: seconds } = useExamTimer(data?.remainingSeconds ?? 0, Boolean(data && !submitting), () => {
    void handleSubmit(true, false);
  });

  useAntiCheat(Boolean(data && !submitting), async (type, metadata) => {
    if (!token) return;
    const response = await fetch(`/api/exam/${examId}/violation`, {
      method: "POST",
      headers,
      body: JSON.stringify({ type, metadata }),
    });
    const payload = await response.json();
    if (response.ok && payload.success) {
      setData((current: any) => ({
        ...current,
        warningCount: payload.data.warningCount,
      }));
      setWarning(`${type.replaceAll("_", " ")} recorded. Warnings: ${payload.data.warningCount}/${payload.data.maxViolations}`);
      if (payload.data.terminated) {
        await handleSubmit(false, true);
      }
    }
  });

  useEffect(() => {
    if (!token) return;
    const interval = window.setInterval(async () => {
      const response = await fetch(`/api/exam/${examId}/session`, {
        headers: { "x-cbt-token": token },
        cache: "no-store",
      });
      const payload = await response.json();
      if (response.ok && payload.success) {
        setData((current: any) => ({ ...current, ...payload.data, remainingSeconds: payload.data.remainingSeconds }));
        if (payload.data.status && payload.data.status !== "in_progress" && payload.data.status !== "paused") {
          setStudentResult(examId, payload.data);
          clearStudentToken(examId);
          router.replace(`/exam/${examId}/result`);
        }
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [examId, router, token]);

  const saveAnswer = async (questionId: number, selectedOption: string) => {
    if (!token || data?.status !== "in_progress") return;
    setAnswers((current) => ({ ...current, [questionId]: selectedOption }));
    await fetch(`/api/exam/${examId}/answer`, {
      method: "POST",
      headers,
      body: JSON.stringify({ questionId, selectedOption }),
    });
  };

  const answeredCount = data?.questions
    ? data.questions.filter((q: any) => answers[q.id]).length
    : 0;

  const totalQuestions = data?.questions?.length ?? 0;
  const isTimeLow = seconds < 120 && seconds > 0;

  if (!data) {
    return (
      <main className="min-h-[100dvh] flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="loading-spinner" />
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>Loading exam...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] px-3 py-4 sm:px-6" style={{ background: "var(--bg)" }}>
      {/* Submit confirmation */}
      <ConfirmDialog
        open={showSubmitConfirm}
        title="Submit exam"
        message={`You have answered ${answeredCount} of ${totalQuestions} questions. Once submitted, you cannot return to this exam. Continue?`}
        confirmLabel="Submit exam"
        onConfirm={() => {
          setShowSubmitConfirm(false);
          void handleSubmit(false, false);
        }}
        onCancel={() => setShowSubmitConfirm(false)}
      />

      <div className="mx-auto max-w-5xl space-y-4">
        {/* Exam header bar */}
        <div
          className="section-card"
          style={{ padding: "16px 20px" }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="section-label">Live exam</span>
              <h1 className="text-lg font-semibold tracking-tight mt-0.5">{data.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div
                className="flex items-center gap-2 rounded-[var(--radius-md)] px-3.5 py-2"
                style={{
                  background: isTimeLow ? "var(--danger-surface)" : "var(--bg-inset)",
                  color: isTimeLow ? "var(--danger)" : "var(--fg)",
                  transition: "all 300ms var(--ease-out)",
                }}
              >
                <Clock size={14} strokeWidth={isTimeLow ? 2 : 1.5} />
                <span className="text-sm font-semibold tabular-nums">{formatted}</span>
              </div>
              {/* Status */}
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--fg-muted)" }}>
                <span className={`badge ${
                  data.warningCount > 0 ? "badge-warning" : "badge-active"
                }`}>
                  {data.warningCount}/{data.maxViolations} warnings
                </span>
              </div>
            </div>
          </div>

          {/* Warning banner */}
          {warning ? (
            <div className="banner-warning mt-3">
              <AlertTriangle size={14} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" />
              <span>{warning}</span>
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_260px]">
          {/* Questions */}
          <section className="space-y-3">
            {(data.questions || []).map((question: any, index: number) => (
              <article
                id={`question-${question.id}`}
                key={question.id}
                className="section-card"
                style={{ padding: "20px 24px" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {answers[question.id] ? (
                      <CheckCircle2 size={16} strokeWidth={2} style={{ color: "var(--accent)" }} />
                    ) : (
                      <Circle size={16} strokeWidth={1.5} style={{ color: "var(--fg-faint)" }} />
                    )}
                    <span className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--fg-muted)" }}>
                      Question {index + 1}
                    </span>
                  </div>
                  {data.timerMode === "per_question" ? (
                    <button
                      type="button"
                      onClick={async () => {
                        await fetch(`/api/exam/${examId}/question-visit`, {
                          method: "POST",
                          headers,
                          body: JSON.stringify({ questionId: question.id }),
                        });
                      }}
                      className="btn btn-ghost btn-sm"
                    >
                      <Timer size={12} strokeWidth={1.5} />
                      Start timer
                    </button>
                  ) : null}
                </div>

                <p className="mt-3 text-sm leading-7">{question.text}</p>

                {question.imageUrl ? (
                  <img
                    src={question.imageUrl}
                    alt={`Question ${index + 1} image`}
                    className="mt-4 max-h-64 rounded-[var(--radius-md)]"
                    style={{ border: "1px solid var(--border)" }}
                  />
                ) : null}

                <div className="mt-4 grid gap-2">
                  {([
                    ["A", question.optionA],
                    ["B", question.optionB],
                    ["C", question.optionC],
                    ["D", question.optionD],
                  ] as const).map(([letter, text]) => {
                    const isSelected = answers[question.id] === letter;
                    return (
                      <button
                        key={letter}
                        onClick={() => void saveAnswer(question.id, letter)}
                        className="flex items-start gap-3 rounded-[var(--radius-md)] px-4 py-3.5 text-left text-sm transition-all"
                        style={{
                          background: isSelected ? "var(--accent-ghost)" : "var(--surface)",
                          border: `1px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                          color: isSelected ? "var(--accent)" : "var(--fg)",
                          transitionDuration: "var(--duration-normal)",
                          transitionTimingFunction: "var(--ease-out)",
                        }}
                      >
                        <span
                          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                          style={{
                            background: isSelected ? "var(--accent)" : "var(--bg-inset)",
                            color: isSelected ? "white" : "var(--fg-muted)",
                            transition: "all var(--duration-normal) var(--ease-out)",
                          }}
                        >
                          {letter}
                        </span>
                        <span className="pt-0.5">{text}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </section>

          {/* Sidebar / Navigator */}
          <aside
            className="section-card xl:sticky xl:top-4"
            style={{ height: "max-content", padding: "20px" }}
          >
            <h2 className="text-sm font-semibold">Navigator</h2>
            <p className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
              {answeredCount} of {totalQuestions} answered
            </p>

            {/* Progress bar */}
            <div
              className="mt-3 h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: "var(--bg-inset)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: totalQuestions > 0 ? `${(answeredCount / totalQuestions) * 100}%` : "0%",
                  background: "var(--accent)",
                  transitionDuration: "var(--duration-slow)",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              />
            </div>

            {/* Question grid */}
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {(data.questions || []).map((question: any, index: number) => {
                const isAnswered = Boolean(answers[question.id]);
                return (
                  <a
                    key={question.id}
                    href={`#question-${question.id}`}
                    className="flex items-center justify-center rounded-[6px] py-1.5 text-xs font-medium tabular-nums transition-colors"
                    style={{
                      background: isAnswered ? "var(--accent)" : "var(--bg-inset)",
                      color: isAnswered ? "white" : "var(--fg-muted)",
                      transitionDuration: "var(--duration-fast)",
                    }}
                  >
                    {index + 1}
                  </a>
                );
              })}
            </div>

            {/* Submit button */}
            <button
              onClick={() => setShowSubmitConfirm(true)}
              disabled={submitting || data.status !== "in_progress"}
              className="btn btn-accent w-full mt-5"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={14} strokeWidth={2} />
                  Submit exam
                </>
              )}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
