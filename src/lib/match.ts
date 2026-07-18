/**
 * "Find your match" quiz scoring — pure data + functions, no React.
 * Reads profiles/schools/opportunities; never mutates them. Deterministic:
 * same answers always produce the same match.
 * Relative imports on purpose — lets `bun -e` run the assert battery directly.
 */
import { profiles, slugify, type Profile, type ThemeId } from "./profiles";
import { opportunities, type Opportunity } from "./opportunities";

export interface FieldOption {
  id: string;
  label: string;
  majorSlugs: string[]; // matched against slugify(p.major)
  themes: ThemeId[];
}

export const fieldOptions: FieldOption[] = [
  {
    id: "computer-science",
    label: "Computer Science",
    majorSlugs: [
      "computer-science",
      "electrical-computer-engineering-computer-science",
      "electrical-engineering-and-computer-science",
    ],
    themes: ["stem"],
  },
  { id: "engineering", label: "Engineering", majorSlugs: ["engineering"], themes: ["stem"] },
  {
    id: "mathematics",
    label: "Mathematics",
    majorSlugs: ["mathematics", "mathematics-and-finance"],
    themes: ["stem"],
  },
  { id: "physics", label: "Physics", majorSlugs: ["physics"], themes: ["stem"] },
  {
    id: "biology",
    label: "Biology & Life Sciences",
    majorSlugs: ["biology", "life-sciences"],
    themes: ["stem"],
  },
  {
    id: "pre-med",
    label: "Pre-Med & Health",
    majorSlugs: ["pre-med", "pre-medicine"],
    themes: ["stem", "service"],
  },
  {
    id: "environmental-science",
    label: "Environmental Science",
    majorSlugs: ["environmental-science"],
    themes: ["stem", "service"],
  },
  { id: "psychology", label: "Psychology", majorSlugs: ["psychology"], themes: ["service"] },
  {
    id: "economics",
    label: "Economics",
    majorSlugs: ["economics"],
    themes: ["leadership", "entrepreneurship"],
  },
  {
    id: "business",
    label: "Business",
    majorSlugs: ["business"],
    themes: ["entrepreneurship", "leadership"],
  },
  { id: "law", label: "Law", majorSlugs: ["law"], themes: ["leadership"] },
  {
    id: "political-science",
    label: "Political Science",
    majorSlugs: ["political-science", "government"],
    themes: ["leadership"],
  },
  {
    id: "public-policy",
    label: "Public Policy",
    majorSlugs: ["public-policy"],
    themes: ["leadership", "service"],
  },
  {
    id: "linguistics",
    label: "Linguistics & Languages",
    majorSlugs: ["linguistics"],
    themes: ["arts"],
  },
];

export type BuildId =
  | "startup"
  | "research"
  | "app"
  | "healthcare"
  | "teaching"
  | "publication"
  | "art"
  | "advocacy";

export interface BuildOption {
  id: BuildId;
  label: string;
  themes: ThemeId[];
}

export const buildOptions: BuildOption[] = [
  { id: "startup", label: "A startup or venture", themes: ["entrepreneurship"] },
  { id: "research", label: "Original research", themes: ["stem"] },
  { id: "app", label: "An app or tech tool", themes: ["stem", "entrepreneurship"] },
  { id: "healthcare", label: "Something in healthcare", themes: ["stem", "service"] },
  { id: "teaching", label: "Teaching & mentoring", themes: ["service", "leadership"] },
  { id: "publication", label: "A publication or zine", themes: ["arts"] },
  { id: "art", label: "Art, music & film", themes: ["arts"] },
  { id: "advocacy", label: "Advocacy & policy", themes: ["leadership", "service"] },
];

export interface QuizAnswers {
  fields: string[]; // FieldOption.id[], in pick order
  schools: string[]; // School.id[], in pick order
  build: BuildId | null;
}

export const emptyAnswers: QuizAnswers = { fields: [], schools: [], build: null };

const fieldById = Object.fromEntries(fieldOptions.map((f) => [f.id, f]));
const buildById = Object.fromEntries(buildOptions.map((b) => [b.id, b]));

const chosenFields = (a: QuizAnswers) => a.fields.map((id) => fieldById[id]).filter(Boolean);
const chosenMajorSlugs = (a: QuizAnswers) => new Set(chosenFields(a).flatMap((f) => f.majorSlugs));
const chosenFieldThemes = (a: QuizAnswers) => new Set(chosenFields(a).flatMap((f) => f.themes));
const buildThemes = (a: QuizAnswers): ThemeId[] =>
  a.build ? (buildById[a.build]?.themes ?? []) : [];

