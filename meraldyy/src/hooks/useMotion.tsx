import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * IntersectionObserver-based reveal. Adds `in` class to elements with
 * `.reveal`, `.reveal-mask`, `.draw-line`, `.reveal-text` when they enter.
 * Groups (data-reveal-group) stagger their children with sequential delays.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-mask, .draw-line, .reveal-text"
      )
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("in");
          if (el.hasAttribute("data-reveal-group")) {
            const kids = Array.from(
              el.querySelectorAll<HTMLElement>(".reveal, .reveal-mask, .reveal-text")
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
  }, []);
}

/** Element drifts on scroll proportional to viewport position. */
export function useParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset =
        (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

/** Magnetic hover — element translates toward cursor, springs back on leave. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });
    };
    const onEnter = () => {
      el.style.transition = "transform 0.1s linear";
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transition = "transform 0.6s var(--ease-back)";
      el.style.transform = "translate3d(0,0,0)";
      setTimeout(() => (el.style.transition = ""), 600);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

/** Animated count-up triggered when element enters viewport. */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1800) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setValue(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const setRef = (node: T | null) => {
    ref.current = node;
  };

  return { ref: setRef, value };
}

/** Split into per-character masked spans for char-slide reveal. */
export function splitChars(text: string, keyPrefix = "c"): ReactNode[] {
  return text.split("").map((ch, i) => {
    if (ch === " ")
      return (
        <span
          key={`${keyPrefix}-${i}`}
          style={{ display: "inline-block", width: "0.28em" }}
        />
      );
    return (
      <span className="char-wrap" key={`${keyPrefix}-${i}`}>
        <span className="char" style={{ ["--char-i" as string]: i }}>
          {ch}
        </span>
      </span>
    );
  });
}

/** Split into per-word masked spans for word-slide reveal. */
export function splitWords(text: string, keyPrefix = "w"): ReactNode[] {
  return text.split(" ").map((w, i) => (
    <span className="word-wrap" key={`${keyPrefix}-${i}`}>
      <span
        className="word-inner"
        style={{ ["--word-i" as string]: `${i * 0.08}s` }}
      >
        {w}
      </span>
    </span>
  ));
}

/** Page scroll progress 0→1, used by navbar morph. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}
