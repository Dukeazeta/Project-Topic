import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getStudentSessionFromRequest } from "@/lib/auth/student";
import { buildSessionQuestionView, getExamWithQuestions, syncSessionClock } from "@/lib/cbt/runtime";
import { db, sessions } from "@/lib/db";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const auth = await getStudentSessionFromRequest(request);
  if (!auth || auth.payload.examId !== id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const examBundle = await getExamWithQuestions(id);
  if (!examBundle) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

  const synced = await syncSessionClock(auth.session);
  if (synced.remainingSeconds <= 0 && synced.status === "in_progress") {
    const [expired] = await db
      .update(sessions)
      .set({
        status: "auto_submitted",
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(sessions.id, synced.id))
      .returning();
    return NextResponse.json({ error: "This session has expired.", data: { session: expired } }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    data: {
      sessionId: synced.id,
      status: synced.status,
      title: examBundle.exam.title,
      timerMode: examBundle.exam.timerMode,
      questionLayout: examBundle.exam.questionLayout,
      questionTimeSec: examBundle.exam.questionTimeSec,
      remainingSeconds: synced.remainingSeconds,
      warningCount: synced.warningCount,
      maxViolations: examBundle.exam.maxViolations,
      questions: buildSessionQuestionView(examBundle.questions, synced),
    },
  });
}
