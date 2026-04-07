import { nanoid } from "nanoid";
import { and, count, desc, eq, inArray } from "drizzle-orm";

import { answers, db, exams, questions, sessions, students, violations } from "@/lib/db";

type QuestionTimerState = Record<
  number,
  {
    remainingSeconds: number;
    lastStartedAt: string | null;
  }
>;

function shuffleArray<T>(values: T[]) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function normalizeSurname(value: string) {
  return value.trim().toLowerCase();
}

export function getExamAvailabilityError(exam: typeof exams.$inferSelect, now = new Date()) {
  if (!exam.isActive) return "This exam is not active yet.";
  if (exam.startWindow && now < new Date(exam.startWindow)) return "This exam has not opened yet.";
  if (exam.endWindow && now > new Date(exam.endWindow)) return "This exam is already closed.";
  return null;
}

function parseQuestionTimers(raw: string) {
  try {
    return JSON.parse(raw) as QuestionTimerState;
  } catch {
    return {};
  }
}

function parseQuestionOrder(raw: string) {
  try {
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

function parseOptionOrder(raw: string) {
  try {
    return JSON.parse(raw) as Record<string, string[]>;
  } catch {
    return {};
  }
}

export async function getExamWithQuestions(examId: string) {
  const [exam] = await db.select().from(exams).where(eq(exams.id, examId)).limit(1);
  if (!exam) return null;
  const examQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.examId, examId))
    .orderBy(questions.sortOrder);
  return { exam, questions: examQuestions };
}

export async function getStudentByCredentials(matricNo: string, surname: string) {
  const [student] = await db.select().from(students).where(eq(students.matricNo, matricNo)).limit(1);
  if (!student) return null;
  if (normalizeSurname(student.surname) !== normalizeSurname(surname)) return null;
  return student;
}

export async function getAttemptCount(examId: string, studentId: number) {
  const result = await db
    .select({ total: count() })
    .from(sessions)
    .where(and(eq(sessions.examId, examId), eq(sessions.studentId, studentId)));
  return result[0]?.total ?? 0;
}

export async function getActiveSession(examId: string, studentId: number) {
  const found = await db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.examId, examId),
        eq(sessions.studentId, studentId),
      ),
    )
    .orderBy(desc(sessions.attemptNumber))
    .limit(5);
  return found.find((item) => item.status === "in_progress" || item.status === "paused") ?? null;
}

export async function createExamSession(examId: string, studentId: number, requestMeta?: { ipAddress?: string | null; userAgent?: string | null }) {
  const examBundle = await getExamWithQuestions(examId);
  if (!examBundle) throw new Error("Exam not found");

  const attemptNumber = (await getAttemptCount(examId, studentId)) + 1;
  const orderSource = examBundle.questions.map((question) => question.id);
  const questionOrder = examBundle.exam.shuffleQuestions ? shuffleArray(orderSource) : orderSource;

  const optionOrder = Object.fromEntries(
    examBundle.questions.map((question) => {
      const options = ["A", "B", "C", "D"];
      return [String(question.id), examBundle.exam.shuffleOptions ? shuffleArray(options) : options];
    }),
  );

  const now = new Date().toISOString();
  const [session] = await db
    .insert(sessions)
    .values({
      id: nanoid(16),
      examId,
      studentId,
      attemptNumber,
      status: "in_progress",
      startedAt: now,
      lastResumedAt: now,
      remainingSeconds: examBundle.exam.duration * 60,
      questionTimers: "{}",
      questionOrder: JSON.stringify(questionOrder),
      optionOrder: JSON.stringify(optionOrder),
      ipAddress: requestMeta?.ipAddress ?? null,
      userAgent: requestMeta?.userAgent ?? null,
    })
    .returning();

  return session;
}

