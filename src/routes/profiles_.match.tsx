import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Atom,
  Brain,
  Briefcase,
  Check,
  Code,
  Dna,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Landmark,
  Languages,
  Leaf,
  Megaphone,
  Newspaper,
  Palette,
  Rocket,
  Scale,
  ScrollText,
  Sigma,
  Smartphone,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  buildOptions,
  emptyAnswers,
  fieldOptions,
  findMatch,
  liveCounts,
  userThemes,
  type BuildId,
  type QuizAnswers,
} from "@/lib/match";
import { themeLabels } from "@/lib/profiles";
import { schoolSections, schoolById } from "@/lib/schools";
import { initials, tintFor } from "@/components/PartnerDirectory";
import { CrestRow, ProfilesTopBar, SchoolCrest, ThemeChips } from "@/components/ProfilesShell";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/profiles_/match")({
  head: () => ({
    meta: [
      { title: "Find your match — Summit Seeker" },
      {
        name: "description",
        content:
          "Answer a few quick questions and we'll match you with the admitted student most like you — and a passion project to start on.",
      },
      { property: "og:title", content: "Find your match — Summit Seeker" },
      {
        property: "og:description",
        content: "A quick quiz that matches you with the admitted student most like you.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MatchQuiz,
});

const fieldIcons: Record<string, LucideIcon> = {
  "computer-science": Code,
  engineering: Wrench,
  mathematics: Sigma,
  physics: Atom,
  biology: Dna,
  "pre-med": Stethoscope,
  "environmental-science": Leaf,
  psychology: Brain,
  economics: TrendingUp,
  business: Briefcase,
  law: Scale,
  "political-science": Landmark,
  "public-policy": ScrollText,
  linguistics: Languages,
};

const buildIcons: Record<BuildId, LucideIcon> = {
  startup: Rocket,
  research: FlaskConical,
  app: Smartphone,
  healthcare: HeartPulse,
  teaching: GraduationCap,
  publication: Newspaper,
  art: Palette,
  advocacy: Megaphone,
};

const toggle = (list: string[], v: string) =>
  list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

function MatchQuiz() {
  const [step, setStep] = useState(0); // 0 fields · 1 schools · 2 build · 3 reading · 4 reveal
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const counts = useMemo(() => liveCounts(answers), [answers]);
  const result = useMemo(() => (step === 4 ? findMatch(answers) : null), [step, answers]);

  // Step 3 is a timed interstitial; cleanup keeps StrictMode's double-invoke honest.
  useEffect(() => {
    if (step !== 3) return;
    const t = setTimeout(() => setStep(4), 1600);
    return () => clearTimeout(t);
  }, [step]);

  // Move focus to each new question heading (and the reveal after auto-advance).
  const headingRef = useRef<HTMLElement | null>(null);
  const setHeading = (el: HTMLElement | null) => {
    headingRef.current = el;
  };
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const nextLabel = (empty: boolean) => (empty ? "Skip for now" : "Next");

  const pills = useMemo(() => {
    if (step !== 3) return [];
    const blue = [
      ...answers.fields.map((id) => fieldOptions.find((f) => f.id === id)?.label ?? id),
      ...answers.schools.map((id) => schoolById[id]?.short ?? id),
      ...(answers.build ? [buildOptions.find((b) => b.id === answers.build)?.label ?? ""] : []),
    ].filter(Boolean);
    const green = userThemes(answers).map((t) => themeLabels[t]);
    if (blue.length === 0 && green.length === 0)
      return [{ label: "Open to anything", green: true }];
    return [
      ...blue.map((label) => ({ label, green: false })),
      ...green.map((label) => ({ label, green: true })),
    ];
  }, [step, answers]);

  return (
    <div className="pf-scope">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <ProfilesTopBar view="match" />

      <main className="pf-q-page">
        {step < 4 && (
          <>
            <div className="pf-q-top">
              {step === 0 ? (
                <Link className="pf-q-back" to="/profiles">
                  <ArrowLeft size={14} /> All profiles
                </Link>
              ) : step < 3 ? (
                <button type="button" className="pf-q-back" onClick={() => setStep(step - 1)}>
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <span />
              )}
              <p className="pf-q-count" aria-live="polite">
                <strong className="n">{counts.profiles}</strong>{" "}
                {counts.profiles === 1 ? "profile" : "profiles"} ·{" "}
                <strong className="m">{counts.projects}</strong> passion{" "}
                {counts.projects === 1 ? "project" : "projects"} match so far
              </p>
            </div>
            <div className="pf-q-bar">
              <span style={{ width: `${((step + 1) / 5) * 100}%` }} />
            </div>
          </>
        )}

        {step === 0 && (
          <div className="pf-q-step" key="fields">
            <fieldset className="pf-q-fieldset">
              <legend className="pf-q-h" ref={setHeading} tabIndex={-1}>
                What are you into?
              </legend>
              <p className="pf-q-sub">Pick as many as you like — this is what we weight most.</p>
              <div className="pf-q-grid">
                {fieldOptions.map((f) => {
                  const Icon = fieldIcons[f.id];
                  const on = answers.fields.includes(f.id);
                  return (
                    <label key={f.id} className={`pf-q-opt ${on ? "pf-q-opt--on" : ""}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setAnswers((a) => ({ ...a, fields: toggle(a.fields, f.id) }))
                        }
                      />
                      <span className="pf-q-opt-icon">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      {f.label}
                      <span className="pf-q-opt-check" aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="pf-q-actions">
              <button type="button" className="pf-cta" onClick={() => setStep(1)}>
                {nextLabel(answers.fields.length === 0)}
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="pf-q-step" key="schools">
            <fieldset className="pf-q-fieldset">
              <legend className="pf-q-h" ref={setHeading} tabIndex={-1}>
                Any dream schools?
              </legend>
              <p className="pf-q-sub">
                Choose a few, or skip — plenty of students were still deciding too.
              </p>
              {schoolSections.map((group) => {
                if (group.schools.length === 0) return null;
                return (
                  <div key={group.label}>
                    <h3 className="pf-school-group-h">{group.label}</h3>
                    <div className="pf-q-grid pf-q-grid--rows">
                      {group.schools.map((s) => {
                        const on = answers.schools.includes(s.id);
                        return (
                          <label
                            key={s.id}
                            className={`pf-q-opt pf-q-opt--row ${on ? "pf-q-opt--on" : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() =>
                                setAnswers((a) => ({ ...a, schools: toggle(a.schools, s.id) }))
                              }
                            />
                            <SchoolCrest id={s.id} />
                            {s.name}
                            <span className="pf-q-opt-check" aria-hidden="true">
                              <Check size={12} strokeWidth={3} />
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </fieldset>
            <div className="pf-q-actions">
              <button
                type="button"
                className="pf-q-skip"
                onClick={() => {
                  setAnswers((a) => ({ ...a, schools: [] }));
                  setStep(2);
                }}
              >
                Skip if you're still exploring →
              </button>
              <button type="button" className="pf-cta" onClick={() => setStep(2)}>
                {nextLabel(answers.schools.length === 0)}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="pf-q-step" key="build">
            <fieldset className="pf-q-fieldset">
              <legend className="pf-q-h" ref={setHeading} tabIndex={-1}>
                What would you love to build?
              </legend>
              <p className="pf-q-sub">Pick the one that sounds most like you.</p>
              <div className="pf-q-grid pf-q-grid--rows">
                {buildOptions.map((b) => {
                  const Icon = buildIcons[b.id];
                  const on = answers.build === b.id;
                  return (
                    <label
                      key={b.id}
                      className={`pf-q-opt pf-q-opt--row pf-q-opt--green ${on ? "pf-q-opt--on" : ""}`}
                    >
                      <input
                        type="radio"
                        name="build"
                        checked={on}
                        onChange={() => setAnswers((a) => ({ ...a, build: b.id }))}
                      />
                      <span className="pf-q-opt-icon">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      {b.label}
                      <span className="pf-q-opt-check" aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="pf-q-actions">
              <button type="button" className="pf-q-reveal-btn" onClick={() => setStep(3)}>
                Reveal my match
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="pf-q-step" key="reading">
            <h1 className="pf-q-h" ref={setHeading} tabIndex={-1}>
              Reading your answers…
            </h1>
            <p className="pf-q-sub">Matching you with the student most like you.</p>
            <div className="pf-q-pills">
              {pills.map((pill, i) => (
                <span
                  key={pill.label}
                  className={`pf-chip ${pill.green ? "" : "pf-chip--blue"} pf-q-pill`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="pf-q-step" key="reveal">
            <h1 className="pf-q-h" ref={setHeading} tabIndex={-1}>
              {result.pct === null ? "A great place to start" : "Your match"}
            </h1>
            <p className="pf-q-sub">
              {result.pct === null
                ? "You kept it open — here's a standout profile to explore."
                : "The admitted student most like you, based on your answers."}
            </p>
            <div className="pf-q-reveal">
              <span
                className="pf-avatar"
                style={{
                  background: tintFor(result.profile.name).bg,
                  color: tintFor(result.profile.name).color,
                }}
                aria-hidden="true"
              >
                {initials(result.profile.name)}
              </span>
              <span className="pf-name" style={{ fontSize: "1.2rem" }}>
                {result.profile.name}
              </span>
              {result.pct !== null && (
                <span className="pf-q-pct">
                  <Sparkles size={12} strokeWidth={2.2} /> {result.pct}% match
                </span>
              )}
              <p className="pf-q-line">
                Like you, {result.profile.name.split(" ")[0]} leaned into {result.fieldLabel} and
                got into {schoolById[result.topSchoolId]?.name ?? "university"}.
              </p>
              <ThemeChips themes={result.profile.themes} />
              <CrestRow ids={result.profile.acceptedSchoolIds} max={8} large />
              <div className="pf-q-proj">
                <span className="pf-q-proj-label">A passion project for you</span>
                <Link
                  className="pf-q-proj-name"
                  to="/opportunities/$id"
                  params={{ id: String(result.opportunity.id) }}
                >
                  {result.opportunity.name} →
                </Link>
                <p className="pf-q-proj-desc">{result.opportunity.description}</p>
              </div>
              <Link
                className="pf-cta"
                style={{ marginTop: "0.9rem" }}
                to="/profiles/$id"
                params={{ id: result.profile.id }}
              >
                See full profile →
              </Link>
            </div>
            <div className="pf-q-actions">
              <button
                type="button"
                className="pf-q-skip"
                onClick={() => {
                  setAnswers(emptyAnswers);
                  setStep(0);
                }}
              >
                Start over
              </button>
              <Link className="pf-q-back" to="/profiles">
                Browse all profiles
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
