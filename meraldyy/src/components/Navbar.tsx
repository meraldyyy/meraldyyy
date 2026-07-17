import { useEffect, useState } from "react";
import { useScrollProgress } from "../hooks/useMotion";
import "./Navbar.css";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Ratecard", href: "#ratecard" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ ready }: { ready: boolean }) {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const scrolled = progress > 0.04;

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
  }, [open]);

  return (
    <>
      <header
        className={`nav ${ready ? "nav--ready" : ""} ${
          scrolled ? "nav--scrolled" : ""
        }`}
      >
        <a href="#top" className="nav-logo" data-cursor="link">
          <img 
            src="src/assets/logo.png" 
            alt="Meraldy Logo" 
            className="nav-logo-img" 
          />
        </a>

        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" data-cursor="link">
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav-cta" data-cursor="button">
          <span>Let's Talk</span>
          <span className="nav-cta-dot" />
        </a>

        <button
          className={`nav-burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          data-cursor="button"
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`nav-menu ${open ? "is-open" : ""}`}>
        <div className="nav-menu-inner">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-menu-link"
              data-cursor="link"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${open ? i * 0.07 : 0}s` }}
            >
              <span className="nav-menu-i">0{i + 1}</span>
              <span className="nav-menu-label">{l.label}</span>
            </a>
          ))}
        </div>
        <div className="nav-menu-foot">
          <span>Available for freelance</span>
          <span>Indonesia</span>
        </div>
      </div>
    </>
  );
}
