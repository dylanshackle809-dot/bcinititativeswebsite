import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { schoolById } from "@/lib/schools";
import { themeLabels, type ThemeId } from "@/lib/profiles";

const homeSearch = {
  category: "all",
  difficulty: "all",
  grade: "all",
  international: "all",
  q: "",
  sort: "deadline",
};

/** Top app bar for the Profiles section — distinct from the marketing nav. */
export function ProfilesTopBar({ view = "profiles" }: { view?: string }) {
  return (
    <header className="pf-topbar">
      <div className="pf-topbar-inner">
        <span className="logo-lockup">
          <Link to="/" search={homeSearch} className="logo">
            <LogoMark size={22} />
            Summit<span>Seeker</span>
          </Link>
        </span>
        <nav className="pf-toggle" aria-label="Profiles or Partners">
          {/* activeClassName suppressed — both links share the /profiles pathname,
              so the router would mark both active; `view` decides instead */}
          <Link
            className={`pf-toggle-btn ${view === "profiles" ? "active" : ""}`}
            activeProps={{}}
            to="/profiles"
            search={(s) => ({ ...s, view: "profiles" })}
            aria-current={view === "profiles" ? "page" : undefined}
          >
            Profiles
          </Link>
          <Link
            className={`pf-toggle-btn ${view === "partners" ? "active" : ""}`}
            activeProps={{}}
            to="/profiles"
            search={(s) => ({ ...s, view: "partners" })}
            aria-current={view === "partners" ? "page" : undefined}
          >
            Partners
          </Link>
        </nav>
        <div className="pf-actions">
          <Link className="pf-ghost" to="/" search={homeSearch} hash="opportunities">
            Opportunities
          </Link>
          {view !== "match" && (
            <Link className="pf-matchbtn" to="/profiles/match">
              <Sparkles size={14} strokeWidth={2.2} /> Find your match
            </Link>
          )}
          <a
            className="pf-cta"
            href={`mailto:bcinitiativessociety@gmail.com?subject=${encodeURIComponent("Share my story on Summit Seeker")}`}
          >
            Share your story
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Circular school badge. Renders the school's short label, upgrading to its
 * `logo` image only once the file is probed client-side — a school without a
 * logo (or whose file isn't in public/schools/ yet) keeps the label fallback.
 */
export function SchoolCrest({ id, large = false }: { id: string; large?: boolean }) {
  const school = schoolById[id];
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(null);
    const logo = schoolById[id]?.logo;
    if (!logo) return;
    const img = new Image();
    img.onload = () => setSrc(logo);
    img.src = logo;
  }, [id]);

  if (!school) return null;
  return (
    <span className={`pf-crest ${large ? "pf-crest--lg" : ""}`} title={school.name}>
      {src ? (
        <img src={src} alt={school.name} />
      ) : (
        <span aria-label={school.name}>{school.short}</span>
      )}
    </span>
  );
}

/** Overlapping row of school crests with a "+N" overflow bubble. */
export function CrestRow({
  ids,
  max = 4,
  large = false,
}: {
  ids: string[];
  max?: number;
  large?: boolean;
}) {
  const shown = ids.slice(0, max);
  const extra = ids.length - shown.length;
  return (
    <span className="pf-crests">
      {shown.map((id) => (
        <SchoolCrest key={id} id={id} large={large} />
      ))}
      {extra > 0 && (
        <span
          className={`pf-crest pf-crest-more ${large ? "pf-crest--lg" : ""}`}
          title={`${extra} more`}
        >
          +{extra}
        </span>
      )}
    </span>
  );
}

/** Small light-green theme pills. */
export function ThemeChips({ themes }: { themes: ThemeId[] }) {
  return (
    <span className="pf-chips">
      {themes.map((t) => (
        <span key={t} className="pf-chip">
          {themeLabels[t]}
        </span>
      ))}
    </span>
  );
}
