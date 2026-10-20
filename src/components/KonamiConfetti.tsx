"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

// Easter egg : ↑ ↑ ↓ ↓ ← → ← → B A
const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
// Couleurs de la palette (design/tokens.css) — canvas-confetti n'accepte que des hex.
const colors = ["#7C3AED", "#FF6B6B", "#FFD23F", "#2EC4B6", "#1A1A2E"];

export function KonamiConfetti() {
  useEffect(() => {
    let position = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === sequence[position] ? position + 1 : key === sequence[0] ? 1 : 0;
      if (position < sequence.length) return;
      position = 0;
      const shoot = (x: number, angle: number) =>
        confetti({ particleCount: 90, spread: 70, angle, origin: { x, y: 0.7 }, colors, disableForReducedMotion: true });
      shoot(0, 60);
      shoot(1, 120);
      setTimeout(() => confetti({ particleCount: 140, spread: 120, origin: { y: 0.4 }, colors, disableForReducedMotion: true }), 250);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
