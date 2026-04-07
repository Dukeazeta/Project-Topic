import Link from "next/link";
import { desc } from "drizzle-orm";

import { db, exams } from "@/lib/db";

export default async function ResultsPage() {
  const rows = await db.select().from(exams).orderBy(desc(exams.createdAt));

  return (
    <section className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Results Export</p>
      <h2 className="mt-2 text-3xl font-semibold">Download result sheets for any exam.</h2>

      <div className="mt-6 space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No exams yet.</p>
        ) : (
          rows.map((exam) => (
            <div key={exam.id} className="flex flex-col gap-3 rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{exam.courseCode}</p>
                <h3 className="mt-1 text-xl font-semibold">{exam.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/admin/exams/${exam.id}`} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
                  View exam
                </Link>
                <a href={`/api/admin/results/export?examId=${exam.id}`} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-[var(--accent-foreground)]">
                  Export CSV
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
