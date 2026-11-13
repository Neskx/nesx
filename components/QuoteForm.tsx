"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { resetQuoteDraft, setQuoteDraft, useQuoteDraft } from "@/lib/quote-store";
import { serviceOptions } from "@/lib/services";
import { shrinkImage } from "@/lib/shrink-image";
import { site } from "@/lib/site";
import {
  customerTypes,
  MAX_PHOTOS,
  MAX_TOTAL_BYTES,
  validateQuote,
  type QuoteErrors,
  type QuoteValues,
} from "@/lib/validation";
import { Icon } from "./Icon";

type Photo = { file: File; url: string };
type Status = "idle" | "sending" | "success" | "error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-error">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const draft = useQuoteDraft();
  const [kundtyp, setKundtyp] = useState<string>("privatperson");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [processing, setProcessing] = useState(false);

  const errorCount = Object.keys(errors).length;
  const describe = (name: keyof QuoteErrors, hint?: string) =>
    [errors[name] ? `fel-${name}` : null, hint].filter(Boolean).join(" ") || undefined;
  const invalid = (name: keyof QuoteErrors) => (errors[name] ? true : undefined);

  async function addPhotos(input: HTMLInputElement) {
    const picked = Array.from(input.files ?? []).filter((file) => file.type.startsWith("image/"));
    if (picked.length === 0) return;

    setProcessing(true);
    const room = MAX_PHOTOS - photos.length;
    const shrunk = await Promise.all(picked.slice(0, room).map((file) => shrinkImage(file)));
    const next = [...photos, ...shrunk.map((file) => ({ file, url: URL.createObjectURL(file) }))];
    const total = next.reduce((sum, photo) => sum + photo.file.size, 0);
    input.value = "";
    setProcessing(false);

    if (total > MAX_TOTAL_BYTES) {
      next.slice(photos.length).forEach((photo) => URL.revokeObjectURL(photo.url));
      setErrors((current) => ({ ...current, foton: "Bilderna blir för stora tillsammans. Välj färre eller mindre bilder." }));
      return;
    }

    setPhotos(next);
    setErrors((current) => {
      const rest = { ...current };
      delete rest.foton;
      if (picked.length > room) rest.foton = `Du kan bifoga högst ${MAX_PHOTOS} bilder. De första ${MAX_PHOTOS} är tillagda.`;
      return rest;
    });
  }

  function removePhoto(url: string) {
    URL.revokeObjectURL(url);
    setPhotos((current) => current.filter((photo) => photo.url !== url));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "");

    const values: QuoteValues = {
      kundtyp,
      namn: text("namn"),
      organisation: text("organisation"),
      telefon: text("telefon"),
      epost: text("epost"),
      postnummer: draft.postnummer,
      tjanst: draft.tjanst,
      meddelande: text("meddelande"),
      samtycke: data.get("samtycke") === "on",
    };

    const found = validateQuote(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => body.append(key, String(value)));
    body.append("webbplats", text("webbplats"));
    photos.forEach((photo) => body.append("foton", photo.file, photo.file.name));

    setStatus("sending");
    setServerMessage("");
    try {
      const response = await fetch("/api/kontakt", { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as { errors?: QuoteErrors; message?: string };

      if (response.ok) {
        photos.forEach((photo) => URL.revokeObjectURL(photo.url));
        setPhotos([]);
        resetQuoteDraft();
        setStatus("success");
        return;
      }
      if (result.errors) setErrors(result.errors);
      setServerMessage(result.message ?? "");
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        id="offert"
        tabIndex={-1}
        ref={(element) => element?.focus()}
        role="status"
        className="card scroll-mt-28 p-6 sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">
          <Icon name="check" className="size-6" />
        </span>
        <h2 className="mt-5 text-2xl sm:text-3xl">Tack – din förfrågan är skickad</h2>
        <p className="mt-3 text-muted">
          {site.ownerFirstName} hör av sig inom 24 timmar för att boka ett kostnadsfritt hembesök. Är det bråttom går det
          bra att ringa direkt på{" "}
          <a href={`tel:${site.phone.href}`} className="link">
            {site.phone.display}
          </a>
          .
        </p>
        <button type="button" className="btn btn-outline mt-6" onClick={() => setStatus("idle")}>
          Skicka en förfrågan till
        </button>
      </div>
    );
  }

  const showOrganisation = kundtyp !== "privatperson";

  return (
    <form id="offert" onSubmit={onSubmit} noValidate className="card scroll-mt-28 p-5 sm:p-8">
      {errorCount > 0 && (
        <p role="alert" className="mb-6 rounded-md border-2 border-error bg-error/5 p-4 font-semibold text-error">
          {errorCount === 1 ? "Ett fält behöver rättas" : `${errorCount} fält behöver rättas`} innan förfrågan kan skickas.
        </p>
      )}

      <p className="mb-5 text-sm text-muted">Alla fält är obligatoriska om det inte står ”valfritt”.</p>

      <fieldset aria-describedby={describe("kundtyp")}>
        <legend className="label">Offerten gäller</legend>
        <div className="grid gap-2 sm:grid-cols-[1fr_0.8fr_1.35fr]">
          {customerTypes.map((type) => (
            <label
              key={type.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-edge bg-white px-4 font-medium has-checked:border-cta has-checked:bg-brand-tint has-checked:ring-1 has-checked:ring-cta has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
            >
              <input
                type="radio"
                name="kundtyp"
                value={type.value}
                checked={kundtyp === type.value}
                onChange={() => setKundtyp(type.value)}
                className="size-5 shrink-0 accent-brand outline-none"
              />
              {type.label}
            </label>
          ))}
        </div>
        <FieldError id="fel-kundtyp" message={errors.kundtyp} />
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className={showOrganisation ? "" : "sm:col-span-2"}>
          <label htmlFor="namn" className="label">
            Namn
          </label>
          <input id="namn" name="namn" autoComplete="name" required aria-invalid={invalid("namn")} aria-describedby={describe("namn")} className="field" />
          <FieldError id="fel-namn" message={errors.namn} />
        </div>

        {showOrganisation && (
          <div>
            <label htmlFor="organisation" className="label">
              {kundtyp === "brf" ? "Förening" : "Företag / fastighet"} <span className="font-normal text-muted">(valfritt)</span>
            </label>
            <input id="organisation" name="organisation" autoComplete="organization" aria-invalid={invalid("organisation")} aria-describedby={describe("organisation")} className="field" />
            <FieldError id="fel-organisation" message={errors.organisation} />
          </div>
        )}

        <div>
          <label htmlFor="telefon" className="label">
            Telefon
          </label>
          <input id="telefon" name="telefon" type="tel" autoComplete="tel" required aria-invalid={invalid("telefon")} aria-describedby={describe("telefon")} className="field" />
          <FieldError id="fel-telefon" message={errors.telefon} />
        </div>

        <div>
          <label htmlFor="epost" className="label">
            E-post
          </label>
          <input id="epost" name="epost" type="email" autoComplete="email" required aria-invalid={invalid("epost")} aria-describedby={describe("epost")} className="field" />
          <FieldError id="fel-epost" message={errors.epost} />
        </div>

        <div>
          <label htmlFor="postnummer" className="label">
            Postnummer
          </label>
          <input
            id="postnummer"
            name="postnummer"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            required
            value={draft.postnummer}
            onChange={(e) => setQuoteDraft({ postnummer: e.target.value })}
            aria-invalid={invalid("postnummer")}
            aria-describedby={describe("postnummer")}
            className="field"
          />
          <FieldError id="fel-postnummer" message={errors.postnummer} />
        </div>

        <div>
          <label htmlFor="tjanst" className="label">
            Vad ska målas?
          </label>
          <select
            id="tjanst"
            name="tjanst"
            required
            value={draft.tjanst}
            onChange={(e) => setQuoteDraft({ tjanst: e.target.value })}
            aria-invalid={invalid("tjanst")}
            aria-describedby={describe("tjanst")}
            className="field"
          >
            <option value="">Välj …</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="fel-tjanst" message={errors.tjanst} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="meddelande" className="label">
            Beskriv jobbet
          </label>
          <textarea
            id="meddelande"
            name="meddelande"
            rows={5}
            required
            aria-invalid={invalid("meddelande")}
            aria-describedby={describe("meddelande", "tips-meddelande")}
            className="field"
          />
          <p id="tips-meddelande" className="mt-1.5 text-sm text-muted">
            Till exempel antal rum, ungefärlig yta, skick och när du vill ha det gjort.
          </p>
          <FieldError id="fel-meddelande" message={errors.meddelande} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="foton" className="label">
            Bifoga foton <span className="font-normal text-muted">(valfritt, högst {MAX_PHOTOS})</span>
          </label>
          <div className="rounded-md border-2 border-dashed border-edge bg-canvas p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Icon name="camera" className="size-8 text-brand" />
              <p id="tips-foton" className="flex-1 text-sm text-muted">
                Bilder på rummet eller fasaden ger snabbare och säkrare offert. Ta gärna en översiktsbild och en närbild på
                skador.
              </p>
            </div>
            <input
              id="foton"
              name="foton"
              type="file"
              accept="image/*"
              multiple
              disabled={processing || photos.length >= MAX_PHOTOS}
              onChange={(e) => addPhotos(e.currentTarget)}
              aria-invalid={invalid("foton")}
              aria-describedby={describe("foton", "tips-foton")}
              className="mt-3 block w-full text-sm file:mr-4 file:min-h-11 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand file:px-4 file:font-semibold file:text-white hover:file:bg-brand-strong disabled:opacity-60"
            />
            <p aria-live="polite" className="sr-only">
              {processing ? "Bilderna förbereds." : `${photos.length} av ${MAX_PHOTOS} bilder bifogade.`}
            </p>

            {photos.length > 0 && (
              <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {photos.map((photo, index) => (
                  <li key={photo.url} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element -- lokal förhandsvisning av en blob-URL */}
                    <img src={photo.url} alt={`Bifogad bild ${index + 1}: ${photo.file.name}`} className="aspect-square w-full rounded-md object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.url)}
                      aria-label={`Ta bort bild ${index + 1}`}
                      className="absolute -right-2 -top-2 flex size-9 items-center justify-center rounded-full border border-line bg-white text-error shadow"
                    >
                      <Icon name="trash" className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <FieldError id="fel-foton" message={errors.foton} />
        </div>
      </div>

      {/* Fälla för spamrobotar – dold för människor och hjälpmedel. */}
      <div hidden>
        <label>
          Lämna detta fält tomt
          <input name="webbplats" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="samtycke"
            required
            aria-invalid={invalid("samtycke")}
            aria-describedby={describe("samtycke")}
            className="mt-1 size-5 shrink-0 accent-brand"
          />
          <span className="text-sm">
            Jag godkänner att {site.name} sparar uppgifterna för att kunna besvara min förfrågan. Läs mer i vår{" "}
            <Link href="/integritetspolicy" className="link">
              integritetspolicy
            </Link>
            .
          </span>
        </label>
        <FieldError id="fel-samtycke" message={errors.samtycke} />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 rounded-md border-2 border-error bg-error/5 p-4 text-error">
          <strong>Förfrågan kunde inte skickas.</strong>{" "}
          {serverMessage || "Försök igen om en stund."} Du kan också ringa{" "}
          <a href={`tel:${site.phone.href}`} className="font-semibold underline">
            {site.phone.display}
          </a>{" "}
          eller mejla{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending" || processing} className="btn btn-cta shrink-0 whitespace-nowrap disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? "Skickar …" : "Skicka förfrågan"}
          {status !== "sending" && <Icon name="arrow" />}
        </button>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Icon name="clock" className="size-4" /> {site.responsePromise}. Kostnadsfritt och utan förpliktelser.
        </p>
      </div>
    </form>
  );
}
