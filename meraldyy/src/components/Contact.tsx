import { useMagnetic } from "../hooks/useMotion";
import { splitWords } from "../hooks/useMotion";
import "./Contact.css";

const socials = [
  { label: "Email", value: "meraldyridho@gmail.com", href: "mailto:meraldyridho@gmail.com" },
  { label: "WhatsApp", value: "+62 821 7549 5541", href: "https://wa.me/6282175495541" },
  { label: "LinkedIn", value: "Meraldy Ridho Fadillah", href: "https://www.linkedin.com/in/meraldy-ridho-fadillah-893212388/" },
  { label: "GitHub", value: "meraldyyy", href: "https://github.com/meraldyyy" },
];

export default function Contact() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4);

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <span className="mono-label reveal">[ Contact ]</span>

        <h2 className="contact-title reveal-text" data-reveal-group>
          {splitWords("Let's Build Something Great.")}
        </h2>

        <a
          href="mailto:hello@meraldy.dev"
          className="contact-email reveal"
          data-cursor="link"
        >
          meraldyridho@gmail.com
        </a>

        <a
          href="mailto:hello@meraldy.dev"
          className="btn btn--solid contact-cta reveal"
          ref={ctaRef}
          data-cursor="button"
        >
          Start a Project <span className="arrow">→</span>
        </a>

        <div className="contact-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="contact-social"
              data-cursor="link"
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              <span className="contact-social-label mono-label">{s.label}</span>
              <span className="contact-social-value">{s.value}</span>
              <span className="contact-social-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
