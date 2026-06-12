export type PlanCard = {
  name: string;
  price: string;
  period: string;
  description: string;
  highlighted: boolean;
  features: string[];
};

export const plans: PlanCard[] = [
  {
    name: "Free",
    price: "€0",
    period: "/mese",
    description: "Per iniziare.",
    highlighted: false,
    features: ["Fino a 3 contratti", "1 utente admin", "30 giorni gratuiti"],
  },
  {
    name: "Starter",
    price: "€9",
    period: "/mese",
    description: "Per piccole realtà.",
    highlighted: false,
    features: ["10 clienti / contratti", "1 staff aggiuntivo", "30 giorni gratuiti"],
  },
  {
    name: "Professional",
    price: "€29",
    period: "/mese",
    description: "Per team in crescita.",
    highlighted: true,
    features: ["30 clienti", "3 staff aggiuntivi", "30 giorni gratuiti"],
  },
  {
    name: "Business",
    price: "€49",
    period: "/mese",
    description: "Per aziende strutturate.",
    highlighted: false,
    features: ["100 clienti", "10 staff aggiuntivi", "30 giorni gratuiti"],
  },
  {
    name: "Enterprise",
    price: "€99",
    period: "/mese",
    description: "Per strutture senza limiti.",
    highlighted: false,
    features: ["Tutto illimitato", "Staff illimitato", "Supporto prioritario"],
  },
];
