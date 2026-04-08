import { NextRequest, NextResponse } from "next/server";

import { getAdminFromRequest } from "@/lib/auth/admin";
import { parseStudentSheet, readWorkbook } from "@/lib/cbt/excel";
import { db, students } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please upload an Excel file." }, { status: 400 });
    }

    const workbook = await readWorkbook(file);
    const rows = parseStudentSheet(workbook);

    let imported = 0;
    for (const row of rows) {
      try {
        await db.insert(students).values(row).onConflictDoNothing();
        imported += 1;
      } catch {
        // skip bad row
      }
    }

    return NextResponse.json({ success: true, data: { imported, totalRows: rows.length } });
  } catch (err: any) {
    console.error("Student upload error:", err);
    return NextResponse.json({ error: "Failed to parse Excel file. Ensure it matches the template." }, { status: 500 });
  }
}
