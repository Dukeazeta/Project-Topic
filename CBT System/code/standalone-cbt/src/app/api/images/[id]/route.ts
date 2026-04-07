import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db, questionImages } from "@/lib/db";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const [image] = await db.select().from(questionImages).where(eq(questionImages.id, id)).limit(1);
  if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
