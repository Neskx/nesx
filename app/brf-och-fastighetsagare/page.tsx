import { Icon } from "@/components/Icon";
import { PhotoSlot } from "@/components/PhotoSlot";
import { QuoteLink } from "@/components/QuoteStarter";
import { CheckList, CtaBand, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const trail = [{ name: "BRF & fastighetsägare", path: "/brf-och-fastighetsagare" }];

export const metadata = pageMeta({
  title: "Målare för BRF och fastighetsägare – underhållsavtal i Skåne",
  description:
    "Måleri och fastighetsservice för bostadsrättsföreningar och fastighetsägare i Eslöv, Lund och Malmö. Underhållsavtal, trapphus, fönster och löpande underhåll.",
  path: "/brf-och-fastighetsagare",
});

const agreement = [
  { title: "Genomgång på plats", text: "Vi går igenom fastigheten tillsammans: trapphus, entréer, fönster, fasad och gemensamma utrymmen. Du får en enkel lista över vad som behöver göras nu och vad som kan vänta." },
  { title: "Plan och fast pris", text: "Utifrån genomgången tas en underhållsplan fram med tydliga priser. Styrelsen eller ägaren vet vad som ska göras, när och vad det kostar." },
  { title: "Återkommande besök", text: "Fasta besök enligt överenskommelse – till exempel vår och höst – för bättringar, tillsyn och mindre reparationer, så att det lilla aldrig hinner bli stort." },
  { title: "Avstämning varje år", text: "En årlig avstämning med kort rapport över vad som är gjort och vad som bör planeras in framöver. Lätt att ta med till budgetarbetet." },
];

const scope = [
  "Trapphus, entréer och källargångar",
  "Tvättstugor, förråd och gemensamma lokaler",
  "Fönster, portar och utvändiga snickerier",
  "Fasader, balkonger och utemiljö",
  "Bättringsmålning och klotterskador på målade ytor",
  "Målning av lägenheter och lokaler vid in- och utflyttning",
  "Enklare snickerilagningar och justeringar",
  "Tillsyn och dokumentation av ytskiktens skick",
];

export default function BrfPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        trail={trail}
        title="Vi underhåller din fastighet"
        lead="Måleri och fastighetsservice i samma händer. En fast kontakt som känner huset, kommer när det är sagt och håller ordning på underhållet över tid."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <QuoteLink service="fastighetsservice" className="btn btn-cta">
            Boka en genomgång <Icon name="arrow" />
          </QuoteLink>
          <a href={`tel:${site.phone.href}`} className="btn btn-outline">
            <Icon name="phone" /> Ring {site.phone.display}
          </a>
        </div>
      </PageHero>

      <section aria-labelledby="varfor" className="section container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="varfor" title="En målare som återkommer" />
          <div className="mt-5 space-y-4 text-lg text-muted">
            <p>
              För en förening eller fastighetsägare är det sällan det stora projektet som är problemet. Det är allt det
              lilla däremellan: väggen i trapphuset som blivit stött, porten som flagnar, fönstren på gårdssidan som
              ingen riktigt har koll på.
            </p>
            <p>
              Med {site.shortName} får ni en och samma person som både ser vad som behöver göras och gör det. Inga
              växlar, inga nya ansikten varje gång och ingen startsträcka inför varje jobb.
            </p>
          </div>
          <CheckList
            className="mt-6 font-medium"
            items={[
              "En kontaktperson för styrelse, förvaltare och boende",
              "Fasta priser och skriftliga offerter",
              "Arbetet planeras så att boende störs så lite som möjligt",
              "Godkänd för F-skatt och ansvarsförsäkrad",
            ]}
          />
        </div>
        <PhotoSlot id="brf" className="reveal aspect-[4/3] rounded-md" />
      </section>

      <section aria-labelledby="avtal" className="bg-subtle">
        <div className="section container-page">
          <SectionHeading
            id="avtal"
            title="Återkommande målning och underhåll"
            lead="Ett underhållsavtal sprider kostnaderna över tid och håller fastigheten i jämnt, gott skick. Omfattningen anpassas efter fastigheten – inga färdiga paket."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agreement.map((step) => (
              <li key={step.title} className="border-t border-line pt-4">
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="omfattning" className="section container-page">
        <SectionHeading id="omfattning" title="Det här kan ingå" />
        <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {scope.map((item) => (
            <li key={item} className="flex gap-3 border-b border-line pb-3">
              <Icon name="check" className="mt-1 text-accent" /> {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-muted">
          Offerter till föreningar och företag lämnas exklusive moms. ROT-avdrag gäller inte för föreningens gemensamma
          utrymmen, men enskilda bostadsrättshavare kan få ROT-avdrag för målning inne i den egna lägenheten.
        </p>
      </section>

      <CtaBand title="Vill ni ha en genomgång av fastigheten?" text="Kostnadsfritt och utan förpliktelser. Ni får en skriftlig sammanställning att ta med till styrelsen." />
    </>
  );
}
