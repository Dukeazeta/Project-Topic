import { NextRequest, NextResponse } from "next/server";
import { desc, eq, max } from "drizzle-orm";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { parseQuestionSheet, readWorkbook } from "@/lib/cbt/excel";
import { db, questions } from "@/lib/db";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json().catch(() => null);

  const orderResult = await db
    .select({ value: max(questions.sortOrder) })
    .from(questions)
    .where(eq(questions.examId, id));
  const nextOrder = (orderResult[0]?.value ?? -1) + 1;

  const [question] = await db
    .insert(questions)
    .values({
      examId: id,
      text: String(body?.text ?? "").trim(),
      imageUrl: body?.imageUrl || null,
      optionA: String(body?.optionA ?? "").trim(),
      optionB: String(body?.optionB ?? "").trim(),
      optionC: String(body?.optionC ?? "").trim(),
      optionD: String(body?.optionD ?? "").trim(),
      correctOption: String(body?.correctOption ?? "A").trim().toUpperCase(),
      points: Number(body?.points ?? 1),
      sortOrder: nextOrder,
    })
    .returning();

  return NextResponse.json({ success: true, data: { question } }, { status: 201 });
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const examQuestions = await db.select().from(questions).where(eq(questions.examId, id)).orderBy(desc(questions.sortOrder));
  return NextResponse.json({ success: true, data: { questions: examQuestions } });
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await context.params;
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please upload an Excel file." }, { status: 400 });
    }

    const workbook = await readWorkbook(file);
    const rows = parseQuestionSheet(workbook);

    const existing = await db.select().from(questions).where(eq(questions.examId, id));
    let order = existing.length;
    for (const row of rows) {
      await db.insert(questions).values({
        examId: id,
        ...row,
        sortOrder: order,
      });
      order += 1;
    }

    return NextResponse.json({ success: true, data: { imported: rows.length } });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to parse Excel file. Ensure it matches the template." }, { status: 500 });
  }
}
