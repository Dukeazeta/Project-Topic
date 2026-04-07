import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, exams, sessions, students } from "@/lib/db";
import { toCsv } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const examId = request.nextUrl.searchParams.get("examId");
  if (!examId) return NextResponse.json({ error: "examId is required." }, { status: 400 });

  const [exam] = await db.select().from(exams).where(eq(exams.id, examId)).limit(1);
  const rows = await db.select().from(sessions).where(eq(sessions.examId, examId)).orderBy(desc(sessions.createdAt));
  const studentRows = await db.select().from(students);
  const studentMap = new Map(studentRows.map((item) => [item.id, item]));

  const csv = toCsv(
    rows.map((row) => ({
      matricNo: studentMap.get(row.studentId)?.matricNo ?? "",
      studentName: `${studentMap.get(row.studentId)?.firstName ?? ""} ${studentMap.get(row.studentId)?.surname ?? ""}`.trim(),
      status: row.status,
      score: row.score ?? "",
      totalPoints: row.totalPoints ?? "",
      warningCount: row.warningCount,
      submittedAt: row.submittedAt ?? "",
    })),
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=\"${(exam?.courseCode || "results").replace(/\s+/g, "-")}-results.csv\"`,
    },
  });
}