/** Distinct user-implied themes: chosen fields' themes ∪ chosen build's themes. */
export function userThemes(a: QuizAnswers): ThemeId[] {
  return [...new Set([...chosenFieldThemes(a), ...buildThemes(a)])];
}

/* Weights: fields highest (major 4 + up to 2 theme), schools medium (2 each, cap 2), build light (cap 2). */
export function scoreProfile(p: Profile, a: QuizAnswers): number {
  const majorHit = chosenMajorSlugs(a).has(slugify(p.major)) ? 4 : 0;
  const fieldThemeHits = [...chosenFieldThemes(a)].filter((t) => p.themes.includes(t)).length;
  const schoolHits = a.schools.filter((s) => p.acceptedSchoolIds.includes(s)).length;
  const buildHits = buildThemes(a).filter((t) => p.themes.includes(t)).length;
  return (
    majorHit + Math.min(2, fieldThemeHits) + Math.min(2, schoolHits) * 2 + Math.min(2, buildHits)
  );
}

/** Best-achievable score given the answers — the honest normalization denominator. */
export function maxScore(a: QuizAnswers): number {
  const fieldMax = a.fields.length ? 4 + Math.min(2, chosenFieldThemes(a).size) : 0;
  const schoolMax = Math.min(2, a.schools.length) * 2;
  const buildMax = a.build ? Math.min(2, buildThemes(a).length) : 0;
  return fieldMax + schoolMax + buildMax;
}

/* Deterministic ranking: score, then verified, then breadth, then plain id compare. */
const cmp = (x: { p: Profile; s: number }, y: { p: Profile; s: number }) =>
  y.s - x.s ||
  Number(y.p.verified ?? false) - Number(x.p.verified ?? false) ||
  y.p.themes.length - x.p.themes.length ||
  (x.p.id < y.p.id ? -1 : 1);

const themeToCategory: Record<ThemeId, string> = {
  stem: "competitions",
  leadership: "scholarships",
  service: "volunteering",
  arts: "competitions",
  athletics: "summer-programs",
  entrepreneurship: "grants",
};

const relatedIds = (p: Profile) => p.extracurriculars.flatMap((e) => e.relatedOpportunityIds ?? []);

const ALL_PROJECT_IDS = new Set(profiles.flatMap(relatedIds));

function pickOpportunity(p: Profile, a: QuizAnswers): Opportunity {
  const themes = new Set(userThemes(a));
  const ecs = [
    ...p.extracurriculars.filter((e) => themes.has(e.theme)),
    ...p.extracurriculars.filter((e) => !themes.has(e.theme)),
  ];
  for (const ec of ecs) {
    for (const rid of ec.relatedOpportunityIds ?? []) {
      const o = opportunities.find((x) => x.id === rid);
      if (o) return o;
    }
  }
  // No linked opportunities on this profile — fall back by its leading theme.
  const category = themeToCategory[p.themes[0]] ?? "volunteering";
  const inCategory = opportunities.filter((o) => o.category === category);
  return inCategory.reduce((best, o) => (o.id < best.id ? o : best), inCategory[0]);
}

export interface MatchResult {
  profile: Profile;
  pct: number | null; // null ⇒ zero signal, hide the % pill
  fieldLabel: string;
  topSchoolId: string;
  opportunity: Opportunity;
}

export function findMatch(a: QuizAnswers): MatchResult {
  const ranked = profiles.map((p) => ({ p, s: scoreProfile(p, a) })).sort(cmp);
  const { p, s } = ranked[0];
  const max = maxScore(a);
  const pct = max > 0 ? Math.min(97, Math.max(40, Math.round((100 * s) / max))) : null;

  const majorSlug = slugify(p.major);
  const fields = chosenFields(a);
  const fieldLabel =
    fields.find((f) => f.majorSlugs.includes(majorSlug))?.label ??
    fields.find((f) => f.themes.some((t) => p.themes.includes(t)))?.label ??
    p.major;
  const topSchoolId =
    a.schools.find((s) => p.acceptedSchoolIds.includes(s)) ??
    p.attendingSchoolId ??
    p.acceptedSchoolIds[0];

  return { profile: p, pct, fieldLabel, topSchoolId, opportunity: pickOpportunity(p, a) };
}

/** Live header counter: N matching profiles · M reachable "passion projects". */
export function liveCounts(a: QuizAnswers): { profiles: number; projects: number } {
  const matched = maxScore(a) > 0 ? profiles.filter((p) => scoreProfile(p, a) > 0) : profiles;
  const pool = matched.length > 0 ? matched : profiles;
  const ids = new Set(pool.flatMap(relatedIds));
  return { profiles: pool.length, projects: ids.size > 0 ? ids.size : ALL_PROJECT_IDS.size };
}
