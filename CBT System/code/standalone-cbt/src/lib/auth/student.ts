import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db, exams, sessions, students } from "@/lib/db";
import { STUDENT_HEADER_NAME } from "@/lib/constants";

import { getAuthSecret } from "./shared";

export type StudentTokenPayload = {
  sub: string;
  examId: string;
  sessionId: string;
  matricNo: string;
};

export async function createStudentToken(payload: {
  studentId: number;
  examId: string;
  sessionId: string;
  matricNo: string;
}) {
  return new SignJWT({
    examId: payload.examId,
    sessionId: payload.sessionId,
    matricNo: payload.matricNo,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.studentId))
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getAuthSecret());
}

export async function verifyStudentToken(token: string) {
  const result = await jwtVerify(token, getAuthSecret());
  return result.payload as unknown as StudentTokenPayload;
}

export async function getStudentSessionFromRequest(request: NextRequest) {
  const token = request.headers.get(STUDENT_HEADER_NAME);
  if (!token) return null;
  try {
    const payload = await verifyStudentToken(token);
    const [exam] = await db.select().from(exams).where(eq(exams.id, payload.examId)).limit(1);
    if (!exam) return null;

    const [student] = await db.select().from(students).where(eq(students.id, Number(payload.sub))).limit(1);
    const [session] = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.id, payload.sessionId),
          eq(sessions.examId, payload.examId),
          eq(sessions.studentId, Number(payload.sub)),
        ),
      )
      .limit(1);

    if (!student || !session) return null;
    return { payload, exam, student, session };
  } catch {
    return null;
  }
}
