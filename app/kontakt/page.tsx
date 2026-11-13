import { ContactSection } from "@/components/ContactSection";
import { AreaList, AreaMap } from "@/components/home/ServiceArea";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";
import { areas, site } from "@/lib/site";

const trail = [{ name: "Kontakt", path: "/kontakt" }];

export const metadata = pageMeta({
  title: "Kontakt – begär offert på målning i Eslöv",
  description:
    "Kontakta Jocke N Måleri i Eslöv. Begär offert med foton, ring eller mejla Joakim direkt. Svar inom 24 timmar och fast pris efter kostnadsfritt hembesök.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <ContactSection headingLevel="h1" />

      <section aria-labelledby="hitta" className="section container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="hitta" className="text-3xl sm:text-4xl">
            Företagsuppgifter
          </h2>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {[
              ["Företag", site.name],
              ["Kontaktperson", site.owner],
              ["Organisationsnummer", site.orgNr],
              ["Adress", `${site.address.street}, ${site.address.postalCode} ${site.address.city}`],
              ["Skatt", "Godkänd för F-skatt, momsregistrerad"],
            ].map(([term, value]) => (
              <div key={term} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                <dt className="w-48 shrink-0 text-muted">{term}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${site.phone.href}`} className="btn btn-primary">
              <Icon name="phone" /> Ring {site.phone.display}
            </a>
            <a href={site.mapsUrl} rel="noopener" className="btn btn-outline">
              <Icon name="pin" /> Öppna i Google Maps
            </a>
          </div>
          <p className="mt-6 text-muted">
            Adressen är företagets säte, inte en butik. Vi kommer alltid hem till dig – hembesöket är kostnadsfritt.
          </p>
        </div>

        <div>
          <AreaMap />
          <p className="mt-4 text-muted">
            Vi tar uppdrag i {areas.map((area) => area.name).join(", ")} och orterna däremellan.
          </p>
        </div>
      </section>

      <section aria-labelledby="omrade" className="container-page pb-20">
        <h2 id="omrade" className="text-3xl sm:text-4xl">
          Här målar vi
        </h2>
        <div className="mt-8">
          <AreaList />
        </div>
      </section>
    </>
  );
}
