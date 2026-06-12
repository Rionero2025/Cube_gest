import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSessionToken, setSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json({ ok: false, error: "Username e password sono obbligatori." }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email: username }] },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "Credenziali non valide." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Credenziali non valide." }, { status: 401 });
    }

    const token = await createSessionToken({
      userId: user.id,
      tenantId: user.tenantId,
      username: user.username,
      nome: user.nome,
      ruolo: user.ruolo,
    });

    const response = NextResponse.json({
      ok: true,
      redirectTo: user.ruolo === "SUPER_ADMIN" ? "/super-admin" : "/dashboard",
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
