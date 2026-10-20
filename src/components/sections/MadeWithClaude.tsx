import { execSync } from "node:child_process";
import { site } from "@/data/site";
import { GithubIcon, buttonClass } from "@/components/ui";
import { Reveal } from "@/components/motion";

// Calculé au build (export statique) : nombre de commits depuis le début de la refonte.
function countCommits(): number | null {
  try {
    const out = execSync(`git rev-list --count --since=${site.rebuildStart} HEAD`, { stdio: ["ignore", "pipe", "ignore"] });
    return Number(out.toString().trim());
  } catch {
    return null;
  }
}

function daysSince(date: string) {
  return Math.max(1, Math.ceil((Date.now() - new Date(date).getTime()) / 86_400_000));
}

export function MadeWithClaude() {
  const commits = countCommits();
  const stats = [
    { value: commits ? String(commits) : "—", label: "commits" },
    { value: String(daysSince(site.rebuildStart)), label: "jours de dev" },
    { value: "100 %", label: "du code relu par moi" },
  ];

  return (
    <section aria-labelledby="made-with-claude" className="section-y">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-2xl border-brutal bg-surface-inverse p-8 text-fg-inverse shadow-brutal-lg md:p-12">
          <div aria-hidden="true" className="absolute -top-16 -right-16 size-56 rounded-full border-brutal-thick bg-violet" />
          <div className="relative flex flex-col gap-8">
            <div className="flex max-w-2xl flex-col gap-3">
              <span className="font-mono text-sm text-yellow">$ claude &quot;construis mon portfolio&quot;</span>
              <h2 id="made-with-claude" className="text-4xl text-balance">
                Ce site a été codé avec Claude Code.
              </h2>
              <p className="text-lg opacity-80">
                C&apos;est la preuve vivante de ma méthode. Tout le code est public : vous pouvez voir chaque étape, chaque commit.
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border-2 border-fg-inverse/30 p-5">
                  <dt className="text-sm opacity-80">{stat.label}</dt>
                  <dd className="font-display text-4xl font-extrabold text-yellow">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={site.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ variant: "secondary" }) + " self-start"}
            >
              <GithubIcon />
              Voir le code sur GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
