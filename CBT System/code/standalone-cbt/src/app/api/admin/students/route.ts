import { NextRequest, NextResponse } from "next/server";
import { desc, eq, like, or } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, students } from "@/lib/db";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const search = request.nextUrl.searchParams.get("search")?.trim() || "";
  const rows = await db
    .select()
    .from(students)
    .where(
      search
        ? or(
            like(students.matricNo, `%${search}%`),
            like(students.surname, `%${search}%`),
            like(students.firstName, `%${search}%`),
          )
        : undefined,
    )
    .orderBy(desc(students.createdAt));

  return NextResponse.json({ success: true, data: { students: rows } });
}

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const matricNo = String(body?.matricNo ?? "").trim();
  const surname = String(body?.surname ?? "").trim();
  const firstName = String(body?.firstName ?? "").trim();

  if (!matricNo || !surname || !firstName) {
    return NextResponse.json({ error: "Matric number, surname, and first name are required." }, { status: 400 });
  }

  const [student] = await db.insert(students).values({ matricNo, surname, firstName }).returning();
  return NextResponse.json({ success: true, data: { student } }, { status: 201 });
}
