import { useMemo, useState } from "react";
import { Instagram, Linkedin, Facebook, Globe, MapPin } from "lucide-react";
import { partners, type Partner } from "@/lib/partners";
import { Reveal } from "@/components/Reveal";

type RegionFilter = "all" | "BC/Canada" | "International";

/* lucide-react has no TikTok glyph — small inline brand mark. */
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12v-3.2a5.8 5.8 0 0 0-.77-.05A5.79 5.79 0 1 0 15.65 15.4V9.01a7.35 7.35 0 0 0 4.35 1.41V7.3a4.28 4.28 0 0 1-3.4-1.48Z" />
    </svg>
  );
}

const ARTICLES = new Set(["the", "a", "an", "of", "and", "&"]);
function initials(name: string): string {
  const words = name.split(/\s+/).filter((w) => w && !ARTICLES.has(w.toLowerCase()));
  const pick = (words.length ? words : name.split(/\s+/)).slice(0, 2);
  return pick.map((w) => w[0]?.toUpperCase() ?? "").join("") || name.slice(0, 2).toUpperCase();
}

const AVATAR_TINTS = [
  { bg: "rgba(29, 78, 216, 0.10)", color: "#1d4ed8" },
  { bg: "rgba(21, 128, 61, 0.10)", color: "#15803d" },
  { bg: "rgba(180, 83, 9, 0.10)", color: "#b45309" },
  { bg: "rgba(59, 91, 219, 0.10)", color: "#3451c6" },
  { bg: "rgba(190, 24, 93, 0.09)", color: "#be185d" },
  { bg: "rgba(2, 105, 161, 0.09)", color: "#0369a1" },
];
function tintFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_TINTS[h % AVATAR_TINTS.length];
}

/* Build social links; empty handles are skipped by the caller. */
const igUrl = (h: string) => `https://instagram.com/${h.replace(/^@/, "")}`;
const ttUrl = (h: string) => `https://tiktok.com/@${h.replace(/^@/, "")}`;
const fbUrl = (h: string) => `https://facebook.com/${h.replace(/^@/, "")}`;
const siteUrl = (w: string) => (/^https?:\/\//.test(w) ? w : `https://${w}`);
// LinkedIn fields are org display names, not URLs — a search reliably lands right.
const liUrl = (n: string) => `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(n)}`;

function PartnerCard({ p }: { p: Partner }) {
  const tint = tintFor(p.name);
  const featured = p.region === "BC/Canada";
  return (
    <article className={`hp-card ${featured ? "hp-card--featured" : ""}`}>
      <div className="hp-head">
        <div className="hp-avatar" style={{ background: tint.bg, color: tint.color }} aria-hidden="true">
          {initials(p.name)}
        </div>
        <span className={`hp-region ${featured ? "hp-region--ca" : ""}`}>
          <MapPin size={11} strokeWidth={2} /> {p.location}
        </span>
      </div>
      <span className="hp-theme">{p.theme}</span>
      <h3 className="hp-name">{p.name}</h3>
      <p className="hp-desc">{p.description}</p>
      <div className="hp-opp">
        <span className="hp-opp-badge">{p.opportunityType}</span>
        <span className="hp-opp-text">{p.opportunity}</span>
      </div>
      <div className="hp-links">
        {p.instagram && (
          <a className="hp-social" href={igUrl(p.instagram)} target="_blank" rel="noreferrer" aria-label={`${p.name} on Instagram`}>
            <Instagram size={15} strokeWidth={1.9} />
          </a>
        )}
        {p.tiktok && (
          <a className="hp-social" href={ttUrl(p.tiktok)} target="_blank" rel="noreferrer" aria-label={`${p.name} on TikTok`}>
            <TikTokIcon size={15} />
          </a>
        )}
        {p.linkedin && (
          <a className="hp-social" href={liUrl(p.linkedin)} target="_blank" rel="noreferrer" aria-label={`${p.name} on LinkedIn`}>
            <Linkedin size={15} strokeWidth={1.9} />
          </a>
        )}
        {p.facebook && (
          <a className="hp-social" href={fbUrl(p.facebook)} target="_blank" rel="noreferrer" aria-label={`${p.name} on Facebook`}>
            <Facebook size={15} strokeWidth={1.9} />
          </a>
        )}
        {p.website && (
          <a className="hp-social hp-social--site" href={siteUrl(p.website)} target="_blank" rel="noreferrer" aria-label={`${p.name} website`}>
            <Globe size={15} strokeWidth={1.9} /> Website
          </a>
        )}
      </div>
    </article>
  );
}

export function PartnersSection() {
  const [region, setRegion] = useState<RegionFilter>("all");

  // Always feature BC/Canada first; then apply the region filter.
  const ordered = useMemo(
    () => [...partners].sort((a, b) => (a.region === "BC/Canada" ? 0 : 1) - (b.region === "BC/Canada" ? 0 : 1)),
    []
  );
  const counts = useMemo(
    () => ({
      all: partners.length,
      "BC/Canada": partners.filter((p) => p.region === "BC/Canada").length,
      International: partners.filter((p) => p.region === "International").length,
    }),
    []
  );
  const shown = region === "all" ? ordered : ordered.filter((p) => p.region === region);

  const filters: RegionFilter[] = ["all", "BC/Canada", "International"];

  return (
    <section className="section" id="partners">
      <Reveal>
        <span className="section-label"><span className="num">06</span>Partners</span>
        <h2 className="section-h2">Our Partner Organizations</h2>
        <p className="partners-intro">Student-led organizations we work with to bring you more opportunities.</p>

        <div className="chip-group" role="group" aria-label="Filter partners by region">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`chip ${region === f ? "active" : ""}`}
              onClick={() => setRegion(f)}
              aria-pressed={region === f}
            >
              {f === "all" ? "All" : f}
              <span className="chip-count">{counts[f]}</span>
            </button>
          ))}
        </div>

        <div className="hp-grid">
          {shown.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 100}>
              <PartnerCard p={p} />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
