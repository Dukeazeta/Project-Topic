import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { finalizeSession, pauseSession, resumeSession } from "@/lib/cbt/runtime";
import { db, sessions } from "@/lib/db";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string; sessionId: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { sessionId } = await context.params;
  const body = await request.json().catch(() => null);
  const action = body?.action;

  if (action === "pause") {
    const session = await pauseSession(sessionId);
    return NextResponse.json({ success: true, data: { session } });
  }
  if (action === "resume") {
    const session = await resumeSession(sessionId);
    return NextResponse.json({ success: true, data: { session } });
  }
  if (action === "final_submit") {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1);
    if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });
    const result = await finalizeSession(session, "submitted");
    return NextResponse.json({ success: true, data: { session: result.session } });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
