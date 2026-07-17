import "./Stack.css";

const techs = [
  "React", "Next.js", "JavaScript", "TypeScript", "Figma",
  "CSS", "Tailwind", "Node", "Laravel", "Vite",
];

export default function Stack() {
  // two rows, opposite directions, different speeds
  const rowA = [...techs, ...techs];
  const rowB = [...[...techs].reverse(), ...[...techs].reverse()];

  return (
    <section className="stack" id="stack">
      <div className="stack-head">
        <span className="mono-label reveal">[ Tech Stack ]</span>
        <p className="stack-sub reveal">Tools I use to bring ideas to life.</p>
      </div>

      <div className="stack-rows">
        <div className="stack-row" style={{ ["--dur" as string]: "32s" }}>
          <div className="stack-track">
            {rowA.map((t, i) => (
              <span key={`a-${i}`} className="stack-item" data-cursor="link">
                {t}
                <span className="stack-star">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="stack-row stack-row--rev" style={{ ["--dur" as string]: "42s" }}>
          <div className="stack-track">
            {rowB.map((t, i) => (
              <span key={`b-${i}`} className="stack-item stack-item--alt" data-cursor="link">
                {t}
                <span className="stack-star">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
