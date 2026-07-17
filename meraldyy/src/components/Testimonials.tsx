import { useState } from "react";
import "./Testimonials.css";

const quotes = [
  {
    text: "Meraldy delivered beyond expectations. The motion details made our landing page feel alive, and the final result felt polished from every angle.",
    name: "Andi Pratama",
  },
  {
    text: "The website is fast, modern, and incredibly easy to navigate. Communication throughout the project was clear and professional.",
    name: "Siti Rahmawati",
  },
  {
    text: "Every interaction feels intentional. The attention to detail in both design and development exceeded what we had imagined.",
    name: "Budi Santoso",
  },
  {
    text: "From concept to launch, the entire process was smooth. We received a website that truly reflects our brand identity.",
    name: "Kevin Wijaya",
  },
  {
    text: "The combination of clean design, responsive layouts, and subtle animations created an outstanding user experience for our visitors.",
    name: "Nadia Putri",
  },
  {
    text: "Working with Meraldy was a great experience. Deadlines were met, feedback was implemented quickly, and the quality was excellent.",
    name: "Rizky Maulana",
  },
  {
    text: "Our new website looks premium, performs flawlessly, and has received positive feedback from both clients and partners since launch.",
    name: "Michelle Tan",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % quotes.length);
  const prev = () => setI((p) => (p - 1 + quotes.length) % quotes.length);
  const q = quotes[i];

  return (
    <section className="testi" id="testimonials">
      <div className="testi-head">
        <span className="mono-label reveal">[ Testimonials ]</span>
      </div>

      <div className="testi-stage">
        <div className="testi-quote-wrap" key={i}>
          <blockquote className="testi-quote">
            <span className="testi-mark">"</span>
            {q.text}
          </blockquote>
          <div className="testi-author">
            <span className="testi-name">{q.name}</span>
          </div>
        </div>
      </div>

      <div className="testi-nav">
        <button className="testi-arrow" onClick={prev} data-cursor="button" aria-label="Previous">
          ←
        </button>
        <div className="testi-dots">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              className={`testi-dot ${idx === i ? "is-active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              data-cursor="button"
            />
          ))}
        </div>
        <button className="testi-arrow" onClick={next} data-cursor="button" aria-label="Next">
          →
        </button>
        <span className="testi-count mono-label">
          {String(i + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
