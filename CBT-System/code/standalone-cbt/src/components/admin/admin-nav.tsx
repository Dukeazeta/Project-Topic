"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  LogOut,
  Menu,
  CheckSquare,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/exams", label: "Exams", icon: FileText },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/results", label: "Results", icon: BarChart3 },
];

export function AdminSidebar({
  adminName,
  logoutAction,
}: {
  adminName: string;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = adminName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Mobile header bar */}
      <div
        className="mobile-header items-center justify-between px-4 py-3"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="sidebar-brand-icon" style={{ width: 28, height: 28 }}>
            <CheckSquare size={12} strokeWidth={2.5} color="white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">CBT Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="btn btn-ghost btn-sm"
          style={{ padding: "6px" }}
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "sidebar-overlay-visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <CheckSquare size={14} strokeWidth={2.5} color="white" />
          </div>
          <div className="sidebar-label">
            <div className="sidebar-brand-text">Standalone CBT</div>
            <div className="sidebar-brand-sub">Admin panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span className="sidebar-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer — user info + logout */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{adminName}</div>
              <div className="sidebar-user-role">Administrator</div>
            </div>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="sidebar-link">
              <LogOut size={18} strokeWidth={1.5} />
              <span className="sidebar-label">Sign out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
