import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/auth/admin";

async function logout() {
  "use server";
  const store = await cookies();
  store.delete("standalone_cbt_admin");
  redirect("/admin/login");
}

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_20px_80px_rgba(23,18,13,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Standalone CBT Admin</p>
              <h1 className="mt-2 text-3xl font-semibold">Welcome back, {admin.name}</h1>
            </div>
            <form action={logout}>
              <button className="rounded-full border border-[var(--line)] px-5 py-2 text-sm font-medium">
                Sign Out
              </button>
            </form>
          </div>

          <nav className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/admin/dashboard" className="rounded-full border border-[var(--line)] px-4 py-2">
              Dashboard
            </Link>
            <Link href="/admin/exams" className="rounded-full border border-[var(--line)] px-4 py-2">
              Exams
            </Link>
            <Link href="/admin/students" className="rounded-full border border-[var(--line)] px-4 py-2">
              Students
            </Link>
            <Link href="/admin/results" className="rounded-full border border-[var(--line)] px-4 py-2">
              Results
            </Link>
          </nav>
        </div>

        {children}
      </div>
    </div>
  );
}
