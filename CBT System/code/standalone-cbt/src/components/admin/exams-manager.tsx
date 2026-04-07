"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Exam = {
  id: string;
  title: string;
  courseCode: string;
  duration: number;
  isActive: boolean;
  questionCount?: number;
};

const emptyExam = {
  title: "",
  courseCode: "",
  description: "",
  duration: 60,
  timerMode: "full_exam",
  questionLayout: "single_question",
  questionTimeSec: 60,
  passingScore: 50,
  maxViolations: 3,
  maxRetakes: 0,
  shuffleQuestions: false,
  shuffleOptions: false,
  showResult: true,
  allowMobile: true,
  isActive: false,
  startWindow: "",
  endWindow: "",
};

export function ExamsManager() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [form, setForm] = useState(emptyExam);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/exams", { cache: "no-store" });
    const data = await response.json();
    setExams(data.data.exams || []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/admin/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      setMessage(data.error || "Failed to create exam.");
      setSaving(false);
      return;
    }
    setForm(emptyExam);
    setMessage("Exam created successfully.");
    setSaving(false);
    await load();
  };

  return (
    <div className="space-y-6">
      <section className="border border-border bg-white/80 p-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Exam Setup</p>
        <h2 className="mt-2 text-2xl font-medium">Create a new CBT exam.</h2>
        <form className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3" onSubmit={submit}>
          <input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            className="border border-border bg-white px-4 py-3"
            placeholder="Exam title"
            required
          />
          <input
            value={form.courseCode}
            onChange={(event) => setForm((current) => ({ ...current, courseCode: event.target.value }))}
            className="border border-border bg-white px-4 py-3"
            placeholder="Course code"
            required
          />
          <input
            value={form.duration}
            onChange={(event) => setForm((current) => ({ ...current, duration: Number(event.target.value) }))}
            className="border border-border bg-white px-4 py-3"
            placeholder="Duration in minutes"
            type="number"
            min={1}
          />
          <select
            value={form.timerMode}
            onChange={(event) => setForm((current) => ({ ...current, timerMode: event.target.value }))}
            className="border border-border bg-white px-4 py-3"
          >
            <option value="full_exam">Full exam timer</option>
            <option value="per_question">Per question timer</option>
          </select>
          <select
            value={form.questionLayout}
            onChange={(event) => setForm((current) => ({ ...current, questionLayout: event.target.value }))}
            className="border border-border bg-white px-4 py-3"
          >
            <option value="single_question">Single question</option>
            <option value="scroll_all">Scroll all</option>
          </select>
          <input
            value={form.questionTimeSec}
            onChange={(event) => setForm((current) => ({ ...current, questionTimeSec: Number(event.target.value) }))}
            className="border border-border bg-white px-4 py-3"
            placeholder="Per-question time"
            type="number"
            min={10}
          />
          <input
            value={form.passingScore}
            onChange={(event) => setForm((current) => ({ ...current, passingScore: Number(event.target.value) }))}
            className="border border-border bg-white px-4 py-3"
            placeholder="Passing score"
            type="number"
            min={0}
            max={100}
          />
          <input
            value={form.maxViolations}
            onChange={(event) => setForm((current) => ({ ...current, maxViolations: Number(event.target.value) }))}
            className="border border-border bg-white px-4 py-3"
            placeholder="Max warnings"
            type="number"
            min={1}
          />
          <input
            value={form.maxRetakes}
            onChange={(event) => setForm((current) => ({ ...current, maxRetakes: Number(event.target.value) }))}
            className="border border-border bg-white px-4 py-3"
            placeholder="Max retakes"
            type="number"
            min={0}
          />
          <input
            value={form.startWindow}
            onChange={(event) => setForm((current) => ({ ...current, startWindow: event.target.value }))}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
            type="datetime-local"
          />
          <input
            value={form.endWindow}
            onChange={(event) => setForm((current) => ({ ...current, endWindow: event.target.value }))}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
            type="datetime-local"
          />
          <textarea
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            className="border border-border bg-white px-4 py-3 md:col-span-2 xl:col-span-3"
            placeholder="Exam description or instructions"
            rows={4}
          />
          <div className="md:col-span-2 xl:col-span-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["shuffleQuestions", "Shuffle questions"],
              ["shuffleOptions", "Shuffle options"],
              ["showResult", "Show result after submission"],
              ["allowMobile", "Allow mobile access"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 border border-border bg-white px-4 py-3 text-sm">
                <input
                  checked={Boolean(form[key as keyof typeof form])}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.checked }))}
                  type="checkbox"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <div className="md:col-span-2 xl:col-span-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-accent px-6 py-3 text-sm font-medium text-accent-foreground"
            >
              {saving ? "Creating..." : "Create Exam"}
            </button>
          </div>
        </form>
        {message ? <p className="mt-4 text-sm text-muted-foreground">{message}</p> : null}
      </section>

      <section className="border border-border bg-white/80 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Exams</h3>
          <span className="text-sm text-muted-foreground">{exams.length} exams</span>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {loading ? (
            <p>Loading exams...</p>
          ) : exams.length === 0 ? (
            <p>No exams yet.</p>
          ) : (
            exams.map((exam) => (
              <Link
                href={`/admin/exams/${exam.id}`}
                key={exam.id}
                className="border border-border bg-white/50 p-5 hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-primary">{exam.courseCode}</p>
                    <h4 className="mt-2 text-xl font-medium">{exam.title}</h4>
                  </div>
                  <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.2em]">
                    {exam.isActive ? "Open" : "Closed"}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span>{exam.duration} mins</span>
                  <span>{exam.questionCount ?? 0} questions</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
