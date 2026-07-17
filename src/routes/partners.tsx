import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { PartnerDirectory } from "@/components/PartnerDirectory";

const homeSearch = {
  category: "all",
  difficulty: "all",
  grade: "all",
  international: "all",
  q: "",
  sort: "deadline",
};

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Our Partners — Summit Seeker" },
      {
        name: "description",
        content:
          "Summit Seeker partners with student-led and youth-serving organizations across BC, Canada, and around the world — expanding the opportunities available to students. Meet all of our partner organizations.",
      },
      { property: "og:title", content: "Our Partners — Summit Seeker" },
      {
        property: "og:description",
        content:
          "The student-led and youth-serving organizations Summit Seeker works with across BC, Canada, and internationally.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Partners — Summit Seeker" },
      {
        name: "twitter:description",
        content:
          "The student-led and youth-serving organizations Summit Seeker works with across BC, Canada, and internationally.",
      },
    ],
  }),
  component: PartnersPage,
});

function PartnersPage() {
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
            <Link to="/" search={homeSearch} className="logo">
              <LogoMark size={22} />
              Summit<span>Seeker</span>
            </Link>
            <span className="logo-tag">by BC Initiatives</span>
          </span>
          <div className="nav-links">
            <Link className="nav-link" to="/" search={homeSearch} hash="opportunities">
              Opportunities
            </Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="categories">
              Categories
            </Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="features">
              Features
            </Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="about">
              About
            </Link>
            <Link className="nav-cta nav-cta--outline" to="/profiles">
              Student Profiles
            </Link>
            <Link className="nav-cta" to="/partners" aria-current="page">
              Our Partners
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
            <Link
              className="nav-link"
              to="/"
              search={homeSearch}
              hash="opportunities"
              onClick={() => setMenuOpen(false)}
            >
              Opportunities
            </Link>
            <Link
              className="nav-link"
              to="/"
              search={homeSearch}
              hash="categories"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              className="nav-link"
              to="/"
              search={homeSearch}
              hash="features"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="nav-link"
              to="/"
              search={homeSearch}
              hash="about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              className="nav-cta nav-cta--outline"
              to="/profiles"
              onClick={() => setMenuOpen(false)}
            >
              Student Profiles
            </Link>
            <Link
              className="nav-cta"
              to="/partners"
              aria-current="page"
              onClick={() => setMenuOpen(false)}
            >
              Our Partners
            </Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="section partners-page" id="partners">
          <Reveal>
            <span className="section-label">Our Partners</span>
            <h2 className="section-h2">The organizations we work with</h2>
            <p className="partners-intro">
              Student-led organizations we partner with to bring you more opportunities — across BC,
              Canada, and around the world.
            </p>
          </Reveal>
          <Reveal>
            <PartnerDirectory />
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
