import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, students } from "@/lib/db";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;

  const body = await request.json().catch(() => null);
  const matricNo = String(body?.matricNo ?? "").trim();
  const surname = String(body?.surname ?? "").trim();
  const firstName = String(body?.firstName ?? "").trim();

  const [student] = await db
    .update(students)
    .set({ matricNo, surname, firstName })
    .where(eq(students.id, Number(id)))
    .returning();

  return NextResponse.json({ success: true, data: { student } });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;

  await db.delete(students).where(eq(students.id, Number(id)));
  return NextResponse.json({ success: true });
}
