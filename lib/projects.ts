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

export const projects: Project[] = [];

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
