import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const homeSearch = {
  category: "all",
  difficulty: "all",
  grade: "all",
  international: "all",
  q: "",
  sort: "deadline",
};

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Summit Seeker" },
      {
        name: "description",
        content:
          "How Summit Seeker handles your data: how saved opportunities are stored in your browser and the aggregate analytics we use. No accounts, no email collection, no data sold, no third-party ad tracking.",
      },
      { property: "og:title", content: "Privacy — Summit Seeker" },
      {
        property: "og:description",
        content:
          "What Summit Seeker collects, how it's stored, and what we don't do with your data.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy — Summit Seeker" },
      {
        name: "twitter:description",
        content:
          "What Summit Seeker collects, how it's stored, and what we don't do with your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
            <Link className="nav-ghost" to="/" search={homeSearch} hash="opportunities">
              Start Exploring
            </Link>
            <Link className="nav-cta" to="/partners">
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
              className="nav-ghost"
              to="/"
              search={homeSearch}
              hash="opportunities"
              onClick={() => setMenuOpen(false)}
            >
              Start Exploring
            </Link>
            <Link className="nav-cta" to="/partners" onClick={() => setMenuOpen(false)}>
              Our Partners
            </Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="section" id="privacy">
          <Reveal>
            <span className="section-label">Privacy</span>
            <h2 className="section-h2">Your privacy, in plain language</h2>
            <p className="partners-intro">
              Summit Seeker is a student-led project. We keep data collection to the minimum needed
              to run the site, we never sell it, and we don't use third-party ad tracking. Here's
              exactly what that means.
            </p>
          </Reveal>

          <Reveal>
            <div
              style={{
                maxWidth: "70ch",
                lineHeight: 1.65,
                marginTop: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.75rem",
              }}
            >
              <div>
                <h3 style={{ marginBottom: "0.5rem" }}>Opportunities you save</h3>
                <p>
                  When you save an opportunity, it's stored <strong>in your own browser</strong>{" "}
                  using localStorage (under the key <code>bci_saved_opportunities</code>). This
                  never leaves your device and is never sent to a server. Clearing your browser data
                  removes your saved opportunities.
                </p>
              </div>

              <div>
                <h3 style={{ marginBottom: "0.5rem" }}>Analytics</h3>
                <p>
                  We use <strong>Vercel Analytics</strong> to understand aggregate traffic — things
                  like how many people visit and which pages are popular. This is anonymized and
                  does not collect personal data or build a profile of you. We don't use advertising
                  cookies or third-party ad trackers.
                </p>
              </div>

              <div>
                <h3 style={{ marginBottom: "0.5rem" }}>What we don't do</h3>
                <p>
                  We don't sell or rent your data. We don't share it with advertisers. We don't
                  track you across other websites. Other than the anonymous analytics described
                  above, we don't collect personal information — no accounts, no email collection.
                </p>
              </div>

              <div>
                <h3 style={{ marginBottom: "0.5rem" }}>Questions or requests</h3>
                <p>
                  Have a question about your data or this policy? Email us at{" "}
                  <a href="mailto:bcinitiativessociety@gmail.com">bcinitiativessociety@gmail.com</a>{" "}
                  and we'll take care of it.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
