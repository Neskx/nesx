import { serviceOptions } from "@/lib/services";
import { site } from "@/lib/site";
import { customerTypes, MAX_PHOTOS, MAX_TOTAL_BYTES, validateQuote, type QuoteErrors, type QuoteValues } from "@/lib/validation";

/**
 * Tar emot offertformuläret och skickar det som e-post via Resend (https://resend.com).
 *
 * Miljövariabler (se .env.example):
 *   RESEND_API_KEY      – API-nyckel från Resend
 *   CONTACT_TO_EMAIL    – adressen som ska ta emot förfrågningarna
 *   CONTACT_FROM_EMAIL  – avsändare på en domän som verifierats i Resend
 */

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ message: "Formuläret kunde inte läsas." }, { status: 400 });
  }

  // Dolt fält som bara robotar fyller i: svara "ok" utan att skicka något.
  if (data.get("webbplats")) return Response.json({ ok: true });

  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };

  const values: QuoteValues = {
    kundtyp: text("kundtyp"),
    namn: text("namn"),
    organisation: text("organisation"),
    telefon: text("telefon"),
    epost: text("epost"),
    postnummer: text("postnummer"),
    tjanst: text("tjanst"),
    meddelande: text("meddelande"),
    samtycke: text("samtycke") === "true",
  };

  const errors: QuoteErrors = validateQuote(values);

  const files = data.getAll("foton").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (files.length > MAX_PHOTOS) errors.foton = `Du kan bifoga högst ${MAX_PHOTOS} bilder.`;
  else if (files.some((file) => !file.type.startsWith("image/"))) errors.foton = "Endast bildfiler kan bifogas.";
  else if (totalBytes > MAX_TOTAL_BYTES) errors.foton = "Bilderna är för stora tillsammans.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors, message: "Kontrollera de markerade fälten." }, { status: 422 });
  }

  const customer = customerTypes.find((type) => type.value === values.kundtyp)?.label ?? values.kundtyp;
  const service = serviceOptions.find((option) => option.value === values.tjanst)?.label ?? values.tjanst;
  const subject = oneLine(`Offertförfrågan: ${service} – ${values.namn} (${values.postnummer})`);
  const body = [
    `Kundtyp: ${customer}`,
    `Namn: ${oneLine(values.namn)}`,
    values.organisation ? `Förening/företag: ${oneLine(values.organisation)}` : null,
    `Telefon: ${oneLine(values.telefon)}`,
    `E-post: ${oneLine(values.epost)}`,
    `Postnummer: ${oneLine(values.postnummer)}`,
    `Vad ska målas: ${service}`,
    `Bifogade foton: ${files.length}`,
    "",
    "Beskrivning:",
    values.meddelande.trim(),
    "",
    `Skickat från offertformuläret på ${site.url}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[kontakt] E-post är inte konfigurerad. Förfrågan loggas i stället:\n${subject}\n${body}`);
      return Response.json({ ok: true });
    }
    console.error("[kontakt] RESEND_API_KEY, CONTACT_TO_EMAIL eller CONTACT_FROM_EMAIL saknas.");
    return Response.json({ message: "Formuläret är tillfälligt ur funktion." }, { status: 503 });
  }

  const attachments = await Promise.all(
    files.map(async (file, index) => ({
      filename: file.name.replace(/[^\w.\- ]+/g, "_") || `foto-${index + 1}.jpg`,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })),
  );

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: oneLine(values.epost), subject, text: body, attachments }),
    });
    if (!response.ok) {
      console.error(`[kontakt] Resend svarade ${response.status}: ${await response.text()}`);
      return Response.json({ message: "Meddelandet kunde inte skickas just nu." }, { status: 502 });
    }
  } catch (error) {
    console.error("[kontakt] Kunde inte nå Resend:", error);
    return Response.json({ message: "Meddelandet kunde inte skickas just nu." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
