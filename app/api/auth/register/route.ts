import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSessionToken, setSessionCookie } from "@/lib/session";
import { UserRole } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const ragioneSociale = String(body.ragioneSociale || "").trim();
    const nome = String(body.nome || "").trim();
    const cognome = String(body.cognome || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const planName = String(body.planName || "Free").trim();

    if (!ragioneSociale || !nome || !email || !password) {
      return NextResponse.json({ ok: false, error: "Compila azienda, nome, email e password." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ ok: false, error: "La password deve avere almeno 6 caratteri." }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({ where: { OR: [{ username: email }, { email }] } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "Email già registrata." }, { status: 409 });
    }

    const plan = await prisma.plan.findUnique({ where: { name: planName } }) || await prisma.plan.findUnique({ where: { name: "Free" } });
    if (!plan) {
      return NextResponse.json({ ok: false, error: "Piani non inizializzati. Apri prima /api/setup." }, { status: 500 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          ragioneSociale,
          partitaIva: body.partitaIva || null,
          codiceFiscale: body.codiceFiscale || null,
          telefono: body.telefono || null,
          email,
          planName: plan.name,
          status: "IN_PROVA",
        },
      });

      const user = await tx.user.create({
        data: {
          tenantId: tenant.id,
          username: email,
          email,
          passwordHash,
          nome,
          cognome,
          ruolo: UserRole.TENANT_ADMIN,
          status: "ATTIVO",
        },
      });

      await tx.subscription.create({
        data: {
          tenantId: tenant.id,
          planId: plan.id,
          status: "IN_PROVA",
          trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      return { tenant, user };
    });

    const token = await createSessionToken({
      userId: result.user.id,
      tenantId: result.tenant.id,
      username: result.user.username,
      nome: result.user.nome,
      ruolo: result.user.ruolo,
    });

    const response = NextResponse.json({ ok: true, redirectTo: "/dashboard" });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
