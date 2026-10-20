import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Mentions légales — ${site.name}`,
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <main className="container-site section-y flex max-w-prose flex-col gap-8">
      <Link href="/" className="text-sm font-bold underline underline-offset-4">
        ← Retour à l&apos;accueil
      </Link>
      <h1 className="text-4xl">Mentions légales</h1>
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl">Éditeur du site</h2>
        <p>
          {site.name} — {site.legal.status}
          <br />
          SIREN : {site.legal.siren}
          <br />
          Adresse : {site.legal.address}
          <br />
          Contact : <a href={`mailto:${site.email}`} className="text-link underline">{site.email}</a> · {site.phoneDisplay}
        </p>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl">Hébergement</h2>
        <p>{site.legal.host}</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl">Données personnelles</h2>
        <p>
          Les informations envoyées via le formulaire de contact servent uniquement à répondre à votre demande. Elles ne sont ni
          revendues ni utilisées à d&apos;autres fins. Vous pouvez demander leur suppression à tout moment par email.
        </p>
      </section>
    </main>
  );
}
