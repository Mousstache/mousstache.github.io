// Contenus courts : bandeau confiance, méthode, FAQ, aperçu blog.

import type { Accent } from "./offers";

export const trustItems = ["École 42", "Next.js", "React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Claude Code"];

export const processSteps: { title: string; text: string; accent: Accent }[] = [
  { title: "On discute", text: "15 minutes sur WhatsApp ou au téléphone, gratuit. Vous m'expliquez votre besoin avec vos mots.", accent: "yellow" },
  { title: "Devis clair", text: "Un prix fixe et un délai écrits noir sur blanc. Pas de surprise à la fin.", accent: "coral" },
  { title: "Je développe", text: "Vous suivez l'avancée en ligne au fil de l'eau et vous donnez votre avis à chaque étape.", accent: "mint" },
  { title: "Mise en ligne", text: "Je publie le site et je vous montre comment vous en servir. Vous êtes autonome.", accent: "violet" },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "Combien de temps pour un site ?",
    a: "Environ 5 jours pour une page de lancement et 2 semaines pour un site vitrine. Le délai exact est écrit dans le devis, avant de commencer.",
  },
  {
    q: "Comment je paie ?",
    a: "Un acompte de 30 % au démarrage, le reste à la livraison. Vous pouvez aussi passer par Malt : le paiement est alors sécurisé par la plateforme.",
  },
  {
    q: "Et si je veux des modifications après ?",
    a: "Les petites retouches juste après la livraison sont incluses. Ensuite, la formule Maintenance couvre les modifications courantes, ou je vous fais un devis ponctuel.",
  },
  {
    q: "Vous utilisez l'IA, c'est fiable ?",
    a: "L'IA écrit une partie du code, mais c'est moi qui conçois, relis, teste et livre. C'est un outil qui me fait gagner du temps, comme une perceuse pour un artisan. La qualité reste ma responsabilité.",
  },
  {
    q: "Je n'y connais rien, c'est grave ?",
    a: "Pas du tout, c'est même le cas de la plupart de mes clients. Je vous explique tout simplement, sans jargon, et je m'occupe de la technique de A à Z.",
  },
];

export const posts: { title: string; excerpt: string; tag: string; accent: Accent }[] = [
  {
    title: "J'ai codé ce portfolio avec Claude Code : le making-of",
    excerpt: "Comment je travaille avec l'IA au quotidien, ce qu'elle fait bien, et là où je reprends la main.",
    tag: "Making-of",
    accent: "violet",
  },
  {
    title: "Site vitrine : combien ça coûte vraiment pour une TPE en 2026 ?",
    excerpt: "Agence, freelance, Wix… les vrais prix, les coûts cachés, et comment choisir.",
    tag: "Budget",
    accent: "coral",
  },
  {
    title: "Pourquoi un petit CRM sur mesure peut remplacer vos 4 tableurs Excel",
    excerpt: "Moins de doubles saisies, plus d'oublis de relance : ce que change un outil fait pour vous.",
    tag: "Outils",
    accent: "mint",
  },
];
