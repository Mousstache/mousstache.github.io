"use client";

import type { PointerEvent } from "react";
import { Clock, BadgeEuro, Code2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { site, whatsappLink } from "@/data/site";
import { Badge, ButtonLink, WhatsAppIcon, cn } from "@/components/ui";
import { LetterTitle, useFinePointer } from "@/components/motion";

const stickers = [
  { icon: Clock, label: "Livré en jours", className: "accent-yellow -left-4 top-6 -rotate-6 sm:-left-10", depth: 30 },
  { icon: BadgeEuro, label: "Prix fixe", className: "accent-mint -right-2 top-1/2 rotate-3 sm:-right-8", depth: -24 },
  { icon: Code2, label: "100 % sur mesure", className: "accent-coral bottom-2 left-6 rotate-2", depth: 18 },
];

// Déplacement proportionnel à la position de la souris (-0.5 → 0.5), amorti par un ressort.
function useParallax(value: MotionValue<number>, depth: number) {
  return useSpring(useTransform(value, [-0.5, 0.5], [-depth, depth]), { stiffness: 120, damping: 20 });
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const parallax = useFinePointer();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const blob1 = { x: useParallax(mx, -40), y: useParallax(my, -40) };
  const blob2 = { x: useParallax(mx, 50), y: useParallax(my, 30) };
  const avatar = { x: useParallax(mx, 14), y: useParallax(my, 14) };
  const s0 = { x: useParallax(mx, stickers[0].depth), y: useParallax(my, stickers[0].depth) };
  const s1 = { x: useParallax(mx, stickers[1].depth), y: useParallax(my, stickers[1].depth) };
  const s2 = { x: useParallax(mx, stickers[2].depth), y: useParallax(my, stickers[2].depth) };
  const stickerMotion = [s0, s1, s2];

  function onMove(event: PointerEvent<HTMLElement>) {
    if (!parallax) return;
    mx.set(event.clientX / window.innerWidth - 0.5);
    my.set(event.clientY / window.innerHeight - 0.5);
  }

  const headlineDelay = 0.15;
  const afterHeadline = headlineDelay + (site.headline.length + site.headlineAccent.length) * 0.025;

  return (
    <section id="top" className="relative overflow-hidden" onPointerMove={onMove}>
      {/* Décor : blobs qui suivent la souris */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          style={parallax ? blob1 : undefined}
          className="absolute -top-40 -right-40 size-64 rounded-full border-brutal-thick bg-yellow/70 md:-top-24 md:-right-24 md:size-80"
        />
        <motion.div
          style={parallax ? blob2 : undefined}
          className="absolute -bottom-44 left-1/2 size-72 rounded-[40%_60%_55%_45%] border-brutal-thick bg-mint/50"
        />
        <motion.div
          style={parallax ? blob2 : undefined}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-24 left-[52%] hidden size-10 rounded-sm border-brutal bg-coral lg:block"
        />
      </div>

      <div className="container-site relative grid items-center gap-16 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <motion.div {...fadeUp(0)}>
            <Badge accent="mint">Disponible pour missions courtes</Badge>
          </motion.div>
          <h1 className="text-5xl text-balance">
            <LetterTitle text={site.headline} delay={headlineDelay} />{" "}
            <span className="relative inline-block">
              <LetterTitle text={site.headlineAccent} delay={headlineDelay + site.headline.length * 0.025} className="relative z-10" />
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[0.08em] h-[0.35em] origin-left -rotate-1 rounded-sm bg-coral"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: afterHeadline, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </h1>
          <motion.p {...fadeUp(afterHeadline * 0.6)} className="max-w-xl text-lg text-fg-muted text-pretty">
            {site.audience} {site.subtitle}
          </motion.p>
          <motion.div {...fadeUp(afterHeadline * 0.7)} className="flex flex-wrap gap-4">
            <ButtonLink href={whatsappLink()} external variant="whatsapp">
              <WhatsAppIcon />
              Discuter sur WhatsApp
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Demander un devis
            </ButtonLink>
          </motion.div>
          <motion.p {...fadeUp(afterHeadline * 0.8)} className="text-sm text-fg-muted">
            Premier échange gratuit · Réponse le jour même
          </motion.p>
        </div>

        {/* Avatar (placeholder illustré en attendant le vrai) */}
        <motion.div
          className="relative mx-auto w-full max-w-64 sm:max-w-sm"
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.3 }}
        >
          <motion.div
            style={parallax ? avatar : undefined}
            className="accent-violet relative aspect-square rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-brutal-thick bg-accent shadow-brutal-xl"
          >
            <div className="absolute inset-[18%] grid place-items-center rounded-full border-brutal-thick bg-cream">
              <span className="font-display text-6xl font-extrabold">MT</span>
            </div>
          </motion.div>
          {stickers.map(({ icon: Icon, label, className }, i) => (
            <motion.div
              key={label}
              style={parallax ? stickerMotion[i] : undefined}
              className={cn("absolute", className)}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.7 + i * 0.15 }}
            >
              <motion.div
                className="flex items-center gap-2 rounded-md border-brutal bg-accent px-3 py-2 text-sm font-bold text-accent-fg shadow-brutal-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
