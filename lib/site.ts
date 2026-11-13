/**
 * Central företagsinformation och inställningar.
 * Allt som ägaren normalt behöver ändra finns i den här filen.
 */

export const site = {
  name: "Jocke N Måleri AB",
  shortName: "Jocke N Måleri",
  owner: "Joakim Nilsson",
  ownerFirstName: "Joakim",
  orgNr: "559189-3127",
  founded: 2019,
  activity: "Byggnadsmåleri och fastighetsservice",
  address: {
    street: "Tåbelundsvägen 26 b",
    postalCode: "241 37",
    city: "Eslöv",
    region: "Skåne län",
    country: "SE",
  },

  // TODO (ägaren): byt till webbplatsens riktiga adress, eller sätt NEXT_PUBLIC_SITE_URL i Vercel.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.se").replace(/\/$/, ""),

  // TODO (ägaren): byt till riktigt telefonnummer. `href` ska vara i internationellt format.
  phone: { display: "0700-00 00 00", href: "+46700000000" },

  // TODO (ägaren): byt till riktig e-postadress.
  email: "info@example.se",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=T%C3%A5belundsv%C3%A4gen+26+b%2C+241+37+Esl%C3%B6v",

  /**
   * Visar platshållare och anteckningar till ägaren (fotorutor med etikett,
   * exempelprojekt, tom omdömesruta). Sätt till `false` före lansering –
   * då döljs allt som inte är riktigt innehåll.
   */
  showOwnerNotes: true,

  responsePromise: "Svar inom 24 timmar",
  pricePromise: "Fast pris efter kostnadsfritt hembesök",
} as const;

/** Rubriken på startsidan, en rad per element. */
export const headline = ["Vi känner kunden", "kunden känner bäst"] as const;

export const nav = [
  { href: "/tjanster", label: "Tjänster" },
  { href: "/brf-och-fastighetsagare", label: "BRF & fastighetsägare" },
  { href: "/referenser", label: "Referenser" },
  { href: "/malarguide", label: "Målarguide" },
  { href: "/om-jocke", label: "Om Jocke" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export type TrustBadge = {
  id: string;
  label: string;
  detail: string;
  enabled: boolean;
};

export const trustBadges: TrustBadge[] = [
  { id: "f-skatt", label: "Godkänd för F-skatt", detail: "Momsregistrerat aktiebolag", enabled: true },
  // Ägaren: bekräfta att ansvarsförsäkringen är gällande innan lansering.
  { id: "forsakring", label: "Ansvarsförsäkring", detail: "Försäkrad vid alla uppdrag", enabled: true },
  { id: "rot", label: "ROT-avdrag", detail: "Dras direkt på fakturan", enabled: true },

  // VIKTIGT: Märkena nedan är AVSTÄNGDA som standard. De får ENDAST visas
  // (enabled: true) om företaget faktiskt är medlem i Måleriföretagen i Sverige
  // respektive innehar giltig MVK-auktorisation för våtrum. Att visa dem utan
  // medlemskap/auktorisation är vilseledande marknadsföring.
  { id: "maleriforetagen", label: "Medlem i Måleriföretagen i Sverige", detail: "Branschorganisation", enabled: false },
  { id: "mvk", label: "MVK-auktoriserad", detail: "Måleribranschens våtrumskontroll", enabled: false },
];

/**
 * ROT-avdragets nivåer. Kontrollera mot Skatteverket vid varje årsskifte.
 * (2026: 30 % av arbetskostnaden, högst 50 000 kr per person och år.)
 */
export const rot = {
  rate: 0.3,
  maxPerPerson: 50_000,
  year: 2026,
} as const;

export type Area = {
  id: string;
  name: string;
  /** Position i den schematiska kartan (km öster/söder om kartans hörn). */
  x: number;
  y: number;
  home?: boolean;
  text: string;
};

export const areas: Area[] = [
  {
    id: "eslov",
    name: "Eslöv",
    x: 25,
    y: 17.8,
    home: true,
    text: "Här utgår vi ifrån. Villor, radhus och lägenheter i Eslöv och byarna runt omkring – med kort resväg är det lätt att komma förbi på hembesök.",
  },
  {
    id: "lund",
    name: "Lund",
    x: 18.1,
    y: 33.3,
    text: "Målare i Lund för allt från sekelskifteslägenheter till villor. Invändig målning, tapetsering och fönsterrenovering med respekt för husets ålder.",
  },
  {
    id: "hoor",
    name: "Höör",
    x: 40,
    y: 7.8,
    text: "Fasadmålning och utvändigt underhåll av villor och fritidshus i Höör och kring Ringsjön – och invändiga jobb året om.",
  },
  {
    id: "horby",
    name: "Hörby",
    x: 47.5,
    y: 16.7,
    text: "Måleri i Hörby med omnejd: gårdar, villor och fastigheter som behöver en målare som återkommer och håller efter underhållet.",
  },
  {
    id: "kavlinge",
    name: "Kävlinge",
    x: 13.1,
    y: 23.3,
    text: "Målare i Kävlinge för villaägare och bostadsrättsföreningar. Invändigt, utvändigt och löpande underhåll.",
  },
  {
    id: "malmo",
    name: "Malmö",
    x: 6.3,
    y: 44.4,
    text: "Vi tar uppdrag i Malmö för privatpersoner, BRF:er och fastighetsägare – särskilt trapphus, fönster och underhållsmålning.",
  },
];

export const processSteps = [
  { title: "Kontakt", text: "Ring, mejla eller skicka formuläret – gärna med bilder. Du får svar inom 24 timmar." },
  { title: "Hembesök", text: "Joakim kommer ut, tittar på ytorna och går igenom önskemål och kulörer. Kostnadsfritt." },
  { title: "Fast offert", text: "Du får en skriftlig offert med fast pris och ROT-avdraget uträknat. Inga överraskningar." },
  { title: "Målning", text: "Arbetet utförs på avtalad tid. Ytor skyddas, underlaget förbereds ordentligt och det städas efter varje dag." },
  { title: "Slutbesiktning", text: "Vi går igenom resultatet tillsammans. Jobbet är klart först när du är nöjd." },
] as const;
