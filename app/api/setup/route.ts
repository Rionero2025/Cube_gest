import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";

const sqlStatements = [
  `DO $$ BEGIN CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN','TENANT_ADMIN','MANAGER_OPERATIVO','GESTIONE_FINANZIARIA','OPERATIVO_AVANZATO','OPERATIVO_BASE'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN CREATE TYPE "AccountStatus" AS ENUM ('IN_PROVA','ATTIVO','SOSPESO','SCADUTO','DISATTIVATO'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,

  `CREATE TABLE IF NOT EXISTS "Tenant" (
    "id" TEXT PRIMARY KEY,
    "ragioneSociale" TEXT NOT NULL,
    "formaGiuridica" TEXT,
    "partitaIva" TEXT,
    "codiceFiscale" TEXT,
    "sedeLegale" TEXT,
    "pec" TEXT,
    "codiceSdi" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "status" "AccountStatus" NOT NULL DEFAULT 'IN_PROVA',
    "planName" TEXT NOT NULL DEFAULT 'Free',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY,
    "tenantId" TEXT REFERENCES "Tenant"("id") ON DELETE SET NULL,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT,
    "ruolo" "UserRole" NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT 'ATTIVO',
    "telefono" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS "Plan" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "priceMonthly" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "maxUsers" INTEGER NOT NULL,
    "maxClients" INTEGER NOT NULL,
    "maxContracts" INTEGER NOT NULL,
    "features" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS "Subscription" (
    "id" TEXT PRIMARY KEY,
    "tenantId" TEXT NOT NULL UNIQUE REFERENCES "Tenant"("id") ON DELETE CASCADE,
    "planId" TEXT NOT NULL REFERENCES "Plan"("id") ON DELETE RESTRICT,
    "status" "AccountStatus" NOT NULL DEFAULT 'IN_PROVA',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trialEndsAt" TIMESTAMP(3),
    "currentEndsAt" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`
];

export async function GET() {
  try {
    for (const sql of sqlStatements) {
      await prisma.$executeRawUnsafe(sql);
    }

    const plans = [
      { name: "Free", priceMonthly: 0, maxUsers: 1, maxClients: 3, maxContracts: 3, features: ["Fino a 3 contratti", "1 utente admin"] },
      { name: "Starter", priceMonthly: 9, maxUsers: 2, maxClients: 10, maxContracts: 10, features: ["10 clienti/contratti", "1 staff aggiuntivo"] },
      { name: "Professional", priceMonthly: 29, maxUsers: 4, maxClients: 30, maxContracts: 30, features: ["30 clienti", "3 staff aggiuntivi"] },
      { name: "Business", priceMonthly: 49, maxUsers: 11, maxClients: 100, maxContracts: 100, features: ["100 clienti", "10 staff aggiuntivi"] },
      { name: "Enterprise", priceMonthly: 99, maxUsers: 999999, maxClients: 999999, maxContracts: 999999, features: ["Tutto illimitato", "Supporto prioritario"] },
    ];

    for (const plan of plans) {
      await prisma.plan.upsert({
        where: { name: plan.name },
        update: plan,
        create: plan,
      });
    }

    const passwordHash = await bcrypt.hash("admin123", 10);
    await prisma.user.upsert({
      where: { username: "superadmin" },
      update: {},
      create: {
        username: "superadmin",
        email: "admin@cube.local",
        passwordHash,
        nome: "Super",
        cognome: "Admin",
        ruolo: UserRole.SUPER_ADMIN,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Database inizializzato. Login Super Admin: superadmin / admin123",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
