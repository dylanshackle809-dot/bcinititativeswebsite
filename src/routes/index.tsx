import { createFileRoute, Link } from "@tanstack/react-router";
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
  MousePointer2,
} from "lucide-react";
import { opportunities, categories, type Opportunity } from "@/lib/opportunities";
import { partners } from "@/lib/partners";
import { buildOptions, fieldOptions, findMatch } from "@/lib/match";
import { initials, tintFor } from "@/components/PartnerDirectory";
import { CrestRow } from "@/components/ProfilesShell";
import { Reveal } from "@/components/Reveal";
import { useSavedOpportunities } from "@/hooks/useSavedOpportunities";
import { toast } from "sonner";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPP_SORT_LABELS: Record<string, string> = {
  deadline: "Deadline (soonest)",
  newest: "Newest added",
  amount: "Award amount",
  difficulty: "Difficulty (easiest)",
};

const categoryConfig: Record<string, { color: string; soft: string; Icon: React.ElementType }> = {
  scholarships: { color: "#1d4ed8", soft: "rgba(29, 78, 216, 0.08)", Icon: GraduationCap },
  volunteering: { color: "#15803d", soft: "rgba(21, 128, 61, 0.09)", Icon: HandHeart },
  competitions: { color: "#b45309", soft: "rgba(180, 83, 9, 0.1)", Icon: Trophy },
  internships: { color: "#3451c6", soft: "rgba(59, 91, 219, 0.09)", Icon: Briefcase },
  "summer-programs": { color: "#c2410c", soft: "rgba(234, 88, 12, 0.09)", Icon: Sun },
  grants: { color: "#be185d", soft: "rgba(190, 24, 93, 0.08)", Icon: Banknote },
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || "all",
    difficulty: (search.difficulty as string) || "all",
    grade: (search.grade as string) || "all",
    international: (search.international as string) || "all",
    q: (search.q as string) || "",
    sort: (search.sort as string) || "deadline",
  }),
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

type DiffFilter = "all" | "Easy" | "Moderate" | "Competitive";
type GradeFilter = "all" | "Grades 9–10" | "Grades 11–12" | "CEGEP" | "University";

// ponytail: `amount` is free-form text ("$100,000 over 4 years", "Volunteer",
// "Up to $5,000"), so award sort is a best-effort parse of the first dollar
// figure — anything without a $ number sorts last. Fine for a sort option.
function parseAmount(s: string): number {
  const m = s.replace(/,/g, "").match(/\$\s*([\d.]+)/);
  return m ? Number(m[1]) : -Infinity;
}

const difficultyRank: Record<string, number> = { Easy: 0, Moderate: 1, Competitive: 2 };

