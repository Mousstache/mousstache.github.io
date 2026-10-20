import { posts } from "@/data/content";
import { Badge, SectionHeading, accentClass } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";

// Aperçu statique en attendant le blog MDX (étape 5 du brief).
export function BlogPreview() {
  return (
    <section id="blog" className="section-y bg-bg-subtle">
      <div className="container-site flex flex-col gap-12">
        <SectionHeading eyebrow="Blog" accent="coral" title="Conseils concrets, sans jargon." />
        <ul className="grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.title} delay={i * 0.1} className={accentClass(post.accent)}>
              <Tilt className="flex h-full flex-col gap-4 rounded-lg border-brutal bg-surface p-6 shadow-brutal-md transition-shadow duration-250 hover:shadow-brutal-lg">
                <div className="flex items-center justify-between gap-2">
                  <Badge accent={post.accent}>{post.tag}</Badge>
                  <span className="text-xs font-bold text-fg-muted">Bientôt</span>
                </div>
                <h3 className="text-xl text-balance">{post.title}</h3>
                <p className="text-sm text-fg-muted">{post.excerpt}</p>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
