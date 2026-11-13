import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PhotoSlot } from "@/components/PhotoSlot";
import { CtaBand, JsonLd } from "@/components/ui";
import { guides } from "@/lib/guides";
import { pageMeta } from "@/lib/meta";
import type { PhotoId } from "@/lib/photos";
import { breadcrumbSchema } from "@/lib/schema";

const trail = [{ name: "Målarguide", path: "/malarguide" }];

export const metadata = pageMeta({
  title: "Målarguiden – råd om fasad, färgval och ROT-avdrag",
  description:
    "Målarens egna råd: när fasaden ska målas om, linoljefärg eller akrylat och hur ROT-avdraget fungerar. Skrivet för dig som äger hus i Skåne.",
  path: "/malarguide",
});

const guidePhoto: Record<string, PhotoId> = {
  "nar-ska-fasaden-malas-om": "service-fasad",
  "linoljefarg-eller-akrylat": "service-fonster",
  "sa-fungerar-rot-avdraget": "service-invandig",
};

export default function GuideIndexPage() {
  const [featured, ...rest] = guides;

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="container-page pb-6 pt-10 sm:pt-16">
        <nav aria-label="Brödsmulor" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                Start
              </Link>
            </li>
            <li className="flex items-center gap-x-2">
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="font-medium text-ink">
                Målarguide
              </span>
            </li>
          </ol>
        </nav>
        <h1 className="mt-8 max-w-xl text-4xl sm:text-5xl">Raka råd från en målare</h1>
        <p className="mt-5 max-w-lg text-lg text-muted">
          Svar på frågorna som brukar komma upp vid köksbordet – om färgval, underhåll och vad saker och ting kostar.
        </p>
      </div>

      <div className="container-page pb-16 pt-6 sm:pb-24">
        {/* Featured article — large card with image */}
        <Link
          href={`/malarguide/${featured.slug}`}
          className="group relative block overflow-hidden rounded-xl border border-line transition-all hover:border-brand/30 hover:shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            <PhotoSlot
              id={guidePhoto[featured.slug] ?? "service-fasad"}
              className="aspect-[4/3] md:aspect-auto md:min-h-72"
              sizes="(min-width: 768px) 50vw, 100vw"
              hideNote
            />
            <div className="flex flex-col justify-center bg-white p-8 sm:p-10">
              <p className="text-sm font-medium text-cta">{featured.readMinutes} min läsning</p>
              <h2 className="mt-3 text-2xl sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 max-w-md text-muted">{featured.description}</p>
              <p className="mt-6 flex items-center gap-2 font-semibold text-brand transition-colors group-hover:text-cta">
                Läs guiden <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </div>
        </Link>

        {/* Other articles */}
        {rest.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rest.map((guide) => (
              <Link
                key={guide.slug}
                href={`/malarguide/${guide.slug}`}
                className="group relative block overflow-hidden rounded-xl border border-line bg-white transition-all hover:border-brand/30 hover:shadow-xl"
              >
                <PhotoSlot
                  id={guidePhoto[guide.slug] ?? "service-invandig"}
                  className="aspect-[16/9]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  hideNote
                />
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-medium text-cta">{guide.readMinutes} min läsning</p>
                  <h2 className="mt-2 text-xl sm:text-2xl">{guide.title}</h2>
                  <p className="mt-2 text-[0.95rem] text-muted">{guide.description}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand transition-colors group-hover:text-cta">
                    Läs guiden <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <CtaBand title="Hittade du inte svaret?" text="Ring eller skriv – det kostar ingenting att fråga." />
    </>
  );
}
