import { NextRequest, NextResponse } from "next/server";

import { getStudentSessionFromRequest } from "@/lib/auth/student";
import { saveAnswer, syncSessionClock } from "@/lib/cbt/runtime";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const auth = await getStudentSessionFromRequest(request);
  if (!auth || auth.payload.examId !== id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const synced = await syncSessionClock(auth.session);
  if (synced.status === "paused") {
    return NextResponse.json({ error: "This session is paused." }, { status: 423 });
  }

  const body = await request.json().catch(() => null);
  const answer = await saveAnswer(synced.id, Number(body?.questionId), body?.selectedOption ?? null);
  return NextResponse.json({ success: true, data: { answer } });
}
