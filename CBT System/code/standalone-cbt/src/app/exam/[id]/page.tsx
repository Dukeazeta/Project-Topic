"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Student Exam Access</p>
          <h1 className="mt-3 text-4xl font-semibold">{info?.exam?.title || "Loading exam..."}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <span>{info?.exam?.courseCode || "-"}</span>
            <span>{info?.exam?.duration || 0} minutes</span>
            <span>{info?.questionCount || 0} questions</span>
          </div>
          {info?.availabilityError ? (
            <p className="mt-4 text-sm text-[var(--danger)]">{info.availabilityError}</p>
          ) : null}
        </section>

        <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8">
          <h2 className="text-2xl font-semibold">Login to start or resume your exam.</h2>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <input
              value={matricNo}
              onChange={(event) => setMatricNo(event.target.value)}
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
              placeholder="Matric number"
              required
            />
            <input
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
              placeholder="Surname"
              required
            />
            {getStudentToken(examId) ? (
              <button
                type="button"
                onClick={() => router.push(`/exam/${examId}/take`)}
                className="w-full rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium"
              >
                Continue With Saved Session
              </button>
            ) : null}
            {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
            <button
              type="submit"
              disabled={loading || Boolean(info?.availabilityError)}
              className="w-full rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
            >
              {loading ? "Checking..." : "Enter Exam"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
