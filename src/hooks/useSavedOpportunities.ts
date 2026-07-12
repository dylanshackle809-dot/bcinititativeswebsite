import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Persistent "saved opportunities" store.
 *
 * A single module-level store backed by localStorage keeps every OppCard and
 * the saved-filter badge in sync — no context provider needed. State is shared
 * across the whole page and across browser tabs (via the `storage` event), and
 * it survives refreshes and return visits.
 */

const KEY = "bci_saved_opportunities";
const EMPTY: readonly number[] = Object.freeze([]);

// The current snapshot. Its reference only changes when the set of saved ids
// changes, which is what useSyncExternalStore requires to avoid render loops.
let saved: readonly number[] = EMPTY;
const listeners = new Set<() => void>();

function read(): readonly number[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const ids = parsed.filter((n): n is number => typeof n === "number");
    return ids.length ? ids : EMPTY;
  } catch {
    return EMPTY;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(saved));
  } catch {
    // Ignore quota / private-mode write failures — saving is a nice-to-have.
  }
}

function emit() {
  for (const l of listeners) l();
}

// Initialise from storage on the client, and stay in sync across tabs.
if (typeof window !== "undefined") {
  saved = read();
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      saved = read();
      emit();
    }
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return saved;
}

function getServerSnapshot() {
  return EMPTY;
}

/** Toggle an opportunity's saved state. Returns true if it is now saved. */
export function toggleSaved(id: number): boolean {
  const nowSaved = !saved.includes(id);
  saved = nowSaved ? [...saved, id] : saved.filter((x) => x !== id);
  persist();
  emit();
  return nowSaved;
}

export function useSavedOpportunities() {
  const savedIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);
  const isSaved = useCallback((id: number) => savedSet.has(id), [savedSet]);
  const toggle = useCallback((id: number) => toggleSaved(id), []);

  return { savedIds, savedSet, count: savedIds.length, isSaved, toggle };
}
