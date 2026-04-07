"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { clearStudentToken, getStudentToken, setStudentResult } from "@/lib/cbt/session-storage";
import { useAntiCheat } from "@/lib/hooks/use-anti-cheat";
import { useExamTimer } from "@/lib/hooks/use-exam-timer";

export default function ExamTakePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const examId = params.id;
  const [data, setData] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [warning, setWarning] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const { formatted } = useExamTimer(data?.remainingSeconds ?? 0, Boolean(data && !submitting), () => {
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

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-gray-200 border-t-accent rounded-full" />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-3 py-4 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <section className="border border-border bg-white/95 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Live Exam</p>
              <h1 className="mt-2 text-2xl font-medium">{data.title}</h1>
            </div>
            <div className="border border-border bg-white px-4 py-2 text-sm font-medium">
              Time Left: {formatted}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>Warnings: {data.warningCount}/{data.maxViolations}</span>
            <span>Status: {data.status}</span>
          </div>
          {warning ? <p className="mt-3 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 text-sm">{warning}</p> : null}
        </section>

        <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            {(data.questions || []).map((question: any, index: number) => (
              <article id={`question-${question.id}`} key={question.id} className="border border-border bg-white/85 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Question {index + 1}
                  </p>
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
                      className="border border-border px-3 py-1 text-xs hover:bg-accent/5 transition-colors"
                    >
                      Start question timer
                    </button>
                  ) : null}
                </div>
                <p className="mt-3 text-lg leading-8">{question.text}</p>
                {question.imageUrl ? (
                  <img src={question.imageUrl} alt={`Question ${index + 1}`} className="mt-4 max-h-72 rounded-2xl border border-[var(--line)]" />
                ) : null}
                <div className="mt-5 grid gap-3">
                  {[
                    ["A", question.optionA],
                    ["B", question.optionB],
                    ["C", question.optionC],
                    ["D", question.optionD],
                  ].map(([letter, text]) => (
                    <button
                      key={letter}
                      onClick={() => void saveAnswer(question.id, letter)}
                      className={`border px-4 py-4 text-left text-sm transition-colors ${
                        answers[question.id] === letter
                          ? "border-accent bg-accent/5"
                          : "border-border bg-white hover:bg-accent/5"
                      }`}
                    >
                      <span className="font-semibold">{letter}.</span> {text}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <aside className="border border-border bg-white p-5 h-max xl:sticky xl:top-4">
            <h2 className="text-xl font-medium">Navigator</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(data.questions || []).map((question: any, index: number) => (
                <a
                  key={question.id}
                  href={`#question-${question.id}`}
                  className="border border-border px-3 py-1 text-xs hover:bg-accent/5 transition-colors"
                >
                  {index + 1}
                </a>
              ))}
            </div>
            <button
              onClick={() => void handleSubmit(false, false)}
              disabled={submitting || data.status !== "in_progress"}
              className="mt-6 w-full bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
            >
              {submitting ? "Submitting..." : "Submit Exam"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
