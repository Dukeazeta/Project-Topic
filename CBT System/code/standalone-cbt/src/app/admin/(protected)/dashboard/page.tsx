import Link from "next/link";
import { count } from "drizzle-orm";

import { db, exams, sessions, students } from "@/lib/db";

export default async function DashboardPage() {
  const [examCount] = await db.select({ value: count() }).from(exams);
  const [studentCount] = await db.select({ value: count() }).from(students);
  const [sessionCount] = await db.select({ value: count() }).from(sessions);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Overview</p>
        <h2 className="mt-2 text-3xl font-semibold">Everything needed to run a focused departmental CBT system.</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5">
            <p className="text-sm text-[var(--muted)]">Exams</p>
            <p className="mt-2 text-3xl font-semibold">{examCount?.value ?? 0}</p>
          </div>
          <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5">
            <p className="text-sm text-[var(--muted)]">Students</p>
            <p className="mt-2 text-3xl font-semibold">{studentCount?.value ?? 0}</p>
          </div>
          <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-alt)] p-5">
            <p className="text-sm text-[var(--muted)]">Sessions</p>
            <p className="mt-2 text-3xl font-semibold">{sessionCount?.value ?? 0}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Quick Actions</p>
        <div className="mt-6 space-y-3">
          <Link href="/admin/exams" className="block rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-alt)] p-4">
            Manage exams
          </Link>
          <Link href="/admin/students" className="block rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-alt)] p-4">
            Import and manage students
          </Link>
          <Link href="/admin/results" className="block rounded-[1.25rem] border border-[var(--line)] bg-[var(--panel-alt)] p-4">
            Export results
          </Link>
        </div>
      </section>
    </div>
  );
}
