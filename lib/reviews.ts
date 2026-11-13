/**
 * Omdömen från Google och Reco.
 *
 * VIKTIGT: Lägg ALDRIG in påhittade omdömen eller betyg. Allt som visas här
 * ska vara riktiga omdömen från riktiga kunder, med länk till källan.
 * Se README ("Bädda in riktiga omdömen") för steg-för-steg.
 */

export type Review = {
  author: string;
  /** 1–5 */
  rating: number;
  text: string;
  /** T.ex. "mars 2026" */
  date: string;
  source: "Google" | "Reco";
  /** Länk till omdömet hos källan. */
  url: string;
};

export type ReviewEmbed = {
  provider: "Reco" | "Google";
  /** Adressen till widgetens iframe, från Reco eller en Google-recensionstjänst. */
  src: string;
  height: number;
};

export const reviewConfig: {
  recoUrl: string | null;
  googleUrl: string | null;
  embed: ReviewEmbed | null;
  manual: Review[];
} = {
  // Länk till företagets profil på reco.se
  recoUrl: null,
  // Länk till företagets Google-profil (recensionsfliken)
  googleUrl: null,
  // Alternativ A: inbäddad widget. Laddas först när besökaren godkänt inbäddat innehåll.
  embed: null,
  // Alternativ B: riktiga omdömen inklistrade för hand, med länk till källan.
  manual: [],
};
