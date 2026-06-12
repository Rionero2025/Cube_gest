import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { DashboardCard } from "@/components/DashboardCard";
import { getServerSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <PageShell>
      <section className="section container">
        <div className="section-head">
          <div className="icon-badge">🏠</div>
          <div>
            <h2>Dashboard azienda</h2>
            <p>Benvenuto {session.nome}. Questa è la base collegata al sistema di login.</p>
          </div>
        </div>
        <div className="grid-4">
          <DashboardCard title="Clienti" value="0" caption="Modulo pronto" />
          <DashboardCard title="Contratti" value="0" caption="Modulo pronto" />
          <DashboardCard title="Rate" value="0" caption="Modulo pronto" />
          <DashboardCard title="Lavori" value="0" caption="Modulo pronto" />
        </div>
        <section className="section">
          <div className="grid-3">
            <Link className="card" href="/dashboard/clienti"><h3>Clienti</h3><p>Gestione CRM clienti.</p></Link>
            <Link className="card" href="/dashboard/contratti"><h3>Contratti</h3><p>Gestione contratti e servizi.</p></Link>
            <Link className="card" href="/dashboard/pagamenti"><h3>Pagamenti</h3><p>Rate, acconti e residui.</p></Link>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
