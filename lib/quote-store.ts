"use client";

import { useSyncExternalStore } from "react";

/**
 * Delat utkast mellan "offertstartaren" i hero och offertformuläret,
 * så att postnummer och tjänst följer med utan att ligga i URL:en.
 */
export type QuoteDraft = { postnummer: string; tjanst: string };

const EMPTY: QuoteDraft = { postnummer: "", tjanst: "" };
let draft: QuoteDraft = EMPTY;
const listeners = new Set<() => void>();

export function setQuoteDraft(patch: Partial<QuoteDraft>) {
  draft = { ...draft, ...patch };
  listeners.forEach((l) => l());
}

export function resetQuoteDraft() {
  draft = EMPTY;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useQuoteDraft() {
  return useSyncExternalStore(
    subscribe,
    () => draft,
    () => EMPTY,
  );
}
