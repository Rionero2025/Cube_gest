import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { UserRole } from "@prisma/client";

export const SESSION_COOKIE = "cube_session";

export type SessionPayload = {
  userId: string;
  tenantId?: string | null;
  username: string;
  nome: string;
  ruolo: UserRole;
};

function secretKey() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || "cube-management-contract-secret-2026");
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifySessionToken(token?: string | null): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function getServerSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
