import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { categories } from "@/lib/opportunities";
import { LogoMark } from "@/components/LogoMark";

const homeSearch = { category: "all", difficulty: "all", grade: "all", q: "" };

/** Shared site footer used on the home, detail, and partners pages. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" search={homeSearch} className="logo">
            <LogoMark size={22} />
            BC<span>Initiatives</span>
          </Link>
          <p className="footer-tag">
            Every Canadian student opportunity, one place. A student-led project
            based in Richmond, BC — hand-curated for high school and CEGEP students.
          </p>
          <a className="footer-email" href="mailto:hello@bcinitiatives.ca">
            <Mail size={14} strokeWidth={1.8} /> hello@bcinitiatives.ca
          </a>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} strokeWidth={1.8} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} strokeWidth={1.8} /></a>
            <a href="mailto:hello@bcinitiatives.ca" aria-label="Email"><Mail size={16} strokeWidth={1.8} /></a>
          </div>
        </div>
        <div>
          <div className="footer-head">Explore</div>
          <div className="footer-links">
            <Link to="/" search={homeSearch} hash="opportunities">All opportunities</Link>
            <Link to="/" search={homeSearch} hash="categories">Categories</Link>
            <Link to="/partners">Our Partners</Link>
            <Link to="/" search={homeSearch} hash="about">About</Link>
          </div>
        </div>
        <div>
          <div className="footer-head">Categories</div>
          <div className="footer-links">
            {categories.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                to="/"
                search={{ category: c.id, difficulty: "all", grade: "all", q: "" }}
                hash="opportunities"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-head">Stay in the loop</div>
          <div className="footer-links">
            <Link to="/" search={homeSearch} hash="newsletter">Newsletter</Link>
            <a href="mailto:hello@bcinitiatives.ca">Suggest an opportunity</a>
            <a href="mailto:hello@bcinitiatives.ca">Report an issue</a>
            <a href="mailto:hello@bcinitiatives.ca">Partner with us</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 BCInitiatives. Curated for Canadian students.</span>
        <span className="footer-legal">
          {/* Placeholder pages — point these at real routes when they exist */}
          <a href="#" aria-disabled="true" onClick={(e) => e.preventDefault()}>Privacy</a>
          <Link to="/" search={homeSearch} hash="about">About</Link>
          <span>Made in Richmond, BC 🇨🇦</span>
        </span>
      </div>
    </footer>
  );
}
