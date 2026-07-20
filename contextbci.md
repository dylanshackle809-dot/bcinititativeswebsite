# Summit Seeker — Context for a Claude chat

A hand-off doc so a fresh Claude chat can get oriented fast. Drawn from the codebase itself;
anything inferred (not directly stated in code) is marked **[inferred]**. Snapshot counts
(285 opportunities, ~19 partners, 14 profiles, 34 schools) are current as of **2026-07-18**
and are computed dynamically in the UI, so treat them as approximate.

> Companion file: **`opportunities-list.md`** (repo root, also untracked) — a generated list of
> every opportunity on the site with amounts, deadlines, and links. Regenerate it from
> `src/lib/opportunities.ts` rather than editing by hand.

---

## 1. What it is

**Summit Seeker** is a web directory of **Canadian student opportunities** — one place to browse
curated scholarships, volunteering, competitions, internships, summer programs, and grants for
**high school and CEGEP students** — plus a **Student Profiles** section with real admitted
students' extracurriculars, awards, and acceptances, and a quiz that matches visitors to the
admitted student most like them. Tagline: _"Every Canadian student opportunity, one place."_
Branded **"SummitSeeker by BC Initiatives"**, "Est. 2026".

It's a **content/discovery site**: no login, no accounts, no database. All opportunity, partner,
profile, and school data is hand-maintained in TypeScript files and rendered server-side. The
only stateful thing is a browser-local "saved" list.

## 2. Who's making it

- **BC Initiatives (BC Initiatives Society)** — a **student-led** org based in **Richmond, BC**. Built "by students, for students"; every listing hand-checked, updated on a rolling basis. No paywalls, no ads.
- Contact: **bcinitiativessociety@gmail.com** · Instagram **@bcinitiativessociety** · LinkedIn **bc-initiatives**.

## 3. Pages (routes)

File-based routing (TanStack Router). Live pages:

- **`/`** (`src/routes/index.tsx`) — homepage (hero, quiz-demo mockup, opportunity browser, features, about). Requires search params, so `/` redirects to `/?category=all&difficulty=all&grade=all&international=all&q=&sort=deadline`.
- **`/opportunities/$id`** (`opportunities.$id.tsx`) — detail page for a single opportunity.
- **`/profiles`** (`profiles.tsx`) — Student Profiles list with search/filters/sort; `?view=partners` swaps in the partner directory (shared top bar with a Profiles/Partners toggle).
- **`/profiles/$id`** (`profiles_.$id.tsx`) — one student's full profile.
- **`/profiles/match`** (`profiles_.match.tsx`) — the "Find your match" quiz.
- **`/partners`** (`partners.tsx`) — featured partner organizations.
- **`/privacy`** (`privacy.tsx`) — plain-language privacy policy.
- Root shell + 404/error boundaries live in `__root.tsx`.

## 4. Opportunities (the core content)

Source of truth: **`src/lib/opportunities.ts`** — a single static array (`opportunities: Opportunity[]`),
currently **285 entries** (ids 1–285).

**Six categories** (`categories` export), with current counts:
| Category | id | count |
|---|---|---|
| Scholarships | `scholarships` | 42 |
| Volunteering | `volunteering` | 47 |
| Competitions | `competitions` | 79 |
| Internships & Co-op | `internships` | 18 |
| Summer Programs | `summer-programs` | 59 |
| Grants & Funding | `grants` | 40 |

**`Opportunity` fields:** `id`, `name`, `category`, `description`, `amount` (free-form string, e.g.
"$100,000 over 4 years" / "Volunteer" / "Up to $5,000"), `deadline` (display string), `deadlineStatus`
(`"open" | "est" | "closed"`), `deadlineSort` (ISO date; `"2099-12-31"` = rolling/undated sentinel),
`eligibility`, `difficulty` (`"Easy" | "Moderate" | "Competitive"`), `international` (bool), `link`
(external apply URL), `gradeLevels[]` (`"Grades 9–10"`, `"Grades 11–12"`, `"CEGEP"`, `"University"` —
note the en-dash), `timeCommitment`, `compensated` (bool), and optional `stem?`, `isNew?`, `verified?`.

**How students browse them (homepage "All opportunities" section, `id="opportunities"`):**

- **Text search** across name / description / eligibility / category.
- **Filters** (all stored in the URL): Category, Difficulty, Grade, **Location** (All / Canada only / International), and a **Saved** toggle.
- **Sort** (URL-backed): Deadline (soonest, default), Newest added, Award amount (best-effort parse of `amount`), Difficulty.
- Results show 6 at a time with a "Show all N" toggle; a "Clear all filters" reset.

