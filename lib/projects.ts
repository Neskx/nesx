import type { PhotoId } from "./photos";

export type Category = "invandigt" | "fasad" | "fonster" | "brf";

export const categories: { id: Category; label: string }[] = [
  { id: "invandigt", label: "Invändigt" },
  { id: "fasad", label: "Fasad" },
  { id: "fonster", label: "Fönster" },
  { id: "brf", label: "BRF" },
];

export type CustomerQuote = {
  text: string;
  /** T.ex. "Familjen Andersson, Eslöv". Publicera bara med kundens godkännande. */
  name: string;
};

export type Project = {
  id: string;
  title: string;
  place: string;
  category: Category;
  summary: string;
  photo: PhotoId;
  /**
   * Kundcitat. ALDRIG påhittade citat – lämna `null` tills kunden har gett
   * ett riktigt omdöme och godkänt publicering.
   */
  quote: CustomerQuote | null;
  /** Exempelpost som bara visas när `site.showOwnerNotes` är på. Ta bort eller ersätt. */
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "exempel-1",
    title: "Exempel: Invändig målning av villa",
    place: "Ort",
    category: "invandigt",
    summary: "Beskriv uppdraget kort: vilka rum, vilket underarbete, vilka kulörer och hur lång tid det tog.",
    photo: "ref-1",
    quote: null,
    placeholder: true,
  },
  {
    id: "exempel-2",
    title: "Exempel: Fasadmålning av trävilla",
    place: "Ort",
    category: "fasad",
    summary: "Beskriv fasadens skick före, vilket färgsystem som valdes och varför.",
    photo: "ref-2",
    quote: null,
    placeholder: true,
  },
  {
    id: "exempel-3",
    title: "Exempel: Renovering av spröjsade fönster",
    place: "Ort",
    category: "fonster",
    summary: "Beskriv antal fönster, vad som gjordes (skrapning, kittning, linoljefärg) och resultatet.",
    photo: "ref-3",
    quote: null,
    placeholder: true,
  },
  {
    id: "exempel-4",
    title: "Exempel: Trapphus åt bostadsrättsförening",
    place: "Ort",
    category: "brf",
    summary: "Beskriv omfattningen, hur arbetet planerades med de boende och eventuellt underhållsavtal.",
    photo: "ref-4",
    quote: null,
    placeholder: true,
  },
];

export type BeforeAfter = {
  id: string;
  title: string;
  category: Category;
  before: PhotoId;
  after: PhotoId;
  placeholder?: boolean;
};

/** Den enda före/efter-jämförelsen som visas (startsidan och Referenser). Byt till ett riktigt jobb. */
export const beforeAfter: BeforeAfter = {
  id: "ba-1",
  title: "Exempel: Vardagsrum",
  category: "invandigt",
  before: "ba-invandig-fore",
  after: "ba-invandig-efter",
  placeholder: true,
};
