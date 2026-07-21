/**
 * Cross-links a student's activities/awards to matching directory opportunities.
 *
 * Accuracy over coverage: a wrong link (sending a student to an unrelated
 * opportunity) is worse than no link. So matching is a CURATED lookup of
 * high-confidence program aliases, each resolved to the ONE opportunity of the
 * same program by a distinctive name substring. Generic words never match, and
 * program names with no corresponding opportunity (e.g. "Science Olympiad",
 * "Model UN", "Governor's Honors") are deliberately absent so they stay plain
 * text. Add a row to RULES to extend; resolution self-validates at load.
 */
import { opportunities, type Opportunity } from "./opportunities";

/** Lowercase, collapse every non-alphanumeric run to one space, pad with spaces
 *  so `includes` only matches whole tokens/phrases (" deca " ≠ "decade"). */
const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;

type Rule = { keys: string[]; nameIncludes: string };

// Each `nameIncludes` uniquely identifies one opportunity by a distinctive slice
// of its name; `keys` are the program aliases as they appear in activity/award text.
const RULES: Rule[] = [
  { keys: ["deca"], nameIncludes: "DECA (Provincial Associations)" },
  { keys: ["hosa"], nameIncludes: "HOSA Future Health Professionals" },
  { keys: ["coca cola scholars"], nameIncludes: "Coca-Cola Scholars Program" },
  { keys: ["congressional app challenge"], nameIncludes: "Congressional App Challenge" },
  { keys: ["usaco", "usa computing olympiad"], nameIncludes: "USA Computing Olympiad" },
  { keys: ["breakthrough junior challenge"], nameIncludes: "Breakthrough Junior Challenge" },
  { keys: ["john locke institute"], nameIncludes: "John Locke Institute" },
];

// Resolve each rule to a single opportunity id at load; drop ambiguous/unresolved.
const resolvedRules = RULES.flatMap((r) => {
  const hits = opportunities.filter((o) => norm(o.name).includes(norm(r.nameIncludes)));
  if (hits.length !== 1) {
    console.warn(
      `[opportunityLinks] rule "${r.nameIncludes}" matched ${hits.length} opportunities; rule skipped`,
    );
    return [];
  }
  return [{ keys: r.keys.map(norm), id: hits[0].id }];
});

/** High-confidence opportunity ids whose distinctive program name appears in `text`. */
export function matchOpportunityIds(text: string): number[] {
  const hay = norm(text);
  const ids = new Set<number>();
  for (const rule of resolvedRules) {
    if (rule.keys.some((k) => hay.includes(k))) ids.add(rule.id);
  }
  return [...ids];
}

/** Split explicit ids into those that exist in the directory and those that don't. */
export function partitionOpportunityIds(ids: number[]): { valid: number[]; invalid: number[] } {
  const valid: number[] = [];
  const invalid: number[] = [];
  for (const id of ids) {
    if (opportunities.some((o) => o.id === id)) valid.push(id);
    else invalid.push(id);
  }
  return { valid, invalid };
}

/**
 * Opportunities to link from one activity/award: explicit `relatedOpportunityIds`
 * take priority (validated); when absent, fall back to the conservative
 * name-based auto-match over `text`.
 */
export function opportunitiesForActivity(text: string, explicitIds?: number[]): Opportunity[] {
  const ids =
    explicitIds && explicitIds.length
      ? partitionOpportunityIds(explicitIds).valid
      : matchOpportunityIds(text);
  return ids
    .map((id) => opportunities.find((o) => o.id === id))
    .filter((o): o is Opportunity => o !== undefined);
}
