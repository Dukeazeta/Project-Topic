import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="border border-border bg-white/85 p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Standalone CBT Platform</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-medium leading-tight text-balance sm:text-5xl">
                Mobile-first anti-cheat computer-based testing for departmental exams.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                This standalone build separates the CBT system from the old portal and keeps only the parts that matter:
                exam setup, student login, anti-cheat monitoring, live session control, and results.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/admin/login"
                  className="px-6 py-3 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Admin Login
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="px-6 py-3 text-sm font-medium border border-border hover:bg-accent/5 transition-colors"
                >
                  Open Dashboard
                </Link>
              </div>
            </div>
            <div className="border border-border bg-gray-50 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Core Scope</p>
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
