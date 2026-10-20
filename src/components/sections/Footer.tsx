import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { GithubIcon } from "@/components/ui";

export function Footer() {
  const links = [
    { label: "Malt", href: site.maltUrl },
    ...(site.codeurUrl ? [{ label: "Codeur.com", href: site.codeurUrl }] : []),
    { label: "GitHub", href: site.githubUrl },
    ...(site.linkedinUrl ? [{ label: "LinkedIn", href: site.linkedinUrl }] : []),
  ];

  return (
    <footer className="border-t-2 border-border bg-surface-inverse text-fg-inverse">
      <div className="container-site flex flex-col gap-10 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex flex-col gap-2">
            <a href="#top" className="font-display text-2xl font-extrabold">
              {site.shortName}
              <span className="text-yellow">.</span>
            </a>
            <p className="max-w-xs text-sm opacity-80">
              {site.role} à {site.location} · Sites, applis et CRM sur mesure pour les petites entreprises.
            </p>
          </div>
          <nav aria-label="Pied de page" className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm font-bold">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:underline underline-offset-4">
                {link.label}
              </a>
            ))}
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t-2 border-fg-inverse/20 pt-6 text-sm opacity-80 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} ·{" "}
            <Link href="/mentions-legales" className="underline underline-offset-4">
              Mentions légales
            </Link>
          </p>
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline underline-offset-4"
          >
            <GithubIcon className="size-4" />
            Code source public
          </a>
        </div>
      </div>
    </footer>
  );
}
