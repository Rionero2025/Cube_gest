"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "Free";

  const [form, setForm] = useState({
    ragioneSociale: "",
    partitaIva: "",
    codiceFiscale: "",
    telefono: "",
    nome: "",
    cognome: "",
    email: "",
    password: "",
    planName: initialPlan,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function update(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setLoading(false);

    if (!data.ok) {
      setMessage(data.error || "Registrazione non riuscita.");
      return;
    }

    window.location.href = data.redirectTo || "/dashboard";
  }

  return (
    <form className="form-box" onSubmit={onSubmit}>
      <div className="form-grid">
        <input className="input full-row" placeholder="Ragione sociale azienda" value={form.ragioneSociale} onChange={(e) => update("ragioneSociale", e.target.value)} />
        <input className="input" placeholder="Partita IVA" value={form.partitaIva} onChange={(e) => update("partitaIva", e.target.value)} />
        <input className="input" placeholder="Codice fiscale" value={form.codiceFiscale} onChange={(e) => update("codiceFiscale", e.target.value)} />
        <input className="input" placeholder="Nome admin" value={form.nome} onChange={(e) => update("nome", e.target.value)} />
        <input className="input" placeholder="Cognome admin" value={form.cognome} onChange={(e) => update("cognome", e.target.value)} />
        <input className="input" placeholder="Telefono" value={form.telefono} onChange={(e) => update("telefono", e.target.value)} />
        <select className="input" value={form.planName} onChange={(e) => update("planName", e.target.value)}>
          <option>Free</option>
          <option>Starter</option>
          <option>Professional</option>
          <option>Business</option>
          <option>Enterprise</option>
        </select>
        <input className="input full-row" placeholder="Email admin" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        <input className="input full-row" placeholder="Password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} />
        {message && <div className="alert full-row">{message}</div>}
        <button className="btn btn-primary full-row" disabled={loading}>{loading ? "Creazione account..." : "Crea azienda e inizia"}</button>
      </div>
    </form>
  );
}
