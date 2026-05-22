import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/auth/admin";

export default async function AdminIndexPage() {
  const admin = await getAdminSession();
  redirect(admin ? "/admin/dashboard" : "/admin/login");
}
