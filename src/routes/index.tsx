import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GraduationCap,
  HandHeart,
  Trophy,
  Briefcase,
  Sun,
  Banknote,
  Search,
  SlidersHorizontal,
  Heart,
  Handshake,
  Code,
  Wrench,
  Dna,
  TrendingUp,
  Rocket,
  Smartphone,
  FlaskConical,
  Sparkles,
  Check,
  ChevronDown,
  MousePointer2,
} from "lucide-react";
import { format } from "date-fns";
import { opportunities, categories } from "@/lib/opportunities";
import { categoryConfig, categoryNameById } from "@/lib/categoryDisplay";
import { parseLocalDate } from "@/lib/dates";
import { partners } from "@/lib/partners";
import { buildOptions, fieldOptions, findMatch } from "@/lib/match";
import { CrestRow, ProfileAvatar } from "@/components/ProfilesShell";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

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

function CatIcon({ id }: { id: string }) {
  const props = { size: 22, strokeWidth: 1.5, color: "currentColor" };
  switch (id) {
    case "scholarships":
      return <GraduationCap {...props} />;
    case "volunteering":
      return <HandHeart {...props} />;
    case "competitions":
      return <Trophy {...props} />;
    case "internships":
      return <Briefcase {...props} />;
    case "summer-programs":
      return <Sun {...props} />;
    case "grants":
      return <Banknote {...props} />;
    default:
      return null;
  }
}

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
      <div className="qd-cta-row">
        <Link to="/profiles/match" className="qd-cta">
          Find your match →
        </Link>
        <Link to="/profiles" className="qd-cta-alt">
          Access the Student Profiles tab →
        </Link>
      </div>
      <div className="qd-cta-row">
        <Link to="/opportunities" className="qd-cta qd-cta--blue">
          Browse all opportunities <ChevronDown size={15} strokeWidth={2.2} />
        </Link>
      </div>
    </div>
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

  const closingSoon = useMemo(() => {
    const now = new Date();
    return opportunities
      .filter((o) => {
        if (o.deadlineStatus !== "open" && o.deadlineStatus !== "est") return false;
        if (o.deadlineSort === "2099-12-31") return false;
        const deadline = new Date(o.deadlineSort);
        const daysUntil = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return daysUntil >= 0 && daysUntil <= 180;
      })
      .sort((a, b) => new Date(a.deadlineSort).getTime() - new Date(b.deadlineSort).getTime())
      .slice(0, 4);
  }, []);

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
            <a className="nav-link" href="#categories">
              Categories
            </a>
            <a className="nav-link" href="#features">
              Features
            </a>
            <Link className="nav-link" to="/about">
              About
            </Link>
            <Link className="nav-cta nav-cta--outline" to="/profiles">
              Student Profiles
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
            <Link className="nav-link" to="/opportunities" onClick={() => setMenuOpen(false)}>
              Opportunities
            </Link>
            <a className="nav-link" href="#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </a>
            <a className="nav-link" href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <Link className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link
              className="nav-cta nav-cta--outline"
              to="/profiles"
              onClick={() => setMenuOpen(false)}
            >
              Student Profiles
            </Link>
            <Link className="nav-cta" to="/partners" onClick={() => setMenuOpen(false)}>
              Our Partners
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

      <div className="preview-section">
        <Reveal>
          <QuizDemo />
        </Reveal>
      </div>

      <main className="container">
        <section className="section" id="categories">
          <Reveal>
            <span className="section-label section-label--accent">
              <span className="num">01</span>Categories
            </span>
            <h2 className="section-h2">Browse by category</h2>
            <div className="bento-grid">
              <div className="bento-tile bento-feature">
                <span className="bento-feature-label">Tracked right now</span>
                <div className="bento-feature-num">{opportunities.length}+</div>
                <p className="bento-feature-sub">
                  opportunities across scholarships, programs &amp; more
                </p>
                <button
                  type="button"
                  className="bento-feature-btn"
                  onClick={() => navigate({ to: "/opportunities" })}
                >
                  Browse all →
                </button>
              </div>
              <div className="bento-tile bento-stat">
                <div className="bento-stat-num">{categories.length}</div>
                <div className="bento-stat-label">Categories</div>
              </div>
              <div className="bento-tile bento-stat">
                <div className="bento-stat-num">1000+</div>
                <div className="bento-stat-label">Students</div>
              </div>
              <div className="bento-tile bento-deadlines">
                <div className="bento-deadlines-head">
                  <span className="section-label section-label--accent">
                    <span className="num">02</span>Deadlines — Closing soon
                  </span>
                  <button
                    type="button"
                    className="bento-deadlines-all"
                    onClick={() => navigate({ to: "/opportunities", search: { sort: "deadline" } })}
                  >
                    All →
                  </button>
                </div>
                {closingSoon.length === 0 ? (
                  <p className="bento-deadline-empty">No deadlines in the next 6 months.</p>
                ) : (
                  <div className="bento-deadline-rows">
                    {closingSoon.map((o) => {
                      const d = parseLocalDate(o.deadlineSort);
                      const daysUntil = Math.ceil(
                        (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                      );
                      const cfg = categoryConfig[o.category];
                      return (
                        <Link
                          key={o.id}
                          to="/opportunities/$id"
                          params={{ id: String(o.id) }}
                          className="bento-deadline-row"
                        >
                          <span
                            className="bento-deadline-dot"
                            style={{ background: cfg?.color ?? "var(--text-muted)" }}
                          />
                          <span className="bento-deadline-main">
                            <span className="bento-deadline-name">{o.name}</span>
                            <span className="bento-deadline-cat">
                              {categoryNameById[o.category] ?? o.category}
                            </span>
                          </span>
                          <span className="bento-deadline-when">
                            <span className="bento-deadline-date">{format(d, "MMM d")}</span>
                            <span className="bento-deadline-days">
                              {daysUntil === 0 ? "Today" : `${daysUntil} days left`}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              {categories.map((c) => {
                const count = opportunities.filter((o) => o.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className="bento-tile bento-cat"
                    onClick={() => navigate({ to: "/opportunities", search: { category: c.id } })}
                  >
                    <span className="bento-cat-icon">
                      <CatIcon id={c.id} />
                    </span>
                    <span className="bento-cat-count">{count}</span>
                    <span className="bento-cat-name">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="section" id="opportunities">
          <Reveal>
            <span className="section-label section-label--accent">
              <span className="num">03</span>Explore
            </span>
            <h2 className="section-h2">All opportunities</h2>
            <Link to="/opportunities" className="btn btn-primary">
              Browse all opportunities →
            </Link>
          </Reveal>
        </section>

        <section className="section" id="features">
          <Reveal>
            <span className="section-label section-label--accent">
              <span className="num">04</span>Features
            </span>
            <h2 className="section-h2">Everything you need to get ahead</h2>
            <div className="features-grid">
              {[
                {
                  Icon: SlidersHorizontal,
                  title: "Search & Filter",
                  desc: "Cut through the noise with instant search and filters for category, difficulty, and grade level — find your fit in seconds.",
                },
                {
                  Icon: Heart,
                  title: "Save Favorites",
                  desc: "Bookmark the opportunities you care about and build your own shortlist to come back to anytime.",
                },
                {
                  Icon: Handshake,
                  title: "Featured Partners",
                  desc: `Discover ${partners.length} youth-led and student-run organizations featured on the site — each one an extra door to opportunities, mentorship, and community.`,
                  link: true,
                },
              ].map((f, i) => {
                const inner = (
                  <>
                    <div className="feature-icon">
                      <f.Icon size={22} strokeWidth={1.7} />
                    </div>
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                  </>
                );
                return (
                  <Reveal key={f.title} delay={i * 120}>
                    {"link" in f && f.link ? (
                      <Link
                        to="/partners"
                        className="feature-card"
                        style={{ display: "block", textDecoration: "none", color: "inherit" }}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="feature-card">{inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="section" id="about">
          <Reveal>
            <span className="section-label section-label--accent">
              <span className="num">05</span>About
            </span>
            <h2 className="section-h2">Built by students, for students</h2>
            <div className="about-grid" style={{ margin: "0 auto" }}>
              <div>
                <p className="about-lead">
                  Summit Seeker curates Canadian student opportunities so you spend less time
                  searching and more time applying.
                </p>
                <p className="about-body">
                  Every listing is hand-checked for accuracy and updated regularly. We focus on
                  opportunities that are actually worth your time — no spam, no paywalls, no
                  marketing fluff.
                </p>
              </div>
              <div className="about-faq">
                <div className="faq-item">
                  <div className="faq-q">How often is this updated?</div>
                  <div className="faq-a">
                    Listings are reviewed and updated on a rolling basis. Deadlines are verified
                    each cycle.
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">Who runs this?</div>
                  <div className="faq-a">
                    Summit Seeker is a student-led project based in Richmond, BC, built to make
                    opportunity discovery more equitable for Canadian students.
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">Can I suggest an opportunity?</div>
                  <div className="faq-a">Yes — reach out and we'll review it for inclusion.</div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <section className="cta-band">
        <Reveal>
          <div className="cta-card">
            <h3>Don't miss an opportunity.</h3>
            <p>
              New scholarships, competitions, and programs are added all the time. Start exploring
              and find the one that changes your trajectory.
            </p>
            <Link className="btn btn-primary" to="/opportunities">
              Browse all opportunities
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  );
}
