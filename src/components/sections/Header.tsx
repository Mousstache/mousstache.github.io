import { navLinks, site, whatsappLink } from "@/data/site";
import { ButtonLink, WhatsAppIcon } from "@/components/ui";

export function Header() {
  return (
    <header className="sticky top-0 z-[100] border-b-2 border-border bg-bg/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
          {site.shortName}
          <span className="text-coral-text">.</span>
        </a>
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex gap-6 text-sm font-bold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="underline-offset-4 hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href={whatsappLink()} external variant="whatsapp" size="sm">
          <WhatsAppIcon className="size-4" />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Discuter</span>
        </ButtonLink>
      </div>
    </header>
  );
}
