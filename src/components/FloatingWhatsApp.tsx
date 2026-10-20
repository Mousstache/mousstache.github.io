"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon, cn } from "@/components/ui";

// Bouton WhatsApp flottant : apparaît une fois le hero dépassé.
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-[200] grid size-15 place-items-center rounded-full border-brutal bg-cta text-cta-fg shadow-brutal-md",
        "transition-[transform,opacity,box-shadow] duration-250 ease-spring hover:-translate-0.5 hover:shadow-brutal-lg",
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-50 opacity-0",
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
