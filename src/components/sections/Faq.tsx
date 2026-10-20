import { Plus } from "lucide-react";
import { faq } from "@/data/content";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function Faq() {
  return (
    <section id="faq" className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading
          eyebrow="FAQ"
          accent="violet"
          title="Vos questions, mes réponses."
          intro="Une autre question ? Écrivez-moi sur WhatsApp, je réponds vite."
        />
        <div className="flex flex-col gap-4">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.06}>
              <details className="group rounded-lg border-brutal bg-surface shadow-brutal-sm open:shadow-brutal-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border-brutal bg-yellow transition-transform duration-250 group-open:rotate-45">
                    <Plus className="size-4" aria-hidden="true" strokeWidth={3} />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-fg-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
