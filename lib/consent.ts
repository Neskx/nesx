"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookiesamtycke. Inget icke-nödvändigt laddas förrän besökaren aktivt godkänt.
 * Valet sparas i localStorage (själva valet räknas som nödvändigt).
 */
export type Consent = { statistics: boolean; embeds: boolean };

const KEY = "jnm-samtycke-v1";
const listeners = new Set<() => void>();
let reopened = false;

const emit = () => listeners.forEach((l) => l());

function read(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    // Privat läge eller blockerad lagring: valet gäller då bara tills sidan laddas om.
  }
  reopened = false;
  emit();
}

export function reopenConsent() {
  reopened = true;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Consent>;
    return { statistics: value.statistics === true, embeds: value.embeds === true };
  } catch {
    return null;
  }
}

/**
 * `ready` är false under serverrendering och hydrering, så att bannern
 * aldrig blinkar till för besökare som redan har valt.
 */
export function useConsent() {
  const raw = useSyncExternalStore(
    subscribe,
    () => `${reopened ? "1" : "0"}${read() ?? ""}`,
    () => "pending",
  );
  if (raw === "pending") return { ready: false, consent: null, open: false } as const;
  const consent = parse(raw.slice(1) || null);
  return { ready: true, consent, open: raw[0] === "1" || consent === null } as const;
}
