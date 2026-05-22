import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/auth/admin";
import { AdminSidebar } from "@/components/admin/admin-nav";

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
    <div className="sidebar-layout">
      {/* Sidebar */}
      <AdminSidebar
        adminName={admin.name}
        logoutAction={logout}
      />

      {/* Main content */}
      <main className="sidebar-main">
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
