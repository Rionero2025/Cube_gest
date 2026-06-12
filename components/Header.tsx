import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/">
          <span className="brand-mark">⬢</span>
          <span>
            <strong>CUBE</strong>
            <small>Management Contract</small>
          </span>
        </Link>
        <nav className="menu">
          <Link href="/funzionalita">Funzionalità</Link>
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/prezzi">Prezzi</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        <div className="actions">
          <Link className="btn btn-secondary" href="/login">Accedi</Link>
          <Link className="btn btn-primary" href="/registrati">Registrati</Link>
        </div>
      </div>
    </header>
  );
}
