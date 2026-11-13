"use client";

import { useState } from "react";
import { rot } from "@/lib/site";

const kr = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 });
const toNumber = (value: string) => Math.min(Number(value.replace(/\D/g, "")) || 0, 10_000_000);
const group = (value: string) => {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/** Interaktiv ROT-kalkylator: arbetskostnad → avdrag → slutpris. */
export function RotCalculator() {
  const [labour, setLabour] = useState("40 000");
  const [persons, setPersons] = useState(1);

  const labourCost = toNumber(labour);
  const uncapped = Math.round(labourCost * rot.rate);
  const cap = rot.maxPerPerson * persons;
  const deduction = Math.min(uncapped, cap);
  const total = labourCost;
  const toPay = total - deduction;
  const capped = uncapped > cap;

  return (
    <div className="grid overflow-hidden rounded-md border border-line lg:grid-cols-2">
      <form className="bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()} noValidate>
        <div>
          <label htmlFor="rot-arbete" className="label">
            Arbetskostnad inkl. moms
          </label>
          <div className="relative">
            <input
              id="rot-arbete"
              inputMode="numeric"
              value={labour}
              onChange={(e) => setLabour(group(e.target.value))}
              aria-describedby="rot-arbete-tips"
              className="field pr-12 text-lg font-semibold"
            />
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              kr
            </span>
          </div>
          <p id="rot-arbete-tips" className="mt-1.5 text-sm text-muted">
            Avdraget gäller arbetet. Material tillkommer.
          </p>
        </div>


        <fieldset className="mt-5">
          <legend className="label">Hur många äger bostaden och delar på avdraget?</legend>
          <div className="grid gap-2 min-[440px]:grid-cols-2">
            {[1, 2].map((count) => (
              <label
                key={count}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-edge px-4 font-medium has-checked:border-cta has-checked:bg-brand-tint has-checked:ring-1 has-checked:ring-cta has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
              >
                <input
                  type="radio"
                  name="rot-personer"
                  checked={persons === count}
                  onChange={() => setPersons(count)}
                  className="size-5 shrink-0 accent-brand outline-none"
                />
                {count === 1 ? "En person" : "Två personer"}
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="on-dark flex flex-col bg-brand p-6 text-white sm:p-8" role="group" aria-label="Resultat" aria-live="polite">
        <dl className="space-y-3 text-lg">
          <div className="flex justify-between gap-4">
            <dt className="text-white/85">Arbete</dt>
            <dd className="tabular-nums">{kr.format(labourCost)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/25 pt-3">
            <dt className="text-white/85">ROT-avdrag ({Math.round(rot.rate * 100)} % av arbetet)</dt>
            <dd className="whitespace-nowrap font-semibold tabular-nums">− {kr.format(deduction)}</dd>
          </div>
        </dl>

        <div className="mt-6 border-t-2 border-white pt-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Du betalar</p>
          <p className="mt-1 font-display text-5xl font-semibold tabular-nums sm:text-6xl">{kr.format(toPay)}</p>
          <p className="mt-2 text-white/85">i stället för {kr.format(total)}</p>
        </div>

        {capped && (
          <p className="mt-4 rounded-md bg-white/10 p-3 text-sm">
            Avdraget begränsas av taket på {kr.format(rot.maxPerPerson)} per person och år.
          </p>
        )}
        <p className="mt-auto pt-6 text-sm text-white/80">
          Räkneexempel enligt reglerna för {rot.year}. Förutsätter att du har ROT-utrymme kvar och betalat tillräckligt
          med skatt. Det exakta beloppet får du i offerten.
        </p>
      </div>
    </div>
  );
}
