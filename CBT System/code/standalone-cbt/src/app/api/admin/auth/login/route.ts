import { NextResponse } from "next/server";

import { authenticateAdmin, createAdminToken } from "@/lib/auth/admin";
import { ADMIN_COOKIE_NAME } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "").trim();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const admin = await authenticateAdmin(email, password);
  if (!admin) {
    return NextResponse.json({ error: "Invalid login details." }, { status: 401 });
  }

  const token = await createAdminToken(admin);
  const response = NextResponse.json({
    success: true,
    data: {
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    },
  });

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
