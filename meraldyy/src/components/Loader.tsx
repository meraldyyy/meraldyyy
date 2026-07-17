import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    const timers = [
      window.setTimeout(() => setPhase(1), 100),
      window.setTimeout(() => setPhase(2), 600),
      window.setTimeout(() => setPhase(3), 1150),
      window.setTimeout(() => setPhase(4), 1850),
      window.setTimeout(() => {
        document.body.classList.remove("no-scroll");
        onDone();
      }, 2300),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.classList.remove("no-scroll");
    };
  }, [onDone]);

  return (
    <div className={`loader loader--${phase}`} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-logo">
          <span className="loader-logo-mask">
            <span className="loader-logo-text">MERALDY</span>
          </span>
        </div>
        <div className="loader-meta">
          <span className="loader-line">Frontend Developer</span>
          <span className="loader-line">UI Engineer · Web Designer</span>
        </div>
      </div>
      <div className="loader-counter">
        <span>100</span>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}
