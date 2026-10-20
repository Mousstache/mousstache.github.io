"use client";

import { useState, type FormEvent } from "react";
import { Send, ArrowUpRight } from "lucide-react";
import { budgetOptions, needOptions } from "@/data/offers";
import { site, whatsappLink } from "@/data/site";
import { ButtonLink, SectionHeading, WhatsAppIcon, buttonClass, cn } from "@/components/ui";
import { Reveal } from "@/components/motion";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "h-12 w-full rounded-md border-brutal bg-white px-4 font-normal text-fg placeholder:text-fg-muted transition-shadow focus:shadow-brutal-sm focus:outline-none";
const labelClass = "flex flex-col gap-2 text-sm font-bold";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!site.web3formsKey) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const data = new FormData(form);
    data.append("access_key", site.web3formsKey);
    data.append("subject", `Demande de devis — ${data.get("name")}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-y bg-bg-subtle">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Contact"
            accent="mint"
            title="Parlons de votre projet."
            intro="Le plus simple : un message WhatsApp. Sinon, le formulaire, et je vous réponds avec une première estimation."
          />
          <div className="flex flex-col gap-3">
            <ButtonLink href={whatsappLink()} external variant="whatsapp" className="self-start">
              <WhatsAppIcon />
              Discuter sur WhatsApp
            </ButtonLink>
            <p className="text-sm text-fg-muted">
              Ou par téléphone au{" "}
              <a href={`tel:+${site.whatsappNumber}`} className="font-bold text-fg underline underline-offset-4">
                {site.phoneDisplay}
              </a>
              , par email à{" "}
              <a href={`mailto:${site.email}`} className="font-bold text-fg underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <p className="text-sm text-fg-muted">Ou passez par une plateforme, paiement sécurisé :</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={site.maltUrl} external variant="secondary" size="sm">
                Malt <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              {site.codeurUrl && (
                <ButtonLink href={site.codeurUrl} external variant="secondary" size="sm">
                  Codeur.com <ArrowUpRight className="size-4" aria-hidden="true" />
                </ButtonLink>
              )}
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="grid gap-5 rounded-xl border-brutal bg-surface p-6 shadow-brutal-lg sm:grid-cols-2 md:p-8">
            {/* Anti-spam Web3Forms */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <label className={labelClass}>
              Nom
              <input name="name" required autoComplete="name" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Entreprise
              <input name="company" autoComplete="organization" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Email
              <input name="email" type="email" required autoComplete="email" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Téléphone <span className="sr-only">(facultatif)</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="Facultatif" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Type de besoin
              <select name="need" required defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  Choisir…
                </option>
                {needOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Budget
              <select name="budget" required defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  Choisir…
                </option>
                {budgetOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className={cn(labelClass, "sm:col-span-2")}>
              Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Décrivez votre activité et ce dont vous avez besoin."
                className={cn(fieldClass, "h-auto py-3")}
              />
            </label>
            <div className="flex flex-col items-start gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(buttonClass({ variant: "primary" }), "disabled:opacity-60")}
              >
                <Send className="size-4" aria-hidden="true" />
                {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
              </button>
              <p role="status" aria-live="polite" className="text-sm font-bold">
                {status === "sent" && <span className="text-mint-text">Merci ! Je vous réponds sous 24 h.</span>}
                {status === "error" && (
                  <span className="text-coral-text">
                    L&apos;envoi n&apos;a pas fonctionné. Écrivez-moi directement sur WhatsApp ou à {site.email}.
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
