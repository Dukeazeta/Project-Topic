import { NextRequest, NextResponse } from "next/server";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { listSessionRows } from "@/lib/cbt/runtime";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const rows = await listSessionRows(id);
  return NextResponse.json({ success: true, data: { sessions: rows } });
}
