export interface School {
  id: string; // slug; crest image expected at /schools/<id>.png (none exist yet — UI falls back to `short`)
  name: string;
  short: string; // crest fallback label, keep <= 5 chars
}

export const schools: School[] = [
  { id: "ubc", name: "University of British Columbia", short: "UBC" },
  { id: "sfu", name: "Simon Fraser University", short: "SFU" },
  { id: "uvic", name: "University of Victoria", short: "UV" },
  { id: "uoft", name: "University of Toronto", short: "UT" },
  { id: "mcgill", name: "McGill University", short: "McG" },
  { id: "waterloo", name: "University of Waterloo", short: "UW" },
  { id: "harvard", name: "Harvard University", short: "HU" },
  { id: "stanford", name: "Stanford University", short: "SU" },
  { id: "queens", name: "Queen's University", short: "QU" },
  { id: "mcmaster", name: "McMaster University", short: "McM" },
  { id: "western", name: "Western University", short: "UWO" },
  { id: "ualberta", name: "University of Alberta", short: "UA" },
  { id: "mit", name: "Massachusetts Institute of Technology", short: "MIT" },
  { id: "princeton", name: "Princeton University", short: "PU" },
];

export const schoolById: Record<string, School> = Object.fromEntries(schools.map((s) => [s.id, s]));

export const crestSrc = (id: string) => `/schools/${id}.png`;
