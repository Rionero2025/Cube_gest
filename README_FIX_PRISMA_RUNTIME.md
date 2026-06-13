# Fix Prisma Runtime per Vercel

Questo pacchetto corregge il problema persistente:

`Failed to collect page data for /api/auth/login`

## Correzione reale

Il file `lib/db.ts` non crea più `new PrismaClient()` al caricamento del modulo.

Ora:
- `lib/db.ts` esporta `getPrisma()`;
- Prisma viene creato solo dentro le funzioni API al runtime;
- API marcate come `force-dynamic` e `nodejs`;
- build esegue `npx prisma generate && next build`.

## Cosa fare

1. Estrai questo ZIP.
2. Carica tutto su GitHub sostituendo i file attuali.
3. Fai commit.
4. Su Vercel fai Redeploy.
5. Usa `Clear build cache and redeploy`.

Dopo il deploy:
- apri `/api/setup`;
- poi `/login`;
- accedi con `superadmin / admin123`.
