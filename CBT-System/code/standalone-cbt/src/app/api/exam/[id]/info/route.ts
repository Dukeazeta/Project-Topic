import { NextResponse } from "next/server";

import { getExamAvailabilityError, getExamWithQuestions } from "@/lib/cbt/runtime";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const bundle = await getExamWithQuestions(id);
  if (!bundle) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

  return NextResponse.json({
    success: true,
    data: {
      exam: bundle.exam,
      questionCount: bundle.questions.length,
      availabilityError: getExamAvailabilityError(bundle.exam),
    },
  });
}
