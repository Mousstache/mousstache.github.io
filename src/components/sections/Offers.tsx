import { Check, ArrowRight } from "lucide-react";
import { customOffer, offers } from "@/data/offers";
import { site, whatsappLink } from "@/data/site";
import { ButtonLink, SectionHeading, WhatsAppIcon, accentClass, cn } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";

export function Offers() {
  return (
    <section id="offres" className="section-y">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading
          eyebrow="Offres"
          accent="coral"
          title="Des formules claires, des prix fixes."
          intro="Choisissez la formule qui vous ressemble. Le prix affiché est un point de départ : le devis final est fixé avant de commencer, et il ne bouge plus."
        />

        <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {offers.map((offer, i) => (
            <Reveal as="li" key={offer.id} delay={i * 0.08} className={accentClass(offer.accent)}>
              <Tilt className="flex h-full flex-col overflow-hidden rounded-lg border-brutal bg-surface shadow-brutal-md transition-shadow duration-250 hover:shadow-brutal-lg">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-2 border-border bg-accent px-6 py-4 text-accent-fg">
                  <h3 className="text-xl">{offer.name}</h3>
                  <span className="text-sm font-bold whitespace-nowrap">{offer.delay}</span>
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <p className="text-fg-muted">{offer.pitch}</p>
                  <p className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <span className="text-sm text-fg-muted">dès</span>
                    <span className="font-display text-3xl font-extrabold">{offer.price}</span>
                    {offer.priceSuffix && <span className="text-sm text-fg-muted">{offer.priceSuffix}</span>}
                  </p>
                  <ul className="flex flex-1 flex-col gap-2 text-sm">
                    {offer.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" strokeWidth={3} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3">
                    <ButtonLink
                      href={whatsappLink(`Bonjour Moussa, je suis intéressé·e par l'offre « ${offer.name} ».`)}
                      external
                      variant="whatsapp"
                      size="sm"
                    >
                      <WhatsAppIcon className="size-4" />
                      En parler sur WhatsApp
                    </ButtonLink>
                    <ButtonLink href={site.maltUrl} external variant="secondary" size="sm">
                      Commander sur Malt
                    </ButtonLink>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </ul>

        <Reveal
          className={cn(
            accentClass(customOffer.accent),
            "flex flex-col items-start justify-between gap-6 rounded-xl border-brutal bg-accent p-8 text-accent-fg shadow-brutal-md md:flex-row md:items-center",
          )}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">{customOffer.name}</h3>
            <p className="max-w-2xl opacity-85">{customOffer.pitch}</p>
          </div>
          <ButtonLink href="#contact" variant="secondary">
            Décrire mon besoin
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
