import {
  createFileRoute,
  Link,
  stripSearchParams,
  type SearchSchemaInput,
} from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Heart } from "lucide-react";
import { opportunities, categories, type Opportunity } from "@/lib/opportunities";
import { categoryConfig, categoryNameById } from "@/lib/categoryDisplay";
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

const defaultSearch = {
  category: "all",
  difficulty: "all",
  grade: "all",
  international: "all",
  q: "",
  sort: "deadline",
};

export const Route = createFileRoute("/opportunities")({
  // SearchSchemaInput makes `search` optional on <Link to="/opportunities"> —
  // defaults fill in, and stripSearchParams keeps them out of the URL.
  validateSearch: (search: Record<string, unknown> & SearchSchemaInput) => ({
    category: (search.category as string) || "all",
    difficulty: (search.difficulty as string) || "all",
    grade: (search.grade as string) || "all",
    international: (search.international as string) || "all",
    q: (search.q as string) || "",
    sort: (search.sort as string) || "deadline",
  }),
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  head: () => ({
    meta: [
      { title: "All Opportunities — Summit Seeker" },
      {
        name: "description",
        content:
          "Browse every curated Canadian and international student opportunity — scholarships, volunteering, competitions, internships, summer programs, and grants. Search and filter by category, difficulty, grade level, and location.",
      },
      { property: "og:title", content: "All Opportunities — Summit Seeker" },
      {
        property: "og:description",
        content:
          "Search and filter hand-curated scholarships, competitions, internships, summer programs, volunteering, and grants for high school and CEGEP students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "All Opportunities — Summit Seeker" },
      {
        name: "twitter:description",
        content:
          "Search and filter hand-curated scholarships, competitions, internships, summer programs, volunteering, and grants for students.",
      },
    ],
  }),
  component: OpportunitiesPage,
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
      <div className="opp-top">
        <div className="opp-top-badges">
          <span
            className="opp-cat-chip"
            style={cfg ? { background: cfg.soft, color: cfg.color } : undefined}
          >
            {categoryNameById[o.category] ?? o.category.replace("-", " ")}
          </span>
          {o.isNew && <span className="opp-new-pill">New</span>}
          <span
            className={`deadline-badge deadline-${o.deadlineStatus === "open" ? "open" : o.deadlineStatus === "est" ? "est" : "closed"}`}
          >
            {o.deadlineStatus === "open" ? "Open" : o.deadlineStatus === "est" ? "Est." : "Closed"}
          </span>
        </div>
        <div className="opp-top-actions">
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
      <div className="opp-details">
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

function OpportunitiesPage() {
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
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedSet, count: savedCount } = useSavedOpportunities();

  useEffect(() => {
    setShowAll(false);
  }, [search, category, difficulty, grade, international, savedOnly]);

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
            <Link className="nav-link" to="/opportunities" aria-current="page">
              Opportunities
            </Link>
            <Link className="nav-link" to="/" hash="categories">
              Categories
            </Link>
            <Link className="nav-link" to="/" hash="features">
              Features
            </Link>
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
            <Link
              className="nav-link"
              to="/opportunities"
              aria-current="page"
              onClick={() => setMenuOpen(false)}
            >
              Opportunities
            </Link>
            <Link className="nav-link" to="/" hash="categories" onClick={() => setMenuOpen(false)}>
              Categories
            </Link>
            <Link className="nav-link" to="/" hash="features" onClick={() => setMenuOpen(false)}>
              Features
            </Link>
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

      <main className="container">
        <section className="section partners-page" id="opportunities">
          <Reveal>
            <span className="section-label section-label--accent">
              <span className="num">03</span>Explore
            </span>
            <h2 className="section-h2">All opportunities</h2>

            <div className="search-row">
              <div className="search-box">
                <span className="search-box-icon">
                  <Search size={17} strokeWidth={1.8} aria-hidden />
                </span>
                <input
                  className="search-input"
                  placeholder="Search by name, eligibility, or keyword…"
                  aria-label="Search opportunities"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
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
                  <div className="opp-toolbar">
                    <span className="opp-sort">
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
      </main>

      <SiteFooter />
    </>
  );
}
