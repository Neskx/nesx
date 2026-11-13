import { serviceOptions } from "./services";

/** Delas av formuläret i webbläsaren och API-routen, så att reglerna alltid är desamma. */

export const customerTypes = [
  { value: "privatperson", label: "Privatperson" },
  { value: "brf", label: "BRF" },
  { value: "fastighetsagare", label: "Fastighetsägare" },
] as const;

export const MAX_PHOTOS = 5;
/** Vercel tillåter ca 4,5 MB per anrop – bilderna förminskas i webbläsaren för att rymmas. */
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

export type QuoteValues = {
  kundtyp: string;
  namn: string;
  organisation: string;
  telefon: string;
  epost: string;
  postnummer: string;
  tjanst: string;
  meddelande: string;
  samtycke: boolean;
};

export type QuoteErrors = Partial<Record<keyof QuoteValues | "foton", string>>;

export const isPostcode = (value: string) => /^\d{3}\s?\d{2}$/.test(value.trim());

export function validateQuote(v: QuoteValues): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!customerTypes.some((t) => t.value === v.kundtyp)) errors.kundtyp = "Välj vem offerten gäller.";
  if (v.namn.trim().length < 2) errors.namn = "Fyll i ditt namn.";
  if (v.namn.length > 120) errors.namn = "Namnet är för långt.";
  if (v.organisation.length > 160) errors.organisation = "Namnet är för långt.";

  const digits = v.telefon.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) errors.telefon = "Fyll i ett telefonnummer, till exempel 070-123 45 67.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.epost.trim()) || v.epost.length > 200)
    errors.epost = "Fyll i en giltig e-postadress, till exempel namn@exempel.se.";

  if (!isPostcode(v.postnummer)) errors.postnummer = "Fyll i ett postnummer med fem siffror, till exempel 241 37.";
  if (!serviceOptions.some((o) => o.value === v.tjanst)) errors.tjanst = "Välj vad som ska målas.";

  const message = v.meddelande.trim();
  if (message.length < 10) errors.meddelande = "Beskriv kort vad du vill ha hjälp med (minst 10 tecken).";
  if (message.length > 4000) errors.meddelande = "Meddelandet är för långt (högst 4 000 tecken).";

  if (!v.samtycke) errors.samtycke = "Du behöver godkänna att vi behandlar dina uppgifter för att kunna svara.";

  return errors;
}
