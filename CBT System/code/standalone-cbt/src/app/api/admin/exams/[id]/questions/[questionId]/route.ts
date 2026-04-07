import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, questions } from "@/lib/db";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string; questionId: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { questionId } = await context.params;
  const body = await request.json().catch(() => null);

  const [question] = await db
    .update(questions)
    .set({
      text: String(body?.text ?? "").trim(),
      imageUrl: body?.imageUrl || null,
      optionA: String(body?.optionA ?? "").trim(),
      optionB: String(body?.optionB ?? "").trim(),
      optionC: String(body?.optionC ?? "").trim(),
      optionD: String(body?.optionD ?? "").trim(),
      correctOption: String(body?.correctOption ?? "A").trim().toUpperCase(),
      points: Number(body?.points ?? 1),
    })
    .where(eq(questions.id, Number(questionId)))
    .returning();

  return NextResponse.json({ success: true, data: { question } });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string; questionId: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { questionId } = await context.params;

  await db.delete(questions).where(eq(questions.id, Number(questionId)));
  return NextResponse.json({ success: true });
}
