import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GraduationCap, HandHeart, Trophy, Briefcase, Sun, Banknote,
  Search, SlidersHorizontal, Heart, Bell, CalendarDays,
  Instagram, Linkedin, Mail,
} from "lucide-react";
import { opportunities, categories, type Opportunity } from "@/lib/opportunities";
import { Reveal } from "@/components/Reveal";
import { useSavedOpportunities } from "@/hooks/useSavedOpportunities";
import { Toaster, toast } from "sonner";

const categoryConfig: Record<string, { color: string; soft: string; Icon: React.ElementType }> = {
  scholarships:      { color: "#1d4ed8", soft: "rgba(29, 78, 216, 0.08)",  Icon: GraduationCap },
  volunteering:      { color: "#15803d", soft: "rgba(21, 128, 61, 0.09)",  Icon: HandHeart },
  competitions:      { color: "#b45309", soft: "rgba(180, 83, 9, 0.1)",    Icon: Trophy },
  internships:       { color: "#3451c6", soft: "rgba(59, 91, 219, 0.09)",  Icon: Briefcase },
  "summer-programs": { color: "#c2410c", soft: "rgba(234, 88, 12, 0.09)",  Icon: Sun },
  grants:            { color: "#be185d", soft: "rgba(190, 24, 93, 0.08)",  Icon: Banknote },
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || "all",
    difficulty: (search.difficulty as string) || "all",
    grade: (search.grade as string) || "all",
    q: (search.q as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "BCInitiatives — Every Canadian Student Opportunity, One Place" },
      { name: "description", content: "Discover curated Canadian scholarships, volunteering opportunities, competitions, internships, summer programs, and grants for high school and CEGEP students. Hand-checked and updated regularly." },
      { property: "og:title", content: "BCInitiatives — Every Canadian Student Opportunity, One Place" },
      { property: "og:description", content: "Hand-curated Canadian student opportunities for high school and CEGEP students. Scholarships, competitions, internships, summer programs, grants and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "BCInitiatives — Every Canadian Student Opportunity, One Place" },
      { name: "twitter:description", content: "Hand-curated Canadian student opportunities. Scholarships, competitions, internships, summer programs, grants and more." },
      { name: "keywords", content: "Canadian student opportunities, scholarships Canada, high school scholarships, CEGEP scholarships, student competitions Canada, summer programs Canada, student grants Canada, BC student opportunities" },
    ],
  }),
  component: Index,
});

type DiffFilter = "all" | "Easy" | "Moderate" | "Competitive";
type GradeFilter = "all" | "Grades 9–10" | "Grades 11–12" | "CEGEP" | "University";

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
      <img src="/sky.png" alt="" className="parallax-layer" data-speed="0.45" draggable={false} />
      <img src="/mountain.png" alt="" className="parallax-layer" data-speed="0.3" draggable={false} />
      <img src="/mist.png" alt="" className="parallax-layer" data-speed="0.18" draggable={false} />
      <img src="/trees.png" alt="" className="parallax-layer" data-speed="0.06" draggable={false} />
      <div className="hero-fade" />
    </div>
  );
}

