import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, BadgeCheck, ExternalLink } from "lucide-react";
import { getProfile, themeLabels } from "@/lib/profiles";
import { schoolById } from "@/lib/schools";
import { opportunitiesForActivity } from "@/lib/opportunityLinks";
import {
  ProfilesTopBar,
  ProfileAvatar,
  SchoolCrest,
  CrestRow,
  ThemeChips,
} from "@/components/ProfilesShell";
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
    const attending = p?.attendingSchoolId ? schoolById[p.attendingSchoolId]?.name : "";
    const desc = p
      ? `${p.major}${p.gradYear ? `, Class of ${p.gradYear}` : ""} — accepted to ${accepted}${attending ? `, attending ${attending}` : ""}.`
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

  const attending = p.attendingSchoolId ? schoolById[p.attendingSchoolId] : undefined;
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
          <ProfileAvatar name={p.name} photo={p.photo} />
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
              {p.major}
              {p.gradYear ? ` · Class of ${p.gradYear}` : ""}
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
              {p.attendingSchoolId && (
                <>
                  <h2 className="pf-section-title" style={{ marginTop: "1.3rem" }}>
                    Attending
                  </h2>
                  <div className="pf-school-row">
                    <SchoolCrest id={p.attendingSchoolId} large />
                    <span className="pf-school-name">{attending?.name}</span>
                  </div>
                </>
              )}
            </section>

            {p.extracurriculars.length > 0 && (
              <section className="pf-section">
                <h2 className="pf-section-title">Extracurriculars</h2>
                {p.extracurriculars.map((e) => {
                  const related = opportunitiesForActivity(
                    `${e.role} ${e.org} ${e.description}`,
                    e.relatedOpportunityIds,
                  );
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
                {p.awards.map((a) => {
                  const awardOpps = opportunitiesForActivity(a);
                  return (
                    <div key={a} className="pf-award">
                      <div className="pf-award-line">
                        <Award size={15} strokeWidth={2} />
                        {a}
                      </div>
                      {awardOpps.length > 0 && (
                        <div className="pf-ec-links">
                          {awardOpps.map((o) => (
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
          </div>

          <aside className="pf-detail-aside">
            <section className="pf-section">
              <h2 className="pf-section-title">Quick facts</h2>
              <dl style={{ margin: 0 }}>
                {p.gradYear && (
                  <div className="pf-fact-row">
                    <dt>Grad year</dt>
                    <dd>{p.gradYear}</dd>
                  </div>
                )}
                <div className="pf-fact-row">
                  <dt>Location</dt>
                  <dd>{p.location}</dd>
                </div>
                {p.curriculum && (
                  <div className="pf-fact-row">
                    <dt>Curriculum</dt>
                    <dd>{p.curriculum}</dd>
                  </div>
                )}
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
            {p.sourceVideoUrl && (
              <section className="pf-section">
                <h2 className="pf-section-title">Source</h2>
                <a
                  className="pf-video-link"
                  href={p.sourceVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={14} strokeWidth={2} /> Watch the interview
                </a>
              </section>
            )}
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
