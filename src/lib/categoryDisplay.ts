import { categories } from "@/lib/opportunities";

/* Pastel category families — `soft` = 100-level chip background, `color` =
   600/700-level text; shared by the explore-card chips and the bento
   deadline dots so the two stay consistent. */
export const categoryConfig: Record<string, { color: string; soft: string }> = {
  scholarships: { color: "#4338ca", soft: "#e0e7ff" }, // indigo
  volunteering: { color: "#15803d", soft: "#dcfce7" }, // green
  competitions: { color: "#b45309", soft: "#fef3c7" }, // amber
  internships: { color: "#6d28d9", soft: "#ede9fe" }, // violet
  "summer-programs": { color: "#c2410c", soft: "#ffedd5" }, // orange
  grants: { color: "#0f766e", soft: "#ccfbf1" }, // teal
};

export const categoryNameById: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.name]),
);
