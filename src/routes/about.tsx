import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Summit Seeker" },
      {
        name: "description",
        content:
          "Summit Seeker is a student-led project based in Richmond, BC that curates Canadian student opportunities — scholarships, competitions, internships, summer programs, volunteering, and grants — so you spend less time searching and more time applying.",
      },
      { property: "og:title", content: "About — Summit Seeker" },
      {
        property: "og:description",
        content:
          "A student-led project curating Canadian student opportunities. Every listing hand-checked, no spam, no paywalls.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Summit Seeker" },
      {
        name: "twitter:description",
        content:
          "A student-led project curating Canadian student opportunities. Every listing hand-checked, no spam, no paywalls.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <nav className="nav">
        <div className="nav-inner">
          <span className="logo-lockup">
            <Link to="/" className="logo">
              <LogoMark size={22} />
              Summit<span>Seeker</span>
            </Link>
            <span className="logo-tag">by BC Initiatives</span>
          </span>
          <div className="nav-links">
            <Link className="nav-link" to="/opportunities">
              Opportunities
            </Link>
            <Link className="nav-link" to="/profiles">
              Profiles
            </Link>
            <Link className="nav-link" to="/partners">
              Partners
            </Link>
            <Link className="nav-link" to="/about" aria-current="page">
              About
            </Link>
            <Link className="nav-cta" to="/opportunities">
              Get started
            </Link>
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <Link className="nav-link" to="/opportunities" onClick={() => setMenuOpen(false)}>
              Opportunities
            </Link>
            <Link className="nav-link" to="/profiles" onClick={() => setMenuOpen(false)}>
              Profiles
            </Link>
            <Link className="nav-link" to="/partners" onClick={() => setMenuOpen(false)}>
              Partners
            </Link>
            <Link
              className="nav-link"
              to="/about"
              aria-current="page"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link className="nav-cta" to="/opportunities" onClick={() => setMenuOpen(false)}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="section partners-page" id="about">
          <Reveal>
            <span className="section-label">About</span>
            <h2 className="section-h2">Built by students, for students</h2>
            <p className="partners-intro">
              Summit Seeker curates Canadian student opportunities so you spend less time searching
              and more time applying.
            </p>
          </Reveal>
          <Reveal>
            <div style={{ maxWidth: "70ch", lineHeight: 1.65, marginTop: "1.5rem" }}>
              <p>
                Every listing is hand-checked for accuracy and updated regularly. We focus on
                opportunities that are actually worth your time — no spam, no paywalls, no marketing
                fluff.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Summit Seeker is a student-led project by the BC Initiatives Society, based in
                Richmond, BC, built to make opportunity discovery more equitable for Canadian
                students.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Want to suggest an opportunity or get in touch? Email us at{" "}
                <a href="mailto:bcinitiativessociety@gmail.com">bcinitiativessociety@gmail.com</a>.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
