# Fix Prisma per Vercel

Errore corretto:

`Prisma has detected that this project was built on Vercel, which caches dependencies...`

## Causa

Vercel usa cache delle dipendenze e Prisma Client non veniva rigenerato prima della build.

## Correzione applicata

Nel file `package.json` sono stati modificati/aggiunti questi script:

```json
"build": "prisma generate && next build",
"postinstall": "prisma generate",
"vercel-build": "prisma generate && next build"
```

In questo modo Prisma Client viene generato correttamente durante installazione e build.

## Cosa fare

1. Estrai questo ZIP.
2. Carica tutto il contenuto su GitHub, sostituendo i file attuali.
3. Fai commit.
4. Su Vercel fai Redeploy.
5. Se Vercel chiede la cache, usa `Clear build cache and redeploy`.

Dopo il deploy riuscito apri:

`https://cube-gest.vercel.app/api/setup`

Poi accedi da:

`https://cube-gest.vercel.app/login`

Credenziali Super Admin:

- username: `superadmin`
- password: `admin123`
