import { useMagnetic } from "../hooks/useMotion";
import "./Hero.css";
import profile from "../assets/profile.jpeg"

const words = [
  { text: "Create.", delay: 0.3 },
  { text: "Inspire.", delay: 0.5 },
  { text: "Repeat.", delay: 0.7, outline: true },
];

export default function Hero({ ready }: { ready: boolean }) {
  const contactRef = useMagnetic<HTMLAnchorElement>(0.3);
  const projectsRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        {/* Left: typography */}
        <div className="hero-left">
          <div className={`hero-badge ${ready ? "in" : ""}`}>
            <span className="hero-badge-dot" />
            <span>Available for freelance</span>
          </div>

          <h1 className="hero-title">
            {words.map((w) => (
              <span
                key={w.text}
                className={`hero-word ${w.outline ? "hero-word--outline" : ""} ${
                  ready ? "in" : ""
                }`}
                style={{ transitionDelay: `${w.delay}s` }}
                data-cursor="link"
              >
                {w.text}
              </span>
            ))}
          </h1>

          <div className={`hero-sub ${ready ? "in" : ""}`}>
            <p className="hero-sub-text">
              Frontend Developer based in Indonesia.
            </p>
            <p className="hero-sub-text mono-label">
              UI Engineer · Web Designer
            </p>
          </div>

          <div className={`hero-cta ${ready ? "in" : ""}`}>
            <a href="#contact" className="btn btn--solid" ref={contactRef} data-cursor="button">
              Contact Me <span className="arrow">→</span>
            </a>
            <a href="#work" className="btn" ref={projectsRef} data-cursor="button">
              View Projects <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* Right: portrait */}
        <div className={`hero-right ${ready ? "in" : ""}`}>
          <div className="hero-portrait" data-cursor="image">
            <img
                src={profile}
                alt=" Meraldy"
              />
            <div className="hero-portrait-tint" />
            <div className="hero-portrait-grid" />
          </div>
          <div className="hero-portrait-caption mono-label">
            <span>Meraldy R.F.</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="mono-label">Scroll</span>
        <div className="scroll-line" />
      </div>

      <div className="hero-edge hero-edge--tl mono-label">
        <span>Portfolio</span>
        <span>2026</span>
      </div>
      <div className="hero-edge hero-edge--br mono-label">
        <span>Indonesia</span>
        <span>ID</span>
      </div>
    </section>
  );
}
