"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckSquare,
  Clock,
  HelpCircle,
  Smartphone,
  ArrowRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { getStudentToken, setStudentToken } from "@/lib/cbt/session-storage";

export default function PublicExamPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const examId = params.id;
  const [info, setInfo] = useState<any>(null);
  const [matricNo, setMatricNo] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/exam/${examId}/info`);
      const data = await response.json();
      setInfo(data.data);
    };
    void load();
  }, [examId]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch(`/api/exam/${examId}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matricNo, surname }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      setError(data.error || "Unable to login.");
      setLoading(false);
      return;
    }
    setStudentToken(examId, data.data.token);
    router.push(`/exam/${examId}/take`);
  };

  const hasToken = getStudentToken(examId);

  return (
    <main className="min-h-[100dvh] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl fade-in">
        {/* Branding */}
        <div className="flex items-center gap-2.5 mb-10">
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

        {/* Exam header */}
        <div className="section-card">
          <span className="section-label">Exam</span>
          <h1
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {info?.exam?.title || "Loading exam..."}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap gap-5 text-sm" style={{ color: "var(--fg-muted)" }}>
            <span className="flex items-center gap-1.5">
              <span
                className="text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--accent)" }}
              >
                {info?.exam?.courseCode || "-"}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} strokeWidth={1.5} />
              {info?.exam?.duration || 0} minutes
            </span>
            <span className="flex items-center gap-1.5">
              <HelpCircle size={14} strokeWidth={1.5} />
              {info?.questionCount || 0} questions
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone size={14} strokeWidth={1.5} />
              {info?.exam?.allowMobile ? "Mobile allowed" : "Desktop only"}
            </span>
          </div>

          {info?.availabilityError ? (
            <div className="banner-warning mt-4">
              <AlertTriangle size={15} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" />
              <span>{info.availabilityError}</span>
            </div>
          ) : null}
        </div>

        {/* Login form */}
        <div className="flex flex-col-reverse gap-6 mt-6 lg:grid lg:grid-cols-[1fr_400px]">
          {/* Instructions */}
          <div className="section-card">
            <span className="section-label">Instructions</span>
            <div className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                Use your matric number and surname exactly as they are registered.
                After login, your exam session opens immediately.
              </p>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 mt-5">
                <div
                  className="rounded-[var(--radius-md)] px-4 py-3.5"
                  style={{ background: "var(--bg-inset)" }}
                >
                  <p className="text-[11px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--fg-faint)" }}>
                    Questions
                  </p>
                  <p className="mt-1 text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {info?.questionCount ?? "-"}
                  </p>
                </div>
                <div
                  className="rounded-[var(--radius-md)] px-4 py-3.5"
                  style={{ background: "var(--bg-inset)" }}
                >
                  <p className="text-[11px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--fg-faint)" }}>
                    Duration
                  </p>
                  <p className="mt-1 text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {info?.exam?.duration ?? "-"} min
                  </p>
                </div>
                <div
                  className="rounded-[var(--radius-md)] px-4 py-3.5"
                  style={{ background: "var(--bg-inset)" }}
                >
                  <p className="text-[11px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--fg-faint)" }}>
                    Mobile
                  </p>
                  <p className="mt-1 text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {info?.exam?.allowMobile ? "Allowed" : "Not allowed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sign in card */}
          <div className="section-card" style={{ boxShadow: "var(--shadow-xl)", border: "2px solid var(--border)", padding: "2rem 1.5rem" }}>
            <span className="section-label" style={{ color: "var(--accent)" }}>Student sign in</span>
            <h2 className="mt-2 text-xl font-semibold tracking-tight lg:text-2xl">Enter your details</h2>

            <form className="mt-8 space-y-5" onSubmit={submit}>
              <div className="field-group">
                <label htmlFor="matric" className="field-label text-sm">Matric number</label>
                <input
                  id="matric"
                  value={matricNo}
                  onChange={(e) => setMatricNo(e.target.value)}
                  className="input"
                  style={{ padding: "14px 16px", fontSize: "1rem" }}
                  placeholder="e.g. 2020/1/12345"
                  required
                />
              </div>
              <div className="field-group">
                <label htmlFor="surname" className="field-label text-sm">Surname</label>
                <input
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="input"
                  style={{ padding: "14px 16px", fontSize: "1rem" }}
                  placeholder="Your last name"
                  required
                />
              </div>

              {hasToken ? (
                <button
                  type="button"
                  onClick={() => router.push(`/exam/${examId}/take`)}
                  className="btn btn-ghost w-full"
                >
                  Continue saved session
                </button>
              ) : null}

              {error ? (
                <div className="banner-danger">{error}</div>
              ) : null}

              <button
                type="submit"
                disabled={loading || Boolean(info?.availabilityError)}
                className="btn btn-accent w-full"
                style={{ padding: "16px", fontSize: "1.05rem" }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    Enter exam
                    <ArrowRight size={18} strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
