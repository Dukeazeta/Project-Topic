import { NextRequest, NextResponse } from "next/server";

import { createStudentToken } from "@/lib/auth/student";
import { createExamSession, getActiveSession, getExamAvailabilityError, getExamWithQuestions, getStudentByCredentials } from "@/lib/cbt/runtime";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const matricNo = String(body?.matricNo ?? "").trim();
  const surname = String(body?.surname ?? "").trim();

  const examBundle = await getExamWithQuestions(id);
  if (!examBundle) return NextResponse.json({ error: "Exam not found" }, { status: 404 });
  const availabilityError = getExamAvailabilityError(examBundle.exam);
  if (availabilityError) return NextResponse.json({ error: availabilityError }, { status: 403 });

  const student = await getStudentByCredentials(matricNo, surname);
  if (!student) return NextResponse.json({ error: "Invalid matric number or surname." }, { status: 401 });

  const activeSession = await getActiveSession(id, student.id);
  const session = activeSession || (await createExamSession(id, student.id, {
    ipAddress: request.headers.get("x-forwarded-for"),
    userAgent: request.headers.get("user-agent"),
  }));

  const token = await createStudentToken({
    studentId: student.id,
    examId: id,
    sessionId: session.id,
    matricNo: student.matricNo,
  });

  return NextResponse.json({
    success: true,
    data: {
      token,
      isResume: Boolean(activeSession),
      student: {
        id: student.id,
        matricNo: student.matricNo,
        firstName: student.firstName,
        surname: student.surname,
      },
    },
  });
}
