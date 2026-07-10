import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, HandHeart, Trophy, Briefcase, Sun, Banknote, ExternalLink, Calendar, DollarSign, Clock, BarChart2, ArrowLeft, Globe } from "lucide-react";
import { opportunities } from "@/lib/opportunities";

const categoryConfig: Record<string, { bg: string; color: string; Icon: React.ElementType; label: string }> = {
  scholarships:      { bg: "#DBEAFE", color: "#1D4ED8", Icon: GraduationCap, label: "Scholarship" },
  volunteering:      { bg: "#DCFCE7", color: "#15803D", Icon: HandHeart, label: "Volunteering" },
  competitions:      { bg: "#FEF9C3", color: "#A16207", Icon: Trophy, label: "Competition" },
  internships:       { bg: "#EDE9FE", color: "#6D28D9", Icon: Briefcase, label: "Internship" },
  "summer-programs": { bg: "#FFEDD5", color: "#C2410C", Icon: Sun, label: "Summer Program" },
  grants:            { bg: "#FCE7F3", color: "#BE185D", Icon: Banknote, label: "Grant" },
};

export const Route = createFileRoute("/opportunities/$id")({
  head: ({ params }) => {
    const opp = opportunities.find((o) => o.id === Number(params.id));
    return {
      meta: [
        { title: opp ? `${opp.name} — BCInitiatives` : "Opportunity — BCInitiatives" },
        { name: "description", content: opp ? `${opp.description} Deadline: ${opp.deadline}. Award: ${opp.amount}. Open to: ${opp.eligibility}` : "Canadian student opportunity on BCInitiatives." },
        { property: "og:title", content: opp ? `${opp.name} — BCInitiatives` : "Opportunity — BCInitiatives" },
        { property: "og:description", content: opp ? `${opp.description} Award: ${opp.amount}. Deadline: ${opp.deadline}.` : "Canadian student opportunity." },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: opp ? `${opp.name} — BCInitiatives` : "Opportunity — BCInitiatives" },
        { name: "twitter:description", content: opp ? `${opp.amount} · ${opp.deadline} · ${opp.difficulty}` : "Canadian student opportunity." },
        { name: "keywords", content: opp ? `${opp.name}, ${opp.category} Canada, Canadian student ${opp.category}, ${opp.gradeLevels.join(", ")}` : "Canadian student opportunity" },
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
      <main className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", marginBottom: "1rem" }}>Opportunity not found.</h1>
        <Link to="/" className="apply-link">← Back to all opportunities</Link>
      </main>
    );
  }

  const cfg = categoryConfig[opp.category];
  const Icon = cfg?.Icon ?? GraduationCap;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&display=swap" rel="stylesheet" />

      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo">BCInitiatives</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">← All opportunities</Link>
          </div>
        </div>
      </nav>

      <div style={{
        background: cfg?.bg ?? "#F5F5F5",
        borderBottom: "1px solid var(--border-color)",
        padding: "4rem 1.5rem 3rem",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link to="/" search={{ category: "all", difficulty: "all", grade: "all", q: "" }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: cfg?.color ?? "#555", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", marginBottom: "1.5rem", opacity: 0.8 }}>
            <ArrowLeft size={13} /> Back to all opportunities
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: cfg?.color ?? "#999", color: "#fff",
              borderRadius: 2, padding: "3px 10px",
              fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em"
            }}>
              <Icon size={11} strokeWidth={2} />
              {cfg?.label ?? opp.category}
            </span>
            {opp.stem && (
              <span style={{ background: "#0369A1", color: "#fff", borderRadius: 2, padding: "3px 10px", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>STEM</span>
            )}
            {opp.international && (
              <span style={{ background: "#6D28D9", color: "#fff", borderRadius: 2, padding: "3px 10px", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                <Globe size={10} strokeWidth={2} />International
              </span>
            )}
            <span style={{
              background: opp.deadlineStatus === "open" ? "#15803D" : "#92400E",
              color: "#fff", borderRadius: 2, padding: "3px 10px",
              fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em"
            }}>
              {opp.deadlineStatus === "open" ? "Open now" : opp.deadlineStatus === "est" ? "Est. deadline" : "Closed"}
            </span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0D0D0D", margin: "0 0 1rem", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 700 }}>
            {opp.name}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#555555", lineHeight: 1.75, margin: "0 0 2rem", maxWidth: 620 }}>
            {opp.description}
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Award", value: opp.amount },
              { label: "Deadline", value: opp.deadline },
              { label: "Commitment", value: opp.timeCommitment },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: cfg?.color ?? "#999", marginBottom: "0.2rem" }}>{label}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0D0D0D" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2.5rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 300px", gap: "2.5rem", alignItems: "start" }}>
        {/* Left column */}
        <div>
          {/* Who can apply */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Who can apply</div>
            <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.75, margin: 0, padding: "1.25rem", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 4, borderLeft: `3px solid ${cfg?.color ?? "var(--accent-blue)"}` }}>
              {opp.eligibility}
            </p>
          </div>

          {/* Grade levels */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Grade levels</div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {opp.gradeLevels.map((g) => (
                <span key={g} style={{ border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-secondary)", borderRadius: 2, fontSize: "0.85rem", padding: "0.4rem 0.9rem", fontWeight: 500 }}>{g}</span>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Deadline", value: opp.deadline, Icon: Calendar },
                { label: "Award / Value", value: opp.amount, Icon: DollarSign },
                { label: "Difficulty", value: opp.difficulty, Icon: BarChart2 },
                { label: "Time Commitment", value: opp.timeCommitment, Icon: Clock },
              ].map(({ label, value, Icon: I }) => (
                <div key={label} style={{ padding: "1rem 1.25rem", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <I size={13} strokeWidth={1.8} color={cfg?.color ?? "var(--text-muted)"} />
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>{label}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ position: "sticky", top: "5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 4, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Ready to apply?</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              This opportunity is hosted externally. Clicking below will take you to the official application page.
            </div>
            <a href={opp.link} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "var(--accent-blue)", color: "#FFFFFF", borderRadius: 2, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 1.5rem", textDecoration: "none", transition: "box-shadow 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "3px 3px 0 #0D0D0D")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              Apply now <ExternalLink size={14} strokeWidth={2} />
            </a>
            <Link to="/" search={{ category: opp.category, difficulty: "all", grade: "all", q: "" }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", background: "transparent", border: "1.5px solid var(--border-color)", color: "var(--text-primary)", borderRadius: 2, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.85rem", padding: "0.75rem 1.5rem", textDecoration: "none" }}>
              <ArrowLeft size={14} /> More {cfg?.label ?? "opportunity"}s
            </Link>
          </div>

          {/* Quick facts card */}
          <div style={{ background: cfg?.bg ?? "var(--bg-secondary)", border: `1px solid ${cfg?.color ?? "var(--border-color)"}33`, borderRadius: 4, padding: "1.25rem" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: cfg?.color ?? "var(--text-muted)", marginBottom: "0.75rem" }}>Quick facts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Compensated</span>
                <span style={{ fontWeight: 600, color: opp.compensated ? "#15803D" : "var(--text-secondary)" }}>{opp.compensated ? "Yes" : "No"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>International</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{opp.international ? "Open internationally" : "Canada only"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Difficulty</span>
                <span style={{ fontWeight: 600, color: opp.difficulty === "Competitive" ? "#DC2626" : opp.difficulty === "Moderate" ? "#D97706" : "#15803D" }}>{opp.difficulty}</span>
              </div>
              {opp.stem && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>STEM focus</span>
                  <span style={{ fontWeight: 600, color: "#0369A1" }}>Yes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {(() => {
        const related = opportunities
          .filter((o) => o.category === opp.category && o.id !== opp.id)
          .slice(0, 3);
        if (related.length === 0) return null;
        return (
          <div style={{ borderTop: "1px solid var(--border-color)", padding: "3rem 1.5rem" }}>
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                <span style={{ color: "var(--accent-blue)", marginRight: "0.5rem" }}>→</span>More {cfg?.label ?? "opportunity"}s
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
                {related.map((r) => (
                  <Link key={r.id} to="/opportunities/$id" params={{ id: String(r.id) }}
                    style={{ background: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: 4, padding: "1.25rem", textDecoration: "none", display: "block", transition: "box-shadow 150ms, transform 150ms" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "4px 4px 0 var(--accent-blue)"; e.currentTarget.style.transform = "translate(-2px,-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#999", marginBottom: "0.5rem" }}>{cfg?.label}</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0D0D0D", lineHeight: 1.3, marginBottom: "0.5rem" }}>{r.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.75rem" }}>{r.amount}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--accent-blue)", fontWeight: 700 }}>View details →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      <footer className="foot">© 2026 BCInitiatives. Curated for Canadian students.</footer>

    </>
  );
}
