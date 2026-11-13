"use client";

import { saveConsent, useConsent } from "@/lib/consent";
import type { ReviewEmbed as Embed } from "@/lib/reviews";

/** Laddar omdömeswidgeten först när besökaren har godkänt inbäddat innehåll. */
export function ReviewEmbed({ embed }: { embed: Embed }) {
  const { ready, consent } = useConsent();

  if (ready && consent?.embeds) {
    return (
      <iframe
        src={embed.src}
        title={`Omdömen från ${embed.provider}`}
        height={embed.height}
        loading="lazy"
        className="w-full rounded-md border border-line bg-white"
      />
    );
  }

  return (
    <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-xl text-muted">
        Omdömena hämtas direkt från {embed.provider}. För att visa dem här behöver du godkänna inbäddat innehåll, som kan
        sätta cookies.
      </p>
      <button
        type="button"
        className="btn btn-outline shrink-0"
        onClick={() => saveConsent({ statistics: consent?.statistics ?? false, embeds: true })}
      >
        Visa omdömen från {embed.provider}
      </button>
    </div>
  );
}
