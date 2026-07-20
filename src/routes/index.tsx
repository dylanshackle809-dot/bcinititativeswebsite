import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Code,
  Wrench,
  Dna,
  TrendingUp,
  Rocket,
  Smartphone,
  FlaskConical,
  Sparkles,
  Check,
  MousePointer2,
  Bookmark,
  ArrowRight,
  Instagram,
  Linkedin,
} from "lucide-react";
import { opportunities, categories, type Opportunity } from "@/lib/opportunities";
import { profiles } from "@/lib/profiles";
import { partners } from "@/lib/partners";
import { buildOptions, fieldOptions, findMatch } from "@/lib/match";
import { CrestRow, ProfileAvatar, ProfileCard, SchoolCrest } from "@/components/ProfilesShell";
import { OppCard } from "@/components/OppCard";
import { PartnerCard } from "@/components/PartnerDirectory";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Summit Seeker — Every Student Opportunity, One Place" },
      {
        name: "description",
        content:
          "Discover curated Canadian and international scholarships, volunteering, competitions, internships, summer programs, and grants for high school students — plus real profiles of admitted students to learn from. Hand-checked and updated regularly.",
      },
      {
        property: "og:title",
        content: "Summit Seeker — Every Student Opportunity, One Place",
      },
      {
        property: "og:description",
        content:
          "Hand-curated Canadian and international student opportunities for high school students, plus real admitted-student profiles. Scholarships, competitions, internships, summer programs, grants and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Summit Seeker — Every Student Opportunity, One Place",
      },
      {
        name: "twitter:description",
        content:
          "Hand-curated Canadian and international student opportunities, plus real admitted-student profiles. Scholarships, competitions, internships, summer programs, grants and more.",
      },
      {
        name: "keywords",
        content:
          "Canadian student opportunities, scholarships Canada, high school scholarships, CEGEP scholarships, student competitions Canada, summer programs Canada, student grants Canada, BC student opportunities",
      },
    ],
  }),
  component: Index,
});

/* Layered pixel-art mountain backdrop with gentle scroll parallax.
   Back layers carry a higher speed factor so they track the scroll more
   closely (net on-screen movement = scrollY * (1 - speed)) — sky drifts
   slowest, trees fastest. */
