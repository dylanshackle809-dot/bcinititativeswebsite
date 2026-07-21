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

/* ------------------------------------------------------------------ */
/*  Deadline urgency — shared status derivation for the directory      */
/* ------------------------------------------------------------------ */

export type DeadlineUrgency = "open" | "soon" | "rolling" | "closed";

/** Days-out threshold below which a dated deadline counts as "Closing soon". */
export const CLOSING_SOON_DAYS = 30;

const URGENCY_LABELS: Record<DeadlineUrgency, string> = {
  open: "Open",
  soon: "Closing soon",
  rolling: "Rolling",
  closed: "Closed",
};

const ROLLING_SENTINEL = "2099-12-31";
const DAY_MS = 1000 * 60 * 60 * 24;

/**
 * Honest urgency for one opportunity, derived from its structured deadline
 * fields (never by parsing the freeform display string). Guarantees: `days` is
 * only set for future dates (never negative, never NaN), and an ESTIMATED
 * deadline is never marked hard-Closed — a passed estimate reads "Check site".
 */
export function deadlineUrgency(
  o: { deadline: string; deadlineStatus: "open" | "est" | "closed"; deadlineSort: string },
  now = new Date(),
): { urgency: DeadlineUrgency; days: number | null; label: string; line: string } {
  const make = (urgency: DeadlineUrgency, line: string, days: number | null = null) => ({
    urgency,
    days,
    label: URGENCY_LABELS[urgency],
    line,
  });

  if (o.deadlineStatus === "closed") return make("closed", "Closed");

  const date = parseLocalDate(o.deadlineSort);
  if (o.deadlineSort === ROLLING_SENTINEL || Number.isNaN(date.getTime())) {
    return make("rolling", "Rolling");
  }

  const days = Math.ceil((date.getTime() - now.getTime()) / DAY_MS);
  if (!Number.isFinite(days)) return make("rolling", "Rolling");

  if (days < 0) {
    // A passed date only hard-closes a CONFIRMED deadline; a passed estimate
    // just means the next cycle isn't announced yet.
    return o.deadlineStatus === "open" ? make("closed", "Closed") : make("rolling", "Check site");
  }

  if (days <= CLOSING_SOON_DAYS) {
    const when =
      days === 0 ? "Closes today" : days === 1 ? "Closes tomorrow" : `Closes in ${days} days`;
    return make("soon", o.deadlineStatus === "est" ? `${when} (est.)` : when, days);
  }

  return make("open", formatDeadline(o.deadline), days);
}
