import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { categories } from "@/lib/opportunities";

const homeSearch = { category: "all", difficulty: "all", grade: "all", q: "" };

const partners: { name: string; topic: string; mission: string; website?: string; linkLabel?: string; instagram?: string }[] = [
  {
    name: "BC Youth Council",
    topic: "Political Science / Advocacy",
    website: "https://bcyouthcouncil.org/",
    instagram: "BCYouthCouncil",
    mission: "British Columbia Youth Council is a youth-serving and youth-led organization dedicated to amplifying and representing youth, and connecting youth-led and youth-serving organizations. They provide connections and opportunities to engage with Members of the Legislative Assembly of British Columbia, British Columbian Members of Parliament, and elected public-serving officials at all levels of governance through policy publications, regional youth councils, dialogue sessions, and youth activism.",
  },
  {
    name: "imYEScpr",
    topic: "Healthcare / CPR",
    instagram: "imyescpr",
    mission: "“To serve communities with the ability to help one another in emergency situations; high-quality CPR and life-saving skills should be essential skills in every community's toolbox.”",
  },
  {
    name: "Global Future Leaders",
    topic: "Global Studies / Political Science",
    instagram: "globalfutureleaders_",
    mission: "“We inspire and equip young people to become tomorrow's leaders through active community engagement, a deep understanding of global issues, and meaningful contributions to diverse causes.”",
  },
  {
    name: "Project SugarWise",
    topic: "Healthcare / Diabetes Awareness",
    instagram: "sugarwise._",
    mission: "SugarWise is a nonprofit, student-led initiative focused on making diabetes education more accessible to the public and engaging with diabetic people in a passionate, dedicated, and supportive way — helping them navigate the challenges of the condition, including its impact on mental health.",
  },
  {
    name: "BC Junior Math Association",
    topic: "Tutoring / Mathematics Support",
    website: "https://docs.google.com/forms/d/e/1FAIpQLSfJHzeL21VG0A33hucHBw9hTuqoZ2gu1y3shnb5QTz29dzA8A/viewform",
    linkLabel: "Tutor sign-up →",
    mission: "A non-profit organization in BC dedicated to making math fun and accessible for elementary learners through high school mentorship.",
  },
  {
    name: "Stempathy Youth Organization",
    topic: "STEM Accessibility",
    instagram: "stempathy.id",
    mission: "“STEM for every mind, every future.” Stempathy provides engaging STEM educational content, creates opportunities for student collaboration and learning, and builds a platform where students grow through projects and teamwork — encouraging creativity, curiosity, and critical thinking.",
  },
];

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Our Partners — BCInitiatives" },
      { name: "description", content: "BCInitiatives partners with student-led and youth-serving organizations across BC — including BC Youth Council, imYEScpr, Global Future Leaders, Project SugarWise, BC Junior Math Association, and Stempathy — to expand what's possible for students." },
      { property: "og:title", content: "Our Partners — BCInitiatives" },
      { property: "og:description", content: "The student-led and youth-serving organizations BCInitiatives works with across BC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Our Partners — BCInitiatives" },
      { name: "twitter:description", content: "The student-led and youth-serving organizations BCInitiatives works with across BC." },
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
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" search={homeSearch} className="logo">BC<span>Initiatives</span></Link>
          <div className="nav-links">
            <Link className="nav-link" to="/" search={homeSearch} hash="opportunities">Opportunities</Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="categories">Categories</Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="features">Features</Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="about">About</Link>
            <Link className="nav-ghost" to="/" search={homeSearch} hash="opportunities">Start Exploring</Link>
            <Link className="nav-cta" to="/partners" aria-current="page">Our Partners</Link>
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <Link className="nav-link" to="/" search={homeSearch} hash="opportunities" onClick={() => setMenuOpen(false)}>Opportunities</Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="categories" onClick={() => setMenuOpen(false)}>Categories</Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="features" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link className="nav-link" to="/" search={homeSearch} hash="about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link className="nav-ghost" to="/" search={homeSearch} hash="opportunities" onClick={() => setMenuOpen(false)}>Start Exploring</Link>
            <Link className="nav-cta" to="/partners" aria-current="page" onClick={() => setMenuOpen(false)}>Our Partners</Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="section partners-page">
          <Reveal>
            <span className="section-label">Our Partners</span>
            <h2 className="section-h2">The organizations we work with</h2>
            <p className="partners-intro">BCInitiatives partners with student-led and youth-serving organizations across BC to expand what's possible for students.</p>
            <div className="partners-grid">
              {partners.map((p, i) => (
                <Reveal key={p.name} delay={(i % 3) * 120}>
                  <article className="partner-card">
                    <span className="partner-topic">{p.topic}</span>
                    <h3 className="partner-name">{p.name}</h3>
                    <p className="partner-mission">{p.mission}</p>
                    <div className="partner-links">
                      {p.website && (
                        <a className="apply-link" href={p.website} target="_blank" rel="noreferrer">{p.linkLabel ?? "Visit website →"}</a>
                      )}
                      {p.instagram && (
                        <a className="partner-ig" href={`https://instagram.com/${p.instagram}`} target="_blank" rel="noreferrer" aria-label={`${p.name} on Instagram`}>
                          <Instagram size={14} strokeWidth={1.8} /> @{p.instagram}
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" search={homeSearch} className="logo">BC<span>Initiatives</span></Link>
            <p className="footer-tag">
              Every Canadian student opportunity, one place. Hand-curated for high school and CEGEP students.
            </p>
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
              <Link to="/" search={homeSearch} hash="features">Features</Link>
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
            <div className="footer-head">Get in touch</div>
            <div className="footer-links">
              <a href="mailto:hello@bcinitiatives.ca">Suggest an opportunity</a>
              <a href="mailto:hello@bcinitiatives.ca">Report an issue</a>
              <a href="mailto:hello@bcinitiatives.ca">Partner with us</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BCInitiatives. Curated for Canadian students.</span>
          <span>Made in Richmond, BC 🇨🇦</span>
        </div>
      </footer>
    </>
  );
}
