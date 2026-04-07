import { sql } from "drizzle-orm";
import { blob, index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const students = sqliteTable("students", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  matricNo: text("matric_no").notNull().unique(),
  surname: text("surname").notNull(),
  firstName: text("first_name").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const exams = sqliteTable("exams", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  courseCode: text("course_code").notNull(),
  description: text("description"),
  duration: integer("duration").notNull().default(60),
  timerMode: text("timer_mode", { enum: ["full_exam", "per_question"] }).notNull().default("full_exam"),
  questionLayout: text("question_layout", { enum: ["single_question", "scroll_all"] }).notNull().default("single_question"),
  questionTimeSec: integer("question_time_sec").notNull().default(60),
  passingScore: integer("passing_score").notNull().default(50),
  maxViolations: integer("max_violations").notNull().default(3),
  maxRetakes: integer("max_retakes").notNull().default(0),
  shuffleQuestions: integer("shuffle_questions", { mode: "boolean" }).notNull().default(false),
  shuffleOptions: integer("shuffle_options", { mode: "boolean" }).notNull().default(false),
  showResult: integer("show_result", { mode: "boolean" }).notNull().default(true),
  allowMobile: integer("allow_mobile", { mode: "boolean" }).notNull().default(true),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(false),
  startWindow: text("start_window"),
  endWindow: text("end_window"),
  createdByAdminId: integer("created_by_admin_id").references(() => admins.id),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const questionImages = sqliteTable("question_images", {
  id: text("id").primaryKey(),
  examId: text("exam_id").notNull().references(() => exams.id, { onDelete: "cascade" }),
  originalName: text("original_name"),
  mimeType: text("mime_type").notNull(),
  byteSize: integer("byte_size").notNull(),
  data: blob("data", { mode: "buffer" }).notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const questions = sqliteTable(
  "questions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    examId: text("exam_id").notNull().references(() => exams.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    imageUrl: text("image_url"),
    optionA: text("option_a").notNull(),
    optionB: text("option_b").notNull(),
    optionC: text("option_c").notNull(),
    optionD: text("option_d").notNull(),
    correctOption: text("correct_option").notNull(),
    points: integer("points").notNull().default(1),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    examOrderIdx: index("questions_exam_order_idx").on(table.examId, table.sortOrder),
  }),
);

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    examId: text("exam_id").notNull().references(() => exams.id, { onDelete: "cascade" }),
    studentId: integer("student_id").notNull().references(() => students.id, { onDelete: "cascade" }),
    attemptNumber: integer("attempt_number").notNull().default(1),
    status: text("status", {
      enum: ["in_progress", "paused", "submitted", "auto_submitted", "terminated"],
    }).notNull().default("in_progress"),
    startedAt: text("started_at").notNull(),
    lastResumedAt: text("last_resumed_at"),
    pausedAt: text("paused_at"),
    submittedAt: text("submitted_at"),
    remainingSeconds: integer("remaining_seconds").notNull(),
    warningCount: integer("warning_count").notNull().default(0),
    score: integer("score"),
    totalPoints: integer("total_points"),
    questionTimers: text("question_timers").notNull().default("{}"),
    questionOrder: text("question_order").notNull().default("[]"),
    optionOrder: text("option_order").notNull().default("{}"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    uniqueAttemptIdx: uniqueIndex("sessions_exam_student_attempt_uq").on(
      table.examId,
      table.studentId,
      table.attemptNumber,
    ),
    examStatusIdx: index("sessions_exam_status_idx").on(table.examId, table.status),
  }),
);

export const answers = sqliteTable(
  "answers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sessionId: text("session_id").notNull().references(() => sessions.id, { onDelete: "cascade" }),
    questionId: integer("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
    selectedOption: text("selected_option"),
    answeredAt: text("answered_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    uniqueAnswerIdx: uniqueIndex("answers_session_question_uq").on(table.sessionId, table.questionId),
  }),
);

export const violations = sqliteTable(
  "violations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sessionId: text("session_id").notNull().references(() => sessions.id, { onDelete: "cascade" }),
    type: text("type", {
      enum: ["tab_switch", "fullscreen_exit", "copy_paste", "right_click", "devtools"],
    }).notNull(),
    metadata: text("metadata"),
    timestamp: text("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    sessionTimestampIdx: index("violations_session_timestamp_idx").on(table.sessionId, table.timestamp),
  }),
);

export type ExamTimerMode = typeof exams.$inferSelect.timerMode;
export type QuestionLayout = typeof exams.$inferSelect.questionLayout;
export type SessionStatus = typeof sessions.$inferSelect.status;
