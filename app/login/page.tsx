import { PageShell } from "@/components/PageShell";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <PageShell>
      <section className="hero container">
        <div className="hero-card">
          <div>
            <div className="badge">🔐 Accesso riservato</div>
            <h1>Accedi al tuo spazio <span>CUBE</span></h1>
            <p className="lead">Entra nella dashboard aziendale o nell’area Super Admin.</p>
            <div className="message">Dopo aver inizializzato il database puoi usare: superadmin / admin123.</div>
          </div>
          <LoginForm />
        </div>
      </section>
    </PageShell>
  );
}
