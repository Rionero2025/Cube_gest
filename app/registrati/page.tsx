import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegistratiPage() {
  return (
    <PageShell>
      <section className="hero container">
        <div className="hero-card">
          <div>
            <div className="badge">🏢 Registrazione azienda</div>
            <h1>Crea il tuo spazio aziendale <span>CUBE</span></h1>
            <p className="lead">Registra l’azienda, crea l’utente admin e attiva la prova gratuita di 30 giorni.</p>
            <div className="message">La registrazione crea Tenant, User Admin e Subscription nel database Supabase.</div>
          </div>
          <Suspense fallback={<div className="visual-panel">Caricamento...</div>}>
            <RegisterForm />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
