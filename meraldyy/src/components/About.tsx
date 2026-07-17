import "./About.css";
import aboutImg from "../assets/about.jpeg";

const timeline = [
  { year: "2023", label: "Started the journey", desc: "Dove into web development — HTML, CSS, JavaScript fundamentals." },
  { year: "2024", label: "First clients", desc: "Built landing pages & company profiles for local businesses." },
  { year: "2025", label: "Studio work", desc: "Mastered React, Next.js, and design systems at scale." },
  { year: "2026", label: "Now", desc: "Crafting premium web experiences. Available for freelance." },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-head">
        <span className="mono-label reveal">[ About ]</span>
      </div>

      <div className="about-grid">
       {/* Left: large quote */}
        <div className="about-quote reveal-text" data-reveal-group>
          <div className="about-quote-img-wrapper">
            <div className="about-quote-img">
              <img
                  src={aboutImg}
                  alt="Quote Meraldy"
                />
              {/* Dua lapisan dekoratif wajib dari style hero */}
              <div className="about-quote-img-tint"></div>
              <div className="about-quote-img-grid"></div>
            </div>
          </div>
        </div>

        {/* Right: timeline + story */}
        <div className="about-side">
          <p className="about-story reveal">
            I'm a frontend developer and UI engineer from Indonesia, focused on
            building interfaces that feel considered, fast, and alive. I treat
            the browser as a canvas — where typography becomes identity and
            motion becomes language.
          </p>

          <div className="about-timeline" data-reveal-group>
            <div className="about-timeline-rail" />
            {timeline.map((t, i) => (
              <div
                key={t.year}
                className="about-timeline-item reveal"
                style={{ ["--reveal-delay" as string]: `${i * 0.1}s` }}
              >
                <div className="about-timeline-node" />
                <span className="about-timeline-year">{t.year}</span>
                <div className="about-timeline-body">
                  <h3 className="about-timeline-label">{t.label}</h3>
                  <p className="about-timeline-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
