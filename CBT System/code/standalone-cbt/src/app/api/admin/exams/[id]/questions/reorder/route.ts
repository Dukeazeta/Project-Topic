import { NextRequest, NextResponse } from "next/server";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, questions } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const orderedIds = Array.isArray(body?.orderedIds) ? body.orderedIds : [];

  await Promise.all(
    orderedIds.map((questionId: number, index: number) =>
      db.update(questions).set({ sortOrder: index }).where(eq(questions.id, Number(questionId))),
    ),
  );

  return NextResponse.json({ success: true });
}
