"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/components/motion";

// Disque qui suit la souris et devient un anneau sur les éléments cliquables.
// Le curseur natif reste visible : c'est un accent, pas un remplacement.
export function Cursor() {
  const enabled = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setHover(Boolean(target?.closest("a, button, summary, select, label, input, textarea")));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-2 border-ink"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hover ? 44 : 12,
        height: hover ? 44 : 12,
        backgroundColor: hover ? "rgba(255, 210, 63, 0.35)" : "rgba(26, 26, 46, 1)",
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
}
