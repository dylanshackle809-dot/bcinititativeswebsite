import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap,
  HandHeart,
  Trophy,
  Briefcase,
  Sun,
  Banknote,
  ExternalLink,
  Calendar,
  DollarSign,
  Clock,
  BarChart2,
  ArrowLeft,
  Globe,
} from "lucide-react";
import { opportunities } from "@/lib/opportunities";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const categoryConfig: Record<
  string,
  { bg: string; color: string; Icon: React.ElementType; label: string }
> = {
  scholarships: {
    bg: "rgba(29, 78, 216, 0.08)",
    color: "#1d4ed8",
    Icon: GraduationCap,
    label: "Scholarship",
  },
  volunteering: {
    bg: "rgba(21, 128, 61, 0.09)",
    color: "#15803d",
    Icon: HandHeart,
    label: "Volunteering",
  },
  competitions: {
    bg: "rgba(180, 83, 9, 0.10)",
    color: "#b45309",
    Icon: Trophy,
    label: "Competition",
  },
  internships: {
    bg: "rgba(59, 91, 219, 0.09)",
    color: "#3451c6",
    Icon: Briefcase,
    label: "Internship",
  },
  "summer-programs": {
    bg: "rgba(234, 88, 12, 0.09)",
    color: "#c2410c",
    Icon: Sun,
    label: "Summer Program",
  },
  grants: { bg: "rgba(190, 24, 93, 0.08)", color: "#be185d", Icon: Banknote, label: "Grant" },
};

export const Route = createFileRoute("/opportunities/$id")({
  head: ({ params }) => {
    const opp = opportunities.find((o) => o.id === Number(params.id));
    return {
      meta: [
        { title: opp ? `${opp.name} — Summit Seeker` : "Opportunity — Summit Seeker" },
        {
          name: "description",
          content: opp
            ? `${opp.description} Deadline: ${opp.deadline}. Award: ${opp.amount}. Open to: ${opp.eligibility}`
            : "Canadian student opportunity on Summit Seeker.",
        },
        {
          property: "og:title",
          content: opp ? `${opp.name} — Summit Seeker` : "Opportunity — Summit Seeker",
        },
        {
          property: "og:description",
          content: opp
            ? `${opp.description} Award: ${opp.amount}. Deadline: ${opp.deadline}.`
            : "Canadian student opportunity.",
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: opp ? `${opp.name} — Summit Seeker` : "Opportunity — Summit Seeker",
        },
        {
          name: "twitter:description",
          content: opp
            ? `${opp.amount} · ${opp.deadline} · ${opp.difficulty}`
            : "Canadian student opportunity.",
        },
        {
          name: "keywords",
          content: opp
            ? `${opp.name}, ${opp.category} Canada, Canadian student ${opp.category}, ${opp.gradeLevels.join(", ")}`
            : "Canadian student opportunity",
        },
      ],
    };
  },
  component: OpportunityDetail,
});

