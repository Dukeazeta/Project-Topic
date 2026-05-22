import { NextRequest, NextResponse } from "next/server";

import { getStudentSessionFromRequest } from "@/lib/auth/student";
import { buildSessionQuestionView, getExamWithQuestions, getSessionDetail, syncSessionClock } from "@/lib/cbt/runtime";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const auth = await getStudentSessionFromRequest(request);
  if (!auth || auth.payload.examId !== id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const examBundle = await getExamWithQuestions(id);
  const detail = await getSessionDetail(auth.session.id);
  if (!examBundle || !detail) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  const synced = await syncSessionClock(detail.session);
  return NextResponse.json({
    success: true,
    data: {
      session: synced,
      answers: detail.answers,
      violations: detail.violations,
      questions: buildSessionQuestionView(examBundle.questions, synced),
      remainingSeconds: synced.remainingSeconds,
      warningCount: synced.warningCount,
      status: synced.status,
      timerMode: examBundle.exam.timerMode,
      questionLayout: examBundle.exam.questionLayout,
      questionTimeSec: examBundle.exam.questionTimeSec,
    },
  });
}
