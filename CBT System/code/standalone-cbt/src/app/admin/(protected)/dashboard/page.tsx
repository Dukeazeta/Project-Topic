import Link from "next/link";
import { count } from "drizzle-orm";

import { db, exams, sessions, students } from "@/lib/db";

export default async function DashboardPage() {
  const [examCount] = await db.select({ value: count() }).from(exams);
  const [studentCount] = await db.select({ value: count() }).from(students);
  const [sessionCount] = await db.select({ value: count() }).from(sessions);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="border border-border bg-white/80 p-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Overview</p>
        <h2 className="mt-2 text-3xl font-medium">Everything needed to run a focused departmental CBT system.</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border border-border bg-gray-50 p-5">
            <p className="text-sm text-muted-foreground">Exams</p>
            <p className="mt-2 text-3xl font-semibold">{examCount?.value ?? 0}</p>
          </div>
          <div className="border border-border bg-gray-50 p-5">
            <p className="text-sm text-muted-foreground">Students</p>
            <p className="mt-2 text-3xl font-semibold">{studentCount?.value ?? 0}</p>
          </div>
          <div className="border border-border bg-gray-50 p-5">
            <p className="text-sm text-muted-foreground">Sessions</p>
            <p className="mt-2 text-3xl font-semibold">{sessionCount?.value ?? 0}</p>
          </div>
        </div>
      </section>

      <section className="border border-border bg-white/80 p-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Quick Actions</p>
        <div className="mt-6 space-y-3">
          <Link href="/admin/exams" className="block border border-border bg-gray-50 p-4 hover:bg-accent/5 transition-colors">
            Manage exams
          </Link>
          <Link href="/admin/students" className="block border border-border bg-gray-50 p-4 hover:bg-accent/5 transition-colors">
            Import and manage students
          </Link>
          <Link href="/admin/results" className="block border border-border bg-gray-50 p-4 hover:bg-accent/5 transition-colors">
            Export results
          </Link>
        </div>
      </section>
    </div>
  );
}
