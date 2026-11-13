"use client";

import { useState } from "react";
import { categories, type BeforeAfter, type Category, type Project } from "@/lib/projects";
import { PhotoSlot } from "./PhotoSlot";

type Filter = Category | "alla";

const badgeClass =
  "pointer-events-none absolute top-3 rounded bg-ink/85 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white";

const categoryLabel =(id: Category) => categories.find((c) => c.id === id)?.label ?? id;

function FilterBar({ value, onChange, label }: { value: Filter; onChange: (value: Filter) => void; label: string }) {
  const options: { id: Filter; label: string }[] = [{ id: "alla", label: "Alla" }, ...categories];
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className="min-h-11 cursor-pointer rounded-md border border-edge px-5 font-semibold text-ink transition-colors hover:bg-subtle aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-white"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ExampleTag() {
  return (
    <span className="rounded bg-accent px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">
      Exempel – ersätt
    </span>
  );
}

/** Före/efter-reglage. Ett vanligt range-fält ligger ovanpå bilden, så det fungerar med mus, touch och tangentbord. */
function BeforeAfterSlider({ item }: { item: BeforeAfter }) {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="relative aspect-[3/2] overflow-hidden rounded-md has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-brand">
        <PhotoSlot id={item.after} noteAtTop className="size-full" sizes="(min-width: 768px) 50vw, 100vw" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <PhotoSlot id={item.before} hideNote className="size-full" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <span className={`${badgeClass} left-3`}>Före</span>
        <span className={`${badgeClass} right-3`}>Efter</span>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-md">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Jämför före och efter: ${item.title}`}
          aria-valuetext={`${position} procent före-bild`}
          className="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-3">
        <span className="font-semibold">{item.title}</span>
        <span className="text-sm text-muted">{categoryLabel(item.category)}</span>
        {item.placeholder && <ExampleTag />}
      </figcaption>
    </figure>
  );
}

/** En enda före/efter-jämförelse, i full bredd. */
export function BeforeAfterShowcase({ item }: { item: BeforeAfter }) {
  return (
    <div className="mx-auto max-w-4xl">
      <BeforeAfterSlider item={item} />
    </div>
  );
}

export function ProjectGrid({ items }: { items: Project[] }) {
  const [filter, setFilter] = useState<Filter>("alla");
  const visible = items.filter((item) => filter === "alla" || item.category === filter);

  return (
    <div>
      <FilterBar value={filter} onChange={setFilter} label="Filtrera referensprojekt" />
      <p aria-live="polite" className="sr-only">
        Visar {visible.length} av {items.length} projekt.
      </p>
      {visible.length > 0 ? (
        <ul className="mt-8 grid gap-8 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.id} className="card overflow-hidden">
              <PhotoSlot id={project.photo} className="aspect-[3/2]" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                  <span className="font-semibold uppercase tracking-wider text-brand">{categoryLabel(project.category)}</span>
                  <span>{project.place}</span>
                  {project.placeholder && <ExampleTag />}
                </div>
                <h2 className="mt-2 text-2xl">{project.title}</h2>
                <p className="mt-3 text-muted">{project.summary}</p>
                {project.quote && (
                  <figure className="mt-5 border-l-4 border-accent pl-4">
                    <blockquote className="font-display text-lg italic">”{project.quote.text}”</blockquote>
                    <figcaption className="mt-2 text-sm font-semibold">{project.quote.name}</figcaption>
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-muted">Inga projekt i den här kategorin ännu.</p>
      )}
    </div>
  );
}
