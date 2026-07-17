import { useRef } from "react";
import { useCountUp } from "../hooks/useMotion";
import "./Ratecard.css";

type Pkg = {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const packages: Pkg[] = [
  {
    name: "Starter",
    price: 210,
    tagline: "For a sharp single-page presence.",
    features: ["1-page landing", "Responsive design", "Basic SEO", "1 revision round", "5-day delivery"],
  },
  {
    name: "Growth",
    price: 450,
    tagline: "For brands ready to stand out.",
    features: ["Up to 5 pages", "Custom motion design", "CMS integration", "Advanced SEO", "3 revision rounds", "10-day delivery"],
    featured: true,
  },
  {
    name: "Premium",
    price: 1200,
    tagline: "For a full, bespoke web experience.",
    features: ["Unlimited pages", "Bespoke interaction design", "Dashboard / SaaS", "Performance audits", "Unlimited revisions", "Ongoing support"],
  },
];

export default function Ratecard() {
  return (
    <section className="ratecard" id="ratecard">
      <div className="ratecard-head">
        <span className="mono-label reveal">[ Ratecard ]</span>
        <h2 className="ratecard-title reveal-text" data-reveal-group>
          Investment
        </h2>
        <p className="ratecard-sub reveal">
          Transparent packages. Every project is tailored — these are starting points.
        </p>
      </div>

      <div className="ratecard-grid">
        {packages.map((p) => (
          <RateCard key={p.name} pkg={p} />
        ))}
      </div>

      <p className="ratecard-note reveal">
        Prices in USD. Final quote depends on scope & complexity.
      </p>
    </section>
  );
}

function RateCard({ pkg }: { pkg: Pkg }) {
  const { ref, value } = useCountUp<HTMLDivElement>(pkg.price, 2000);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className={`ratecard-card ${pkg.featured ? "ratecard-card--feat" : ""} reveal`}
      ref={cardRef}
      onMouseMove={onMouseMove}
      data-cursor="link"
    >
      <div className="ratecard-card-glow" />
      <div className="ratecard-card-top">
        <span className="ratecard-name">{pkg.name}</span>
        {pkg.featured && <span className="ratecard-badge">Popular</span>}
      </div>
      <p className="ratecard-tagline">{pkg.tagline}</p>

      <div className="ratecard-price" ref={ref}>
        <span className="ratecard-currency">$</span>
        <span className="ratecard-amount">{value}</span>
        <span className="ratecard-unit">/project</span>
      </div>

      <div className="ratecard-divider" />

      <ul className="ratecard-features">
        {pkg.features.map((f) => (
          <li key={f}>
            <span className="ratecard-check" />
            {f}
          </li>
        ))}
      </ul>

      <a href="#contact" className={`btn ratecard-btn ${pkg.featured ? "btn--solid" : ""}`} data-cursor="button">
        Get Started <span className="arrow">→</span>
      </a>
    </div>
  );
}
