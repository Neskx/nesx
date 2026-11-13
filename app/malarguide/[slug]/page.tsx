import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { QuoteLink } from "@/components/QuoteStarter";
import { CtaBand, JsonLd, PageHero } from "@/components/ui";
import { getGuide, guides, type Block } from "@/lib/guides";
import { pageMeta } from "@/lib/meta";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

// Alla sidor förrenderas via generateStaticParams; okända adresser får vänta in en riktig 404.
export const instant = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/malarguide/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMeta({ title: guide.title, description: guide.description, path: `/malarguide/${guide.slug}`, type: "article" });
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={index}>{block.text}</h2>;
    case "p":
      return <p key={index}>{block.text}</p>;
    case "ul":
      return (
        <ul key={index} className="list-disc space-y-2 pl-6 marker:text-accent">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <aside key={index} className="card border-l-4 border-l-accent p-5">
          <p className="font-display text-xl font-semibold">{block.title}</p>
          <p className="mt-1.5">{block.text}</p>
        </aside>
      );
  }
}

const dateFormat = new Intl.DateTimeFormat("sv-SE", { dateStyle: "long", timeZone: "Europe/Stockholm" });

export default async function GuidePage({ params }: PageProps<"/malarguide/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const trail = [
    { name: "Målarguide", path: "/malarguide" },
    { name: guide.title, path: `/malarguide/${guide.slug}` },
  ];
  const service = getService(guide.relatedService);
  const more = guides.filter((other) => other.slug !== guide.slug);

  return (
    <>
      <JsonLd data={articleSchema(guide)} />
      <JsonLd data={breadcrumbSchema(trail)} />

      <article>
        <PageHero trail={trail} eyebrow="Målarguide" title={guide.title} lead={guide.description}>
          <p className="mt-6 text-sm text-muted">
            Av {site.owner}, målare · Uppdaterad <time dateTime={guide.updated}>{dateFormat.format(new Date(guide.updated))}</time> ·{" "}
            {guide.readMinutes} min läsning
          </p>
        </PageHero>

        <div className="section container-page grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
          <div className="prose-guide text-lg">{guide.blocks.map(renderBlock)}</div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {service && (
              <section aria-labelledby="guide-offert" className="on-dark rounded-md bg-brand p-6 text-white">
                <h2 id="guide-offert" className="text-2xl">
                  Behöver du hjälp med {service.title.toLowerCase()}?
                </h2>
                <p className="mt-3 text-white/85">
                  {site.responsePromise}. {site.pricePromise}.
                </p>
                <QuoteLink service={service.slug} className="btn btn-cta mt-5 w-full">
                  Begär offert
                </QuoteLink>
                <Link href={`/tjanster/${service.slug}`} className="mt-2 flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
                  Mer om tjänsten <Icon name="arrow" className="size-4" />
                </Link>
              </section>
            )}
            <nav aria-labelledby="fler-guider" className="card p-6">
              <h2 id="fler-guider" className="text-xl">
                Fler guider
              </h2>
              <ul className="mt-1">
                {more.map((other) => (
                  <li key={other.slug}>
                    <Link href={`/malarguide/${other.slug}`} className="link inline-flex min-h-11 items-center">
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </article>

      <CtaBand title="Vill du ha ett besked för just ditt hus?" />
    </>
  );
}
