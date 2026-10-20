// Projets (brief §3.4). Format étude de cas : besoin -> réalisation -> stack -> liens.
// Pour ajouter une capture : déposer l'image dans public/projects/ et renseigner `image`.

import type { Accent } from "./offers";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  kind: "real" | "demo";
  accent: Accent;
  image?: string;
  showcases: string[];
  need: string;
  built: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "map-lords",
    title: "Map Lords",
    tagline: "Jeu de stratégie en temps réel : conquérez la France ou l'Europe (ex-Guerre de France).",
    kind: "real",
    accent: "violet",
    showcases: ["Temps réel", "Logique de jeu", "Carte interactive"],
    need: "Créer un jeu de stratégie gratuit, jouable directement dans le navigateur, sur la carte des départements français, seul ou entre amis.",
    built:
      "Un jeu en temps réel sur les 96 départements de France ou 129 territoires d'Europe. Mode solo contre une IA et parties en ligne entre amis, avec synchronisation des joueurs et moteur de règles.",
    stack: ["Vite", "Vercel"], // TODO : compléter (React ? Node ? WebSocket ?)
    links: [{ label: "Jouer à Map Lords", href: "https://guerre-de-france.vercel.app" }],
  },
  {
    id: "grimpp",
    title: "Grimpp",
    tagline: "Application de formation à la conduite pour auto-écoles.",
    kind: "real",
    accent: "mint",
    showcases: ["Application web", "Suivi pédagogique", "Messagerie"],
    need: "Remplacer le livret d'apprentissage papier et les échanges éparpillés entre moniteurs et élèves par un seul outil.",
    built:
      "Une application avec livret numérique, suivi pédagogique de chaque élève et communication instantanée entre moniteurs et élèves.",
    stack: ["Next.js", "Vercel"], // TODO : compléter
    links: [{ label: "Voir Grimpp", href: "https://www.grimpp.fr/" }],
  },
  {
    id: "estimation-immobiliere",
    title: "Estimation immobilière",
    tagline: "Formulaire intelligent multi-étapes pour estimer un bien.",
    kind: "real",
    accent: "coral",
    showcases: ["UX formulaire", "Conversion", "Design épuré"],
    need: "Permettre à un visiteur d'obtenir une estimation de son bien sans friction, et transformer cette visite en prise de contact.",
    built:
      "Un parcours en plusieurs étapes courtes, avec validation à chaque étape, progression visible et récapitulatif final. Pensé mobile d'abord.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [], // TODO : lien démo
  },
  {
    id: "boulangerie-demo",
    title: "Boulangerie Au Bon Levain",
    tagline: "Site vitrine pour une boulangerie de quartier.",
    kind: "demo",
    accent: "yellow",
    showcases: ["Offre Site vitrine", "Horaires & carte", "Mobile first"],
    need: "Une boulangerie veut afficher ses horaires, ses produits du jour et être trouvée sur Google, sans payer une agence.",
    built: "Un site vitrine de 4 pages, rapide sur mobile, avec carte des produits, horaires, plan d'accès et formulaire de commande.",
    stack: ["Next.js", "Tailwind CSS"],
    links: [], // TODO : créer la démo
  },
  {
    id: "crm-artisan-demo",
    title: "Mini-CRM Plomberie Martin",
    tagline: "Clients, devis et planning pour un artisan.",
    kind: "demo",
    accent: "violet",
    showcases: ["Offre Outil de gestion", "Devis PDF", "Planning"],
    need: "Un artisan jongle entre un carnet, des SMS et quatre fichiers Excel pour suivre ses clients et ses devis.",
    built: "Un outil simple : fiche client, création de devis en 2 minutes, planning de la semaine et rappels. Utilisable sur téléphone sur le chantier.",
    stack: ["Next.js", "TypeScript", "SQLite"],
    links: [], // TODO : créer la démo
  },
];
