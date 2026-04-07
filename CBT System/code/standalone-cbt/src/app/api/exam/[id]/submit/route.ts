import { NextRequest, NextResponse } from "next/server";

import { getStudentSessionFromRequest } from "@/lib/auth/student";
import { finalizeSession } from "@/lib/cbt/runtime";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const auth = await getStudentSessionFromRequest(request);
  if (!auth || auth.payload.examId !== id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (auth.session.status === "paused") return NextResponse.json({ error: "This session is paused." }, { status: 423 });

  const body = await request.json().catch(() => ({}));
  const forcedStatus =
    body?.terminated === true ? "terminated" : body?.auto === true ? "auto_submitted" : "submitted";
  const result = await finalizeSession(auth.session, forcedStatus);

  return NextResponse.json({
    success: true,
    data: result,
  });
}
