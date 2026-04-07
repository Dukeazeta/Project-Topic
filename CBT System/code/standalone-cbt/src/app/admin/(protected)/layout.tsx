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
        <div className="border border-border bg-white/90 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Standalone CBT Admin</p>
              <h1 className="mt-2 text-3xl font-medium">Welcome back, {admin.name}</h1>
            </div>
            <form action={logout}>
              <button className="border border-border px-5 py-2 text-sm font-medium hover:bg-accent/5 transition-colors">
                Sign Out
              </button>
            </form>
          </div>

          <nav className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/admin/dashboard" className="border border-border px-4 py-2 hover:bg-accent/5 transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/exams" className="border border-border px-4 py-2 hover:bg-accent/5 transition-colors">
              Exams
            </Link>
            <Link href="/admin/students" className="border border-border px-4 py-2 hover:bg-accent/5 transition-colors">
              Students
            </Link>
            <Link href="/admin/results" className="border border-border px-4 py-2 hover:bg-accent/5 transition-colors">
              Results
            </Link>
          </nav>
        </div>

        {children}
      </div>
    </div>
  );
}