export async function syncSessionClock(session: typeof sessions.$inferSelect) {
  if (session.status !== "in_progress" || !session.lastResumedAt) return session;
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - new Date(session.lastResumedAt).getTime()) / 1000);
  if (elapsed <= 0) return session;

  let nextRemaining = session.remainingSeconds;
  let nextQuestionTimers = parseQuestionTimers(session.questionTimers);
  nextRemaining = Math.max(0, session.remainingSeconds - elapsed);

  Object.entries(nextQuestionTimers).forEach(([questionId, timerState]) => {
    if (!timerState.lastStartedAt) return;
    const qElapsed = Math.floor((now.getTime() - new Date(timerState.lastStartedAt).getTime()) / 1000);
    nextQuestionTimers[Number(questionId)] = {
      remainingSeconds: Math.max(0, timerState.remainingSeconds - qElapsed),
      lastStartedAt: now.toISOString(),
    };
  });

  const [updated] = await db
    .update(sessions)
    .set({
      remainingSeconds: nextRemaining,
      lastResumedAt: now.toISOString(),
      questionTimers: JSON.stringify(nextQuestionTimers),
      updatedAt: now.toISOString(),
    })
    .where(eq(sessions.id, session.id))
    .returning();

  return updated ?? session;
}

export async function pauseSession(sessionId: string) {
  const [found] = await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1);
  if (!found) return null;
  const synced = await syncSessionClock(found);
  const timers = parseQuestionTimers(synced.questionTimers);
  for (const key of Object.keys(timers)) {
    timers[Number(key)].lastStartedAt = null;
  }
  const now = new Date().toISOString();
  const [updated] = await db
    .update(sessions)
    .set({
      status: "paused",
      pausedAt: now,
      lastResumedAt: null,
      questionTimers: JSON.stringify(timers),
      updatedAt: now,
    })
    .where(eq(sessions.id, sessionId))
    .returning();
  return updated ?? null;
}

export async function resumeSession(sessionId: string) {
  const now = new Date().toISOString();
  const [updated] = await db
    .update(sessions)
    .set({
      status: "in_progress",
      pausedAt: null,
      lastResumedAt: now,
      updatedAt: now,
    })
    .where(eq(sessions.id, sessionId))
    .returning();
  return updated ?? null;
}

export async function updateQuestionVisit(session: typeof sessions.$inferSelect, questionId: number, questionTimeSec: number) {
  const synced = await syncSessionClock(session);
  const timers = parseQuestionTimers(synced.questionTimers);
  const current = timers[questionId] || { remainingSeconds: questionTimeSec, lastStartedAt: null };
  const now = new Date().toISOString();
  timers[questionId] = {
    remainingSeconds: current.remainingSeconds,
    lastStartedAt: now,
  };
  const [updated] = await db
    .update(sessions)
    .set({
      questionTimers: JSON.stringify(timers),
      updatedAt: now,
    })
    .where(eq(sessions.id, session.id))
    .returning();
  return updated ?? synced;
}

