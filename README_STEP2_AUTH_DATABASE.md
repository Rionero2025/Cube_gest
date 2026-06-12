# CUBE Step 2 — Login + Registrazione + Database

Questa versione aggiunge:
- `/api/setup` per inizializzare Supabase/PostgreSQL;
- `/api/auth/login`;
- `/api/auth/register`;
- `/api/auth/logout`;
- `/api/auth/me`;
- cookie sessione JWT;
- pagina `/login` funzionante;
- pagina `/registrati` funzionante;
- dashboard protetta;
- Super Admin protetto.

## Dopo il deploy

Apri:
`https://cube-gest.vercel.app/api/setup`

Se tutto va bene vedrai:
`Database inizializzato. Login Super Admin: superadmin / admin123`

Poi accedi da:
`https://cube-gest.vercel.app/login`

Credenziali:
- username: `superadmin`
- password: `admin123`
