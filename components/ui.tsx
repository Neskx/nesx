import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-3 text-3xl sm:text-[2.6rem]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}

export type Crumb = { name: string; path: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  trail: Crumb[];
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-subtle">
      <div className="container-page py-10 sm:py-16">
        <nav aria-label="Brödsmulor" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                Start
              </Link>
            </li>
            {trail.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-x-2">
                <span aria-hidden="true">/</span>
                {index === trail.length - 1 ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className={`max-w-3xl text-[2rem] min-[380px]:text-4xl sm:text-5xl ${eyebrow ? "mt-3" : "mt-8"}`}>{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{lead}</p>}
        {children}
      </div>
    </div>
  );
}

export function CheckList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon name="check" className="mt-1 size-5 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Avslutande uppmaning på undersidor. */
export function CtaBand({ title, text }: { title: string; text?: string }) {
  return (
    <section className="on-dark bg-brand text-white">
      <div className="container-page flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-3 text-lg text-white/85">
            {text ?? `${site.responsePromise}. ${site.pricePromise}.`}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/kontakt#offert" className="btn btn-cta">
            Begär offert <Icon name="arrow" />
          </Link>
          <a href={`tel:${site.phone.href}`} className="btn btn-light">
            <Icon name="phone" /> {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
