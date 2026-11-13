"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ComponentProps, type FormEvent } from "react";
import { setQuoteDraft, useQuoteDraft } from "@/lib/quote-store";
import { serviceOptions } from "@/lib/services";
import { isPostcode } from "@/lib/validation";
import { Icon } from "./Icon";

/** Offertstartare i hero: postnummer + "Vad ska målas?" som förifyller offertformuläret. */
export function QuoteStarter() {
  const draft = useQuoteDraft();
  const router = useRouter();
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.postnummer && !isPostcode(draft.postnummer)) {
      setError("Postnumret ska ha fem siffror, till exempel 241 37.");
      event.currentTarget.querySelector<HTMLInputElement>("#start-postnummer")?.focus();
      return;
    }
    setError("");

    const form = document.getElementById("offert");
    if (form) {
      form.scrollIntoView({ block: "start" });
      form.querySelector<HTMLInputElement>('input[name="namn"]')?.focus({ preventScroll: true });
    } else {
      router.push("/kontakt#offert");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Börja din offert">
      <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
        <div>
          <label htmlFor="start-postnummer" className="label">
            Postnummer
          </label>
          <input
            id="start-postnummer"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="241 37"
            maxLength={6}
            value={draft.postnummer}
            onChange={(e) => setQuoteDraft({ postnummer: e.target.value })}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "start-postnummer-fel" : undefined}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="start-tjanst" className="label">
            Vad ska målas?
          </label>
          <select
            id="start-tjanst"
            value={draft.tjanst}
            onChange={(e) => setQuoteDraft({ tjanst: e.target.value })}
            className="field"
          >
            <option value="">Välj …</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && (
        <p id="start-postnummer-fel" role="alert" className="mt-2 text-sm font-semibold text-error">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-cta mt-4 w-full">
        Begär offert <Icon name="arrow" />
      </button>
    </form>
  );
}

/** Länk till offertformuläret som förväljer en tjänst. */
export function QuoteLink({
  service,
  children,
  ...props
}: { service: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href="/kontakt#offert" {...props} onClick={() => setQuoteDraft({ tjanst: service })}>
      {children}
    </Link>
  );
}
