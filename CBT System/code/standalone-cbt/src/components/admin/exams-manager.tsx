"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, FileText, Clock, HelpCircle, Share2 } from "lucide-react";

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
  const [showForm, setShowForm] = useState(false);

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
    const response = await fetch("/api/admin/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      toast.error(data.error || "Failed to create exam.");
      setSaving(false);
      return;
    }
    setForm(emptyExam);
    setShowForm(false);
    toast.success("Exam created successfully.");
    setSaving(false);
    await load();
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="section-label">Exams</span>
          <h1 className="section-title">Exam management</h1>
          <p className="section-subtitle">Create and configure CBT exams.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-accent w-full sm:w-auto"
        >
          <Plus size={15} strokeWidth={2} />
          New exam
        </button>
      </div>

      {/* Create form — collapsible */}
      {showForm ? (
        <div className="section-card fade-in">
          <div className="section-header">
            <span className="section-label">Exam setup</span>
            <p className="section-subtitle">Configure the exam parameters below.</p>
          </div>

          <form className="mt-6 space-y-6" onSubmit={submit}>
            {/* Core fields */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="field-group">
                <label className="field-label">Exam title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
                  className="input"
                  placeholder="e.g. Introduction to Computer Science"
                  required
                />
              </div>
              <div className="field-group">
                <label className="field-label">Course code</label>
                <input
                  value={form.courseCode}
                  onChange={(e) => setForm((c) => ({ ...c, courseCode: e.target.value }))}
                  className="input"
                  placeholder="e.g. CSC 101"
                  required
                />
              </div>
              <div className="field-group">
                <label className="field-label">Duration (minutes)</label>
                <input
                  value={form.duration}
                  onChange={(e) => setForm((c) => ({ ...c, duration: Number(e.target.value) }))}
                  className="input"
                  type="number"
                  min={1}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Timer mode</label>
                <select
                  value={form.timerMode}
                  onChange={(e) => setForm((c) => ({ ...c, timerMode: e.target.value }))}
                  className="input"
                >
                  <option value="full_exam">Full exam timer</option>
                  <option value="per_question">Per question timer</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Question layout</label>
                <select
                  value={form.questionLayout}
                  onChange={(e) => setForm((c) => ({ ...c, questionLayout: e.target.value }))}
                  className="input"
                >
                  <option value="single_question">Single question</option>
                  <option value="scroll_all">Scroll all</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Per-question time (sec)</label>
                <input
                  value={form.questionTimeSec}
                  onChange={(e) => setForm((c) => ({ ...c, questionTimeSec: Number(e.target.value) }))}
                  className="input"
                  type="number"
                  min={10}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Passing score (%)</label>
                <input
                  value={form.passingScore}
                  onChange={(e) => setForm((c) => ({ ...c, passingScore: Number(e.target.value) }))}
                  className="input"
                  type="number"
                  min={0}
                  max={100}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Max warnings</label>
                <input
                  value={form.maxViolations}
                  onChange={(e) => setForm((c) => ({ ...c, maxViolations: Number(e.target.value) }))}
                  className="input"
                  type="number"
                  min={1}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Max retakes</label>
                <input
                  value={form.maxRetakes}
                  onChange={(e) => setForm((c) => ({ ...c, maxRetakes: Number(e.target.value) }))}
                  className="input"
                  type="number"
                  min={0}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Start window</label>
                <input
                  value={form.startWindow}
                  onChange={(e) => setForm((c) => ({ ...c, startWindow: e.target.value }))}
                  className="input"
                  type="datetime-local"
                />
              </div>
              <div className="field-group">
                <label className="field-label">End window</label>
                <input
                  value={form.endWindow}
                  onChange={(e) => setForm((c) => ({ ...c, endWindow: e.target.value }))}
                  className="input"
                  type="datetime-local"
                />
              </div>
            </div>

            {/* Description */}
            <div className="field-group">
              <label className="field-label">Description / Instructions</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
                className="input"
                placeholder="Optional exam instructions for students"
                rows={3}
              />
            </div>

            {/* Toggles */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {([
                ["shuffleQuestions", "Shuffle questions"],
                ["shuffleOptions", "Shuffle options"],
                ["showResult", "Show result after submission"],
                ["allowMobile", "Allow mobile access"],
              ] as const).map(([key, label]) => (
                <label key={key} className="toggle-wrap">
                  <input
                    checked={Boolean(form[key])}
                    onChange={(e) => setForm((c) => ({ ...c, [key]: e.target.checked }))}
                    type="checkbox"
                    className="toggle-input"
                  />
                  <span className="toggle-switch" />
                  <span className="toggle-label">{label}</span>
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn btn-accent">
                {saving ? "Creating..." : "Create exam"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(emptyExam); }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Exam list */}
      <div className="section-card">
        <div className="section-header-row">
          <span className="section-label">All exams</span>
          <span className="text-xs tabular-nums" style={{ color: "var(--fg-faint)" }}>
            {exams.length} {exams.length === 1 ? "exam" : "exams"}
          </span>
        </div>

        {loading ? (
          <div className="mt-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: "72px" }} />
            ))}
          </div>
        ) : exams.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: "36px", paddingBottom: "36px" }}>
            <FileText className="empty-state-icon" strokeWidth={1} />
            <p className="empty-state-text">
              No exams created yet. Click &quot;New exam&quot; to get started.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-1 stagger">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="group flex items-center justify-between gap-4 rounded-[var(--radius-sm)] px-3 py-2 transition-colors hover:bg-[var(--bg-inset)]"
                style={{
                  border: "1px solid transparent",
                  transitionDuration: "var(--duration-normal)",
                }}
              >
                <Link href={`/admin/exams/${exam.id}`} className="min-w-0 flex-1 py-1">
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                    <span
                      className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: "var(--accent)" }}
                    >
                      {exam.courseCode}
                    </span>
                    <h3 className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors truncate">
                      {exam.title}
                    </h3>
                    <span className={`badge ${exam.isActive ? "badge-active" : "badge-closed"}`} style={{ fontSize: "0.625rem", padding: "1px 6px" }}>
                      {exam.isActive ? "Active" : "Closed"}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center flex-wrap gap-4 text-xs" style={{ color: "var(--fg-faint)" }}>
                    <span className="flex items-center gap-1">
                      <Clock size={11} strokeWidth={1.5} />
                      {exam.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle size={11} strokeWidth={1.5} />
                      {exam.questionCount ?? 0} questions
                    </span>
                  </div>
                </Link>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const url = `${window.location.origin}/exam/${exam.id}`;
                      void navigator.clipboard.writeText(url);
                      toast.success("Exam link copied to clipboard.");
                    }}
                    className="btn btn-accent btn-sm shadow-sm"
                    title="Copy exam link"
                    style={{ padding: "8px 10px", fontSize: "0.75rem", gap: "6px" }}
                  >
                    <Share2 size={13} strokeWidth={2} />
                    <span>Copy link</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
