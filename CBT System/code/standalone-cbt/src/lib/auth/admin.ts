import { compareSync } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { ADMIN_COOKIE_NAME } from "@/lib/constants";
import { db, admins } from "@/lib/db";

import { getAuthSecret } from "./shared";

type AdminTokenPayload = {
  sub: string;
  email: string;
  name: string;
};

export async function createAdminToken(admin: { id: number; email: string; name: string }) {
  return new SignJWT({ email: admin.email, name: admin.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(admin.id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAuthSecret());
}

export async function verifyAdminToken(token: string) {
  const result = await jwtVerify(token, getAuthSecret());
  return result.payload as unknown as AdminTokenPayload;
}

export async function authenticateAdmin(email: string, password: string) {
  const found = await db.select().from(admins).where(eq(admins.email, email.toLowerCase())).limit(1);
  const admin = found[0];
  if (!admin) return null;
  if (!compareSync(password, admin.passwordHash)) return null;
  return admin;
}

export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const payload = await verifyAdminToken(token);
    return {
      id: Number(payload.sub),
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function getAdminFromRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const payload = await verifyAdminToken(token);
    return {
      id: Number(payload.sub),
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}
