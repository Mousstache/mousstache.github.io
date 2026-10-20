// Infos générales du site. Les valeurs marquées TODO sont à remplacer avant la mise en ligne.

export const site = {
  name: "Moussa Troiano",
  shortName: "Moussa T",
  role: "Développeur freelance",
  // Accroche (brief §2) — mix des options A et B, à ajuster librement.
  headline: "Du code sur mesure, livré en jours.",
  headlineAccent: "Pas en mois.",
  subtitle:
    "Je suis Moussa, développeur formé à l'école 42. J'utilise Claude Code pour livrer plus vite et vous faire payer moins.",
  audience: "Sites, applis et CRM sur mesure pour artisans, commerçants et petites entreprises.",

  // Format international, sans + ni espaces.
  whatsappNumber: "33784885179",
  phoneDisplay: "07 84 88 51 79",
  whatsappDefaultMessage: "Bonjour Moussa, j'ai un projet et j'aimerais en discuter.",
  maltUrl: "https://www.malt.fr/profile/moussatroiano1",
  // TODO : lien du profil Codeur.com (vide = liens masqués).
  codeurUrl: "",
  githubUrl: "https://github.com/Mousstache",
  repoUrl: "https://github.com/Mousstache/mousstache.github.io",
  linkedinUrl: "https://www.linkedin.com/in/moussa-troiano",
  email: "moussatroiano@gmail.com",

  // Clé Web3Forms (publique par conception) : https://web3forms.com — TODO.
  web3formsKey: "",

  // Date de début de la refonte, utilisée pour compter les commits du site.
  rebuildStart: "2026-10-19",

  location: "Paris, France",

  legal: {
    status: "Entrepreneur individuel (micro-entreprise)",
    siren: "914 996 681",
    // TODO : adresse postale complète (obligatoire pour un EI, une domiciliation suffit).
    address: "Paris, France",
    host: "GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
  },
} as const;

export function whatsappLink(message: string = site.whatsappDefaultMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "#offres", label: "Offres" },
  { href: "#projets", label: "Projets" },
  { href: "#methode", label: "Méthode" },
  { href: "#a-propos", label: "À propos" },
  { href: "#faq", label: "FAQ" },
] as const;
