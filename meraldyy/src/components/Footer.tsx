import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <span className="mono-label">Create. Inspire. Repeat.</span>
        <a href="#top" className="footer-back" data-cursor="link">
          Back to top <span className="footer-back-arrow">↑</span>
        </a>
      </div>

      <div className="footer-kinetic" aria-hidden="true">
        <div className="footer-kinetic-track">
          <span className="footer-kinetic-word">MERALDY</span>
          <span className="footer-kinetic-star">✦</span>
          <span className="footer-kinetic-word footer-kinetic-word--outline">MERALDY</span>
          <span className="footer-kinetic-star">✦</span>
          <span className="footer-kinetic-word">MERALDY</span>
          <span className="footer-kinetic-star">✦</span>
          <span className="footer-kinetic-word footer-kinetic-word--outline">MERALDY</span>
          <span className="footer-kinetic-star">✦</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="mono-label">© 2026 Meraldy Ridho Fadillah</span>
        <span className="mono-label">Indonesia · Available worldwide</span>
      </div>
    </footer>
  );
}
