import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const plans = [
    { name: "Free", priceMonthly: 0, maxUsers: 1, maxClients: 3, maxContracts: 3, features: ["Fino a 3 contratti", "1 utente admin"] },
    { name: "Starter", priceMonthly: 9, maxUsers: 2, maxClients: 10, maxContracts: 10, features: ["10 clienti/contratti", "1 staff aggiuntivo"] },
    { name: "Professional", priceMonthly: 29, maxUsers: 4, maxClients: 30, maxContracts: 30, features: ["30 clienti", "3 staff aggiuntivi"] },
    { name: "Business", priceMonthly: 49, maxUsers: 11, maxClients: 100, maxContracts: 100, features: ["100 clienti", "10 staff aggiuntivi"] },
    { name: "Enterprise", priceMonthly: 99, maxUsers: 999999, maxClients: 999999, maxContracts: 999999, features: ["Tutto illimitato", "Supporto prioritario"] }
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({ where: { name: plan.name }, update: plan, create: plan });
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
      ruolo: UserRole.SUPER_ADMIN
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
