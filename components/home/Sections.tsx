import Link from "next/link";
import { services } from "@/lib/services";
import { processSteps, site, trustBadges } from "@/lib/site";
import { Icon, type IconName } from "../Icon";
import { PhotoSlot } from "../PhotoSlot";
import { SectionHeading } from "../ui";

const badgeIcons: Record<string, IconName> = {
  "f-skatt": "doc",
  forsakring: "shield",
  rot: "percent",
  maleriforetagen: "check",
  mvk: "check",
};

/** Rad med förtroendemärken. Vilka som visas styrs av `enabled` i lib/site.ts. */
export function TrustBadges() {
  const badges = trustBadges.filter((badge) => badge.enabled);

  return (
    <section aria-label="Trygghet" className="border-y border-line">
      <ul className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-10">
        {badges.map((badge) => (
          <li key={badge.id} className="flex items-center gap-3 font-medium">
            <Icon name={badgeIcons[badge.id] ?? "check"} className="text-brand" />
            {badge.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Tjänster som bildplattor: bild och namn, inget mer. */
export function ServiceTiles() {
  return (
    <section aria-labelledby="tjanster-rubrik" className="section container-page">
      <SectionHeading id="tjanster-rubrik" eyebrow="Tjänster" title="Måleri och underhåll" />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {services.map((service, index) => (
          <li key={service.slug} className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
            <Link href={`/tjanster/${service.slug}`} className="group relative block overflow-hidden rounded-md focus-visible:outline-offset-4">
              <PhotoSlot
                id={service.photo}
                noteAtTop
                className={`transition-transform duration-500 group-hover:scale-[1.03] ${index < 2 ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[4/3]"}`}
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-ink/90 via-ink/60 via-55% to-transparent p-5 pt-20 text-white">
                <span className="text-xl font-semibold">{service.title}</span>
                <Icon name="arrow" className="mb-1 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "Du pratar med den som målar" – namngiven kontakt. */
export function OwnerSection() {
  return (
    <section aria-labelledby="agare-rubrik" className="bg-subtle">
      <div className="section container-page grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <PhotoSlot id="owner" className="mx-auto aspect-[4/5] w-full max-w-sm rounded-md lg:max-w-none" sizes="(min-width: 1024px) 36vw, 90vw" />
        <div>
          <SectionHeading id="agare-rubrik" title="Du pratar med den som målar" />
          <p className="mt-5 max-w-xl text-lg text-muted">
            Ingen säljare och inga mellanled. {site.ownerFirstName} svarar i telefonen, kommer på hembesöket, räknar på
            jobbet och utför det – en kontakt från offert till slutbesiktning.
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
            <p className="font-semibold">{site.owner}</p>
            <a href={`tel:${site.phone.href}`} className="flex min-h-11 items-center gap-2 font-semibold text-cta hover:underline">
              <Icon name="phone" /> {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-2 font-semibold text-cta hover:underline">
              <Icon name="mail" /> {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  return (
    <section aria-labelledby="process-rubrik" className="section container-page">
      <SectionHeading id="process-rubrik" title="Från första kontakt till färdigt jobb" />
      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {processSteps.map((step) => (
          <li key={step.title} className="border-t border-line pt-4">
            <h3 className="mt-2 text-xl">{step.title}</h3>
            <p className="mt-2 text-[0.95rem] text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function BrfTeaser() {
  return (
    <section aria-labelledby="brf-rubrik" className="on-dark bg-brand text-white">
      <div className="container-page flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="brf-rubrik" className="text-3xl sm:text-4xl">
            Vi underhåller din fastighet
          </h2>
          <p className="mt-3 text-lg text-white/85">Underhållsavtal för bostadsrättsföreningar och fastighetsägare.</p>
        </div>
        <Link href="/brf-och-fastighetsagare" className="btn btn-light shrink-0">
          BRF & fastighetsägare <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
