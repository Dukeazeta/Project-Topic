import Link from "next/link";
import { count } from "drizzle-orm";
import { ArrowRight, FileText, Users, BarChart3 } from "lucide-react";

import { db, exams, sessions, students } from "@/lib/db";

export default async function DashboardPage() {
  const [examCount] = await db.select({ value: count() }).from(exams);
  const [studentCount] = await db.select({ value: count() }).from(students);
  const [sessionCount] = await db.select({ value: count() }).from(sessions);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <span className="section-label">Dashboard</span>
        <h1 className="section-title" style={{ fontSize: "1.75rem" }}>
          System overview
        </h1>
        <p className="section-subtitle">
          Everything needed to run a focused departmental CBT system.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
        {/* Metrics */}
        {[
          { label: "Exams created", value: examCount?.value ?? 0 },
          { label: "Registered students", value: studentCount?.value ?? 0 },
          { label: "Exam sessions", value: sessionCount?.value ?? 0 },
        ].map((metric) => (
          <div key={metric.label} className="section-card">
            <p className="metric-label">{metric.label}</p>
            <p className="metric-value" style={{ marginTop: "8px" }}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="section-card">
        <div className="section-header">
          <span className="section-label">Quick actions</span>
          <p className="section-subtitle" style={{ marginTop: "2px" }}>
            Jump to common tasks
          </p>
        </div>

        <div className="mt-6 space-y-1">
          {[
            {
              href: "/admin/exams",
              icon: FileText,
              label: "Manage exams",
              hint: "Create, edit, and configure exam settings",
            },
            {
              href: "/admin/students",
              icon: Users,
              label: "Import and manage students",
              hint: "Add students manually or import from Excel",
            },
            {
              href: "/admin/results",
              icon: BarChart3,
              label: "Export results",
              hint: "Download result sheets as CSV files",
            },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center gap-4 rounded-[var(--radius-md)] px-4 py-3.5 transition-colors"
              style={{
                transitionDuration: "var(--duration-normal)",
                transitionTimingFunction: "var(--ease-out)",
              }}
            >
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[var(--radius-sm)]"
                style={{ background: "var(--bg-inset)" }}
              >
                <action.icon
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: "var(--fg-muted)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{action.label}</p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--fg-faint)" }}
                >
                  {action.hint}
                </p>
              </div>
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                style={{
                  color: "var(--fg-muted)",
                  transitionDuration: "var(--duration-normal)",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
