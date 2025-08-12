// App.jsx
import React from "react";
import { motion } from "framer-motion";
import "./index.css";

const projects = [
  {
    title: "HerbaLife",
    tech: ["React Natif", "Expo", "Supabase"],
    image: "https://via.placeholder.com/300x200",
    description: "Application mobile pour la gestion de la santé et herboristerie.",
    github: "#",
    demo: "#",
  },
  {
    title: "Transcendence",
    tech: ["React", "Django", "HTML/CSS", "PostgreSQL"],
    image: "https://via.placeholder.com/300x200",
    description: "Développement d’une application web multijoueur autour du jeu Pong, avec chat intégré, gestion des amis, tournois, API REST, et authentification via l’API 42, en respectant le format SPA dans le cadre du projet final du tronc commun de l’École 42.",
    github: "https://github.com/Mousstache/transcendence",
    demo: "#",
  },
  {
    title: "Matcha",
    tech: ["Next.js", "Tailwind", "Chart.js"],
    image: "https://via.placeholder.com/300x200",
    description: "Développement d’une application web de rencontre intégrant likes, matchs, chat et notifications en temps réel, ainsi qu’un système de suggestion de profils basé sur critères multiples, le tout implémenté sans ORM.",
    github: "https://github.com/Mousstache/matcha",
    demo: "#",
  },
];

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="relative w-80 h-56 perspective project-card"
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Recto */}
      <div
        className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between"
        style={{ backfaceVisibility: "hidden" }}
      >
        <img src={project.image} alt={project.title} className="rounded-lg mb-2" />
        <h3 className="text-lg font-bold mt-2 text-indigo-200">{project.title}</h3>
        <div className="flex gap-2 text-sm mt-1">
          {project.tech.map((t, i) => (
            <span key={i} className="project-tech">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Verso */}
      <div
        className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between bg-[#18181b] text-indigo-100"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      >
        <p className="mb-4">{project.description}</p>
        <div className="project-links flex justify-between mt-auto">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            Démo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-2">
      {/* Header Dev */}
      <header className="dev-header">
        <img
          src="https://avatars.githubusercontent.com/u/9919?v=4"
          alt="Avatar développeur"
          className="dev-avatar"
        />
        <div>
          <div className="dev-title">Moussa – Développeur Fullstack JS</div>
          <div className="dev-links">
            <a className="dev-link" href="https://github.com/Mousstache" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="dev-link" href="https://linkedin.com/moussa-troiano" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="dev-link" href="mailto:moussatroiano@gmail.com">Contact</a>
          </div>
        </div>
      </header>
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </div>
  );
}
