import { PenTool, Bot, ShieldCheck } from "lucide-react";
import { processSteps } from "@/data/content";
import { SectionHeading, accentClass, cn } from "@/components/ui";
import { Reveal } from "@/components/motion";

const whyFast = [
  { icon: PenTool, title: "Je conçois", text: "Je découpe votre besoin, je choisis l'architecture et je décide de chaque écran." },
  { icon: Bot, title: "L'IA écrit", text: "Claude Code rédige le code répétitif en quelques minutes au lieu de quelques heures." },
  {
    icon: ShieldCheck,
    title: "Je vérifie et teste",
    text: "Je relis tout, je corrige et je teste sur mobile et ordinateur avant de livrer.",
  },
];

export function Process() {
  return (
    <section id="methode" className="section-y">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading
          eyebrow="Méthode"
          accent="mint"
          title="Comment on travaille ensemble."
          intro="Quatre étapes simples, sans jargon. Vous savez toujours où en est votre projet."
        />

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.15} className={cn(accentClass(step.accent), "relative flex flex-col gap-3")}>
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border-brutal bg-accent font-display text-2xl font-extrabold text-accent-fg shadow-brutal-sm">
                  {index + 1}
                </span>
                {index < processSteps.length - 1 && (
                  <span aria-hidden="true" className="hidden h-0.5 flex-1 border-t-2 border-dashed border-border lg:block" />
                )}
              </div>
              <h3 className="text-2xl">{step.title}</h3>
              <p className="text-fg-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="rounded-xl border-brutal bg-surface p-8 shadow-brutal-md">
          <h3 className="text-2xl">
            Pourquoi c&apos;est <span className="text-coral-text">rapide</span> ?
          </h3>
          <p className="mt-2 max-w-prose text-fg-muted">
            J&apos;utilise Claude Code, un assistant de programmation. Il ne remplace pas le développeur : il accélère la partie mécanique
            du travail. Résultat : moins d&apos;heures facturées, la même exigence de qualité.
          </p>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {whyFast.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-md border-brutal bg-yellow">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="text-sm text-fg-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