**Opportunity card badges:** category pill, deadline status (Open / Est. / Closed), a **"New"** badge
(when `isNew`), a **STEM** tag, grade-level tag chips, plus save (heart) and share buttons. The detail
page additionally shows an **International** badge and a "quick facts" panel.

**Save feature:** clicking the heart stores the opportunity id in **localStorage** (key
`bci_saved_opportunities`, via `src/hooks/useSavedOpportunities.ts`). No server, no account — saves live
only in that browser. The Saved filter chip shows the count.

## 5. Student Profiles (the second content pillar)

Source of truth: **`src/lib/profiles.ts`** — **14 real admitted students**, compiled from their own
public "stats & extracurriculars" videos. All stats are **self-reported**; profiles carry
`consent: true` and `verified: false` until hand-confirmed.

**`Profile` fields:** `id` (URL slug), `name`, `photo?` (headshot under `public/profiles/`),
`major`, `gradYear?`, `location`, `curriculum`, `stats[]` (`{label, value}`), `themes[]` (ThemeId),
`extracurriculars[]` (`{role, org, theme, description}` — first two drive the card roles line),
`awards[]`, `acceptedSchoolIds[]`, `attendingSchoolId?` (only with clear evidence),
`sourceVideoUrl`, `sourceLinks?`, `verified?`, `consent`.

- **Consent is a hard gate**: the exported `profiles` array filters `allProfiles` on `consent === true`; non-consenting entries never render anywhere.
- **Photos:** all 14 students have opt-in headshots in `public/profiles/<slug>.png` (note two shortened filenames: `marcos-peng.png` = Marcos Rico Peng, `ming-fasquelle.png` = Ming-An Cybèle Fasquelle). Rendered by `ProfileAvatar` (`src/components/ProfilesShell.tsx`): probe-before-swap, seamless initials fallback, never a broken image.
- **Themes:** 6 fixed ThemeIds in `themeLabels` (stem, leadership, service, arts, athletics, entrepreneurship). Don't extend the union casually — `match.ts` `Record` types depend on it.
- **Detail page** (`/profiles/$id`): 96px avatar hero, accepted/attending school crests, extracurriculars, awards, quick facts ("stats are self-reported"), source video link, and a correction/removal mailto.

**Filters on `/profiles`** (desktop sidebar + mobile sheet, URL-backed CSV params):
- **Schools** tab — logo-tile grid grouped into sections: **Canadian Universities**, **Ivy League**, **Top Private Schools**, **UC Schools**, **Top Public Schools** (driven by `schoolSections` in `schools.ts`).
- **Major** and **Theme** tabs — icon-card 2-col grids (same `pf-q-opt` card style as the quiz), with per-major and per-theme lucide icon maps in `profiles.tsx`. `majorOptions` is derived from actual profile majors (`slugify(p.major)`).

