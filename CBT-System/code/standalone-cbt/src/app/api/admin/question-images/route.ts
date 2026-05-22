import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { db, questionImages } from "@/lib/db";

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const examId = String(formData.get("examId") ?? "");

  if (!(file instanceof File) || !examId) {
    return NextResponse.json({ error: "Exam and image file are required." }, { status: 400 });
  }

  const id = nanoid(16);
  const buffer = Buffer.from(await file.arrayBuffer());

  await db.insert(questionImages).values({
    id,
    examId,
    originalName: file.name,
    mimeType: file.type || "application/octet-stream",
    byteSize: buffer.byteLength,
    data: buffer,
  });

  return NextResponse.json({
    success: true,
    data: {
      id,
      imageUrl: `/api/images/${id}`,
    },
  });
}
