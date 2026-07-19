// "YYYY-MM-DD" through new Date() parses as UTC midnight, which renders as
// the previous day in negative-offset timezones — parse parts into a local date.
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const MONTH_RE = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)/;

/* Rewrites "Est. 2026 — Mar 1" as "Est. Mar 1, 2026" (qualifier attached to a
   normally-formatted date). Deadline strings are freeform — anything without
   the "Est. YYYY — <month…>" shape passes through untouched, and remainders
   that already carry a year ("Feb 2027") don't get the year appended twice. */
export function formatDeadline(s: string): string {
  const m = s.match(/^Est\.\s*(\d{4})\s*—\s*(.+)$/);
  if (!m) return s;
  const [, year, rest] = m;
  if (!MONTH_RE.test(rest)) return s;
  if (/\d{4}/.test(rest)) return `Est. ${rest}`;
  return `Est. ${rest}, ${year}`;
}
