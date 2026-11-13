import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { QuoteForm } from "./QuoteForm";

export function ContactDetails() {
  return (
    <address className="not-italic">
      <ul className="space-y-1">
        <li>
          <a href={`tel:${site.phone.href}`} className="flex min-h-12 items-center gap-3 text-lg font-semibold text-cta hover:underline">
            <Icon name="phone" />
            <span>
              <span className="sr-only">Ring </span>
              {site.phone.display}
            </span>
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className="flex min-h-12 items-center gap-3 text-lg font-semibold text-cta hover:underline">
            <Icon name="mail" /> {site.email}
          </a>
        </li>
      </ul>
    </address>
  );
}

/** Kontaktformulär direkt på sidan, med direktkontakt bredvid. */
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
          <div className="mt-6">
            <ContactDetails />
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
