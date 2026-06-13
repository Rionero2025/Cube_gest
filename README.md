# CUBE Management Contract — Next.js + Supabase da zero

Questa versione è riscritta da zero senza Prisma e senza DATABASE_URL.

## Variabili Vercel richieste
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- AUTH_SECRET

## Primo passaggio
Supabase > SQL Editor > New query: incolla `supabase/schema.sql` e clicca RUN.

## Dopo deploy
Apri `/api/setup`, poi `/login`.

Credenziali:
- superadmin
- admin123
