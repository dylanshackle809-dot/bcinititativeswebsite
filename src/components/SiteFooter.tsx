import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { categories } from "@/lib/opportunities";
import { LogoMark } from "@/components/LogoMark";

const homeSearch = {
  category: "all",
  difficulty: "all",
  grade: "all",
  international: "all",
  q: "",
  sort: "deadline",
};

/** Shared site footer used on the home, detail, and partners pages. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" search={homeSearch} className="logo">
            <LogoMark size={22} />
            Summit<span>Seeker</span>
          </Link>
          <p className="footer-tag">
            Every Canadian student opportunity, one place. A student-led project based in Richmond,
            BC — hand-curated for high school and CEGEP students.
          </p>
          <a className="footer-email" href="mailto:bcinitiativessociety@gmail.com">
            <Mail size={14} strokeWidth={1.8} /> bcinitiativessociety@gmail.com
          </a>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/bcinitiativessociety/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BC Initiatives on Instagram"
            >
              <Instagram size={16} strokeWidth={1.8} />
            </a>
            <a
              href="https://www.linkedin.com/company/bc-initiatives"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BC Initiatives on LinkedIn"
            >
              <Linkedin size={16} strokeWidth={1.8} />
            </a>
            <a href="mailto:bcinitiativessociety@gmail.com" aria-label="Email BC Initiatives">
              <Mail size={16} strokeWidth={1.8} />
            </a>
          </div>
        </div>
        <div>
          <div className="footer-head">Explore</div>
          <div className="footer-links">
            <Link to="/" search={homeSearch} hash="opportunities">
              All opportunities
            </Link>
            <Link to="/" search={homeSearch} hash="categories">
              Categories
            </Link>
            <Link to="/profiles">Student Profiles</Link>
            <Link to="/partners">Our Partners</Link>
            <Link to="/" search={homeSearch} hash="about">
              About
            </Link>
          </div>
        </div>
        <div>
          <div className="footer-head">Categories</div>
          <div className="footer-links">
            {categories.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                to="/"
                search={{
                  category: c.id,
                  difficulty: "all",
                  grade: "all",
                  international: "all",
                  q: "",
                  sort: "deadline",
                }}
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
            <a href="mailto:bcinitiativessociety@gmail.com">Suggest an opportunity</a>
            <a href="mailto:bcinitiativessociety@gmail.com">Report an issue</a>
            <a href="mailto:bcinitiativessociety@gmail.com">Partner with us</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Summit Seeker. Curated for Canadian students.</span>
        <span className="footer-legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/" search={homeSearch} hash="about">
            About
          </Link>
          <span>Made in Richmond, BC</span>
        </span>
      </div>
    </footer>
  );
}