function OpportunityDetail() {
  const { id } = Route.useParams();
  const opp = opportunities.find((o) => o.id === Number(id));

  if (!opp) {
    return (
      <main className="container" style={{ padding: "8rem 1rem 4rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", marginBottom: "1rem" }}>
          Opportunity not found.
        </h1>
        <Link
          to="/"
          search={{
            category: "all",
            difficulty: "all",
            grade: "all",
            international: "all",
            q: "",
            sort: "deadline",
          }}
          className="apply-link"
        >
          ← Back to all opportunities
        </Link>
      </main>
    );
  }

  const cfg = categoryConfig[opp.category];
  const Icon = cfg?.Icon ?? GraduationCap;

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
            <Link
              to="/"
              search={{
                category: "all",
                difficulty: "all",
                grade: "all",
                international: "all",
                q: "",
                sort: "deadline",
              }}
              className="logo"
            >
              <LogoMark size={22} />
              Summit<span>Seeker</span>
            </Link>
            <span className="logo-tag">by BC Initiatives</span>
          </span>
          <Link
            to="/"
            search={{
              category: "all",
              difficulty: "all",
              grade: "all",
              international: "all",
              q: "",
              sort: "deadline",
            }}
            className="nav-link"
          >
            ← All opportunities
          </Link>
        </div>
      </nav>

      <div
        style={{
          background: cfg?.bg ?? "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-color)",
          padding: "7.5rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link
            to="/"
            search={{
              category: "all",
              difficulty: "all",
              grade: "all",
              international: "all",
              q: "",
              sort: "deadline",
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: cfg?.color ?? "#555",
              fontSize: "0.8rem",
              fontWeight: 600,
              textDecoration: "none",
              marginBottom: "1.5rem",
              opacity: 0.8,
            }}
          >
            <ArrowLeft size={13} /> Back to all opportunities
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: cfg?.bg ?? "var(--bg-card)",
                color: cfg?.color ?? "var(--text-secondary)",
                border: `1px solid ${cfg?.color ?? "#666"}44`,
                borderRadius: 999,
                padding: "3px 12px",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <Icon size={11} strokeWidth={2} />
              {cfg?.label ?? opp.category}
            </span>
            {opp.stem && (
              <span
                style={{
                  background: "rgba(3, 105, 161, 0.09)",
                  color: "#0369a1",
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                STEM
              </span>
            )}
            {opp.international && (
              <span
                style={{
                  background: "var(--accent-soft)",
                  color: "#3451c6",
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <Globe size={10} strokeWidth={2} />
                International
              </span>
            )}
            <span
              style={{
                background:
                  opp.deadlineStatus === "open"
                    ? "rgba(21, 128, 61, 0.10)"
                    : "rgba(180, 83, 9, 0.10)",
                color: opp.deadlineStatus === "open" ? "#15803d" : "#b45309",
                borderRadius: 999,
                padding: "3px 12px",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {opp.deadlineStatus === "open"
                ? "Open now"
                : opp.deadlineStatus === "est"
                  ? "Est. deadline"
                  : "Closed"}
            </span>
            {opp.isNew && (
              <span
                style={{
                  background: "var(--accent-soft)",
                  color: "#3451c6",
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                New
              </span>
            )}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 1rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 700,
            }}
          >
            {opp.name}
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              margin: "0 0 2rem",
              maxWidth: 620,
            }}
          >
            {opp.description}
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Award", value: opp.amount },
              { label: "Deadline", value: opp.deadline },
              { label: "Commitment", value: opp.timeCommitment },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: cfg?.color ?? "var(--text-muted)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="detail-body">
        {/* Left column */}
        <div>
          {/* Who can apply */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                margin: "0 0 0.75rem",
              }}
            >
              Who can apply
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-primary)",
                lineHeight: 1.75,
                margin: 0,
                padding: "1.25rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: 4,
                borderLeft: `3px solid ${cfg?.color ?? "var(--accent-blue)"}`,
              }}
            >
              {opp.eligibility}
            </p>
          </div>

          {/* Grade levels */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                margin: "0 0 0.75rem",
              }}
            >
              Grade levels
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {opp.gradeLevels.map((g) => (
                <span
                  key={g}
                  style={{
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-card)",
                    color: "var(--text-secondary)",
                    borderRadius: 999,
                    fontSize: "0.85rem",
                    padding: "0.4rem 1rem",
                    fontWeight: 500,
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                margin: "0 0 0.75rem",
              }}
            >
              Details
            </h2>
            <div className="detail-inner-grid">
              {[
                { label: "Deadline", value: opp.deadline, Icon: Calendar },
                { label: "Award / Value", value: opp.amount, Icon: DollarSign },
                { label: "Difficulty", value: opp.difficulty, Icon: BarChart2 },
                { label: "Time Commitment", value: opp.timeCommitment, Icon: Clock },
              ].map(({ label, value, Icon: I }) => (
                <div
                  key={label}
                  style={{
                    padding: "1rem 1.25rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <I size={13} strokeWidth={1.8} color={cfg?.color ?? "var(--text-muted)"} />
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <div
                    style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="detail-aside">
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h2
              style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}
            >
              Ready to apply?
            </h2>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              This opportunity is hosted externally. Clicking below will take you to the official
              application page.
            </div>
            <a
              href={opp.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "var(--accent)",
                color: "#FFFFFF",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "0.95rem",
                padding: "0.85rem 1.5rem",
                textDecoration: "none",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 200ms, background 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
            >
              Apply now <ExternalLink size={14} strokeWidth={2} />
            </a>
            <Link
              to="/"
              search={{
                category: opp.category,
                difficulty: "all",
                grade: "all",
                international: "all",
                q: "",
                sort: "deadline",
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                background: "transparent",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.75rem 1.5rem",
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={14} /> More {cfg?.label ?? "opportunity"}s
            </Link>
            <ShareButton
              path={`/opportunities/${opp.id}`}
              title={opp.name}
              text={opp.description}
              variant="labeled"
            />
          </div>

          {/* Quick facts card */}
          <div
            style={{
              background: cfg?.bg ?? "var(--bg-secondary)",
              border: `1px solid ${cfg?.color ?? "var(--border-color)"}33`,
              borderRadius: 12,
              padding: "1.25rem",
            }}
          >
            <h2
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: cfg?.color ?? "var(--text-muted)",
                margin: "0 0 0.75rem",
              }}
            >
              Quick facts
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>Compensated</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: opp.compensated ? "#15803d" : "var(--text-secondary)",
                  }}
                >
                  {opp.compensated ? "Yes" : "No"}
                </span>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>International</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  {opp.international ? "Open internationally" : "Canada only"}
                </span>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>Difficulty</span>
                <span
                  style={{
                    fontWeight: 600,
                    color:
                      opp.difficulty === "Competitive"
                        ? "#b91c1c"
                        : opp.difficulty === "Moderate"
                          ? "#b45309"
                          : "#15803d",
                  }}
                >
                  {opp.difficulty}
                </span>
              </div>
              {opp.stem && (
                <div
                  style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>STEM focus</span>
                  <span style={{ fontWeight: 600, color: "#0369a1" }}>Yes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {(() => {
        const related = opportunities
          .filter((o) => o.category === opp.category && o.id !== opp.id)
          .slice(0, 3);
        if (related.length === 0) return null;
        return (
          <div style={{ borderTop: "1px solid var(--border-color)", padding: "3rem 1.5rem" }}>
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  margin: "0 0 1.5rem",
                }}
              >
                <span style={{ color: "var(--accent-bright)", marginRight: "0.5rem" }}>→</span>More{" "}
                {cfg?.label ?? "opportunity"}s
              </h2>
              <div className="related-grid">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to="/opportunities/$id"
                    params={{ id: String(r.id) }}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 12,
                      padding: "1.25rem",
                      textDecoration: "none",
                      display: "block",
                      transition: "box-shadow 250ms, transform 250ms, border-color 250ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "var(--shadow-md)";
                      e.currentTarget.style.borderColor = "var(--border-strong)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "var(--border-color)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: cfg?.color ?? "var(--text-muted)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {cfg?.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {r.amount}
                    </div>
                    <div
                      style={{ fontSize: "0.8rem", color: "var(--accent-bright)", fontWeight: 600 }}
                    >
                      View details →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      <SiteFooter />
    </>
  );
}
