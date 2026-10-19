// Page temporaire : vérifie que tokens, thème Tailwind et polices sont branchés.
// Remplacée par les sections du brief à l'étape suivante.
const offers = [
  { name: "Page de lancement", price: "390 €", accent: "accent-yellow" },
  { name: "Site vitrine", price: "790 €", accent: "accent-coral" },
  { name: "Mini-CRM", price: "1 290 €", accent: "accent-mint" },
  { name: "Maintenance", price: "49 €/mois", accent: "accent-violet" },
];

export default function Home() {
  return (
    <main className="container-site section-y flex flex-col gap-10">
      <span className="accent-yellow w-fit rounded-full border-brutal bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-widest">
        Setup OK
      </span>
      <h1 className="text-5xl">
        Du code sur mesure,
        <br />
        livré en jours.
      </h1>
      <p className="max-w-prose text-lg text-fg-muted">
        Tokens, thème Tailwind et polices sont branchés. Prochaine étape : les sections du brief.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="#"
          className="inline-flex h-12 items-center rounded-md border-brutal bg-cta px-6 font-bold text-cta-fg shadow-brutal-sm transition-[transform,box-shadow] duration-150 ease-spring hover:-translate-0.5 hover:shadow-brutal-md"
        >
          Discuter sur WhatsApp
        </a>
        <a
          href="#"
          className="inline-flex h-12 items-center rounded-md border-brutal bg-primary px-6 font-bold text-primary-fg shadow-brutal-sm transition-[transform,box-shadow] duration-150 ease-spring hover:-translate-0.5 hover:shadow-brutal-md"
        >
          Demander un devis
        </a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer) => (
          <article
            key={offer.name}
            className={`${offer.accent} overflow-hidden rounded-lg border-brutal bg-surface shadow-brutal-md`}
          >
            <h2 className="border-b-2 border-border bg-accent px-6 py-4 text-xl text-accent-fg">{offer.name}</h2>
            <p className="px-6 py-6 font-display text-3xl font-extrabold">{offer.price}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
