import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CtaBand, JsonLd, PageHero } from "@/components/ui";
import { guides } from "@/lib/guides";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

const trail = [{ name: "Målarguide", path: "/malarguide" }];

export const metadata = pageMeta({
  title: "Målarguiden – råd om fasad, färgval och ROT-avdrag",
  description:
    "Målarens egna råd: när fasaden ska målas om, linoljefärg eller akrylat och hur ROT-avdraget fungerar. Skrivet för dig som äger hus i Skåne.",
  path: "/malarguide",
});

export default function GuideIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        trail={trail}
        eyebrow="Målarguide"
        title="Raka råd från en målare"
        lead="Svar på frågorna som brukar komma upp vid köksbordet – om färgval, underhåll och vad saker och ting kostar."
      />

      <div className="section container-page">
        <ul className="grid gap-6 md:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.slug} className="reveal">
              <article className="card relative flex h-full flex-col border-t-4 border-t-brand p-6 transition-shadow hover:shadow-lg">
                <p className="text-sm text-muted">{guide.readMinutes} min läsning</p>
                <h2 className="mt-2 text-2xl">
                  <Link href={`/malarguide/${guide.slug}`} className="after:absolute after:inset-0 after:rounded-md">
                    {guide.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-muted">{guide.description}</p>
                <p className="mt-5 flex items-center gap-2 font-semibold text-brand">
                  Läs guiden <Icon name="arrow" className="size-4" />
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <CtaBand title="Hittade du inte svaret?" text="Ring eller skriv – det kostar ingenting att fråga." />
    </>
  );
}
