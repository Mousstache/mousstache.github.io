import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique : le dossier `out/` se déploie tel quel sur GitHub Pages ou Vercel.
  output: "export",
  // Pas de serveur d'optimisation d'images en export statique.
  images: { unoptimized: true },
  // cacheComponents / partialPrefetching retirés : PPR incompatible avec output: "export".
  turbopack: {
    // Un package-lock.json traîne dans le dossier home : on fixe la racine ici.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
