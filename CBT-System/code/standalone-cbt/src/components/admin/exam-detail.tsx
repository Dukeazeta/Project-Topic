"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Upload,
  FileSpreadsheet,
  Trash2,
  Pencil,
  ExternalLink,
  Download,
  Pause,
  Play,
  Square,
  ChevronDown,
  RefreshCcw,
  Eye,
  X,
} from "lucide-react";

type ExamDetailData = {
  exam: any;
  questions: any[];
  sessions: any[];
};

const emptyQuestion = {
  text: "",
  imageUrl: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "A",
  points: 1,
};

/* ── Confirmation modal ─────────────────────── */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  danger,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
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
          <button
            onClick={onConfirm}
            className={`btn btn-sm ${danger ? "btn-danger" : "btn-accent"}`}
          >
            {confirmLabel || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExamDetail({ examId }: { examId: string }) {
  const [data, setData] = useState<ExamDetailData | null>(null);
  const [settings, setSettings] = useState<any | null>(null);
  const [questionForm, setQuestionForm] = useState(emptyQuestion);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingQuestion, setSavingQuestion] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewingSession, setViewingSession] = useState<any>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  /* Confirm dialog state */
  const [confirm, setConfirm] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    danger?: boolean;
    onConfirm: () => void;
  }>({ open: false, title: "", message: "", onConfirm: () => {} });

  const closeConfirm = () => setConfirm((c) => ({ ...c, open: false }));

  const load = async (background = false) => {
    if (!background) setIsRefreshing(true);
    try {
      const response = await fetch(`/api/admin/exams/${examId}`, { cache: "no-store" });
      const payload = await response.json();
      setData(payload.data);
      if (!background) {
        setSettings(payload.data.exam);
      }
    } finally {
      if (!background) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void load();
  }, [examId]);

  // Polling for live sessions
  useEffect(() => {
    const interval = setInterval(() => {
      void load(true);
    }, 10000);
    return () => clearInterval(interval);
  }, [examId]);

  const saveSettings = async () => {
    setSavingSettings(true);
    const response = await fetch(`/api/admin/exams/${examId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const payload = await response.json();
    if (response.ok && payload.success) {
      toast.success("Exam settings saved.");
    } else {
      toast.error(payload.error || "Unable to save exam settings.");
    }
    setSavingSettings(false);
    await load();
  };

  const saveQuestion = async () => {
    setSavingQuestion(true);
    const url = editingQuestionId
      ? `/api/admin/exams/${examId}/questions/${editingQuestionId}`
      : `/api/admin/exams/${examId}/questions`;
    const method = editingQuestionId ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionForm),
    });
    const payload = await response.json();
    if (response.ok && payload.success) {
      toast.success(editingQuestionId ? "Question updated." : "Question added.");
    } else {
      toast.error(payload.error || "Unable to save question.");
    }
    setEditingQuestionId(null);
    setQuestionForm(emptyQuestion);
    setSavingQuestion(false);
    await load();
  };

  const editQuestion = (question: any) => {
    setEditingQuestionId(question.id);
    setQuestionForm({
      text: question.text,
      imageUrl: question.imageUrl || "",
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctOption: question.correctOption,
      points: question.points,
    });
  };

  const deleteQuestion = async (questionId: number) => {
    await fetch(`/api/admin/exams/${examId}/questions/${questionId}`, { method: "DELETE" });
    toast.success("Question deleted.");
    await load();
  };

  const confirmDeleteQuestion = (questionId: number) => {
    setConfirm({
      open: true,
      title: "Delete question",
      message: "This question will be permanently removed from the exam. This action cannot be undone.",
      confirmLabel: "Delete",
      danger: true,
      onConfirm: () => {
        closeConfirm();
        void deleteQuestion(questionId);
      },
    });
  };

  const uploadQuestionImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("examId", examId);
    const response = await fetch("/api/admin/question-images", { method: "POST", body: formData });
    const payload = await response.json();
    if (response.ok && payload.success) {
      setQuestionForm((current) => ({ ...current, imageUrl: payload.data.imageUrl }));
      toast.success("Image uploaded.");
    } else {
      toast.error(payload.error || "Unable to upload image.");
    }
  };

  const importQuestions = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`/api/admin/exams/${examId}/questions`, {
      method: "PUT",
      body: formData,
    });
    let payload;
    try {
      payload = await response.json();
    } catch {
      payload = { success: false, error: "Server returned invalid response." };
    }
    
    if (response.ok && payload.success) {
      toast.success(`Imported ${payload.data?.imported || 0} questions.`);
    } else {
      toast.error(payload.error || "Import failed.");
    }
    await load();
  };

  const controlSession = async (sessionId: string, action: string) => {
    await fetch(`/api/admin/exams/${examId}/sessions/${sessionId}/control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    toast.success(`Session ${action === "final_submit" ? "submitted" : action + "d"}.`);
    await load();
  };

  const confirmSessionAction = (sessionId: string, action: string) => {
    if (action !== "final_submit") {
      void controlSession(sessionId, action);
      return;
    }
    setConfirm({
      open: true,
      title: "Force submit session",
      message: "This will end the student's exam immediately and submit their current answers. This cannot be undone.",
      confirmLabel: "Force submit",
      danger: true,
      onConfirm: () => {
        closeConfirm();
        void controlSession(sessionId, action);
      },
    });
  };

  const deleteSession = async (sessionId: string) => {
    await fetch(`/api/admin/exams/${examId}/sessions/${sessionId}`, { method: "DELETE" });
    toast.success("Session deleted.");
    await load();
  };

  const viewSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/admin/exams/${examId}/sessions/${sessionId}`);
      const payload = await response.json();
      if (response.ok && payload.success) {
        setViewingSession(payload.data);
      } else {
        toast.error("Unable to load session details.");
      }
    } catch {
      toast.error("Unable to load session details.");
    }
  };

  const confirmSessionDelete = (sessionId: string) => {
    setConfirm({
      open: true,
      title: "Delete session",
      message: "This will permanently delete the student's entire session and answers. They will have to retake the exam from scratch. This cannot be undone.",
      confirmLabel: "Delete session",
      danger: true,
      onConfirm: () => {
        closeConfirm();
        void deleteSession(sessionId);
      },
    });
  };

  if (!data || !settings) {
    return (
      <div className="space-y-4">
        <div className="skeleton" style={{ height: "120px" }} />
        <div className="skeleton" style={{ height: "300px" }} />
        <div className="skeleton" style={{ height: "200px" }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Confirm dialog */}
      <ConfirmDialog
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        confirmLabel={confirm.confirmLabel}
        danger={confirm.danger}
        onConfirm={confirm.onConfirm}
        onCancel={closeConfirm}
      />

      {/* ── Exam Settings ───────────────────────── */}
      <div className="section-card">
        <div className="section-header-row">
          <button
            type="button"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex items-center gap-3 text-left"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <ChevronDown
              size={18}
              strokeWidth={1.5}
              style={{
                color: "var(--fg-muted)",
                transform: settingsOpen ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 200ms var(--ease-out)",
              }}
            />
            <div className="section-header">
              <span className="section-label">{data.exam.courseCode}</span>
              <h1 className="section-title">{data.exam.title}</h1>
            </div>
          </button>
          <a
            href={`/exam/${data.exam.id}`}
            target="_blank"
            className="btn btn-ghost btn-sm"
          >
            <ExternalLink size={14} strokeWidth={1.5} />
            Public link
          </a>
        </div>

        {settingsOpen ? (
        <>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="field-group">
            <label className="field-label">Title</label>
            <input value={settings.title} onChange={(e) => setSettings({ ...settings, title: e.target.value })} className="input" />
          </div>
          <div className="field-group">
            <label className="field-label">Course code</label>
            <input value={settings.courseCode} onChange={(e) => setSettings({ ...settings, courseCode: e.target.value })} className="input" />
          </div>
          <div className="field-group">
            <label className="field-label">Duration (min)</label>
            <input type="number" value={settings.duration} onChange={(e) => setSettings({ ...settings, duration: Number(e.target.value) })} className="input" />
          </div>
          <div className="field-group">
            <label className="field-label">Passing score (%)</label>
            <input type="number" value={settings.passingScore} onChange={(e) => setSettings({ ...settings, passingScore: Number(e.target.value) })} className="input" />
          </div>
          <div className="field-group">
            <label className="field-label">Timer mode</label>
            <select value={settings.timerMode} onChange={(e) => setSettings({ ...settings, timerMode: e.target.value })} className="input">
              <option value="full_exam">Full exam timer</option>
              <option value="per_question">Per question timer</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Question layout</label>
            <select value={settings.questionLayout} onChange={(e) => setSettings({ ...settings, questionLayout: e.target.value })} className="input">
              <option value="single_question">Single question</option>
              <option value="scroll_all">Scroll all</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Per-question time (sec)</label>
            <input type="number" value={settings.questionTimeSec} onChange={(e) => setSettings({ ...settings, questionTimeSec: Number(e.target.value) })} className="input" />
          </div>
          <div className="field-group">
            <label className="field-label">Max warnings</label>
            <input type="number" value={settings.maxViolations} onChange={(e) => setSettings({ ...settings, maxViolations: Number(e.target.value) })} className="input" />
          </div>
        </div>

        {/* Toggles */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {([
            ["shuffleQuestions", "Shuffle questions"],
            ["shuffleOptions", "Shuffle options"],
            ["showResult", "Show result"],
            ["allowMobile", "Allow mobile"],
            ["isActive", "Exam is active"],
          ] as const).map(([key, label]) => (
            <label key={key} className="toggle-wrap">
              <input
                checked={Boolean(settings[key])}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                type="checkbox"
                className="toggle-input"
              />
              <span className="toggle-switch" />
              <span className="toggle-label">{label}</span>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => void saveSettings()}
            disabled={savingSettings}
            className="btn btn-accent"
          >
            {savingSettings ? "Saving..." : "Save settings"}
          </button>
        </div>
        </>
        ) : null}
      </div>

      {/* ── Question Bank ───────────────────────── */}
      <div className="section-card">
        <div className="section-header-row">
          <button
            type="button"
            onClick={() => setQuestionsOpen(!questionsOpen)}
            className="flex items-center gap-3 text-left"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <ChevronDown
              size={18}
              strokeWidth={1.5}
              style={{
                color: "var(--fg-muted)",
                transform: questionsOpen ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 200ms var(--ease-out)",
              }}
            />
            <div className="section-header">
              <span className="section-label">Question bank</span>
              <p className="section-subtitle">
                {data.questions.length} {data.questions.length === 1 ? "question" : "questions"}
              </p>
            </div>
          </button>
          <div className="flex flex-wrap gap-2">
            <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadQuestionImage(file); }} />
            <input ref={importRef} type="file" accept=".xlsx" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void importQuestions(file); }} />
            <a href="/api/admin/templates/questions" className="btn btn-ghost btn-sm" download>
              <Download size={14} strokeWidth={1.5} />
              Get template
            </a>
            <button onClick={() => importRef.current?.click()} className="btn btn-ghost btn-sm">
              <FileSpreadsheet size={14} strokeWidth={1.5} />
              Import Excel
            </button>
          </div>
        </div>

        {questionsOpen ? (
        <>

        {/* Question form */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="field-group md:col-span-2">
            <label className="field-label">Question text</label>
            <textarea value={questionForm.text} onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })} className="input" placeholder="Enter the question" rows={3} />
          </div>
          <div className="field-group">
            <label className="field-label">Option A</label>
            <input value={questionForm.optionA} onChange={(e) => setQuestionForm({ ...questionForm, optionA: e.target.value })} className="input" placeholder="Option A" />
          </div>
          <div className="field-group">
            <label className="field-label">Option B</label>
            <input value={questionForm.optionB} onChange={(e) => setQuestionForm({ ...questionForm, optionB: e.target.value })} className="input" placeholder="Option B" />
          </div>
          <div className="field-group">
            <label className="field-label">Option C</label>
            <input value={questionForm.optionC} onChange={(e) => setQuestionForm({ ...questionForm, optionC: e.target.value })} className="input" placeholder="Option C" />
          </div>
          <div className="field-group">
            <label className="field-label">Option D</label>
            <input value={questionForm.optionD} onChange={(e) => setQuestionForm({ ...questionForm, optionD: e.target.value })} className="input" placeholder="Option D" />
          </div>
          <div className="field-group">
            <label className="field-label">Correct option</label>
            <select value={questionForm.correctOption} onChange={(e) => setQuestionForm({ ...questionForm, correctOption: e.target.value })} className="input">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Points</label>
            <input type="number" min={1} value={questionForm.points} onChange={(e) => setQuestionForm({ ...questionForm, points: Number(e.target.value) })} className="input" />
          </div>
          <div className="md:col-span-2 border border-[var(--border-light)] rounded-[var(--radius-md)] p-3 bg-[var(--surface)]">
            {!questionForm.imageUrl ? (
              <button type="button" onClick={() => imageRef.current?.click()} className="btn btn-ghost btn-sm">
                <Upload size={14} strokeWidth={1.5} />
                Attach image to question
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Image attached</span>
                <button
                  type="button"
                  onClick={() => setQuestionForm((c) => ({ ...c, imageUrl: "" }))}
                  className="btn btn-ghost btn-sm shadow-sm"
                  style={{ color: "var(--danger)", padding: "4px 8px" }}
                >
                  <Trash2 size={13} strokeWidth={1.5} />
                  Remove image
                </button>
              </div>
            )}
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button onClick={() => void saveQuestion()} disabled={savingQuestion} className="btn btn-accent">
              {savingQuestion ? "Saving..." : editingQuestionId ? "Update question" : "Add question"}
            </button>
            {editingQuestionId ? (
              <button
                onClick={() => { setEditingQuestionId(null); setQuestionForm(emptyQuestion); }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>

        {/* Question list */}
        {data.questions.length > 0 ? (
          <div className="mt-8">
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {data.questions.map((question) => (
                <div
                  key={question.id}
                  className="py-5"
                  style={{ borderBottom: "1px solid var(--border-light)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className="badge badge-info"
                          style={{ fontSize: "10px" }}
                        >
                          Q{question.sortOrder + 1}
                        </span>
                        <span className="text-xs tabular-nums" style={{ color: "var(--fg-faint)" }}>
                          {question.points} {question.points === 1 ? "pt" : "pts"} — Answer: {question.correctOption}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">{question.text}</p>
                      <div className="mt-2 grid gap-1 text-xs" style={{ color: "var(--fg-muted)" }}>
                        <span>A. {question.optionA}</span>
                        <span>B. {question.optionB}</span>
                        <span>C. {question.optionC}</span>
                        <span>D. {question.optionD}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => editQuestion(question)} className="btn btn-ghost btn-sm">
                        <Pencil size={13} strokeWidth={1.5} />
                      </button>
                      <button onClick={() => confirmDeleteQuestion(question.id)} className="btn btn-danger btn-sm">
                        <Trash2 size={13} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        </>
        ) : null}
      </div>

      {/* ── Live Sessions ───────────────────────── */}
      <div className="section-card">
        <div className="section-header-row">
          <div className="section-header">
            <span className="section-label">Live sessions</span>
            <p className="section-subtitle">Monitor student attempts in real time.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => void load(false)}
              disabled={isRefreshing}
              className="btn btn-ghost btn-sm"
            >
              <RefreshCcw size={14} strokeWidth={1.5} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </button>
            <a href={`/api/admin/results/export?examId=${examId}`} className="btn btn-ghost btn-sm">
              <Download size={14} strokeWidth={1.5} />
              Export CSV
            </a>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-base">
            <thead>
              <tr>
                <th>Student</th>
                <th>Matric</th>
                <th>Status</th>
                <th>Warnings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.sessions.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ color: "var(--fg-faint)", padding: "24px 0" }}>
                    No sessions have started yet.
                  </td>
                </tr>
              ) : (
                data.sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="font-medium">{session.studentName}</td>
                    <td className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>{session.matricNo}</td>
                    <td>
                      <span className={`badge ${
                        session.status === "in_progress"
                          ? "badge-active"
                          : session.status === "paused"
                          ? "badge-warning"
                          : session.status === "completed"
                          ? "badge-info"
                          : "badge-closed"
                      }`}>
                        {session.status.replaceAll("_", " ")}
                      </span>
                    </td>
                    <td className="tabular-nums">{session.warningCount}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => void viewSession(session.id)}
                          className="btn btn-ghost"
                          title="View details"
                          style={{ padding: "6px", height: "auto" }}
                        >
                          <Eye size={14} strokeWidth={1.5} />
                        </button>
                        {session.status === "in_progress" ? (
                          <button onClick={() => confirmSessionAction(session.id, "pause")} className="btn btn-ghost" title="Pause session" style={{ padding: "6px", height: "auto" }}>
                            <Pause size={14} strokeWidth={1.5} />
                          </button>
                        ) : null}
                        {session.status === "paused" ? (
                          <button onClick={() => confirmSessionAction(session.id, "resume")} className="btn btn-ghost" title="Resume session" style={{ padding: "6px", height: "auto" }}>
                            <Play size={14} strokeWidth={1.5} />
                          </button>
                        ) : null}
                        {session.status === "paused" || session.status === "in_progress" ? (
                          <button onClick={() => confirmSessionAction(session.id, "final_submit")} className="btn btn-ghost" title="Force submit" style={{ padding: "6px", height: "auto" }}>
                            <Square size={14} strokeWidth={1.5} />
                          </button>
                        ) : null}
                        <button onClick={() => confirmSessionDelete(session.id)} className="btn btn-ghost" title="Delete session" style={{ padding: "6px", height: "auto" }}>
                          <Trash2 size={14} strokeWidth={1.5} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Session Detail Modal ─────────────── */}
      {viewingSession ? (
        <div className="modal-backdrop" onClick={() => setViewingSession(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "600px", maxHeight: "80vh", overflow: "auto" }}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="modal-title" style={{ marginBottom: "4px" }}>Session Details</h3>
                <span className={`badge ${
                  viewingSession.session.status === "in_progress" ? "badge-active"
                    : viewingSession.session.status === "paused" ? "badge-warning"
                    : "badge-closed"
                }`}>
                  {viewingSession.session.status.replaceAll("_", " ")}
                </span>
              </div>
              <button onClick={() => setViewingSession(null)} className="btn btn-ghost" style={{ padding: "6px" }}>
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-[var(--radius-md)] px-3 py-3" style={{ background: "var(--bg-inset)" }}>
                <p className="text-[10px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--fg-faint)" }}>Score</p>
                <p className="mt-1 text-sm font-semibold">
                  {viewingSession.session.score !== null ? `${viewingSession.session.score}/${viewingSession.session.totalPoints}` : "—"}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] px-3 py-3" style={{ background: "var(--bg-inset)" }}>
                <p className="text-[10px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--fg-faint)" }}>Warnings</p>
                <p className="mt-1 text-sm font-semibold">{viewingSession.session.warningCount}</p>
              </div>
              <div className="rounded-[var(--radius-md)] px-3 py-3" style={{ background: "var(--bg-inset)" }}>
                <p className="text-[10px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--fg-faint)" }}>Answered</p>
                <p className="mt-1 text-sm font-semibold">
                  {viewingSession.answers.filter((a: any) => a.selectedOption).length}/{viewingSession.questions.length}
                </p>
              </div>
            </div>

            {/* Answers */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--fg-faint)" }}>Questions & Answers</p>
              {viewingSession.questions.map((q: any, i: number) => {
                const answer = viewingSession.answers.find((a: any) => a.questionId === q.id);
                return (
                  <div
                    key={q.id}
                    className="rounded-[var(--radius-sm)] px-3 py-2"
                    style={{ background: "var(--bg-inset)", fontSize: "0.8125rem" }}
                  >
                    <p className="font-medium" style={{ color: "var(--fg)" }}>Q{i + 1}. {q.text}</p>
                    <p className="mt-1" style={{ color: answer?.selectedOption ? "var(--accent)" : "var(--fg-faint)" }}>
                      Answer: {answer?.selectedOption || "Not answered"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Violations */}
            {viewingSession.violations.length > 0 ? (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--danger)" }}>Violations ({viewingSession.violations.length})</p>
                {viewingSession.violations.map((v: any, i: number) => (
                  <div key={i} className="rounded-[var(--radius-sm)] px-3 py-2" style={{ background: "var(--danger-surface)", fontSize: "0.8125rem" }}>
                    <span className="font-medium">{v.type.replaceAll("_", " ")}</span>
                    <span className="ml-2" style={{ color: "var(--fg-faint)" }}>{new Date(v.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
