# Design system — Portfolio Moussa Troiano

Ambiance : colorée, fun, néo-brutaliste, mais lisible pour un patron de TPE.

## Fichiers

| Fichier | Rôle |
|---|---|
| `tokens.css` | Source de vérité. Toutes les variables, préfixe `--ds-`, en 3 couches (primitives → sémantiques → composants). |
| `tailwind-theme.css` | Pont Tailwind v4 (`@theme inline`). Génère `bg-bg`, `text-fg`, `shadow-brutal-md`, `font-display`, `bg-accent`… |
| `preview.html` | Aperçu visuel de tous les tokens et composants. Ouvrir dans le navigateur. |

Intégration Next.js (`src/app/globals.css`) :

```css
@import "tailwindcss";
@import "../../design/tokens.css";
@import "../../design/tailwind-theme.css";
```

Polices via `next/font/google` : `Bricolage_Grotesque` (titres, 700–800), `DM_Sans` (texte, 400–700), `JetBrains_Mono` (code). Exposer leurs variables puis remplacer les valeurs de `--ds-font-display`, `--ds-font-body`, `--ds-font-mono`.

## Règles

1. **Jamais de hex dans un composant.** Utiliser une classe Tailwind du thème ou `var(--ds-…)` sémantique/composant. La palette Tailwind par défaut est désactivée (`--color-*: initial`) : `bg-blue-500` n'existe pas.
2. **Contraste** (WCAG AA, vérifié) :

   | Couleur | En texte sur crème | En fond, texte à utiliser |
   |---|---|---|
   | Encre `#1A1A2E` | 16.2:1 ✔ | crème |
   | Violet `#7C3AED` | 5.4:1 ✔ | **blanc** (5.7:1) |
   | Corail `#FF6B6B` | 2.6:1 ✘ → `coral-text` `#C93A3A` (4.8:1) | **encre** (6.2:1) |
   | Jaune `#FFD23F` | ✘ jamais en texte | **encre** (11.8:1) |
   | Menthe `#2EC4B6` | 2.1:1 ✘ → `mint-text` `#137A71` (4.9:1) | **encre** (7.9:1) |
   | WhatsApp `#25D366` | ✘ | **encre** (8.6:1) |

   Les classes `.accent-*` appliquent automatiquement le bon couple fond/texte via `bg-accent text-accent-fg`.
3. **Une couleur par offre / projet** via la classe d'accent sur le conteneur :

   | Élément | Classe |
   |---|---|
   | Page de lancement | `.accent-yellow` |
   | Site vitrine | `.accent-coral` |
   | Outil de gestion / mini-CRM | `.accent-mint` |
   | Maintenance | `.accent-violet` |
   | Sur devis | `.accent-ink` |

   Les projets tournent dans le même ordre (violet, corail, jaune, menthe).
4. **Ombres** : toujours pleines, décalées, couleur encre, jamais floues. Toute surface avec ombre a aussi une bordure encre 2px.
5. **Mouvement** : seulement `transform` et `opacity`. Durées via tokens ; `prefers-reduced-motion` les met à 0 et coupe tilt et soulèvement automatiquement. Côté Framer Motion, lire `useReducedMotion()` pour couper le parallaxe souris, le curseur custom et l'animation lettre par lettre.
6. **Focus** visible partout : utilitaire `focus-visible:focus-ring` (double anneau crème + violet).
7. **Cibles tactiles** ≥ 44px (boutons 48px, FAB 60px).

## Échelles

- **Espacement** : base 4px (`--ds-space-1` = 4px … `--ds-space-32` = 128px). Sections : `--ds-space-section` (64 → 128px fluide).
- **Typo** fluide 360 → 1280px : `5xl` 44→96 (hero), `4xl` 36→72 (H2), `3xl` 30→48, `2xl` 24→32 (titres de carte), `xl`, `lg` (chapô), `base` 16, `sm`, `xs`. Titres : display, poids 800, interligne 1.05, tracking -0.03em. Texte : interligne 1.6, max 65 caractères (`max-w-prose`).
- **Rayons** : `sm` 8 (badge), `md` 14 (bouton, champ), `lg` 20 (carte), `xl` 28 (modale), `2xl` 40 (section encadrée), `full`.
- **Ombres** : `brutal-sm` 3px, `brutal-md` 5px, `brutal-lg` 8px, `brutal-xl` 12px.
- **z-index** : sticky 100, FAB WhatsApp 200, overlay 300, modale 400, toast 500, curseur 9999.

## Composants

### Bouton

| Variante | Usage | Fond / texte |
|---|---|---|
| `whatsapp` | Action n°1 (hero, cartes, FAB) | vert WhatsApp / encre + icône |
| `primary` | « Demander un devis », envoi formulaire | violet / blanc |
| `secondary` | « Commander sur Malt », liens secondaires | crème / encre |
| `ghost` | Liens de nav, « Voir l'étude de cas » | transparent / encre, souligné au survol |

| Propriété | Repos | Survol | Appui | Désactivé |
|---|---|---|---|---|
| Ombre | `brutal-sm` | `brutal-md` | aucune | aucune |
| Transform | — | `translate(-2px,-2px)` | `translate(3px,3px)` | — |
| Fond | variante | variante `-hover` | variante | `bg-subtle`, texte `fg-muted` |
| Durée | — | `fast` + `ease-spring` | `instant` | — |

Hauteur 48px (`sm` 40px), padding x 24px, rayon `md`, bordure encre 2px, graisse 700.

### Carte (offre, projet, blog)

- Fond `surface`, bordure 2px, rayon `lg`, ombre `brutal-md`, padding 20 → 32px.
- Survol : ombre `brutal-lg` + tilt 3D ≤ `--ds-card-tilt-max` (8deg) suivant la souris (desktop uniquement, `pointer: fine`).
- Carte d'offre : bandeau supérieur `bg-accent text-accent-fg` (nom en `text-xl` + délai, `flex-wrap`), prix en `font-display text-3xl whitespace-nowrap`, liste du contenu, 2 boutons empilés en mobile (WhatsApp + Malt).
- Carte projet : capture 16:10 en haut avec bordure basse 2px, badge « Projet démo » (`accent-yellow`) si démo, stack en badges.

### Champ de formulaire

- Hauteur 48px, fond blanc, bordure encre 2px, rayon `md`, label visible au-dessus (jamais placeholder seul).
- Focus : ombre `brutal-sm` + anneau focus. Erreur : bordure `error`, message en `error` sous le champ, `aria-describedby`.
- Select « Type de besoin » = liste des offres ; « Budget » en tranches.

### Badge

Pilule `full`, bordure 2px, texte `xs` majuscules tracking large, fond `accent-soft`. Utilisé pour stack, « Projet démo », catégories blog.

### Bouton WhatsApp flottant

60px, rond, `bg-cta`, bordure + `brutal-md`, fixé en bas à droite (`fab-offset` 20px), `z-floating`. Apparaît après le hero, rebond d'entrée `ease-spring`. `aria-label="Discuter sur WhatsApp"`.

### Modale (étude de cas)

Fond `surface`, rayon `xl`, ombre `brutal-xl`, backdrop encre 55 %. Plein écran en mobile. Structure fixe : Le besoin → Ce que j'ai construit → Stack → Liens. Fermeture Échap + clic backdrop, focus piégé.

## Décor

Blobs SVG aux couleurs d'accent, bordure encre 2–3px, placés en arrière-plan du hero et des sections paires (`bg-subtle`). Jamais sous un texte long. Curseur custom : disque encre 12px qui grossit en anneau sur les éléments cliquables (désactivé si `pointer: coarse` ou mouvement réduit).
