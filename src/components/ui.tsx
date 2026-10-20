import type { ComponentProps, ReactNode } from "react";
import type { Accent } from "@/data/offers";
import { Reveal } from "@/components/motion";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Les classes .accent-* sont définies dans design/tokens.css
export const accentClass = (accent: Accent) => `accent-${accent}`;

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md border-brutal font-bold whitespace-nowrap " +
  "shadow-brutal-sm transition-[transform,box-shadow,background-color] duration-150 ease-spring " +
  "hover:-translate-0.5 hover:shadow-brutal-md active:translate-0.75 active:shadow-none active:duration-75";

const buttonVariants = {
  whatsapp: "bg-cta text-cta-fg hover:bg-cta-hover",
  primary: "bg-primary text-primary-fg hover:bg-primary-hover",
  secondary: "bg-surface text-fg",
  accent: "bg-accent text-accent-fg",
} as const;

const buttonSizes = {
  md: "h-12 px-6 text-base",
  sm: "h-10 px-4 text-sm",
} as const;

type ButtonStyle = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export function buttonClass({ variant = "primary", size = "md" }: ButtonStyle = {}) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size]);
}

export function ButtonLink({ variant, size, className, external, ...props }: ComponentProps<"a"> & ButtonStyle & { external?: boolean }) {
  return (
    <a
      className={cn(buttonClass({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

export function Badge({ accent = "yellow", className, children }: { accent?: Accent; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        accentClass(accent),
        "inline-block rounded-full border-brutal bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-widest text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  accent = "yellow",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex max-w-3xl flex-col items-start gap-4", className)}>
      <Badge accent={accent}>{eyebrow}</Badge>
      <h2 className="text-4xl text-balance">{title}</h2>
      {intro && <p className="max-w-prose text-lg text-fg-muted text-pretty">{intro}</p>}
    </Reveal>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.2.5.2.5.4.1.1.1.7-.1 1.3Z" />
    </svg>
  );
}

export function GithubIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
