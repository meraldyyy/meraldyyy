import { useEffect, useRef, useState } from "react";
import "./Cursor.css";

type CursorState =
  | "default"
  | "link"
  | "button"
  | "image"
  | "project"
  | "hidden";

export default function Cursor({ ready }: { ready: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(ready);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let dx = mx;
    let dy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement;
      const ctx = target.closest<HTMLElement>("[data-cursor]");
      setState((ctx?.dataset.cursor as CursorState) || "default");
    };

    const loop = () => {
      dx += (mx - dx) * 0.5;
      dy += (my - dy) * 0.5;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    let hideTimer: number;
    const onLeave = () => {
      hideTimer = window.setTimeout(() => setState("hidden"), 200);
    };
    const onEnter = () => clearTimeout(hideTimer);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
    };
  }, [ready]);

  if (!visible) return null;

  const ringSize =
    state === "link" ? 56 :
    state === "image" ? 96 :
    state === "project" ? 120 :
    state === "button" ? 16 : 32;

  const ringBorder =
    state === "project" ? "1px solid var(--text)" : "1px solid var(--red)";
  const ringBg = state === "image" ? "rgba(255,59,48,0.10)" : "transparent";
  const dotHidden = state === "image" || state === "project" || state === "hidden";
  const showLabel = state === "image";

  return (
    <div className="cursor-root" aria-hidden="true">
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: ringSize,
          height: ringSize,
          border: ringBorder,
          background: ringBg,
          opacity: state === "hidden" ? 0 : 1,
          borderRadius: state === "button" ? "4px" : "999px",
        }}
      >
        {showLabel && <span className="cursor-label">View</span>}
      </div>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: dotHidden ? 0 : 1 }}
      />
    </div>
  );
}
