import { useRef } from "react";

import a1 from "../assets/a1.png";
import a2 from "../assets/a2.png";
import a3 from "../assets/a3.png";
import a4 from "../assets/a4.png"


import "./Projects.css";

type Project = {
  num: string;
  title: string;
  category: string;
  year: string;
  desc: string;
  image: string;
  tags: string[];
};

  const projects: Project[] = [
  {
    num: "01",
    title: "Kebab Monster",
    category: "Web Platform",
    year: "2026",
    desc: "A modern restaurant website designed to showcase menus, promotions, and store locations with smooth interactions, responsive layouts, and a seamless online ordering experience.",
    image: a1,
    tags: ["React", "Tailwind", "Vite"],
  },
  {
    num: "02",
    title: "Mbangun Lab",
    category: "Web Platform",
    year: "2026",
    desc: "A professional company profile website for a chemical laboratory supplier, featuring product catalogs, company information, and a clean interface designed to strengthen brand credibility.",
    image: a2,
    tags: ["PHP", "Laravel", "Tailwind CSS"],
  },
  {
    num: "03",
    title: "Joe's Family Plumbing Inc.",
    category: "Company Profile",
    year: "2026",
    desc: "A conversion-focused website for a licensed plumbing company, built to highlight emergency services, build customer trust, and encourage direct inquiries through a modern user experience.",
    image: a3,
    tags: ["React", "Node", "Vite"],
  },
  {
    num: "04",
    title: "Hayatun Tour",
    category: "Landing Page",
    year: "2026",
    desc: "A premium landing page for a Hajj and Umrah travel agency, designed to communicate trust, showcase travel packages, and provide a smooth journey from discovery to booking.",
    image: a4,
    tags: ["React", "Node", "Vite"],
  },
];

export default function Projects() {
  return (
    <section className="projects" id="work">
      <div className="projects-head">
        <span className="mono-label reveal">[ Selected Work ]</span>
        <h2 className="projects-title reveal-text" data-reveal-group>
          Design
          <br />
          Exhibition
        </h2>
        <p className="projects-intro reveal">
          A curated selection of projects — each one a study in typography,
          motion, and considered interaction.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((p, i) => (
          <ProjectRow key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // mouse parallax on hover
  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", `${x * 12}px`);
    el.style.setProperty("--my", `${y * 12}px`);
  };
  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  const flip = index % 2 === 1;

  return (
    <article
  className={`project ${flip ? "project--flip" : ""}`}
  ref={cardRef}
  onMouseMove={onMouseMove}
  onMouseLeave={onMouseLeave}
  data-cursor="project"
>
  <div className="project-num reveal" data-cursor="link">
    {project.num}
  </div>

  <div className={`project-body ${flip ? "project-body--flip" : ""}`}>
    <div className="project-meta">
      <span className="project-meta-cat mono-label">
        {project.category}
      </span>
      <span className="project-meta-year mono-label">
        {project.year}
      </span>
    </div>

    <h3 className="project-title draw-line" data-cursor="link">
      {project.title}
    </h3>

    {/* Screenshot dipindah ke atas */}
    <div className="project-media">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
      />
    </div>

    {/* Deskripsi dipindah ke bawah */}
    <div className="project-content">
      <p className="project-desc">
        {project.desc}
      </p>

      <div className="project-tags">
        {project.tags.map((t) => (
          <span key={t} className="project-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
</article>
  );
}
