import { SectionHeading, accentClass, cn } from "@/components/ui";
import { Reveal } from "@/components/motion";

const facts = [
  { value: "42", label: "École de code par projets", accent: "violet" as const },
  { value: "100 %", label: "Code, pas de no-code", accent: "yellow" as const },
  { value: "1:1", label: "Un seul interlocuteur : moi", accent: "coral" as const },
];

export function About() {
  return (
    <section id="a-propos" className="section-y bg-bg-subtle">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="À propos" accent="yellow" title="Salut, moi c'est Moussa." />
          <Reveal delay={0.1} className="flex max-w-prose flex-col gap-4 text-lg text-fg-muted">
            <p>
              J&apos;ai appris à coder à l&apos;école 42 : pas de cours magistraux, que des projets concrets à mener en autonomie.
              C&apos;est exactement comme ça que je travaille avec mes clients.
            </p>
            <p>
              Ce qui me plaît, ce sont les projets utiles : le site qui fait sonner le téléphone d&apos;un artisan, l&apos;outil qui fait
              gagner une heure par jour à un commerçant.
            </p>
            <p>Je prends des missions courtes et bien cadrées, pour pouvoir livrer vite et bien.</p>
          </Reveal>
        </div>
        <ul className="grid gap-5">
          {facts.map((fact, i) => (
            <Reveal
              as="li"
              key={fact.label}
              delay={i * 0.12}
              className={cn(
                accentClass(fact.accent),
                "flex items-center gap-5 rounded-lg border-brutal bg-surface p-5 shadow-brutal-sm",
                i === 1 && "lg:translate-x-8",
              )}
            >
              <span className="grid h-16 min-w-20 place-items-center rounded-md border-brutal bg-accent px-3 font-display text-2xl font-extrabold text-accent-fg">
                {fact.value}
              </span>
              <span className="font-bold">{fact.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
