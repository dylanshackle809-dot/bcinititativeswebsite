import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, BadgeCheck, ExternalLink } from "lucide-react";
import { getProfile, themeLabels } from "@/lib/profiles";
import { schoolById } from "@/lib/schools";
import { opportunities } from "@/lib/opportunities";
import { initials, tintFor } from "@/components/PartnerDirectory";
import { ProfilesTopBar, SchoolCrest, CrestRow, ThemeChips } from "@/components/ProfilesShell";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/profiles_/$id")({
  head: ({ params }) => {
    // getProfile is consent-gated — non-consenting ids get the generic fallback.
    const p = getProfile(params.id);
    const accepted = p
      ? p.acceptedSchoolIds
          .map((id) => schoolById[id]?.name)
          .filter(Boolean)
          .join(", ")
      : "";
    const attending = p ? schoolById[p.attendingSchoolId]?.name : "";
    const desc = p
      ? `${p.major}, Class of ${p.gradYear} — accepted to ${accepted}, attending ${attending}.`
      : "Student profile on Summit Seeker.";
    const title = p
      ? `${p.name} — Student Profile — Summit Seeker`
      : "Student Profile — Summit Seeker";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
    };
  },
  component: ProfileDetail,
});

function ProfileDetail() {
  const { id } = Route.useParams();
  const p = getProfile(id);

  if (!p) {
    return (
      <div className="pf-scope">
        <ProfilesTopBar />
        <main className="pf-page" style={{ textAlign: "center", paddingTop: "6rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", marginBottom: "1rem" }}>
            Profile not found.
          </h1>
          <Link to="/profiles" className="pf-back" style={{ justifyContent: "center" }}>
            <ArrowLeft size={15} /> All profiles
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const tint = tintFor(p.name);
  const attending = schoolById[p.attendingSchoolId];
  const mailSubject = encodeURIComponent(`Profile correction/removal: ${p.name} (${p.id})`);

  return (
    <div className="pf-scope">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <ProfilesTopBar />

      <main className="pf-page">
        <Link to="/profiles" className="pf-back">
          <ArrowLeft size={15} /> All profiles
        </Link>

        <header className="pf-hero">
          <span
            className="pf-avatar"
            style={{ background: tint.bg, color: tint.color }}
            aria-hidden="true"
          >
            {initials(p.name)}
          </span>
          <div>
            <h1 className="pf-hero-name">
              {p.name}
              {p.verified && (
                <span className="pf-verified">
                  <BadgeCheck size={13} strokeWidth={2.2} /> Verified
                </span>
              )}
            </h1>
            <p className="pf-hero-major">
              {p.major} · Class of {p.gradYear}
            </p>
            <ThemeChips themes={p.themes} />
          </div>
        </header>

        <div className="pf-detail-grid">
          <div>
            <section className="pf-section">
              <h2 className="pf-section-title">Accepted</h2>
              <div className="pf-school-row">
                <CrestRow ids={p.acceptedSchoolIds} max={8} large />
                <span className="pf-school-name">
                  {p.acceptedSchoolIds
                    .map((sid) => schoolById[sid]?.short)
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
              <h2 className="pf-section-title" style={{ marginTop: "1.3rem" }}>
                Attending
              </h2>
              <div className="pf-school-row">
                <SchoolCrest id={p.attendingSchoolId} large />
                <span className="pf-school-name">{attending?.name}</span>
              </div>
            </section>

            {p.extracurriculars.length > 0 && (
              <section className="pf-section">
                <h2 className="pf-section-title">Extracurriculars</h2>
                {p.extracurriculars.map((e) => {
                  const related = (e.relatedOpportunityIds ?? [])
                    .map((rid) => opportunities.find((o) => o.id === rid))
                    .filter((o) => o !== undefined);
                  return (
                    <div key={`${e.role}-${e.org}`} className="pf-ec">
                      <div className="pf-ec-head">
                        <span className="pf-ec-role">
                          {e.role} @ {e.org}
                        </span>
                        <span className="pf-chip">{themeLabels[e.theme]}</span>
                      </div>
                      <p className="pf-ec-desc">{e.description}</p>
                      {related.length > 0 && (
                        <div className="pf-ec-links">
                          {related.map((o) => (
                            <Link
                              key={o.id}
                              className="pf-chip pf-chip--blue"
                              to="/opportunities/$id"
                              params={{ id: String(o.id) }}
                            >
                              {o.name} →
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            )}

            {p.awards.length > 0 && (
              <section className="pf-section">
                <h2 className="pf-section-title">Awards</h2>
                {p.awards.map((a) => (
                  <div key={a} className="pf-award">
                    <Award size={15} strokeWidth={2} />
                    {a}
                  </div>
                ))}
              </section>
            )}
          </div>

          <aside className="pf-detail-aside">
            <section className="pf-section">
              <h2 className="pf-section-title">Quick facts</h2>
              <dl style={{ margin: 0 }}>
                <div className="pf-fact-row">
                  <dt>Grad year</dt>
                  <dd>{p.gradYear}</dd>
                </div>
                <div className="pf-fact-row">
                  <dt>Location</dt>
                  <dd>{p.location}</dd>
                </div>
                <div className="pf-fact-row">
                  <dt>Curriculum</dt>
                  <dd>{p.curriculum}</dd>
                </div>
                {p.stats.map((s) => (
                  <div key={s.label} className="pf-fact-row">
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.6rem" }}>
                Stats are self-reported.
              </p>
            </section>
            <section className="pf-section">
              <h2 className="pf-section-title">Source</h2>
              <a className="pf-video-link" href={p.sourceVideoUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={14} strokeWidth={2} /> Watch the interview
              </a>
            </section>
          </aside>
        </div>

        <a
          className="pf-correction"
          href={`mailto:bcinitiativessociety@gmail.com?subject=${mailSubject}`}
        >
          Request a correction or removal
        </a>
      </main>

      <SiteFooter />
    </div>
  );
}
