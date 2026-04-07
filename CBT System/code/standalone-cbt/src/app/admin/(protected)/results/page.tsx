import Link from "next/link";
import { desc } from "drizzle-orm";

import { db, exams } from "@/lib/db";

export default async function ResultsPage() {
  const rows = await db.select().from(exams).orderBy(desc(exams.createdAt));

  return (
    <section className="border border-border bg-white/80 p-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Results Export</p>
      <h2 className="mt-2 text-3xl font-medium">Download result sheets for any exam.</h2>

      <div className="mt-6 space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No exams yet.</p>
        ) : (
          rows.map((exam) => (
            <div key={exam.id} className="flex flex-col gap-3 border border-border bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary">{exam.courseCode}</p>
                <h3 className="mt-1 text-xl font-medium">{exam.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/admin/exams/${exam.id}`} className="border border-border px-4 py-2 text-sm hover:bg-accent/5 transition-colors">
                  View exam
                </Link>
                <a href={`/api/admin/results/export?examId=${exam.id}`} className="bg-accent px-4 py-2 text-sm text-accent-foreground">
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
