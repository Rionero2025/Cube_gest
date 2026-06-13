# Fix definitivo Prisma / Vercel

Questo pacchetto corregge il blocco:

`Failed to collect page data for /api/auth/login`

Correzioni:
- `package.json` usa `npx prisma generate && next build`;
- `postinstall` rigenera Prisma Client;
- le API importano Prisma dentro le funzioni e non più al caricamento del file;
- le API sono marcate come `force-dynamic` e `nodejs`.

Cosa fare:
1. Estrai questo ZIP.
2. Carica tutto su GitHub sostituendo i file attuali.
3. Fai commit.
4. Su Vercel fai Redeploy con `Clear build cache and redeploy`.
5. Dopo il deploy apri `/api/setup`.
6. Poi accedi da `/login` con `superadmin / admin123`.