export async function saveAnswer(sessionId: string, questionId: number, selectedOption: string | null) {
  const now = new Date().toISOString();
  const existing = await db
    .select()
    .from(answers)
    .where(and(eq(answers.sessionId, sessionId), eq(answers.questionId, questionId)))
    .limit(1);

  if (existing[0]) {
    const [updated] = await db
      .update(answers)
      .set({ selectedOption, answeredAt: now })
      .where(eq(answers.id, existing[0].id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(answers)
    .values({
      sessionId,
      questionId,
      selectedOption,
      answeredAt: now,
    })
    .returning();
  return created;
}

export async function addViolation(session: typeof sessions.$inferSelect, type: typeof violations.$inferInsert.type, metadata?: string | null) {
  const synced = await syncSessionClock(session);
  const warningCount = synced.warningCount + 1;
  const now = new Date().toISOString();

  await db.insert(violations).values({
    sessionId: synced.id,
    type,
    metadata: metadata ?? null,
    timestamp: now,
  });

  const status =
    warningCount >=  synced.warningCount + 1 && warningCount >= 0 ? synced.status : synced.status;

  const [updated] = await db
    .update(sessions)
    .set({
      warningCount,
      status: warningCount >= 0 ? synced.status : status,
      updatedAt: now,
    })
    .where(eq(sessions.id, synced.id))
    .returning();

  return updated ?? synced;
}

function getDisplayedCorrectOption(correctOption: string, optionOrder: string[]) {
  const displayedIndex = optionOrder.findIndex((item) => item === correctOption);
  return ["A", "B", "C", "D"][displayedIndex] ?? correctOption;
}

export async function finalizeSession(session: typeof sessions.$inferSelect, forcedStatus?: "submitted" | "auto_submitted" | "terminated") {
  const synced = await syncSessionClock(session);
  const examBundle = await getExamWithQuestions(synced.examId);
  if (!examBundle) throw new Error("Exam not found");

  const questionIds = examBundle.questions.map((question) => question.id);
  const submittedAnswers = questionIds.length
    ? await db.select().from(answers).where(and(eq(answers.sessionId, synced.id), inArray(answers.questionId, questionIds)))
    : [];
  const answerMap = new Map(submittedAnswers.map((answer) => [answer.questionId, answer.selectedOption]));
  const optionOrder = parseOptionOrder(synced.optionOrder);

  let score = 0;
  let totalPoints = 0;

  examBundle.questions.forEach((question) => {
    totalPoints += question.points;
    const displayedCorrectOption = getDisplayedCorrectOption(
      question.correctOption,
      optionOrder[String(question.id)] || ["A", "B", "C", "D"],
    );
    if (answerMap.get(question.id) === displayedCorrectOption) {
      score += question.points;
    }
  });

  const status =
    forcedStatus ||
    (synced.remainingSeconds <= 0 ? "auto_submitted" : "submitted");

  const [updated] = await db
    .update(sessions)
    .set({
      status,
      score,
      totalPoints,
      submittedAt: new Date().toISOString(),
      lastResumedAt: null,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(sessions.id, synced.id))
    .returning();

  return {
    session: updated ?? synced,
    score,
    totalPoints,
    percentage: totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0,
    answeredCount: submittedAnswers.filter((item) => !!item.selectedOption).length,
    totalQuestions: examBundle.questions.length,
  };
}

export async function getSessionDetail(sessionId: string) {
  const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1);
  if (!session) return null;
  const synced = await syncSessionClock(session);
  const sessionAnswers = await db.select().from(answers).where(eq(answers.sessionId, sessionId));
  const sessionViolations = await db.select().from(violations).where(eq(violations.sessionId, sessionId));
  return {
    session: synced,
    answers: sessionAnswers,
    violations: sessionViolations,
  };
}

export function buildSessionQuestionView(
  examQuestions: Array<typeof questions.$inferSelect>,
  session: typeof sessions.$inferSelect,
) {
  const order = parseQuestionOrder(session.questionOrder);
  const optionOrder = parseOptionOrder(session.optionOrder);
  const questionTimers = parseQuestionTimers(session.questionTimers);
  const byId = new Map(examQuestions.map((question) => [question.id, question]));

  return order
    .map((id) => byId.get(id))
    .filter((item): item is typeof questions.$inferSelect => Boolean(item))
    .map((question, index) => {
      const optionSequence = optionOrder[String(question.id)] || ["A", "B", "C", "D"];
      const optionValues = {
        A: question.optionA,
        B: question.optionB,
        C: question.optionC,
        D: question.optionD,
      } as const;

      return {
        id: question.id,
        order: index,
        text: question.text,
        imageUrl: question.imageUrl,
        points: question.points,
        optionA: optionValues[optionSequence[0] as keyof typeof optionValues],
        optionB: optionValues[optionSequence[1] as keyof typeof optionValues],
        optionC: optionValues[optionSequence[2] as keyof typeof optionValues],
        optionD: optionValues[optionSequence[3] as keyof typeof optionValues],
        questionRemainingSeconds: questionTimers[question.id]?.remainingSeconds ?? null,
      };
    });
}

export async function listSessionRows(examId: string) {
  const rows = await db.select().from(sessions).where(eq(sessions.examId, examId)).orderBy(desc(sessions.createdAt));
  const studentIds = [...new Set(rows.map((row) => row.studentId))];
  const studentRows = studentIds.length
    ? await db.select().from(students).where(inArray(students.id, studentIds))
    : [];
  const studentMap = new Map(studentRows.map((student) => [student.id, student]));
  return rows.map((row) => ({
    ...row,
    studentName: `${studentMap.get(row.studentId)?.firstName ?? ""} ${studentMap.get(row.studentId)?.surname ?? ""}`.trim(),
    matricNo: studentMap.get(row.studentId)?.matricNo ?? "-",
  }));
}
