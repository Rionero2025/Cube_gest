# Fix build Vercel

Errore corretto:

`Property 'highlighted' does not exist on type ...`

Causa:
Nel file `lib/plans.ts` solo il piano Professional aveva la proprietà `highlighted`.
TypeScript, durante la build su Vercel, controlla tutti i tipi e bloccava la compilazione.

Correzione:
Tutti i piani ora hanno `highlighted: true/false` e il tipo `PlanCard`.

Cosa fare:
1. Estrai questo ZIP.
2. Carica tutto il contenuto su GitHub, sostituendo i file esistenti.
3. Fai Commit changes.
4. Torna su Vercel.
5. Clicca Redeploy / Deploy latest commit.
