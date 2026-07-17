import {
  createFileRoute,
  Link,
  stripSearchParams,
  type SearchSchemaInput,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import {
  profiles,
  majorOptions,
  themeLabels,
  slugify,
  type Profile,
  type ThemeId,
} from "@/lib/profiles";
import { schools } from "@/lib/schools";
import { initials, tintFor, PartnerDirectory } from "@/components/PartnerDirectory";
import { ProfilesTopBar, SchoolCrest, CrestRow, ThemeChips } from "@/components/ProfilesShell";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

export type ProfilesSearch = {
  schools: string; // csv of School.id, e.g. "ubc,waterloo"
  major: string; // csv of slugify(major)
  theme: string; // csv of ThemeId
  q: string;
  sort: string; // "featured" | "name" | "gradYear"
  view: string; // "profiles" | "partners"
};

export const Route = createFileRoute("/profiles")({
  // SearchSchemaInput makes `search` optional on <Link to="/profiles"> —
  // defaults fill in, unlike the home route's all-params-required schema.
  validateSearch: (search: Record<string, unknown> & SearchSchemaInput): ProfilesSearch => ({
    schools: (search.schools as string) || "",
    major: (search.major as string) || "",
    theme: (search.theme as string) || "",
    q: (search.q as string) || "",
    sort: (search.sort as string) || "featured",
    view: search.view === "partners" ? "partners" : "profiles",
  }),
  search: {
    // keep URLs clean: default-valued params never appear in the address bar
    middlewares: [
      stripSearchParams({
        schools: "",
        major: "",
        theme: "",
        q: "",
        sort: "featured",
        view: "profiles",
      }),
    ],
  },
  head: () => ({
    meta: [
      { title: "Student Profiles — Summit Seeker" },
      {
        name: "description",
        content:
          "What admitted students actually did — real extracurriculars, awards, and acceptances from Canadian high school and CEGEP students, and where they got in.",
      },
      { property: "og:title", content: "Student Profiles — Summit Seeker" },
      {
        property: "og:description",
        content:
          "Real extracurriculars, awards, and acceptances from Canadian students — and where they got in.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Student Profiles — Summit Seeker" },
      {
        name: "twitter:description",
        content:
          "Real extracurriculars, awards, and acceptances from Canadian students — and where they got in.",
      },
      {
        name: "keywords",
        content:
          "student profiles Canada, university acceptances, extracurriculars for university, UBC admits, Waterloo admits",
      },
    ],
  }),
  component: ProfilesPage,
  // Dormant today (data is static + SSR, there is no real loading moment) —
  // activates automatically if profiles ever move behind an async loader.
  // Do not "fix" this with artificial delays.
  pendingComponent: ProfilesPending,
});

/* csv helpers for multi-select params — ids are slugs, no comma risk */
const csv = (s: string) => s.split(",").filter(Boolean);
const toggleCsv = (s: string, v: string) => {
  const set = new Set(csv(s));
  if (set.has(v)) set.delete(v);
  else set.add(v);
  return [...set].join(",");
};

const rolesLine = (p: Profile) =>
  p.extracurriculars
    .slice(0, 2)
    .map((e) => `${e.role} @ ${e.org}`)
    .join(" | ");

function ProfileCard({ p, matched }: { p: Profile; matched?: boolean }) {
  const tint = tintFor(p.name);
  return (
    <Link
      to="/profiles/$id"
      params={{ id: p.id }}
      className={`pf-card ${matched ? "pf-card--match" : ""}`}
      aria-label={`${p.name}, ${p.major}`}
    >
      <span
        className="pf-avatar"
        style={{ background: tint.bg, color: tint.color }}
        aria-hidden="true"
      >
        {initials(p.name)}
      </span>
      <span className="pf-card-body">
        {matched && (
          <span className="pf-match-label">
            <Sparkles size={11} strokeWidth={2.2} /> Matched for you
          </span>
        )}
        <span className="pf-name">{p.name}</span>
        <span className="pf-major" style={{ display: "block" }}>
          {p.major} · Class of {p.gradYear}
        </span>
        {p.extracurriculars.length > 0 && (
          <span className="pf-roles" style={{ display: "block" }}>
            {rolesLine(p)}
          </span>
        )}
        <ThemeChips themes={p.themes} />
      </span>
      <CrestRow ids={p.acceptedSchoolIds} />
    </Link>
  );
}

function ProfileCardSkeleton() {
  return (
    <div className="pf-card" aria-hidden="true">
      <span
        className="pf-skel"
        style={{ width: 60, height: 60, borderRadius: "50%", flexShrink: 0 }}
      />
      <span className="pf-card-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span className="pf-skel" style={{ width: "38%", height: 15 }} />
        <span className="pf-skel" style={{ width: "26%", height: 12 }} />
        <span className="pf-skel" style={{ width: "62%", height: 12 }} />
      </span>
      <span
        className="pf-skel"
        style={{ width: 96, height: 30, borderRadius: 999, flexShrink: 0 }}
      />
    </div>
  );
}

function ProfilesPending() {
  return (
    <div className="pf-scope">
      <ProfilesTopBar />
      <main className="pf-page">
        <div className="pf-list">
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
          <ProfileCardSkeleton />
        </div>
      </main>
    </div>
  );
}

/** Tabbed checkbox filters — rendered in the desktop sidebar AND the mobile sheet. */
function FilterPanel({
  search,
  onToggle,
}: {
  search: ProfilesSearch;
  onToggle: (facet: "schools" | "major" | "theme", value: string) => void;
}) {
  return (
    <Tabs defaultValue="schools">
      <TabsList className="pf-tabs">
        <TabsTrigger className="pf-tab" value="schools">
          Schools
        </TabsTrigger>
        <TabsTrigger className="pf-tab" value="major">
          Major
        </TabsTrigger>
        <TabsTrigger className="pf-tab" value="theme">
          Theme
        </TabsTrigger>
      </TabsList>
      <TabsContent value="schools">
        <div className="pf-options">
          {schools.map((s) => (
            <label key={s.id} className="pf-option">
              <input
                type="checkbox"
                checked={csv(search.schools).includes(s.id)}
                onChange={() => onToggle("schools", s.id)}
              />
              <SchoolCrest id={s.id} />
              {s.name}
            </label>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="major">
        <div className="pf-options">
          {majorOptions.map((m) => (
            <label key={m.value} className="pf-option">
              <input
                type="checkbox"
                checked={csv(search.major).includes(m.value)}
                onChange={() => onToggle("major", m.value)}
              />
              {m.label}
            </label>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="theme">
        <div className="pf-options">
          {(Object.keys(themeLabels) as ThemeId[]).map((t) => (
            <label key={t} className="pf-option">
              <input
                type="checkbox"
                checked={csv(search.theme).includes(t)}
                onChange={() => onToggle("theme", t)}
              />
              {themeLabels[t]}
            </label>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function ProfilesPage() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const { schools: schoolsParam, major, theme, q, sort, view } = search;
  const [sheetOpen, setSheetOpen] = useState(false);

  const set = (patch: Partial<ProfilesSearch>) =>
    navigate({ search: (s) => ({ ...s, ...patch }), replace: true, resetScroll: false });
  const onToggle = (facet: "schools" | "major" | "theme", value: string) =>
    set({ [facet]: toggleCsv(search[facet], value) });
  const reset = () => set({ schools: "", major: "", theme: "", q: "" });

  const activeFacets = csv(schoolsParam).length + csv(major).length + csv(theme).length;
  const anyFilter = activeFacets > 0 || q !== "";

  const shown = useMemo(() => {
    const schoolIds = csv(schoolsParam);
    const majors = csv(major);
    const themes = csv(theme);
    const query = q.trim().toLowerCase();

    const list = profiles.filter((p) => {
      if (
        schoolIds.length &&
        !schoolIds.some((id) => p.acceptedSchoolIds.includes(id) || p.attendingSchoolId === id)
      )
        return false;
      if (majors.length && !majors.includes(slugify(p.major))) return false;
      if (themes.length && !p.themes.some((t) => themes.includes(t))) return false;
      if (query) {
        const hay = [
          p.name,
          p.major,
          ...p.extracurriculars.flatMap((e) => [e.role, e.org]),
          ...p.awards,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    switch (sort) {
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "gradYear":
        return [...list].sort((a, b) => b.gradYear - a.gradYear);
      default: // featured — verified first, then name
        return [...list].sort(
          (a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0) || a.name.localeCompare(b.name),
        );
    }
  }, [schoolsParam, major, theme, q, sort]);

  return (
    <div className="pf-scope">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <ProfilesTopBar view={view} />

      <main className="pf-page">
        {view === "partners" ? (
          <>
            <div className="pf-head">
              <h1 className="pf-h1">Partner organizations</h1>
              <p className="pf-sub">
                Student-led organizations we partner with to bring you more opportunities — across
                BC, Canada, and around the world.
              </p>
            </div>
            <PartnerDirectory />
          </>
        ) : (
          <>
            <div className="pf-head">
              <h1 className="pf-h1">Student Profiles</h1>
              <p className="pf-sub">
                What admitted students actually did — real extracurriculars, awards, and
                acceptances, and where they got in.
              </p>
              <Link className="pf-cta pf-matchcta" to="/profiles/match">
                <Sparkles size={14} strokeWidth={2.2} /> Find your match
              </Link>
            </div>

            <div className="pf-layout">
              <aside className="pf-sidebar" aria-label="Profile filters">
                <div className="pf-side-head">
                  <span className="pf-side-title">Filters</span>
                  {anyFilter && (
                    <button type="button" className="pf-reset" onClick={reset}>
                      Reset
                    </button>
                  )}
                </div>
                <FilterPanel search={search} onToggle={onToggle} />
              </aside>

              <section aria-label="Profiles">
                <div className="pf-toolbar">
                  <div className="pf-search">
                    <Search size={15} strokeWidth={2} />
                    <input
                      type="search"
                      placeholder="Search names, roles, awards…"
                      value={q}
                      onChange={(e) => set({ q: e.target.value })}
                      aria-label="Search profiles"
                    />
                  </div>
                  <select
                    className="pf-sort"
                    value={sort}
                    onChange={(e) => set({ sort: e.target.value })}
                    aria-label="Sort profiles"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name A–Z</option>
                    <option value="gradYear">Newest grads</option>
                  </select>
                  <button
                    type="button"
                    className="pf-filter-btn"
                    onClick={() => setSheetOpen(true)}
                  >
                    <SlidersHorizontal size={15} strokeWidth={2} />
                    Filters{activeFacets > 0 ? ` (${activeFacets})` : ""}
                  </button>
                </div>

                <p className="pf-count">
                  {shown.length} {shown.length === 1 ? "profile" : "profiles"}
                </p>

                {shown.length === 0 ? (
                  <div className="pf-empty">
                    <h3>No profiles match your filters</h3>
                    <p>
                      Try removing a school, major, or theme — or clear everything and start over.
                    </p>
                    <button type="button" className="pf-empty-btn" onClick={reset}>
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="pf-list">
                    {shown.map((p, i) => (
                      <Reveal key={p.id} delay={Math.min(i, 4) * 70}>
                        <ProfileCard p={p} matched={anyFilter && i === 0} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetContent side="bottom" className="pf-sheet">
                <SheetTitle className="pf-sheet-title">Filters</SheetTitle>
                <SheetDescription className="pf-sheet-desc">
                  Narrow profiles by school, major, or theme.
                </SheetDescription>
                <div className="pf-sheet-panel">
                  <FilterPanel search={search} onToggle={onToggle} />
                </div>
                <div className="pf-sheet-actions">
                  {anyFilter && (
                    <button type="button" className="pf-reset" onClick={reset}>
                      Reset
                    </button>
                  )}
                  <SheetClose className="pf-sheet-show">
                    Show {shown.length} {shown.length === 1 ? "profile" : "profiles"}
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
