// Offres packagées (brief §3.3). Prix = propositions, à valider.

export type Accent = "violet" | "coral" | "yellow" | "mint" | "ink";

export type Offer = {
  id: string;
  name: string;
  pitch: string;
  price: string;
  priceSuffix?: string;
  delay: string;
  features: string[];
  accent: Accent;
};

export const offers: Offer[] = [
  {
    id: "lancement",
    name: "Page de lancement",
    pitch: "Pour exister en ligne vite et proprement.",
    price: "390 €",
    delay: "~5 jours",
    features: ["1 page, responsive", "Formulaire de contact", "SEO de base"],
    accent: "yellow",
  },
  {
    id: "vitrine",
    name: "Site vitrine",
    pitch: "Présenter votre activité et recevoir des demandes.",
    price: "790 €",
    delay: "~2 semaines",
    features: ["Jusqu'à 5 pages, responsive", "SEO de base", "Formulaire de contact", "Mise en ligne incluse"],
    accent: "coral",
  },
  {
    id: "crm",
    name: "Outil de gestion / mini-CRM",
    pitch: "Remplacer vos tableurs par un outil fait pour vous.",
    price: "1 290 €",
    delay: "~3 semaines",
    features: ["Clients, devis, rendez-vous ou stock", "Simple et sur mesure", "Accessible depuis n'importe où"],
    accent: "mint",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    pitch: "Votre site reste à jour, sans y penser.",
    price: "49 €",
    priceSuffix: "/mois",
    delay: "Mensuel",
    features: ["Mises à jour et sauvegardes", "Petites modifications", "Support par WhatsApp"],
    accent: "violet",
  },
];

export const customOffer = {
  name: "Sur devis",
  pitch: "Application web, logiciel spécifique, autre besoin ? On en parle et je vous fais un prix fixe.",
  accent: "ink" as Accent,
};

// Options du formulaire de contact
export const needOptions = [...offers.map((o) => o.name), "Application web / autre"];
export const budgetOptions = ["Moins de 500 €", "500 – 1 000 €", "1 000 – 2 500 €", "Plus de 2 500 €", "Je ne sais pas encore"];
