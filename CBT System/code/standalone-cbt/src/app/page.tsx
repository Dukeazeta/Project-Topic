import Link from "next/link";
import {
  CheckSquare,
  ClipboardList,
  Clock,
  Shield,
  BarChart3,
  Users,
  ArrowRight,
  Monitor,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student authentication",
    description: "Students log in with their matric number and surname — no separate accounts needed.",
  },
  {
    icon: ClipboardList,
    title: "Exam and question management",
    description: "Create exams, add questions manually or import from Excel spreadsheets.",
  },
  {
    icon: Clock,
    title: "Timed sessions",
    description: "Full exam timers or per-question timers with live pause and resume controls.",
  },
  {
    icon: Shield,
    title: "Anti-cheat monitoring",
    description: "Tab-switch and focus-loss detection with configurable warning thresholds.",
  },
  {
    icon: BarChart3,
    title: "Results and export",
    description: "Instant scoring after submission with full result sheets exportable to CSV.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-[100dvh] px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-5xl fade-in">
        {/* Header */}
        <header className="flex items-center justify-between mb-20 lg:mb-28">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[6px]"
              style={{ background: "var(--accent)" }}
            >
              <CheckSquare size={14} strokeWidth={2.5} color="white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Standalone CBT
            </span>
          </div>
          <Link
            href="/admin/login"
            className="text-sm font-medium transition-colors"
            style={{
              color: "var(--fg-muted)",
              transitionDuration: "var(--duration-normal)",
            }}
          >
            Admin access
          </Link>
        </header>

        {/* Hero */}
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1"
            style={{ background: "var(--accent-ghost)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "var(--accent)" }}
            >
              Secure exam platform
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
            Computer-based testing built for departmental exams
          </h1>

          <p
            className="mt-5 max-w-[540px] text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            Anti-cheat monitoring, live session control, timed exams, and
            instant result generation — all in one standalone system.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/admin/login" className="btn btn-accent">
              Admin login
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <Link href="/admin/dashboard" className="btn btn-ghost">
              Open dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <section className="mt-24 lg:mt-32">
          <div className="flex items-center gap-3 mb-10">
            <Monitor size={16} strokeWidth={1.5} style={{ color: "var(--fg-faint)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--fg-faint)" }}
            >
              Platform capabilities
            </span>
          </div>

          <div className="stagger">
            {features.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-5 py-6"
                style={{
                  borderTop: index === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[var(--radius-sm)]"
                  style={{ background: "var(--bg-inset)" }}
                >
                  <item.icon
                    size={16}
                    strokeWidth={1.5}
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-relaxed max-w-[480px]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          className="mt-24 pt-8 text-xs"
          style={{
            color: "var(--fg-faint)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>Standalone CBT Platform</span>
            <span>Built for academic use</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