function OppCard({ o }: { o: Opportunity }) {
  const cfg = categoryConfig[o.category];
  const { isSaved, toggle } = useSavedOpportunities();
  const saved = isSaved(o.id);

  const onToggleSave = () => {
    const nowSaved = toggle(o.id);
    toast(nowSaved ? "Saved" : "Removed", {
      description: nowSaved
        ? `${o.name} added to your saved list.`
        : `${o.name} removed from your saved list.`,
    });
  };

  return (
    <article className="opp-card">
      <div className="opp-labelbar" style={cfg ? { background: cfg.soft } : undefined}>
        <span className="opp-type" style={cfg ? { color: cfg.color } : undefined}>
          {cfg && <cfg.Icon size={13} strokeWidth={2.2} />}
          {o.category.replace("-", " ")}
        </span>
        <div className="opp-labelbar-right">
          <span className={`deadline-badge deadline-${o.deadlineStatus === "open" ? "open" : o.deadlineStatus === "est" ? "est" : "closed"}`}>
            {o.deadlineStatus === "open" ? "Open" : o.deadlineStatus === "est" ? "Est." : "Closed"}
          </span>
          <button
            type="button"
            className={`save-btn ${saved ? "saved" : ""}`}
            onClick={onToggleSave}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${o.name} from saved` : `Save ${o.name}`}
            title={saved ? "Remove from saved" : "Save"}
          >
            <Heart size={16} strokeWidth={2} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <h3 className="opp-title">
        <Link
          to="/opportunities/$id"
          params={{ id: String(o.id) }}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {o.name}
        </Link>
      </h3>
      <p className="opp-desc">{o.description}</p>
      <hr className="opp-divider" />
      <div className="opp-meta">
        <div>
          <div className="meta-label">Deadline</div>
          <div className="meta-value">{o.deadline}</div>
        </div>
        <div>
          <div className="meta-label">Award</div>
          <div className="meta-value">{o.amount}</div>
        </div>
        <div>
          <div className="meta-label">Difficulty</div>
          <div className="meta-value">{o.difficulty}</div>
        </div>
        <div>
          <div className="meta-label">Commitment</div>
          <div className="meta-value">{o.timeCommitment}</div>
        </div>
      </div>
      <div className="opp-bottom">
        <div className="tag-chips">
          {o.gradeLevels.slice(0, 2).map((g) => (
            <span className="tag-chip" key={g}>{g}</span>
          ))}
          {o.stem && <span className="tag-chip">STEM</span>}
        </div>
        <Link className="apply-link" to="/opportunities/$id" params={{ id: String(o.id) }}>View details →</Link>
      </div>
    </article>
  );
}

function CatIcon({ id }: { id: string }) {
  const props = { size: 22, strokeWidth: 1.5, color: "currentColor" };
  switch (id) {
    case "scholarships":      return <GraduationCap {...props} />;
    case "volunteering":      return <HandHeart {...props} />;
    case "competitions":      return <Trophy {...props} />;
    case "internships":       return <Briefcase {...props} />;
    case "summer-programs":   return <Sun {...props} />;
    case "grants":            return <Banknote {...props} />;
    default:                  return null;
  }
}

/* Static product-preview mockup shown under the hero */
function ProductPreview() {
  const mockCards = [
    { title: "National Science Olympiad", badge: "Competition", badgeClass: "badge-competition", deadline: "Mar 15, 2027", elig: "Grades 9–12 · Team-based · National finals" },
    { title: "Youth Climate Action Grant", badge: "Grant", badgeClass: "badge-grant", deadline: "Rolling deadline", elig: "Ages 15–30 · Project-based · Up to $5,000" },
    { title: "Local Hospital Volunteering", badge: "Volunteering", badgeClass: "badge-volunteer", deadline: "Ongoing intake", elig: "Grade 10+ · 4 hrs/week · Reference letter" },
    { title: "University Research Internship", badge: "Internship", badgeClass: "badge-internship", deadline: "Feb 1, 2027", elig: "Grades 11–12 · Paid summer placement" },
  ];
  return (
    <div className="preview-section" aria-hidden="true">
      <Reveal>
        <div className="preview-wrap">
          <div className="preview-card" aria-hidden="true">
            <div className="preview-chrome">
              <div className="chrome-dots">
                <span className="chrome-dot" /><span className="chrome-dot" /><span className="chrome-dot" />
              </div>
              <div className="chrome-url">bcinitiatives.ca/opportunities</div>
              <div style={{ width: 54 }} />
            </div>
            <div className="preview-body">
              <aside className="preview-sidebar">
                <div className="sidebar-title">Filters</div>
                <div className="filter-group">
                  <div className="filter-title">Type</div>
                  <div className="filter-opt"><span className="f-box checked" />Scholarships</div>
                  <div className="filter-opt"><span className="f-box checked" />Competitions</div>
                  <div className="filter-opt"><span className="f-box" />Volunteering</div>
                  <div className="filter-opt"><span className="f-box" />Grants</div>
                </div>
                <div className="filter-group">
                  <div className="filter-title">Subject</div>
                  <div className="filter-opt"><span className="f-box checked" />STEM</div>
                  <div className="filter-opt"><span className="f-box" />Business</div>
                  <div className="filter-opt"><span className="f-box" />Community</div>
                </div>
                <div className="filter-group">
                  <div className="filter-title">Grade level</div>
                  <div className="filter-opt"><span className="f-box" />Grades 9–10</div>
                  <div className="filter-opt"><span className="f-box checked" />Grades 11–12</div>
                  <div className="filter-opt"><span className="f-box" />CEGEP</div>
                </div>
                <div className="filter-group">
                  <div className="filter-title">Deadline</div>
                  <div className="filter-opt"><span className="f-box f-radio" />Next 30 days</div>
                  <div className="filter-opt"><span className="f-box f-radio checked" />This semester</div>
                  <div className="filter-opt"><span className="f-box f-radio" />Any time</div>
                </div>
              </aside>
              <div className="preview-main">
                <div className="preview-main-head">
                  <div className="preview-count">Showing <strong>128</strong> opportunities</div>
                  <div className="preview-sort">Sort: Deadline ↑</div>
                </div>
                <div className="mock-grid">
                  {mockCards.map((c) => (
                    <div className="mock-card" key={c.title}>
                      <div className="mock-top">
                        <span className={`mock-badge ${c.badgeClass}`}>{c.badge}</span>
                        <Heart size={14} strokeWidth={1.8} color="var(--text-muted)" />
                      </div>
                      <div className="mock-title">{c.title}</div>
                      <div className="mock-deadline"><CalendarDays size={13} strokeWidth={1.8} />{c.deadline}</div>
                      <div className="mock-elig">{c.elig}</div>
                    </div>
                  ))}
                  {[0, 1].map((i) => (
                    <div className="mock-card mock-skeleton" key={`sk-${i}`}>
                      <div className="mock-top"><span className="sk-badge" /></div>
                      <div className="sk-bar sk-title" />
                      <div className="sk-bar sk-line" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = Route.useNavigate();
  const { category, difficulty, grade, q: search } = Route.useSearch();

  const setCategory = (v: string) => navigate({ search: (s: any) => ({ ...s, category: v }), replace: true, resetScroll: false });
  const setDifficulty = (v: string) => navigate({ search: (s: any) => ({ ...s, difficulty: v }), replace: true, resetScroll: false });
  const setGrade = (v: string) => navigate({ search: (s: any) => ({ ...s, grade: v }), replace: true, resetScroll: false });
  const setSearch = (v: string) => navigate({ search: (s: any) => ({ ...s, q: v }), replace: true, resetScroll: false });

  const [showAll, setShowAll] = useState(false);
  const [heroQ, setHeroQ] = useState(search);
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedSet, count: savedCount } = useSavedOpportunities();

  useEffect(() => {
    setShowAll(false);
  }, [search, category, difficulty, grade, savedOnly]);

  const scrollToOpportunities = () => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("opportunities")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const submitHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(heroQ);
    scrollToOpportunities();
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const r = opportunities
      .filter((o) => (savedOnly ? savedSet.has(o.id) : true))
      .filter((o) => (category === "all" ? true : o.category === category))
      .filter((o) => (difficulty === "all" ? true : o.difficulty === difficulty))
      .filter((o) => (grade === "all" ? true : o.gradeLevels.includes(grade)))
      .filter((o) =>
        !q
          ? true
          : (o.name + " " + o.description + " " + o.eligibility + " " + o.category)
              .toLowerCase()
              .includes(q)
      );
    return r.sort((a, b) => new Date(a.deadlineSort).getTime() - new Date(b.deadlineSort).getTime());
  }, [search, category, difficulty, grade, savedOnly, savedSet]);

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
      .slice(0, 3);
  }, []);

  return (
    <>
      <Toaster position="bottom-center" theme="light" toastOptions={{ className: "bci-toast" }} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="logo">BC<span>Initiatives</span></a>
          <div className="nav-links">
            <a className="nav-link" href="#opportunities">Opportunities</a>
            <a className="nav-link" href="#categories">Categories</a>
            <a className="nav-link" href="#features">Features</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-ghost" href="#opportunities">Start Exploring</a>
            <Link className="nav-cta" to="/partners">Our Partners</Link>
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
            <a className="nav-link" href="#opportunities" onClick={() => setMenuOpen(false)}>Opportunities</a>
            <a className="nav-link" href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
            <a className="nav-link" href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a className="nav-link" href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a className="nav-ghost" href="#opportunities" onClick={() => setMenuOpen(false)}>Start Exploring</a>
            <Link className="nav-cta" to="/partners" onClick={() => setMenuOpen(false)}>Our Partners</Link>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <ParallaxLayers />
        <div className="hero-inner">
          <div className="hero-eyebrow fade-up">Canadian Student Opportunities · Est. 2026</div>
          <h1 className="hero-h1 fade-up d1">
            Discover Your Next<br />
            <span className="accent-word">Opportunity</span>
          </h1>
          <p className="hero-sub fade-up d2">
            Curated Canadian scholarships, volunteering, competitions, internships, summer programs, and grants for high school and CEGEP students.
          </p>
          <form className="hero-search fade-up d3" onSubmit={submitHeroSearch} role="search">
            <span className="hero-search-icon"><Search size={18} strokeWidth={1.8} /></span>
            <input
              className="hero-search-input"
              placeholder="Search scholarships, competitions, internships…"
              value={heroQ}
              onChange={(e) => setHeroQ(e.target.value)}
              aria-label="Search opportunities"
            />
            <button type="submit" className="hero-search-btn">Search</button>
          </form>
        </div>
      </header>

      <ProductPreview />

      <section className="stats-section" aria-label="Platform stats">
        <div className="stat-grid">
          {[
            { num: "149+", label: "Opportunities" },
            { num: "20+", label: "Categories" },
            { num: "1000+", label: "Students" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="stat-card">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <main className="container">
        <section className="section" id="categories">
          <Reveal>
            <span className="section-label"><span className="num">01</span>Categories</span>
            <h2 className="section-h2">Browse by category</h2>
            <div className="cat-grid">
              {categories.map((c) => {
                const count = opportunities.filter((o) => o.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    className="cat-card"
                    onClick={() => {
                      setCategory(c.id);
                      scrollToOpportunities();
                    }}
                  >
                    <div className="cat-icon"><CatIcon id={c.id} /></div>
                    <div>
                      <div className="cat-count">{count}</div>
                      <div className="cat-name">{c.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </section>

        {closingSoon.length > 0 && (
          <section className="section">
            <Reveal>
              <span className="section-label"><span className="num">02</span>Deadlines</span>
              <h2 className="section-h2">Closing soon</h2>
              <div className="closing-grid">
                {closingSoon.map((o) => {
                  const deadline = new Date(o.deadlineSort);
                  const daysUntil = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const cfg = categoryConfig[o.category];
                  return (
                    <Link key={o.id} to="/opportunities/$id" params={{ id: String(o.id) }} className="closing-card">
                      <div className="closing-top">
                        <span className="closing-cat" style={{ color: cfg?.color ?? "var(--text-muted)" }}>
                          {o.category.replace("-", " ")}
                        </span>
                        <span className="closing-days">{daysUntil === 0 ? "Today" : `${daysUntil}d left`}</span>
                      </div>
                      <div className="closing-name">{o.name}</div>
                      <div className="closing-amount">{o.amount}</div>
                      <div className="closing-link">View details →</div>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </section>
        )}

        <section className="section" id="opportunities">
          <Reveal>
            <span className="section-label"><span className="num">03</span>Explore</span>
            <h2 className="section-h2">All opportunities</h2>

            <div className="search-row">
              <input
                className="search-input"
                placeholder="Search by name, eligibility, or keyword…"
                aria-label="Search opportunities"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="chip-group">
              <span className="chip-label">Category</span>
              <button className={`chip ${category === "all" ? "active" : ""}`} onClick={() => setCategory("all")}>All</button>
              {categories.map((c) => (
                <button key={c.id} className={`chip ${category === c.id ? "active" : ""}`} onClick={() => setCategory(c.id)}>
                  {c.name}
                </button>
              ))}
            </div>

            <div className="chip-group">
              <span className="chip-label">Difficulty</span>
              {(["all", "Easy", "Moderate", "Competitive"] as DiffFilter[]).map((d) => (
                <button key={d} className={`chip ${difficulty === d ? "active" : ""}`} onClick={() => setDifficulty(d)}>
                  {d === "all" ? "All" : d}
                </button>
              ))}
            </div>

            <div className="chip-group">
              <span className="chip-label">Grade</span>
              {(["all", "Grades 9–10", "Grades 11–12", "CEGEP", "University"] as GradeFilter[]).map((g) => (
                <button key={g} className={`chip ${grade === g ? "active" : ""}`} onClick={() => setGrade(g)}>
                  {g === "all" ? "All" : g}
                </button>
              ))}
            </div>

            <div className="chip-group">
              <span className="chip-label">Saved</span>
              <button
                type="button"
                className={`chip chip-saved ${savedOnly ? "active" : ""}`}
                onClick={() => setSavedOnly((s) => !s)}
                aria-pressed={savedOnly}
                aria-label={savedOnly ? "Show all opportunities" : "Show only saved opportunities"}
              >
                <Heart size={13} strokeWidth={2} fill={savedOnly ? "currentColor" : "none"} />
                Saved
                <span className="chip-count">{savedCount}</span>
              </button>
            </div>

            {(category !== "all" || difficulty !== "all" || grade !== "all" || search !== "" || savedOnly) && (
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSavedOnly(false);
                  navigate({ search: { category: "all", difficulty: "all", grade: "all", q: "" }, replace: true, resetScroll: false });
                }}
              >
                ✕ Clear all filters
              </button>
            )}

            {filtered.length === 0 ? (
              savedOnly && savedCount === 0 ? (
                <div className="empty saved-empty">
                  <Heart size={28} strokeWidth={1.6} />
                  <p>
                    No saved opportunities yet — tap the{" "}
                    <Heart className="inline-heart" size={14} strokeWidth={2} /> on any
                    opportunity to save it here.
                  </p>
                </div>
              ) : (
                <div className="empty">No opportunities match your filters.</div>
              )
            ) : (
              <>
                <div className="opp-grid-header">
                  <span className="opp-count">{filtered.length} results</span>
                  {filtered.length > 6 && (
                    <button
                      className="show-all-btn"
                      onClick={() => setShowAll((s) => !s)}
                    >
                      {showAll ? "Show less ↑" : `Show all ${filtered.length} →`}
                    </button>
                  )}
                </div>
                <div className="grid" style={{ marginTop: "1rem" }}>
                  {(showAll ? filtered : filtered.slice(0, 6)).map((o) => (
                    <OppCard key={o.id} o={o} />
                  ))}
                </div>
              </>
            )}
          </Reveal>
        </section>

        <section className="section" id="features">
          <Reveal>
            <span className="section-label"><span className="num">04</span>Features</span>
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
                  Icon: Bell,
                  title: "Get Reminders",
                  desc: "Never miss a deadline. Get nudged before applications close for the opportunities you're tracking.",
                },
              ].map((f, i) => (
                <Reveal key={f.title} delay={i * 120}>
                  <div className="feature-card">
                    <div className="feature-icon"><f.Icon size={22} strokeWidth={1.7} /></div>
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section" id="about">
          <Reveal>
            <span className="section-label"><span className="num">05</span>About</span>
            <h2 className="section-h2">Built by students, for students</h2>
            <div className="about-grid" style={{ margin: "0 auto" }}>
              <div>
                <p className="about-lead">
                  BCInitiatives curates Canadian student opportunities so you spend less time searching and more time applying.
                </p>
                <p className="about-body">
                  Every listing is hand-checked for accuracy and updated regularly. We focus on opportunities that are actually worth your time — no spam, no paywalls, no marketing fluff.
                </p>
              </div>
              <div className="about-faq">
                <div className="faq-item">
                  <div className="faq-q">How often is this updated?</div>
                  <div className="faq-a">Listings are reviewed and updated on a rolling basis. Deadlines are verified each cycle.</div>
                </div>
                <div className="faq-item">
                  <div className="faq-q">Who runs this?</div>
                  <div className="faq-a">BCInitiatives is a student-led project based in Richmond, BC, built to make opportunity discovery more equitable for Canadian students.</div>
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
            <p>New scholarships, competitions, and programs are added all the time. Start exploring and find the one that changes your trajectory.</p>
            <a className="btn btn-primary" href="#opportunities">Browse all opportunities</a>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo">BC<span>Initiatives</span></a>
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
              <a href="#opportunities">All opportunities</a>
              <a href="#categories">Categories</a>
              <a href="#features">Features</a>
              <a href="#about">About</a>
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
