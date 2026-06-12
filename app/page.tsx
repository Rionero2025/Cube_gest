import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { HeroMockup } from "@/components/marketing/HeroMockup";
export default function HomePage() {
  return <PageShell><section className="hero container"><div className="hero-card"><div><div className="badge">☁️ SaaS multi-azienda · 30 giorni gratis</div><h1>Il gestionale online per <span>contratti, clienti, lavori e pagamenti</span></h1><p className="lead">CUBE Management Contract aiuta aziende, consulenti, agenzie e società di servizi a gestire CRM, contratti, scadenze, staff, documenti, rate, pagamenti e fatture interne.</p><div className="hero-actions"><Link className="btn btn-primary" href="/prezzi">Prova gratis 30 giorni →</Link><Link className="btn btn-secondary" href="/funzionalita">Scopri le funzionalità</Link></div></div><HeroMockup /></div></section></PageShell>;
}
