/**
 * Applicability helper for the "Where are you?" filter: given a student's
 * location, decide which opportunities they can actually apply to based on
 * each entry's `region` codes (see RegionCode in opportunities.ts).
 */
import type { RegionCode } from "./opportunities";

export const PROVINCES: { value: string; code: RegionCode; label: string }[] = [
  { value: "bc", code: "BC", label: "British Columbia" },
  { value: "ab", code: "AB", label: "Alberta" },
  { value: "sk", code: "SK", label: "Saskatchewan" },
  { value: "mb", code: "MB", label: "Manitoba" },
  { value: "on", code: "ON", label: "Ontario" },
  { value: "qc", code: "QC", label: "Quebec" },
  { value: "nb", code: "NB", label: "New Brunswick" },
  { value: "ns", code: "NS", label: "Nova Scotia" },
  { value: "pe", code: "PE", label: "Prince Edward Island" },
  { value: "nl", code: "NL", label: "Newfoundland and Labrador" },
  { value: "yt", code: "YT", label: "Yukon" },
  { value: "nt", code: "NT", label: "Northwest Territories" },
  { value: "nu", code: "NU", label: "Nunavut" },
];

/** "all" | "outside" | a lowercase province value from PROVINCES. */
export type WhereValue = string;

const provinceByValue = new Map(PROVINCES.map((p) => [p.value, p]));

export const isWhereValue = (v: string): boolean =>
  v === "all" || v === "outside" || provinceByValue.has(v);

export const whereLabel = (where: WhereValue): string =>
  where === "all"
    ? "Anywhere / show all"
    : where === "outside"
      ? "Outside Canada / International"
      : (provinceByValue.get(where)?.label ?? "Anywhere / show all");

/**
 * Can a student in `where` apply to an opportunity with these region codes?
 * Province pick → their province + Canada-wide + Remote + International
 * (other-province-only, USA-only and Europe-only entries are hidden).
 * "outside" → Remote/International/USA/Europe (Canada-side entries hidden).
 */
export function isApplicable(region: RegionCode[], where: WhereValue): boolean {
  if (where === "all") return true;
  if (where === "outside")
    return region.some(
      (c) => c === "Remote" || c === "International" || c === "USA" || c === "Europe",
    );
  const province = provinceByValue.get(where);
  if (!province) return true;
  return region.some(
    (c) => c === province.code || c === "Canada" || c === "Remote" || c === "International",
  );
}
