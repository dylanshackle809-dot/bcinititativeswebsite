export interface School {
  id: string;
  name: string;
  short: string; // crest fallback label when no logo image exists, keep <= 3 chars
  logo?: string; // path under public/; missing files fall back to `short` seamlessly
}

export const schools: School[] = [
  { id: "ubc", name: "University of British Columbia", short: "UBC", logo: "/schools/ubc.png" },
  { id: "sfu", name: "Simon Fraser University", short: "SFU", logo: "/schools/sfu.webp" },
  { id: "uvic", name: "University of Victoria", short: "UV", logo: "/schools/uvic.png" },
  { id: "uoft", name: "University of Toronto", short: "UT", logo: "/schools/uoft.png" },
  { id: "mcgill", name: "McGill University", short: "McG", logo: "/schools/mcgill.png" },
  { id: "waterloo", name: "University of Waterloo", short: "UW", logo: "/schools/waterloo.png" },
  { id: "harvard", name: "Harvard University", short: "HU", logo: "/schools/harvard.png" },
  { id: "stanford", name: "Stanford University", short: "SU", logo: "/schools/stanford.png" },
  { id: "queens", name: "Queen's University", short: "QU", logo: "/schools/queens.png" },
  { id: "mcmaster", name: "McMaster University", short: "McM", logo: "/schools/mcmaster.png" },
  { id: "western", name: "Western University", short: "UWO", logo: "/schools/western.png" },
  { id: "ualberta", name: "University of Alberta", short: "UA", logo: "/schools/ualberta.jpg" },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    short: "MIT",
    logo: "/schools/mit.png",
  },
  { id: "princeton", name: "Princeton University", short: "PU", logo: "/schools/princeton.png" },
];

export const schoolById: Record<string, School> = Object.fromEntries(schools.map((s) => [s.id, s]));
