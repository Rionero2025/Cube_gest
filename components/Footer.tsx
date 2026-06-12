import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><b>CUBE Management Contract</b><p>Gestionale SaaS per contratti, clienti, lavori, documenti, pagamenti e staff.</p></div>
        <div><b>Prodotto</b><Link href="/funzionalita">Funzioni</Link><Link href="/prezzi">Prezzi</Link><Link href="/sicurezza">Sicurezza</Link></div>
        <div><b>Azienda</b><Link href="/chi-siamo">Chi siamo</Link><Link href="/contatti">Contatti</Link><Link href="/supporto">Supporto</Link></div>
        <div><b>Legale</b><Link href="/privacy">Privacy</Link><Link href="/termini">Termini</Link><Link href="/cookie">Cookie</Link></div>
        <div><b>Accesso</b><Link href="/login">Login</Link><Link href="/registrati">Registrati</Link></div>
      </div>
    </footer>
  );
}
