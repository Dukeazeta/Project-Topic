import { ExamDetail } from "@/components/admin/exam-detail";

export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExamDetail examId={id} />;
}
