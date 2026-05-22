import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, exams, questions } from "@/lib/db";
import { listSessionRows } from "@/lib/cbt/runtime";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;

  const [exam] = await db.select().from(exams).where(eq(exams.id, id)).limit(1);
  if (!exam) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

  const examQuestions = await db.select().from(questions).where(eq(questions.examId, id)).orderBy(questions.sortOrder);
  const sessionRows = await listSessionRows(id);

  return NextResponse.json({
    success: true,
    data: { exam, questions: examQuestions, sessions: sessionRows },
  });
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => null);

  const [exam] = await db
    .update(exams)
    .set({
      title: String(body?.title ?? "").trim(),
      courseCode: String(body?.courseCode ?? "").trim(),
      description: String(body?.description ?? "").trim() || null,
      duration: Number(body?.duration ?? 60),
      timerMode: body?.timerMode === "per_question" ? "per_question" : "full_exam",
      questionLayout: body?.questionLayout === "scroll_all" ? "scroll_all" : "single_question",
      questionTimeSec: Number(body?.questionTimeSec ?? 60),
      passingScore: Number(body?.passingScore ?? 50),
      maxViolations: Number(body?.maxViolations ?? 3),
      maxRetakes: Number(body?.maxRetakes ?? 0),
      shuffleQuestions: Boolean(body?.shuffleQuestions),
      shuffleOptions: Boolean(body?.shuffleOptions),
      showResult: body?.showResult !== false,
      allowMobile: body?.allowMobile !== false,
      isActive: Boolean(body?.isActive),
      startWindow: body?.startWindow || null,
      endWindow: body?.endWindow || null,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(exams.id, id))
    .returning();

  return NextResponse.json({ success: true, data: { exam } });
}
