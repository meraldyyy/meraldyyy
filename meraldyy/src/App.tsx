import { useEffect, useState } from "react";
import { useScrollReveal } from "./hooks/useMotion";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Services from "./components/Services";
import Ratecard from "./components/Ratecard";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useScrollReveal();

  useEffect(() => {
    if (loaded) {
      // re-run reveal observation once content is visible,
      // so elements present during the loader still get observed.
      const els = document.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-mask, .draw-line, .reveal-text"
      );
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("in");
            if (el.hasAttribute("data-reveal-group")) {
              const kids = el.querySelectorAll<HTMLElement>(
                ".reveal, .reveal-mask, .reveal-text"
              );
              kids.forEach((k, i) => {
                k.style.setProperty("--reveal-delay", `${i * 0.08}s`);
                k.classList.add("in");
              });
            }
            io.unobserve(el);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }
  }, [loaded]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Cursor ready={loaded} />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Navbar ready={loaded} />
      <main>
        <Hero ready={loaded} />
        <About />
        <Projects />
        <Stack />
        <Services />
        <Ratecard />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
