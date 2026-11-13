import { AreaMap } from "./home/ServiceArea";
import { Icon } from "./Icon";
import { QuoteForm } from "./QuoteForm";
import { areas, site } from "@/lib/site";

/** Kontaktformulär med företagsuppgifter och karta bredvid. */
export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section aria-labelledby="kontakt-rubrik" className="bg-subtle">
      <div className="section container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <Heading id="kontakt-rubrik" className="text-3xl sm:text-[2.6rem]">
            Begär offert
          </Heading>
          <p className="mt-4 text-lg text-muted">
            {site.responsePromise}. {site.pricePromise}.
          </p>

          <dl className="mt-8 divide-y divide-line border-y border-line text-[0.95rem]">
            {([
              ["Företag", site.name],
              ["Kontaktperson", site.owner],
              ["Organisationsnummer", site.orgNr],
              ["Adress", `${site.address.street}, ${site.address.postalCode} ${site.address.city}`],
              ["Skatt", "Godkänd för F-skatt, momsregistrerad"],
            ] as const).map(([term, value]) => (
              <div key={term} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                <dt className="w-44 shrink-0 text-muted">{term}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${site.phone.href}`} className="btn btn-primary">
              <Icon name="phone" /> Ring {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-outline">
              <Icon name="mail" /> {site.email}
            </a>
          </div>

          <div className="mt-8">
            <AreaMap />
            <p className="mt-3 text-sm text-muted">
              Vi tar uppdrag i {areas.map((a) => a.name).join(", ")} och orterna däremellan.
            </p>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
