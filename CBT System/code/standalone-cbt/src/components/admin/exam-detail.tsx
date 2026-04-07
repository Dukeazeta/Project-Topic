"use client";

import { useEffect, useRef, useState } from "react";

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

export function ExamDetail({ examId }: { examId: string }) {
  const [data, setData] = useState<ExamDetailData | null>(null);
  const [settings, setSettings] = useState<any | null>(null);
  const [questionForm, setQuestionForm] = useState(emptyQuestion);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const importRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const response = await fetch(`/api/admin/exams/${examId}`, { cache: "no-store" });
    const payload = await response.json();
    setData(payload.data);
    setSettings(payload.data.exam);
  };

  useEffect(() => {
    void load();
  }, [examId]);

  const saveSettings = async () => {
    const response = await fetch(`/api/admin/exams/${examId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const payload = await response.json();
    setMessage(response.ok && payload.success ? "Exam settings saved." : payload.error || "Unable to save exam settings.");
    await load();
  };

  const saveQuestion = async () => {
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
    setMessage(response.ok && payload.success ? "Question saved." : payload.error || "Unable to save question.");
    setEditingQuestionId(null);
    setQuestionForm(emptyQuestion);
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
    await load();
  };

  const uploadQuestionImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("examId", examId);
    const response = await fetch("/api/admin/question-images", { method: "POST", body: formData });
    const payload = await response.json();
    if (response.ok && payload.success) {
      setQuestionForm((current) => ({ ...current, imageUrl: payload.data.imageUrl }));
      setMessage("Image uploaded.");
    } else {
      setMessage(payload.error || "Unable to upload image.");
    }
  };

  const importQuestions = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`/api/admin/exams/${examId}/questions`, {
      method: "PUT",
      body: formData,
    });
    const payload = await response.json();
    setMessage(response.ok && payload.success ? `Imported ${payload.data.imported} questions.` : payload.error || "Import failed.");
    await load();
  };

  const controlSession = async (sessionId: string, action: string) => {
    await fetch(`/api/admin/exams/${examId}/sessions/${sessionId}/control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    await load();
  };

  if (!data || !settings) {
    return <p>Loading exam details...</p>;
  }

  return (
    <div className="space-y-6">
      <section className="border border-border bg-white/80 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">{data.exam.courseCode}</p>
            <h2 className="mt-2 text-3xl font-medium">{data.exam.title}</h2>
          </div>
          <a
            href={`/exam/${data.exam.id}`}
            target="_blank"
            className="border border-border px-5 py-2 text-sm font-medium hover:bg-accent/5 transition-colors"
          >
            Open Public Exam Link
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input value={settings.title} onChange={(e) => setSettings({ ...settings, title: e.target.value })} className="border border-border bg-white px-4 py-3" />
          <input value={settings.courseCode} onChange={(e) => setSettings({ ...settings, courseCode: e.target.value })} className="border border-border bg-white px-4 py-3" />
          <input type="number" value={settings.duration} onChange={(e) => setSettings({ ...settings, duration: Number(e.target.value) })} className="border border-border bg-white px-4 py-3" />
          <input type="number" value={settings.passingScore} onChange={(e) => setSettings({ ...settings, passingScore: Number(e.target.value) })} className="border border-border bg-white px-4 py-3" />
          <select value={settings.timerMode} onChange={(e) => setSettings({ ...settings, timerMode: e.target.value })} className="border border-border bg-white px-4 py-3">
            <option value="full_exam">Full exam timer</option>
            <option value="per_question">Per question timer</option>
          </select>
          <select value={settings.questionLayout} onChange={(e) => setSettings({ ...settings, questionLayout: e.target.value })} className="border border-border bg-white px-4 py-3">
            <option value="single_question">Single question</option>
            <option value="scroll_all">Scroll all</option>
          </select>
          <input type="number" value={settings.questionTimeSec} onChange={(e) => setSettings({ ...settings, questionTimeSec: Number(e.target.value) })} className="border border-border bg-white px-4 py-3" />
          <input type="number" value={settings.maxViolations} onChange={(e) => setSettings({ ...settings, maxViolations: Number(e.target.value) })} className="border border-border bg-white px-4 py-3" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["shuffleQuestions", "Shuffle questions"],
            ["shuffleOptions", "Shuffle options"],
            ["showResult", "Show result"],
            ["allowMobile", "Allow mobile"],
            ["isActive", "Exam is active"],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 border border-border bg-white px-4 py-3 text-sm">
              <input checked={Boolean(settings[key])} onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })} type="checkbox" />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <div className="mt-5">
          <button onClick={() => void saveSettings()} className="bg-accent px-5 py-2 text-sm font-medium text-accent-foreground">
            Save Settings
          </button>
        </div>
      </section>

      <section className="border border-border bg-white/80 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Question Bank</p>
            <h3 className="mt-2 text-2xl font-medium">Create and manage exam questions.</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadQuestionImage(file); }} />
            <input ref={importRef} type="file" accept=".xlsx" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) void importQuestions(file); }} />
            <button onClick={() => imageRef.current?.click()} className="border border-border px-5 py-2 text-sm font-medium hover:bg-accent/5 transition-colors">Upload Image</button>
            <button onClick={() => importRef.current?.click()} className="border border-border px-5 py-2 text-sm font-medium hover:bg-accent/5 transition-colors">Import Questions</button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <textarea value={questionForm.text} onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })} className="border border-border bg-white px-4 py-3 md:col-span-2" placeholder="Question text" rows={4} />
          <input value={questionForm.optionA} onChange={(e) => setQuestionForm({ ...questionForm, optionA: e.target.value })} className="border border-border bg-white px-4 py-3" placeholder="Option A" />
          <input value={questionForm.optionB} onChange={(e) => setQuestionForm({ ...questionForm, optionB: e.target.value })} className="border border-border bg-white px-4 py-3" placeholder="Option B" />
          <input value={questionForm.optionC} onChange={(e) => setQuestionForm({ ...questionForm, optionC: e.target.value })} className="border border-border bg-white px-4 py-3" placeholder="Option C" />
          <input value={questionForm.optionD} onChange={(e) => setQuestionForm({ ...questionForm, optionD: e.target.value })} className="border border-border bg-white px-4 py-3" placeholder="Option D" />
          <select value={questionForm.correctOption} onChange={(e) => setQuestionForm({ ...questionForm, correctOption: e.target.value })} className="border border-border bg-white px-4 py-3">
            <option value="A">Correct Option A</option>
            <option value="B">Correct Option B</option>
            <option value="C">Correct Option C</option>
            <option value="D">Correct Option D</option>
          </select>
          <input type="number" min={1} value={questionForm.points} onChange={(e) => setQuestionForm({ ...questionForm, points: Number(e.target.value) })} className="border border-border bg-white px-4 py-3" placeholder="Points" />
          {questionForm.imageUrl ? <p className="md:col-span-2 text-sm text-muted-foreground">Image attached: {questionForm.imageUrl}</p> : null}
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button onClick={() => void saveQuestion()} className="bg-accent px-5 py-2 text-sm font-medium text-accent-foreground">
              {editingQuestionId ? "Update Question" : "Add Question"}
            </button>
            {editingQuestionId ? (
              <button onClick={() => { setEditingQuestionId(null); setQuestionForm(emptyQuestion); }} className="border border-border px-5 py-2 text-sm font-medium hover:bg-accent/5 transition-colors">
                Cancel Edit
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {data.questions.map((question) => (
            <div key={question.id} className="border border-border bg-gray-50 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Question #{question.sortOrder + 1}</p>
                  <p className="text-base leading-7">{question.text}</p>
                  <div className="grid gap-1 text-sm text-muted-foreground">
                    <p>A. {question.optionA}</p>
                    <p>B. {question.optionB}</p>
                    <p>C. {question.optionC}</p>
                    <p>D. {question.optionD}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => editQuestion(question)} className="border border-border px-4 py-2 text-sm hover:bg-accent/5 transition-colors">Edit</button>
                  <button onClick={() => void deleteQuestion(question.id)} className="border border-border px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border bg-white/80 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Live Sessions</p>
            <h3 className="mt-2 text-2xl font-medium">Monitor student attempts.</h3>
          </div>
          <a
            href={`/api/admin/results/export?examId=${examId}`}
            className="border border-border px-5 py-2 text-sm font-medium hover:bg-accent/5 transition-colors"
          >
            Export Results
          </a>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 pr-4">Student</th>
                <th className="pb-3 pr-4">Matric</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Warnings</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.sessions.length === 0 ? (
                <tr>
                  <td className="py-4" colSpan={5}>No sessions yet.</td>
                </tr>
              ) : (
                data.sessions.map((session) => (
                  <tr key={session.id} className="border-b border-border/60">
                    <td className="py-4 pr-4">{session.studentName}</td>
                    <td className="py-4 pr-4">{session.matricNo}</td>
                    <td className="py-4 pr-4">{session.status}</td>
                    <td className="py-4 pr-4">{session.warningCount}</td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-2">
                        {session.status === "in_progress" ? (
                          <button onClick={() => void controlSession(session.id, "pause")} className="border border-border px-3 py-1 hover:bg-accent/5 transition-colors">Pause</button>
                        ) : null}
                        {session.status === "paused" ? (
                          <button onClick={() => void controlSession(session.id, "resume")} className="border border-border px-3 py-1 hover:bg-accent/5 transition-colors">Resume</button>
                        ) : null}
                        {(session.status === "paused" || session.status === "in_progress") ? (
                          <button onClick={() => void controlSession(session.id, "final_submit")} className="border border-border px-3 py-1 text-red-600 hover:bg-red-50 transition-colors">Final Submit</button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
