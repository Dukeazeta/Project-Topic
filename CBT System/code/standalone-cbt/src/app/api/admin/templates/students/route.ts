import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth/admin";
import { createStudentTemplate } from "@/lib/cbt/excel";

export async function GET(request: Request) {
  const admin = await getAdminFromRequest(request as any);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const buffer = await createStudentTemplate();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="students-template.xlsx"',
    },
  });
}
