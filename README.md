# CUBE Management Contract — Next.js SaaS Starter Completo

Primo step della migrazione da Streamlit a un SaaS moderno.

## Stack
- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- CSS custom premium
- Struttura multi-tenant

## Avvio locale
```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

## Database
Imposta `DATABASE_URL` in `.env`, poi:
```bash
npx prisma migrate dev --name init
npm run seed
```

## Seed iniziale
- username: superadmin
- password: admin123

## Prossimo step
Login reale + registrazione azienda + salvataggio database.