function sortOpportunities(list: Opportunity[], sort: string): Opportunity[] {
  const r = [...list];
  switch (sort) {
    case "newest": // higher ids are the newer batch (the isNew entries)
      return r.sort((a, b) => b.id - a.id);
    case "amount":
      return r.sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount));
    case "difficulty": // easiest first
      return r.sort(
        (a, b) => (difficultyRank[a.difficulty] ?? 99) - (difficultyRank[b.difficulty] ?? 99),
      );
    case "deadline":
    default:
      return r.sort(
        (a, b) => new Date(a.deadlineSort).getTime() - new Date(b.deadlineSort).getTime(),
      );
  }
}

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
          {o.isNew && (
            <span
              style={{
                background: "var(--accent-soft)",
                color: "#3451c6",
                borderRadius: 999,
                padding: "2px 8px",
                fontSize: "0.62rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              New
            </span>
          )}
          <span
            className={`deadline-badge deadline-${o.deadlineStatus === "open" ? "open" : o.deadlineStatus === "est" ? "est" : "closed"}`}
          >
            {o.deadlineStatus === "open" ? "Open" : o.deadlineStatus === "est" ? "Est." : "Closed"}
          </span>
          <ShareButton path={`/opportunities/${o.id}`} title={o.name} text={o.description} />
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
            <span className="tag-chip" key={g}>
              {g}
            </span>
          ))}
          {o.stem && <span className="tag-chip">STEM</span>}
        </div>
        <Link className="apply-link" to="/opportunities/$id" params={{ id: String(o.id) }}>
          View details →
        </Link>
      </div>
    </article>
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
  const tint = tintFor(quizDemo.profile.name);
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
              <span className="pf-avatar" style={{ background: tint.bg, color: tint.color }}>
                {initials(quizDemo.profile.name)}
              </span>
              <span className="qd-name">{quizDemo.profile.name}</span>
              <span className="qd-major">
                {quizDemo.profile.major} · Class of {quizDemo.profile.gradYear}
              </span>
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
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = Route.useNavigate();
  const { category, difficulty, grade, international, q: search, sort } = Route.useSearch();

  const setCategory = (v: string) =>
    navigate({ search: (s) => ({ ...s, category: v }), replace: true, resetScroll: false });
  const setDifficulty = (v: string) =>
    navigate({ search: (s) => ({ ...s, difficulty: v }), replace: true, resetScroll: false });
  const setGrade = (v: string) =>
    navigate({ search: (s) => ({ ...s, grade: v }), replace: true, resetScroll: false });
  const setInternational = (v: string) =>
    navigate({
      search: (s) => ({ ...s, international: v }),
      replace: true,
      resetScroll: false,
    });
  const setSearch = (v: string) =>
    navigate({ search: (s) => ({ ...s, q: v }), replace: true, resetScroll: false });
  const setSort = (v: string) =>
    navigate({ search: (s) => ({ ...s, sort: v }), replace: true, resetScroll: false });

  const [showAll, setShowAll] = useState(false);
  const [heroQ, setHeroQ] = useState(search);
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedSet, count: savedCount } = useSavedOpportunities();

  useEffect(() => {
    setShowAll(false);
  }, [search, category, difficulty, grade, international, savedOnly]);

  const scrollToOpportunities = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("opportunities")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
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
        international === "all"
          ? true
          : international === "international"
            ? o.international
            : !o.international,
      )
      .filter((o) =>
        !q
          ? true
          : (o.name + " " + o.description + " " + o.eligibility + " " + o.category)
              .toLowerCase()
              .includes(q),
      );
    return sortOpportunities(r, sort);
  }, [search, category, difficulty, grade, international, savedOnly, savedSet, sort]);

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
            <a className="nav-link" href="#opportunities">
              Opportunities
            </a>
            <a className="nav-link" href="#categories">
              Categories
            </a>
            <a className="nav-link" href="#features">
              Features
            </a>
            <a className="nav-link" href="#about">
              About
            </a>
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
            <a className="nav-link" href="#opportunities" onClick={() => setMenuOpen(false)}>
              Opportunities
            </a>
            <a className="nav-link" href="#categories" onClick={() => setMenuOpen(false)}>
              Categories
            </a>
            <a className="nav-link" href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a className="nav-link" href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
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

      <section className="stats-section" aria-label="Platform stats">
        <div className="stat-grid">
          {[
            { num: `${opportunities.length}+`, label: "Opportunities" },
            { num: `${categories.length}`, label: "Categories" },
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
            <span className="section-label">
              <span className="num">01</span>Categories
            </span>
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
                    <div className="cat-icon">
                      <CatIcon id={c.id} />
                    </div>
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
              <span className="section-label">
                <span className="num">02</span>Deadlines
              </span>
              <h2 className="section-h2">Closing soon</h2>
              <div className="closing-grid">
                {closingSoon.map((o) => {
                  const deadline = new Date(o.deadlineSort);
                  const daysUntil = Math.ceil(
                    (deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                  );
                  const cfg = categoryConfig[o.category];
                  return (
                    <Link
                      key={o.id}
                      to="/opportunities/$id"
                      params={{ id: String(o.id) }}
                      className="closing-card"
                    >
                      <div className="closing-top">
                        <span
                          className="closing-cat"
                          style={{ color: cfg?.color ?? "var(--text-muted)" }}
                        >
                          {o.category.replace("-", " ")}
                        </span>
                        <span className="closing-days">
                          {daysUntil === 0 ? "Today" : `${daysUntil}d left`}
                        </span>
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
            <span className="section-label">
              <span className="num">03</span>Explore
            </span>
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
              <button
                className={`chip ${category === "all" ? "active" : ""}`}
                onClick={() => setCategory("all")}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`chip ${category === c.id ? "active" : ""}`}
                  onClick={() => setCategory(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="chip-group">
              <span className="chip-label">Difficulty</span>
              {(["all", "Easy", "Moderate", "Competitive"] as DiffFilter[]).map((d) => (
                <button
                  key={d}
                  className={`chip ${difficulty === d ? "active" : ""}`}
                  onClick={() => setDifficulty(d)}
                >
                  {d === "all" ? "All" : d}
                </button>
              ))}
            </div>

            <div className="chip-group">
              <span className="chip-label">Grade</span>
              {(["all", "Grades 9–10", "Grades 11–12", "CEGEP", "University"] as GradeFilter[]).map(
                (g) => (
                  <button
                    key={g}
                    className={`chip ${grade === g ? "active" : ""}`}
                    onClick={() => setGrade(g)}
                  >
                    {g === "all" ? "All" : g}
                  </button>
                ),
              )}
            </div>

            <div className="chip-group">
              <span className="chip-label">Location</span>
              {(
                [
                  ["all", "All"],
                  ["canada", "Canada only"],
                  ["international", "International"],
                ] as [string, string][]
              ).map(([v, label]) => (
                <button
                  key={v}
                  className={`chip ${international === v ? "active" : ""}`}
                  onClick={() => setInternational(v)}
                >
                  {label}
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

            {(category !== "all" ||
              difficulty !== "all" ||
              grade !== "all" ||
              international !== "all" ||
              search !== "" ||
              savedOnly) && (
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSavedOnly(false);
                  navigate({
                    search: {
                      category: "all",
                      difficulty: "all",
                      grade: "all",
                      international: "all",
                      q: "",
                      sort,
                    },
                    replace: true,
                    resetScroll: false,
                  });
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
                    <Heart className="inline-heart" size={14} strokeWidth={2} /> on any opportunity
                    to save it here.
                  </p>
                </div>
              ) : (
                <div className="empty">No opportunities match your filters.</div>
              )
            ) : (
              <>
                <div className="opp-grid-header">
                  <span className="opp-count">{filtered.length} results</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Sort
                      <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger className="ss-sort-trigger" aria-label="Sort opportunities">
                          <SelectValue>{OPP_SORT_LABELS[sort] ?? "Deadline (soonest)"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="ss-sort-menu" align="end">
                          <SelectItem className="ss-sort-item" value="deadline">
                            Deadline (soonest)
                          </SelectItem>
                          <SelectItem className="ss-sort-item" value="newest">
                            Newest added
                          </SelectItem>
                          <SelectItem className="ss-sort-item" value="amount">
                            Award amount
                          </SelectItem>
                          <SelectItem className="ss-sort-item" value="difficulty">
                            Difficulty (easiest)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </span>
                    {filtered.length > 6 && (
                      <button className="show-all-btn" onClick={() => setShowAll((s) => !s)}>
                        {showAll ? "Show less ↑" : `Show all ${filtered.length} →`}
                      </button>
                    )}
                  </div>
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
            <span className="section-label">
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
            <span className="section-label">
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
            <a className="btn btn-primary" href="#opportunities">
              Browse all opportunities
            </a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  );
}
