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
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="border border-border bg-white/85 p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">CBT Exam</p>
          <h1 className="mt-3 text-4xl font-medium">{info?.exam?.title || "Loading exam..."}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>{info?.exam?.courseCode || "-"}</span>
            <span>{info?.exam?.duration || 0} minutes</span>
            <span>{info?.questionCount || 0} questions</span>
          </div>
          {info?.availabilityError ? (
            <p className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 text-sm">{info.availabilityError}</p>
          ) : null}
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-5">
            <div className="bg-white/85 border border-border p-5 sm:p-6">
              <p className="text-sm text-muted-foreground">
                Use your matric number and surname exactly as they are registered. After login, your exam opens immediately.
              </p>
              <div className="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-3 text-sm">
                <div className="bg-gray-50 border border-border px-3 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Questions</p>
                  <p className="mt-1 font-medium">{info?.questionCount ?? "-"}</p>
                </div>
                <div className="bg-gray-50 border border-border px-3 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Duration</p>
                  <p className="mt-1 font-medium">{info?.exam?.duration ?? "-"} min</p>
                </div>
                <div className="bg-gray-50 border border-border px-3 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Mobile</p>
                  <p className="mt-1 font-medium">{info?.exam?.allowMobile ? "Allowed" : "Not allowed"}</p>
                </div>
              </div>
            </div>
          </section>

          <aside>
            <div className="bg-white border border-border p-5 sm:p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Student sign in</p>
              <h2 className="mt-2 text-xl font-medium">Enter your details to begin</h2>
              <form className="mt-6 space-y-4" onSubmit={submit}>
                <input
                  value={matricNo}
                  onChange={(event) => setMatricNo(event.target.value)}
                  className="w-full border border-border bg-white px-4 py-3"
                  placeholder="Matric number"
                  required
                />
                <input
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                  className="w-full border border-border bg-white px-4 py-3"
                  placeholder="Surname"
                  required
                />
                {getStudentToken(examId) ? (
                  <button
                    type="button"
                    onClick={() => router.push(`/exam/${examId}/take`)}
                    className="w-full border border-border px-6 py-3 text-sm font-medium hover:bg-accent/5 transition-colors"
                  >
                    Continue With Saved Session
                  </button>
                ) : null}
                {error ? <p className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">{error}</p> : null}
                <button
                  type="submit"
                  disabled={loading || Boolean(info?.availabilityError)}
                  className="w-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground disabled:opacity-60"
                >
                  {loading ? "Checking..." : "Enter Exam"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
