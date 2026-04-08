import Link from "next/link";
import { desc } from "drizzle-orm";
import { Download, ExternalLink, FileText } from "lucide-react";

import { db, exams } from "@/lib/db";

export default async function ResultsPage() {
  const rows = await db.select().from(exams).orderBy(desc(exams.createdAt));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <span className="section-label">Results</span>
        <h1 className="section-title">Result export</h1>
        <p className="section-subtitle">Download result sheets for any exam.</p>
      </div>

      <div className="section-card">
        {rows.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: "36px", paddingBottom: "36px" }}>
            <FileText className="empty-state-icon" strokeWidth={1} />
            <p className="empty-state-text">
              No exams have been created yet. Results will appear here once exams are complete.
            </p>
          </div>
        ) : (
          <div>
            {rows.map((exam, index) => (
              <div
                key={exam.id}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderTop: index === 0 ? "none" : "1px solid var(--border-light)",
                }}
              >
                <div className="min-w-0">
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {exam.courseCode}
                  </span>
                  <h3 className="mt-1 text-sm font-medium">{exam.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/exams/${exam.id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    <ExternalLink size={13} strokeWidth={1.5} />
                    View exam
                  </Link>
                  <a
                    href={`/api/admin/results/export?examId=${exam.id}`}
                    className="btn btn-accent btn-sm"
                  >
                    <Download size={13} strokeWidth={1.5} />
                    Export CSV
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
