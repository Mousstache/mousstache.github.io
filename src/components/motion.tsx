"use client";

// Briques d'animation réutilisables. Toutes respectent prefers-reduced-motion :
// MotionConfig reducedMotion="user" coupe les transformations, et les effets
// liés au pointeur (tilt, parallaxe, curseur) ne s'activent pas du tout.

import { Fragment, useEffect, useState, type ReactNode, type PointerEvent } from "react";
import { MotionConfig, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Vrai seulement sur un appareil avec souris et sans mouvement réduit.
export function useFinePointer() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return fine && !reduced;
}

// Apparition au scroll : fondu + légère montée.
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </Component>
  );
}

// Carte qui s'incline vers le pointeur.
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const enabled = useFinePointer();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spring = { stiffness: 260, damping: 22 };
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), spring);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      className={className}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

// Titre qui s'assemble lettre par lettre. Le texte reste lisible par les lecteurs d'écran.
export function LetterTitle({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  // Index global de chaque mot pour décaler les lettres sur tout le titre.
  const words = text.split(" ").map((word, w, all) => ({
    word,
    offset: all.slice(0, w).reduce((sum, prev) => sum + prev.length, 0),
  }));
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ word, offset }, w) => (
          <Fragment key={w}>
            {w > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((letter, l) => (
                <motion.span
                  key={l}
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.5em", rotate: -12 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22, delay: delay + (offset + l) * 0.025 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
