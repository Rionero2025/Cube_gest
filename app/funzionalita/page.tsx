import { PageShell } from "@/components/PageShell";
const modules = [
  ["👥","CRM clienti","Anagrafiche complete, note, storico attività e documenti."],
  ["📚","Contratti","Decorrenze, scadenze, importi, servizi e responsabili."],
  ["💶","Pagamenti","Rate, acconti, saldi, residui e allegati."],
  ["🧾","Fatture","Fatture interne, PDF, stati e archivio."],
  ["🛠️","Lavori","Attività, orari, report e note interne."],
  ["📎","Documenti","File per clienti, contratti, lavori e pagamenti."],
  ["💬","Feedback","Valutazioni e comunicazioni cliente."],
  ["👤","Staff","Ruoli, permessi e visibilità controllata."],
  ["🏢","SaaS","Più aziende con dati separati."],
];
export default function FunzionalitaPage(){return <PageShell><section className="hero container"><div className="hero-card"><div><div className="badge">⚙️ Funzionalità complete</div><h1>Tutto quello che puoi gestire con <span>CUBE</span></h1><p className="lead">Un solo gestionale per clienti, contratti, scadenze, lavori, documenti, pagamenti, fatture interne, staff e aziende registrate.</p></div><div className="visual-panel"><div className="message">Tutti i moduli principali già predisposti nella nuova architettura Next.js.</div></div></div></section><section className="section container"><div className="section-head"><div className="icon-badge">📦</div><div><h2>Moduli principali</h2><p>Ogni modulo è collegato agli altri.</p></div></div><div className="grid-3">{modules.map(([icon,title,text])=><article className="card" key={title}><div className="card-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section></PageShell>}
