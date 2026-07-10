import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { GraduationCap, HandHeart, Trophy, Briefcase, Sun, Banknote } from "lucide-react";
import { opportunities, categories, type Opportunity } from "@/lib/opportunities";

const categoryConfig: Record<string, { bg: string; color: string; Icon: React.ElementType }> = {
  scholarships:     { bg: "#DBEAFE", color: "#1D4ED8", Icon: GraduationCap },
  volunteering:     { bg: "#DCFCE7", color: "#15803D", Icon: HandHeart },
  competitions:     { bg: "#FEF9C3", color: "#A16207", Icon: Trophy },
  internships:      { bg: "#EDE9FE", color: "#6D28D9", Icon: Briefcase },
  "summer-programs":{ bg: "#FFEDD5", color: "#C2410C", Icon: Sun },
  grants:           { bg: "#FCE7F3", color: "#BE185D", Icon: Banknote },
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

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function OppCard({ o }: { o: Opportunity }) {
  return (
    <article className="opp-card">
      {(() => {
        const cfg = categoryConfig[o.category];
        if (!cfg) return null;
        const { bg, color, Icon } = cfg;
        return (
          <div style={{
            height: 140,
            borderRadius: 8,
            marginBottom: "1rem",
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Icon size={36} strokeWidth={1.5} color={color} />
          </div>
        );
      })()}
      <div className="opp-top">
        <span className="cat-badge">{o.category.replace("-", " ")}</span>
        <span className="deadline-badge">{o.deadlineStatus === "open" ? "Open" : o.deadlineStatus === "est" ? "Est." : "Closed"}</span>
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

function Index() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = Route.useNavigate();
  const { category, difficulty, grade, q: search } = Route.useSearch();

  const setCategory = (v: string) => navigate({ search: (s: any) => ({ ...s, category: v }), replace: true, resetScroll: false });
  const setDifficulty = (v: string) => navigate({ search: (s: any) => ({ ...s, difficulty: v }), replace: true, resetScroll: false });
  const setGrade = (v: string) => navigate({ search: (s: any) => ({ ...s, grade: v }), replace: true, resetScroll: false });
  const setSearch = (v: string) => navigate({ search: (s: any) => ({ ...s, q: v }), replace: true, resetScroll: false });

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [search, category, difficulty, grade]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const r = opportunities
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
  }, [search, category, difficulty, grade]);

  const stats = useMemo(() => {
    const total = opportunities.length;
    const scholarships = opportunities.filter((o) => o.category === "scholarships").length;
    const competitions = opportunities.filter((o) => o.category === "competitions").length;
    return { total, scholarships, competitions, cats: categories.length };
  }, []);

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

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&display=swap" rel="stylesheet" />

      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="logo">BCInitiatives</a>
          <div className="nav-links">
            <a className="nav-link" href="#opportunities">Opportunities</a>
            <a className="nav-link" href="#categories">Categories</a>
            <a className="nav-link" href="#about">About</a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <a className="nav-link" href="#opportunities" onClick={() => setMenuOpen(false)}>Opportunities</a>
            <a className="nav-link" href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
            <a className="nav-link" href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="parallax-layer layer-sky" />
        <div className="parallax-layer layer-mountain" />
        <div className="parallax-layer layer-mist" />
        <div className="parallax-layer layer-trees" />
        <div className="hero-card">
          <div className="hero-label">Canadian Student Opportunities · Est. 2026</div>
          <h1 className="hero-h1">
            <span className="line1">Every Opportunity.</span>
            <span className="line2">One Place.</span>
          </h1>
          <p className="hero-sub">
            Curated Canadian scholarships, volunteering, competitions, internships, summer programs, and grants for high school and CEGEP students.
          </p>
          <div className="hero-stats">
            {pad(stats.total)} Opportunities · {pad(stats.scholarships)} Scholarships · {pad(stats.competitions)} Competitions · {pad(stats.cats)} Categories
          </div>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#opportunities">Browse opportunities</a>
            <a className="btn btn-outline" href="#categories">View categories</a>
          </div>
        </div>
        <div className="hero-edge" />
      </header>

      <main className="container">
        <section className="section" id="categories">
          <Reveal>
            <div className="section-title"><span className="num">01</span>Browse by category</div>
            <div className="cat-grid">
              {categories.map((c) => {
                const count = opportunities.filter((o) => o.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    className="cat-card"
                    onClick={() => {
                      setCategory(c.id);
                      document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" });
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
              <div className="section-title"><span className="num">02</span>Closing soon</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
                {closingSoon.map((o) => {
                  const deadline = new Date(o.deadlineSort);
                  const daysUntil = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const cfg = categoryConfig[o.category];
                  return (
                    <Link
                      key={o.id}
                      to="/opportunities/$id"
                      params={{ id: String(o.id) }}
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 4, padding: "1.25rem", textDecoration: "none", display: "block", transition: "box-shadow 150ms, transform 150ms" }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "4px 4px 0 var(--accent-orange)"; e.currentTarget.style.transform = "translate(-2px,-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: cfg?.color ?? "var(--text-muted)" }}>
                          {o.category.replace("-", " ")}
                        </span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#DC2626", background: "#FEE2E2", padding: "2px 8px", borderRadius: 2 }}>
                          {daysUntil === 0 ? "Today" : `${daysUntil}d left`}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "0.5rem" }}>{o.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>{o.amount}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--accent-blue)", fontWeight: 700 }}>View details →</div>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          </section>
        )}

        <section className="section" id="opportunities">
          <Reveal>
            <div className="section-title"><span className="num">03</span>All opportunities</div>


            <div className="search-row">
              <input
                className="search-input"
                placeholder="Search by name, eligibility, or keyword…"
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

            {(category !== "all" || difficulty !== "all" || grade !== "all" || search !== "") && (
              <button
                className="clear-filters-btn"
                onClick={() => navigate({ search: { category: "all", difficulty: "all", grade: "all", q: "" }, replace: true, resetScroll: false })}
              >
                ✕ Clear all filters
              </button>
            )}



            {filtered.length === 0 ? (
              <div className="empty">No opportunities match your filters.</div>
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

        <section className="section" id="about" style={{ paddingTop: 0, marginTop: "-1.5rem" }}>
          <Reveal>
            <div className="section-title"><span className="num">04</span>About</div>
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

      <section className="footer-band">
        <div className="parallax-layer layer-sky" />
        <div className="parallax-layer layer-mountain" />
        <div className="parallax-layer layer-mist" />
        <div className="parallax-layer layer-trees" />
        <div className="footer-cta-card" style={{ position: "relative", zIndex: 2 }}>
          <h3>Don't miss an opportunity.</h3>
          <a className="btn btn-primary" href="#opportunities">Browse all opportunities</a>
        </div>
      </section>

      <footer className="foot">
        © 2026 BCInitiatives. Curated for Canadian students.
      </footer>
    </>
  );
}
