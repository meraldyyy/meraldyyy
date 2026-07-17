import { useState } from "react";
import { useCountUp } from "../hooks/useMotion";
import "./Services.css";

const services = [
  { n: "01", title: "Frontend Development", desc: "Production-grade React, Next.js, and TypeScript builds — performant, accessible, and pixel-precise.", deliver: ["Custom components", "State architecture", "Performance budgets"] },
  { n: "02", title: "Landing Page", desc: "High-conversion, motion-rich landing pages designed to make a strong first impression in seconds.", deliver: ["Conversion copy layout", "Scroll storytelling", "A/B-ready structure"] },
  { n: "03", title: "Company Profile", desc: "Editorial company websites that communicate brand identity with confidence and clarity.", deliver: ["Brand system", "CMS integration", "SEO foundation"] },
  { n: "04", title: "Dashboard", desc: "Data-dense dashboards that stay readable — visualization, filtering, and real-time updates.", deliver: ["Data visualization", "Role-based access", "Responsive density"] },
  { n: "05", title: "UI Design", desc: "Interface design in Figma — from wireframe to a full, handoff-ready design system.", deliver: ["Design systems", "Prototyping", "Design tokens"] },
  { n: "06", title: "Website Redesign", desc: "Transform outdated sites into modern, fast, and intentional experiences without losing SEO equity.", deliver: ["Audit & strategy", "Incremental rollout", "Migration-safe"] },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, value } = useCountUp<HTMLDivElement>(services.length, 1400);

  return (
    <section className="services" id="services">
      <div className="services-head">
        <span className="mono-label reveal">[ Services ]</span>
        <h2 className="services-title reveal-text" data-reveal-group>
          What I
          <br />
          Do Best
        </h2>
        <div className="services-count reveal" ref={ref}>
          <span className="services-count-num">{value}</span>
          <span className="mono-label">Disciplines</span>
        </div>
      </div>

      <div className="services-list">
        {services.map((s, i) => {
          const active = open === i;
          return (
            <div
              key={s.n}
              className={`service ${active ? "is-open" : ""}`}
              onMouseEnter={() => setOpen(i)}
              data-cursor="link"
            >
              <div className="service-line" />
              <button
                className="service-head"
                onClick={() => setOpen(active ? null : i)}
                aria-expanded={active}
              >
                <span className="service-n mono-label">{s.n}</span>
                <span className="service-title">{s.title}</span>
                <span className="service-plus" aria-hidden="true">
                  <span /><span />
                </span>
              </button>
              <div className="service-panel">
                <div className="service-panel-inner">
                  <p className="service-desc">{s.desc}</p>
                  <ul className="service-deliver">
                    {s.deliver.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
