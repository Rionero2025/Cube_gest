import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { DashboardCard } from "@/components/DashboardCard";
import { getServerSession } from "@/lib/session";

export default async function SuperAdminPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");
  if (session.ruolo !== "SUPER_ADMIN") redirect("/dashboard");

  return (
    <PageShell>
      <section className="section container">
        <div className="section-head">
          <div className="icon-badge">👑</div>
          <div>
            <h2>Super Admin SaaS</h2>
            <p>Area riservata al gestore della piattaforma CUBE.</p>
          </div>
        </div>
        <div className="grid-4">
          <DashboardCard title="Aziende SaaS" value="0" caption="Pronto per dati reali" />
          <DashboardCard title="Utenti globali" value="1" caption="Super Admin creato" />
          <DashboardCard title="Piani" value="5" caption="Pacchetti attivi" />
          <DashboardCard title="Stato" value="Online" caption="Database collegato" />
        </div>
        <section className="section">
          <div className="grid-3">
            <Link className="card" href="/super-admin/aziende"><h3>Aziende</h3><p>Gestione tenant SaaS.</p></Link>
            <Link className="card" href="/super-admin/utenti"><h3>Utenti</h3><p>Gestione utenti globali.</p></Link>
            <Link className="card" href="/super-admin/piani"><h3>Piani</h3><p>Gestione pacchetti e limiti.</p></Link>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
