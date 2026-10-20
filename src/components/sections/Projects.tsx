"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Badge, SectionHeading, accentClass, buttonClass, cn } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";

// Visuel de remplacement tant qu'aucune capture n'est fournie : une fenêtre de navigateur stylisée.
function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element -- export statique, images non optimisées
    return <img src={project.image} alt="" className="aspect-[16/10] w-full object-cover" />;
  }
  return (
    <div aria-hidden="true" className="grid aspect-[16/10] place-items-center bg-accent p-6">
      <div className="w-full max-w-xs overflow-hidden rounded-md border-brutal bg-surface shadow-brutal-sm">
        <div className="flex gap-1.5 border-b-2 border-border px-3 py-2">
          <span className="size-2.5 rounded-full border-2 border-border bg-coral" />
          <span className="size-2.5 rounded-full border-2 border-border bg-yellow" />
          <span className="size-2.5 rounded-full border-2 border-border bg-mint" />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <span className="font-display text-lg font-extrabold leading-tight">{project.title}</span>
          <span className="h-2 w-4/5 rounded-full bg-bg-subtle" />
          <span className="h-2 w-3/5 rounded-full bg-bg-subtle" />
          <span className="mt-1 h-5 w-20 rounded-sm border-2 border-border bg-accent" />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  function open(project: Project) {
    setActive(project);
    dialogRef.current?.showModal();
  }

  return (
    <section id="projets" className="section-y bg-bg-subtle">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading
          eyebrow="Projets"
          accent="violet"
          title="Ce que j'ai construit."
          intro="Des projets réels, et des projets démo qui montrent concrètement ce que vous obtenez avec chaque offre."
        />

        <ul className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.id} delay={(i % 2) * 0.1} className={accentClass(project.accent)}>
              <Tilt max={5} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-lg border-brutal bg-surface shadow-brutal-md transition-shadow duration-250 hover:shadow-brutal-lg">
                  <div className="border-b-2 border-border">
                    <ProjectVisual project={project} />
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-4 p-6">
                    <Badge accent={project.kind === "demo" ? "yellow" : "mint"}>
                      {project.kind === "demo" ? "Projet démo" : "Projet réel"}
                    </Badge>
                    <h3 className="text-2xl">{project.title}</h3>
                    <p className="text-fg-muted">{project.tagline}</p>
                    <ul className="flex flex-wrap gap-2 text-xs font-bold">
                      {project.showcases.map((item) => (
                        <li key={item} className="rounded-full border-2 border-border-subtle px-3 py-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-3">
                      <button type="button" onClick={() => open(project)} className={buttonClass({ variant: "accent", size: "sm" })}>
                        Voir l&apos;étude de cas
                      </button>
                      {project.links[0] && (
                        <a
                          href={project.links[0].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonClass({ variant: "secondary", size: "sm" })}
                        >
                          {project.links[0].label}
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="case-title"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className={cn(
          active && accentClass(active.accent),
          "m-auto w-[min(42rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border-brutal bg-surface p-0 text-fg shadow-brutal-xl backdrop:bg-ink/55",
        )}
      >
        {active && (
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 border-b-2 border-border bg-accent px-6 py-5 text-accent-fg">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-widest">
                  {active.kind === "demo" ? "Projet démo" : "Étude de cas"}
                </span>
                <h3 id="case-title" className="text-3xl">
                  {active.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Fermer"
                className="grid size-10 shrink-0 place-items-center rounded-full border-brutal bg-surface text-fg shadow-brutal-sm"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <dl className="flex flex-col gap-6 p-6">
              <div>
                <dt className="font-display text-lg font-extrabold">Le besoin</dt>
                <dd className="mt-1 text-fg-muted">{active.need}</dd>
              </div>
              <div>
                <dt className="font-display text-lg font-extrabold">Ce que j&apos;ai construit</dt>
                <dd className="mt-1 text-fg-muted">{active.built}</dd>
              </div>
              <div>
                <dt className="font-display text-lg font-extrabold">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {active.stack.map((tech) => (
                    <Badge key={tech} accent={active.accent}>
                      {tech}
                    </Badge>
                  ))}
                </dd>
              </div>
              {active.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {active.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass({ variant: "secondary", size: "sm" })}
                    >
                      {link.label}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </dl>
          </div>
        )}
      </dialog>
    </section>
  );
}
