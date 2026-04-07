import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { buildSessionQuestionView, getExamWithQuestions, getSessionDetail } from "@/lib/cbt/runtime";
import { db, answers, sessions, violations } from "@/lib/db";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string; sessionId: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, sessionId } = await context.params;

  const detail = await getSessionDetail(sessionId);
  const examBundle = await getExamWithQuestions(id);
  if (!detail || !examBundle) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  return NextResponse.json({
    success: true,
    data: {
      session: detail.session,
      answers: detail.answers,
      violations: detail.violations,
      questions: buildSessionQuestionView(examBundle.questions, detail.session),
    },
  });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string; sessionId: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { sessionId } = await context.params;

  await db.delete(answers).where(eq(answers.sessionId, sessionId));
  await db.delete(violations).where(eq(violations.sessionId, sessionId));
  await db.delete(sessions).where(eq(sessions.id, sessionId));

  return NextResponse.json({ success: true });
}
