"use client";

import Link from "next/link";
import { useState } from "react";
import { reopenConsent, saveConsent, useConsent } from "@/lib/consent";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      Cookieinställningar
    </button>
  );
}

/** Icke-nödvändiga kategorier är avstängda tills besökaren själv slår på dem. */
export function CookieBanner() {
  const { ready, consent, open } = useConsent();
  const [custom, setCustom] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [embeds, setEmbeds] = useState(false);

  if (!ready || !open) return null;

  const openCustom = () => {
    setStatistics(consent?.statistics ?? false);
    setEmbeds(consent?.embeds ?? false);
    setCustom(true);
  };

  return (
    <section
      aria-label="Cookies"
      className="fixed inset-x-3 bottom-[5.5rem] z-50 mx-auto max-w-md rounded-md border border-line bg-white p-4 shadow-xl lg:p-5 lg:bottom-4 lg:left-auto lg:right-4 lg:mx-0"
    >
      <h2 className="font-sans text-base font-bold">Vi använder cookies – men bara om du vill</h2>
      <p className="mt-1.5 text-sm text-muted">
        Statistik och inbäddade omdömen laddas bara om du godkänner det. <Link href="/integritetspolicy" className="link">Läs mer om cookies</Link>
      </p>

      {custom && (
        <fieldset className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
          <legend className="sr-only">Välj cookies</legend>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 size-5 accent-brand" />
            <span>
              <strong>Nödvändiga</strong> – sparar bara ditt val här. Alltid på.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={statistics} onChange={(e) => setStatistics(e.target.checked)} className="mt-1 size-5 accent-brand" />
            <span>
              <strong>Statistik</strong> – hjälper oss se vilka sidor som används.
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={embeds} onChange={(e) => setEmbeds(e.target.checked)} className="mt-1 size-5 accent-brand" />
            <span>
              <strong>Inbäddat innehåll</strong> – visar omdömen direkt från Reco och Google.
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary min-h-11 px-3 text-sm" onClick={() => saveConsent({ statistics: false, embeds: false })}>
          Endast nödvändiga
        </button>
        {custom ? (
          <button type="button" className="btn btn-outline min-h-11 px-3 text-sm" onClick={() => saveConsent({ statistics, embeds })}>
            Spara mina val
          </button>
        ) : (
          <button type="button" className="btn btn-outline min-h-11 px-3 text-sm" onClick={openCustom}>
            Anpassa
          </button>
        )}
        <button type="button" className="btn btn-outline min-h-11 px-3 text-sm" onClick={() => saveConsent({ statistics: true, embeds: true })}>
          Godkänn alla
        </button>
      </div>
    </section>
  );
}
