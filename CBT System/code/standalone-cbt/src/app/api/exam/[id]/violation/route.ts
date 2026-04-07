import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getStudentSessionFromRequest } from "@/lib/auth/student";
import { addViolation, finalizeSession } from "@/lib/cbt/runtime";
import { db, sessions } from "@/lib/db";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const auth = await getStudentSessionFromRequest(request);
  if (!auth || auth.payload.examId !== id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const updated = await addViolation(auth.session, body?.type, body?.metadata ?? null);

  let terminated = false;
  let session = updated;
  if (updated.warningCount >= auth.exam.maxViolations) {
    const result = await finalizeSession(updated, "terminated");
    session = result.session;
    terminated = true;
  } else {
    const [fresh] = await db.select().from(sessions).where(eq(sessions.id, updated.id)).limit(1);
    if (fresh) session = fresh;
  }

  return NextResponse.json({
    success: true,
    data: {
      warningCount: session.warningCount,
      maxViolations: auth.exam.maxViolations,
      terminated,
      sessionStatus: session.status,
    },
  });
}
