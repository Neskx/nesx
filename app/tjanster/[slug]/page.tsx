import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PhotoSlot } from "@/components/PhotoSlot";
import { QuoteLink } from "@/components/QuoteStarter";
import { CheckList, JsonLd, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { getService, services } from "@/lib/services";
import { rot, site } from "@/lib/site";

// Alla sidor förrenderas via generateStaticParams; okända adresser får vänta in en riktig 404.
export const instant = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tjanster/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({ title: service.metaTitle, description: service.metaDescription, path: `/tjanster/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/tjanster/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const trail = [
    { name: "Tjänster", path: "/tjanster" },
    { name: service.title, path: `/tjanster/${service.slug}` },
  ];
  const others = services.filter((other) => other.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faq)} />
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero trail={trail} title={service.title} lead={service.lead}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <QuoteLink service={service.slug} className="btn btn-cta">
            Begär offert <Icon name="arrow" />
          </QuoteLink>
          <a href={`tel:${site.phone.href}`} className="btn btn-outline">
            <Icon name="phone" /> Ring {site.phone.display}
          </a>
        </div>
      </PageHero>

      <div className="section container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <div className="space-y-5 text-lg">
            {service.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h2 className="mt-12 text-3xl">Det här ingår</h2>
          <CheckList items={service.includes} className="mt-6" />

          <h2 className="mt-12 text-3xl">Hantverket bakom</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {service.craft.map((point) => (
              <div key={point.title} className="border-t-2 border-brand pt-4">
                <dt className="font-display text-xl font-semibold">{point.title}</dt>
                <dd className="mt-2 text-muted">{point.text}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-3xl">Vanliga frågor</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {service.faq.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Icon name="chevron" className="size-5 text-brand transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="space-y-8">
          <PhotoSlot id={service.photo} className="aspect-[4/3] rounded-md" sizes="(min-width: 1024px) 40vw, 100vw" priority />

          <section aria-labelledby="rot-info" className="card border-l-4 border-l-accent p-6">
            <h2 id="rot-info" className="flex items-center gap-3 text-2xl">
              <Icon name="percent" className="size-6 text-accent" /> ROT-avdrag
            </h2>
            <p className="mt-3">{service.rot}</p>
            <p className="mt-3 text-sm text-muted">
              {rot.year}: {Math.round(rot.rate * 100)} % av arbetskostnaden, högst{" "}
              {rot.maxPerPerson.toLocaleString("sv-SE")} kr per person och år.
            </p>
            <p className="mt-2 flex flex-col items-start">
              <Link href="/#rot-rubrik" className="link inline-flex min-h-11 items-center">
                Räkna i ROT-kalkylatorn
              </Link>
              <Link href="/malarguide/sa-fungerar-rot-avdraget" className="link inline-flex min-h-11 items-center">
                Så fungerar ROT-avdraget
              </Link>
            </p>
          </section>

          <section aria-labelledby="offert-ruta" className="on-dark rounded-md bg-brand p-6 text-white">
            <h2 id="offert-ruta" className="text-2xl">
              Få ett fast pris
            </h2>
            <ul className="mt-4 space-y-2 text-white/90">
              <li className="flex gap-3">
                <Icon name="clock" className="mt-1" /> {site.responsePromise}
              </li>
              <li className="flex gap-3">
                <Icon name="home" className="mt-1" /> {site.pricePromise}
              </li>
              <li className="flex gap-3">
                <Icon name="user" className="mt-1" /> Du pratar med den som målar
              </li>
            </ul>
            <QuoteLink service={service.slug} className="btn btn-cta mt-6 w-full">
              Begär offert på {service.title.toLowerCase()}
            </QuoteLink>
          </section>
        </aside>
      </div>

      <section aria-labelledby="fler-tjanster" className="border-t border-line bg-subtle">
        <div className="container-page py-14">
          <h2 id="fler-tjanster" className="text-2xl">
            Fler tjänster
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/tjanster/${other.slug}`} className="card flex h-full min-h-16 items-center justify-between gap-3 px-5 py-4 font-semibold hover:border-brand">
                  {other.title} <Icon name="arrow" className="size-4 text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