function ParallaxLayers() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-speed]"));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y > el.offsetHeight * 1.2) return;
        for (const l of layers) {
          l.style.transform = `translate3d(0, ${(y * Number(l.dataset.speed)).toFixed(1)}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="hero-parallax" ref={ref} aria-hidden="true">
      {/* mist.png's own alpha peaks at ~22% — this filter amplifies the alpha
          channel so the mist layers read as real fog (see .parallax-layer--mist) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="mist-boost">
          <feComponentTransfer>
            <feFuncA type="linear" slope="2.6" />
          </feComponentTransfer>
        </filter>
      </svg>
      <img
        src="/sky.png"
        alt=""
        className="parallax-layer parallax-layer--sky"
        data-speed="0.45"
        draggable={false}
      />
      <img
        src="/mountain.png"
        alt=""
        className="parallax-layer"
        data-speed="0.3"
        draggable={false}
      />
      <img
        src="/mist.png"
        alt=""
        className="parallax-layer parallax-layer--mist"
        data-speed="0.18"
        draggable={false}
      />
      <img
        src="/mist.png"
        alt=""
        className="parallax-layer parallax-layer--mist2"
        data-speed="0.22"
        draggable={false}
      />
      <img src="/trees.png" alt="" className="parallax-layer" data-speed="0.06" draggable={false} />
      <div className="hero-fade" />
    </div>
  );
}

/* Real entries for the section-2 browser mockups — deterministic picks from
   the live datasets so the homepage always previews current content. */
const mockOpps = ["scholarships", "competitions", "internships", "summer-programs"]
  .map((cat) => opportunities.find((o) => o.category === cat && o.deadlineStatus === "open"))
  .filter((o): o is Opportunity => Boolean(o));
const mockProfiles = profiles.filter((p) => p.photo).slice(0, 3);
const mockPartners = [
  ...partners.filter((p) => p.region === "BC/Canada").slice(0, 2),
  ...partners.filter((p) => p.region === "International").slice(0, 1),
];

const faqs = [
  {
    q: "What is SummitSeeker?",
    a: "SummitSeeker is a free directory of scholarships, competitions, internships, summer programs, volunteering, and grants for high school students in Canada and beyond — plus real profiles of admitted students so you can see exactly what worked. It's a student-led project by BC Initiatives, with no accounts and no paywalls.",
  },
  {
    q: "What kinds of opportunities are listed?",
    a: "Six categories: scholarships, volunteering, competitions, internships & co-ops, summer programs, and grants & funding — Canadian and international. Every listing is hand-checked, with deadlines, award amounts, eligibility, difficulty, and time commitment tracked.",
  },
  {
    q: "What are the student profiles?",
    a: "Real admitted students' extracurriculars, awards, stats, and acceptances, compiled from their own public videos. You can filter them by school, major, or theme to study the actual activities behind successful applications.",
  },
  {
    q: "How does 'Find your match' work?",
    a: "You answer three quick questions — what you're into, your dream schools, and what you'd love to build. The quiz scores every student profile against your answers and shows the admitted student most like you. Nothing is stored and no account is needed.",
  },
  {
    q: "Are the profiles real and consented?",
    a: "Yes — every profile is a real student, published with their consent; non-consenting profiles never appear. Stats are self-reported, and we confirm details with each student before marking a profile verified.",
  },
  {
    q: "Is it free to use?",
    a: "Completely free. No sign-up, no ads, no paywalls — saved opportunities live in your own browser.",
  },
];

/* Looping, non-interactive demo of the /profiles/match quiz. The reveal is
   computed by the REAL matcher over real profile data — nothing invented.
   All timing lives in CSS keyframes on one shared 18s timeline (no JS timers);
   with animations disabled (reduced motion) the base styles show a single
   static "Your match" frame. */
const quizDemo = findMatch({ fields: ["computer-science"], schools: [], build: "app" });
const demoFieldLabel = (id: string) => fieldOptions.find((f) => f.id === id)?.label ?? id;
const demoBuildLabel = (id: string) => buildOptions.find((b) => b.id === id)?.label ?? id;

function QuizDemo() {
  const demoFields: Array<[string, React.ElementType, boolean]> = [
    ["computer-science", Code, true],
    ["engineering", Wrench, false],
    ["biology", Dna, false],
    ["economics", TrendingUp, false],
  ];
  const demoBuilds: Array<[string, React.ElementType, boolean]> = [
    ["startup", Rocket, false],
    ["app", Smartphone, true],
    ["research", FlaskConical, false],
  ];
  return (
    <div className="preview-wrap quiz-demo-wrap">
      <div className="preview-card">
        <div className="preview-chrome">
          <div className="chrome-dots">
            <span className="chrome-dot" />
            <span className="chrome-dot" />
            <span className="chrome-dot" />
          </div>
          <div className="chrome-url">summitseeker.app/profiles/match</div>
          <div style={{ width: 54 }} />
        </div>
        <div className="qd-stage" aria-hidden="true">
          <div className="qd-step qd-step-1">
            <div className="qd-h">What are you into?</div>
            <div className="qd-grid">
              {demoFields.map(([id, Icon, picked]) => (
                <div key={id} className={`pf-q-opt qd-opt ${picked ? "qd-pick-blue" : ""}`}>
                  <span className="pf-q-opt-icon">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  {demoFieldLabel(id)}
                  {picked && (
                    <span className="pf-q-opt-check qd-check qd-check-blue">
                      <Check size={11} strokeWidth={3} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="qd-step qd-step-2">
            <div className="qd-h">What would you love to build?</div>
            <div className="qd-grid qd-grid--rows">
              {demoBuilds.map(([id, Icon, picked]) => (
                <div
                  key={id}
                  className={`pf-q-opt pf-q-opt--row pf-q-opt--green qd-opt ${picked ? "qd-pick-green" : ""}`}
                >
                  <span className="pf-q-opt-icon">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  {demoBuildLabel(id)}
                  {picked && (
                    <span className="pf-q-opt-check qd-check qd-check-green">
                      <Check size={11} strokeWidth={3} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="qd-step qd-step-3">
            <div className="qd-h">Reading your answers…</div>
            <div className="qd-pills">
              <span className="pf-chip pf-chip--blue qd-pill qd-pill-1">
                {demoFieldLabel("computer-science")}
              </span>
              <span className="pf-chip pf-chip--blue qd-pill qd-pill-2">
                {demoBuildLabel("app")}
              </span>
              <span className="pf-chip qd-pill qd-pill-3">STEM &amp; Research</span>
            </div>
          </div>
          <div className="qd-step qd-step-4">
            <div className="qd-h">Your match</div>
            <div className="qd-reveal">
              <ProfileAvatar name={quizDemo.profile.name} photo={quizDemo.profile.photo} />
              <span className="qd-name">{quizDemo.profile.name}</span>
              <span className="qd-major">{quizDemo.profile.major}</span>
              {quizDemo.pct !== null && (
                <span className="pf-q-pct qd-pct">
                  <Sparkles size={12} strokeWidth={2.2} /> {quizDemo.pct}% match
                </span>
              )}
              <CrestRow ids={quizDemo.profile.acceptedSchoolIds} />
            </div>
          </div>
          <span className="qd-cursor">
            <MousePointer2 size={22} strokeWidth={1.5} fill="currentColor" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Browser-frame chrome shared by the section-2 mockups (QuizDemo has its own). */
function MockChrome({ url }: { url: string }) {
  return (
    <div className="preview-chrome">
      <div className="chrome-dots">
        <span className="chrome-dot" />
        <span className="chrome-dot" />
        <span className="chrome-dot" />
      </div>
      <div className="chrome-url">{url}</div>
      <div style={{ width: 54 }} />
    </div>
  );
}

/** Homepage-local footer per the Phase 2 design; other pages keep SiteFooter. */
function HomeFooter() {
  return (
    <footer className="hf">
      <div className="hf-grid">
        <div>
          <span className="logo-lockup">
            <span className="logo">
              <LogoMark size={22} />
              Summit<span>Seeker</span>
            </span>
            <span className="logo-tag">by BC Initiatives</span>
          </span>
          <p className="hf-tag">Find and build opportunities that matter.</p>
        </div>
        <div>
          <div className="hf-head">Explore</div>
          <div className="hf-links">
            <Link to="/opportunities">Opportunities</Link>
            <Link to="/profiles">Profiles</Link>
            <Link to="/partners">Partners</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
        <div>
          <div className="hf-head">Follow us</div>
          <div className="hf-social">
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
          </div>
        </div>
      </div>
      <div className="hf-bottom">
        <span>© 2026 BC Initiatives</span>
        <span className="hf-site">summitseeker.app</span>
      </div>
    </footer>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [heroQ, setHeroQ] = useState("");

  const submitHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/opportunities", search: { q: heroQ } });
  };

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
            <a href="#top" className="logo">
              <LogoMark size={22} />
              Summit<span>Seeker</span>
            </a>
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
            <Link className="nav-link" to="/about">
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
            <Link className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link className="nav-cta" to="/opportunities" onClick={() => setMenuOpen(false)}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <ParallaxLayers />
        <div className="hero-inner">
          <div className="hero-eyebrow fade-up">
            Canadian &amp; International Student Opportunities · Est. 2026
          </div>
          <h1 className="hero-h1 fade-up d1">
            Discover Your Next
            <br />
            <span className="accent-word">Opportunity</span>
          </h1>
          <p className="hero-sub fade-up d2">
            Curated Canadian and international scholarships, volunteering, competitions,
            internships, summer programs, and grants for high school students — and real profiles of
            admitted students to learn from.
          </p>
          <form className="hero-search fade-up d3" onSubmit={submitHeroSearch} role="search">
            <span className="hero-search-icon">
              <Search size={18} strokeWidth={1.8} />
            </span>
            <input
              className="hero-search-input"
              placeholder="Search scholarships, competitions, internships…"
              value={heroQ}
              onChange={(e) => setHeroQ(e.target.value)}
              aria-label="Search opportunities"
            />
            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>
        </div>
      </header>

      <main className="container">
        {/* SECTION 2 — Four ways (feature showcases with live mockups) */}
        <section className="section">
          <Reveal>
            <div className="fw-header">
              <span className="section-label section-label--accent">Inside SummitSeeker</span>
              <h2 className="section-h2">Four ways to find your next opportunity</h2>
            </div>
          </Reveal>
          <div className="fw-rows">
            <Reveal>
              <div className="fw-row">
                <div className="fw-text">
                  <span className="section-label section-label--accent">
                    <span className="num">01</span>The opportunities directory
                  </span>
                  <h3 className="fw-h3">Browse {opportunities.length}+ verified opportunities.</h3>
                  <p className="fw-body">
                    Six categories, one search. Filter by difficulty, grade, and location to find
                    scholarships, competitions, and programs that actually fit.
                  </p>
                  <Link className="fw-link" to="/opportunities">
                    Browse the directory →
                  </Link>
                </div>
                <div className="fw-frame">
                  <div className="preview-card">
                    <MockChrome url="summitseeker.app/opportunities" />
                    <div className="mock-body" aria-hidden="true" inert>
                      <div className="mock-search">
                        <Search size={13} strokeWidth={2} /> Search {opportunities.length}+
                        opportunities…
                      </div>
                      <div className="mock-pills">
                        <span className="chip active">All</span>
                        {categories.slice(0, 4).map((c) => (
                          <span key={c.id} className="chip">
                            {c.name}
                          </span>
                        ))}
                      </div>
                      <div className="mock-scale">
                        <div className="mock-cards">
                          {mockOpps.map((o) => (
                            <OppCard key={o.id} o={o} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="fw-row fw-row--flip">
                <div className="fw-text">
                  <span className="section-label section-label--accent">
                    <span className="num">02</span>Real student profiles
                  </span>
                  <h3 className="fw-h3">See what admitted students actually did.</h3>
                  <p className="fw-body">
                    Filter by school, major, or theme and study the real activities, roles, and
                    awards behind successful applications.
                  </p>
                  <Link className="fw-link" to="/profiles">
                    Explore profiles →
                  </Link>
                </div>
                <div className="fw-frame">
                  <div className="preview-card">
                    <MockChrome url="summitseeker.app/profiles" />
                    <div className="mock-body pf-tokens" aria-hidden="true" inert>
                      <div className="mock-split">
                        <div className="mock-rail">
                          <span className="mock-rail-item mock-rail-item--on">Schools</span>
                          <span className="mock-rail-item">Major</span>
                          <span className="mock-rail-item">Theme</span>
                          <span className="mock-rail-note">
                            Showing
                            <span className="mock-rail-note-v">All profiles</span>
                          </span>
                        </div>
                        <div className="mock-main">
                          <div className="mock-scale">
                            <div className="mock-profiles">
                              {mockProfiles.map((p) => (
                                <ProfileCard key={p.id} p={p} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="fw-row">
                <div className="fw-text">
                  <span className="section-label section-label--accent">
                    <span className="num">03</span>Find your match
                  </span>
                  <h3 className="fw-h3">A 2-minute quiz that points you to a fit.</h3>
                  <p className="fw-body">
                    Tell us what you're into and what you'd love to build — we score every
                    admitted-student profile against your answers and reveal your closest match.
                  </p>
                  <Link className="fw-link" to="/profiles/match">
                    Take the quiz →
                  </Link>
                </div>
                <div className="fw-frame">
                  <QuizDemo />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="fw-row fw-row--flip">
                <div className="fw-text">
                  <span className="section-label section-label--accent">
                    <span className="num">04</span>Partner organizations
                  </span>
                  <h3 className="fw-h3">Discover student-led orgs offering more.</h3>
                  <p className="fw-body">
                    Partner organizations offer roles, chapters, and programs you won't find in a
                    listing — join one or start your own.
                  </p>
                  <Link className="fw-link" to="/partners">
                    Meet the partners →
                  </Link>
                </div>
                <div className="fw-frame">
                  <div className="preview-card">
                    <MockChrome url="summitseeker.app/partners" />
                    <div className="mock-body" aria-hidden="true" inert>
                      <div className="mock-scale">
                        <div className="mock-partners">
                          {mockPartners.map((p) => (
                            <PartnerCard key={p.name} p={p} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 3 — Essentials bento */}
        <section className="section">
          <Reveal>
            <div className="fw-header">
              <span className="section-label section-label--accent">The essentials</span>
              <h2 className="section-h2">Everything in one place</h2>
            </div>
            <div className="es-grid">
              <div className="es-tile es-tile--brand">
                <span className="es-num">{opportunities.length}+</span>
                <span className="es-label">verified opportunities, updated every cycle</span>
              </div>
              <div className="es-tile">
                <span className="es-num">{categories.length}</span>
                <span className="es-title">categories</span>
                <div className="es-chips">
                  {categories.slice(0, 3).map((c) => (
                    <span key={c.id} className="tag-chip">
                      {c.name}
                    </span>
                  ))}
                  <span className="tag-chip">+{categories.length - 3} more</span>
                </div>
              </div>
              <div className="es-tile">
                <span className="es-num">1,000+</span>
                <span className="es-label">students already searching</span>
              </div>
              <div className="es-tile es-tile--navy">
                <span className="es-title">Canada + international</span>
                <span className="es-label">Listings from BC to everywhere students apply.</span>
              </div>
              <div className="es-tile es-tile--wide">
                <div>
                  <span className="es-title">Real admitted-student profiles</span>
                  <span className="es-label" style={{ display: "block", marginTop: "0.3rem" }}>
                    Shared with consent and filterable by school and major.
                  </span>
                </div>
                <span className="es-crests pf-tokens">
                  {["uoft", "mcgill", "ubc", "waterloo"].map((id) => (
                    <SchoolCrest key={id} id={id} />
                  ))}
                </span>
              </div>
              <div className="es-tile">
                <span className="es-icon">
                  <Bookmark size={18} strokeWidth={2} />
                </span>
                <span className="es-title">Save &amp; track</span>
                <span className="es-label">Build a shortlist and never miss a deadline.</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 4 — FAQ */}
        <section className="section">
          <Reveal>
            <div className="qa-grid">
              <div className="qa-intro">
                <span className="section-label section-label--accent">Questions, answered</span>
                <h2 className="section-h2">Everything you need to know</h2>
                <p className="fw-body" style={{ marginTop: "0.75rem" }}>
                  How the directory, profiles, and match quiz work together — and what it costs
                  (nothing).
                </p>
              </div>
              <div className="qa-list">
                {faqs.map((f, i) => (
                  <details className="qa-item" key={f.q} open={i === 0}>
                    <summary className="qa-summary">
                      <span className="qa-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="qa-q">{f.q}</span>
                      <span className="qa-toggle" aria-hidden="true" />
                    </summary>
                    <p className="qa-body">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* SECTION 5 — CTA band */}
      <section className="cta2-band">
        <Reveal>
          <div className="cta2-card">
            <div>
              <span className="cta2-eyebrow">Your next step</span>
              <h2 className="cta2-h2">Start finding opportunities that fit you.</h2>
              <p className="cta2-sub">
                Free for students. Search the directory, learn from real profiles, and let the quiz
                do the narrowing.
              </p>
              <div className="cta2-actions">
                <Link className="btn btn-primary" to="/opportunities">
                  Browse opportunities
                </Link>
                <Link className="cta2-btn-ghost" to="/profiles/match">
                  Find your match
                </Link>
              </div>
            </div>
            <div className="cta2-aside pf-tokens">
              <div className="cta2-aside-head">
                <strong>Start here</strong>
                <span className="cta2-crests">
                  {["uoft", "mcgill", "ubc", "waterloo"].map((id) => (
                    <SchoolCrest key={id} id={id} />
                  ))}
                </span>
              </div>
              <Link className="cta2-row" to="/opportunities">
                <span className="cta2-row-num">01</span>
                <span>
                  <span className="cta2-kicker">{opportunities.length}+ opportunities</span>
                  <span className="cta2-row-title">Browse the directory</span>
                </span>
                <ArrowRight size={16} className="cta2-arrow" />
              </Link>
              <Link className="cta2-row" to="/profiles">
                <span className="cta2-row-num">02</span>
                <span>
                  <span className="cta2-kicker">Filter by school &amp; major</span>
                  <span className="cta2-row-title">Explore student profiles</span>
                </span>
                <ArrowRight size={16} className="cta2-arrow" />
              </Link>
              <Link className="cta2-row" to="/profiles/match">
                <span className="cta2-row-num">03</span>
                <span>
                  <span className="cta2-kicker">2 minutes</span>
                  <span className="cta2-row-title">Take the match quiz</span>
                </span>
                <ArrowRight size={16} className="cta2-arrow" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <HomeFooter />
    </>
  );
}
