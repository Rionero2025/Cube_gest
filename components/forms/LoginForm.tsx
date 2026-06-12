"use client";

import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!data.ok) {
      setMessage(data.error || "Accesso non riuscito.");
      return;
    }

    window.location.href = data.redirectTo || "/dashboard";
  }

  return (
    <form className="form-box" onSubmit={onSubmit}>
      <div className="form-grid">
        <input className="input full-row" placeholder="Username o email" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input full-row" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {message && <div className="alert full-row">{message}</div>}
        <button className="btn btn-primary full-row" disabled={loading}>{loading ? "Accesso..." : "Accedi"}</button>
        <p className="muted full-row">Non hai un account? <Link href="/registrati">Registrati</Link></p>
      </div>
    </form>
  );
}