**Match quiz** (`/profiles/match`, scored in **`src/lib/match.ts`**): 3 steps — what you're into
(14 field options with icons), dream schools (grouped by the same sections), what you'd love to build.
Set-based scoring (pick order and display grouping don't matter); school display falls back
`a.schools match → attendingSchoolId → acceptedSchoolIds[0]`. The homepage demo uses
`findMatch({fields: ["computer-science"], build: "app"})` → currently reveals Anika Suman.

**Schools** (**`src/lib/schools.ts`**): 34 schools — 10 Canadian + 24 US. Fields: `id`, `name`,
`short` (crest fallback label), `logo` (under `public/schools/`), `country`, `usTier?`
(`ivy | top-private | uc | top-public`, required for US schools so every one lands in a section).
`schoolSections` derives the five display groups. All 34 have logo files; note **`dartmouth.jpg`**
and **`ualberta.jpg`** are JPEGs (the rest are PNGs). `SchoolCrest` falls back to the `short` label
for any missing file.

## 6. Partners (`/partners` and `/profiles?view=partners`)

Source: **`src/lib/partners.ts`** — **~19 organizations** (`partners: Partner[]`), all **youth-led /
student-run**. Roughly 7 BC/Canada and 12 International. Rendered by `src/components/PartnerDirectory.tsx`
(which also exports the `initials`/`tintFor` avatar helpers used across the site).

**`Partner` fields:** `name`, `location`, `region` (`"BC/Canada" | "International"`), `theme`,
`description`, `opportunity`, `opportunityType`, and optional socials.

## 7. Homepage layout tour (`src/routes/index.tsx`)

Top to bottom: **nav** (fixed, blurred; logo + links + Student Profiles + "Our Partners" CTA) →
**hero** (parallax pixel-art mountain backdrop with a search bar; layers = `sky/mountain/mist/trees.png`
in `public/`; **two counter-drifting mist layers** boosted via an SVG `feComponentTransfer` alpha
filter and masked to the tree line) → **animated quiz-demo mockup** (`QuizDemo`: a fake browser frame
looping a 10s cursor animation through quiz steps to a match reveal with Anika's photo) → two CTA rows
under it (row 1: green "Find your match →" pill + "Access the Student Profiles tab →" link; row 2:
blue **"Scroll down to opportunities"** pill that smooth-scrolls to `#opportunities`, instant under
reduced motion) → **stats** (285+/6/1000+) → **Browse by category** grid → **Closing soon** (top 3
within 180 days) → **All opportunities** (search + filters + sort + grid) → **Features** (3 cards) →
**About** + FAQ → **CTA band** → **footer**.

`#opportunities` has `scroll-margin-top: 84px` so the fixed nav never covers the landing — this also
applies to every `hash="opportunities"` link from other pages.

> Note: an earlier **newsletter signup** band and a **"Get Reminders"** feature card were **removed**
> (the site no longer collects emails). An earlier static "product-preview" mockup was replaced by the
> animated quiz demo. Don't re-add either unless asked.

## 8. Repository & hosting

- **GitHub:** https://github.com/dylanshackle809-dot/bcinititativeswebsite (branch **`main`**).
- **Live site:** **https://summitseeker.app** (Vercel, auto-deploys from `main`; Nitro preset). Vercel Analytics = aggregate traffic only.
  - ⚠️ **`summitseeker.ca` is a _separate parked Squarespace domain_, NOT connected to the site.** Never use `.ca` in absolute URLs (og:image, canonical, etc.) — use `summitseeker.app`.
- **Local working copy (git-connected):** `C:\Users\Dylan\OneDrive\Desktop\New folder (2)\bcinititativeswebsite-main`. Edit and push from here.
  - ⚠️ **Multiple stale copies of this project exist on disk.** Only the folder above is wired to GitHub/Vercel. Before working, run `git remote -v` (should show the URL above) and `git status`/`git fetch` to confirm you're in the live, in-sync copy — editing a stale copy means changes never ship.

## 9. Tech stack

- **Framework:** TanStack Start (full-stack React) + TanStack Router (file-based routing). Package name `tanstack_start_ts`.
- **Language/build:** TypeScript, Vite 7, Tailwind CSS v4 (but nearly all styling is vanilla CSS in `src/styles.css`). **No typecheck npm script** — use `bunx tsc --noEmit`.
- **Package manager: bun** (`bun.lock`; npm/node aren't the workflow on this machine):
  - `bun run dev` → http://localhost:8080 · `bun run build` → Vercel/Nitro output · `bun run lint` (eslint; 8 pre-existing react-refresh warnings are normal) · `bun run format` (prettier).
- **Libraries:** lucide-react (icons), sonner (toasts), @vercel/analytics, date-fns, Radix UI, react-hook-form + zod. **[inferred]** Originally scaffolded with **Lovable** (leftover `lovable-error-reporting.ts` + `@lovable.dev/vite-tanstack-config`).
- **No active backend:** content is static TS, saves are client-side. TanStack Start SSR renders pages; there is a demo `src/lib/api/example.functions.ts` server function but it's unused.

## 10. Where things live (key files)

- `src/routes/index.tsx` — homepage (hero, QuizDemo, filters, sort, `OppCard`, Features, `scrollToOpportunities`).
- `src/routes/opportunities.$id.tsx` — opportunity detail page.
- `src/routes/profiles.tsx` · `profiles_.$id.tsx` · `profiles_.match.tsx` — Profiles list/detail/quiz.
- `src/routes/partners.tsx` · `privacy.tsx` — Partners / Privacy pages.
- `src/routes/__root.tsx` — root shell, global `<head>`/SEO defaults (og:image = `summitseeker.app/og-image.png`).
- `src/lib/opportunities.ts` — **opportunity dataset + `Opportunity` type**.
- `src/lib/profiles.ts` — **student profiles dataset + `Profile` type + consent gate + `majorOptions`/`themeLabels`**.
- `src/lib/schools.ts` — **schools dataset + `schoolSections` display groups**.
- `src/lib/match.ts` — quiz options + matching/scoring.
- `src/lib/partners.ts` — partner dataset.
- `src/components/ProfilesShell.tsx` — `ProfilesTopBar`, `ProfileAvatar`, `SchoolCrest`, `CrestRow`, `ThemeChips`.
- `src/components/` — also `SiteFooter`, `ShareButton`, `LogoMark`, `Reveal`, `PartnerDirectory`, `ui/` primitives.
- `src/hooks/useSavedOpportunities.ts` — localStorage saved list.
- `src/styles.css` — nearly all site CSS (global stylesheet, `.pf-*` = profiles scope, `.qd-*` = quiz demo).
- `public/` — parallax art, favicons, `og-image.png`, **`schools/`** (34 crest logos), **`profiles/`** (14 headshots).
- `src/routeTree.gen.ts` — **auto-generated**; never hand-edit.
- **Local-only (untracked, never commit):** `contextbci.md` (this file), `profiles-source.md` (raw scraped notes on the real students), `opportunities-list.md` (generated listing).

## 11. History / provenance

- **Est. 2026**; **[inferred]** prototyped in Lovable, then carried forward as a TanStack Start app.
- Ongoing content + polish: batches of new opportunities added, real BCI social/contact links, mountain-icon favicon.
- **Mid-2026 cleanup pass:** de-Lovabled metadata; branded og-image; Privacy page; International/New fields, real filter + sort controls; removed newsletter + "Get Reminders"; Featured Partners card; equal-height feature cards.
- **Jul 2026 — Profiles era:**
  - Profiles section launched: list + detail pages, seed profiles, match quiz, school logo crests, grouped school filter.
  - Homepage: static product-preview replaced by the animated quiz-demo mockup (10s constant-speed cursor loop); filter-row alignment fix; double mist parallax + SVG alpha boost to make `mist.png` visible.
  - **Jul 18 — real data migration:** all 30 fictional profiles replaced with **14 real admitted students** from `profiles-source.md`; 20 US schools added (with logos); optional Profile fields (`gradYear?`, `attendingSchoolId?`, `sourceLinks?`) with conditional rendering.
  - School pickers sectioned (Canadian / Ivy / Top Private / UC / Top Public); Major & Theme filter tabs restyled as quiz-style icon cards.
  - Student photo avatars wired in (all 14, opt-in) with initials fallback.
  - Blue "Scroll down to opportunities" pill added under the quiz demo (own centered row).
- Deeper origin (team, funding, exact launch) **isn't in the codebase** — ask the BC Initiatives team.

## 12. Gotchas for a new chat

- **To add/edit opportunities:** edit the array in `src/lib/opportunities.ts` (match the existing shape). Partners: `src/lib/partners.ts`. Profiles: `src/lib/profiles.ts` (respect the consent gate; keep `verified: false` unless hand-confirmed). Schools: `src/lib/schools.ts` (US schools need a `usTier` or they'll miss the section groups).
- ⚠️ **OneDrive corruption:** the repo lives in a OneDrive folder, and OneDrive has silently zeroed a file before (`schools.ts` became 4,909 null bytes and briefly got pushed, breaking the build — restored from git + session records). **Before committing, check staged files aren't all null bytes** (a text file showing `0 insertions, 0 deletions` or `Bin` in `git diff --stat` is a red flag).
- **Browser testing:** Playwright does **not** work under Bun on Windows (launch/transport hangs). Verify UI with headless Edge: `msedge --headless=new --remote-debugging-port=9222` + a raw CDP websocket script (Bun's native WebSocket works). Radix tabs need `pointerdown`/`mousedown` dispatch, not just `.click()`, and only after hydration.
- **PowerShell + git:** avoid double quotes inside commit messages passed via here-strings — PS 5.1 argument marshalling splits them and the commit fails.
- **Adding a homepage search param** means updating **every** static `<Link to="/">` search object across the app (the home route requires all search params) — a recurring footgun. `/profiles` params are optional by design (`SearchSchemaInput`).
- **Absolute URLs → use `summitseeker.app`, never `summitseeker.ca`.**
- **Shipping:** commit to `main` and `git push origin main`; Vercel redeploys. Confirm with `git log origin/main --oneline -1`.
- This doc, `profiles-source.md`, and `opportunities-list.md` are intentionally **kept out of git** (untracked).
