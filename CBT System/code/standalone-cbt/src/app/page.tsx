import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8 shadow-[0_20px_80px_rgba(23,18,13,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Standalone CBT Platform</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                Mobile-first anti-cheat computer-based testing for departmental exams.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                This standalone build separates the CBT system from the old portal and keeps only the parts that matter:
                exam setup, student login, anti-cheat monitoring, live session control, and results.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/admin/login"
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-foreground)]"
                >
                  Admin Login
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium"
                >
                  Open Dashboard
                </Link>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Core Scope</p>
              <ul className="mt-4 space-y-3 text-sm leading-7">
                <li>Student exam login with matric number and surname</li>
                <li>Exam creation, settings, questions, and imports</li>
                <li>Student management and imports</li>
                <li>Live sessions, pause/resume, final submit</li>
                <li>Anti-cheat warnings and automatic termination</li>
                <li>Results review and export</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
