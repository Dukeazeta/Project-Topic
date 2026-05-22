import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, exams, questions } from "@/lib/db";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db.select().from(exams).orderBy(desc(exams.createdAt));
  const counts = await Promise.all(
    rows.map(async (exam) => {
      const examQuestions = await db.select().from(questions).where(eq(questions.examId, exam.id));
      return {
        ...exam,
        questionCount: examQuestions.length,
      };
    }),
  );

  return NextResponse.json({ success: true, data: { exams: counts } });
}

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const now = new Date().toISOString();
  const [exam] = await db
    .insert(exams)
    .values({
      id: nanoid(12),
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
      createdByAdminId: admin.id,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return NextResponse.json({ success: true, data: { exam } }, { status: 201 });
}
