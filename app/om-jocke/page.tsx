import { PhotoSlot } from "@/components/PhotoSlot";
import { CheckList, CtaBand, JsonLd, PageHero, SectionHeading} from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const trail = [{ name: "Om Jocke", path: "/om-jocke" }];

export const metadata = pageMeta({
  title: "Om Jocke – målare i Eslöv sedan 2019",
  description:
    "Jocke N Måleri AB drivs av Joakim Nilsson i Eslöv. Läs om synen på hantverket, underarbetet och valet av färg och material.",
  path: "/om-jocke",
});

const materials = [
  { title: "Miljömärkt inomhus", text: "Inomhus används vattenburna färger med låg lukt och miljömärkning som standard. Bra för inneklimatet – och du kan sova i rummet samma kväll." },
  { title: "Linoljefärg där den passar", text: "På äldre hus och gamla fönster är linoljefärg ofta det bästa valet. Den bygger på en förnybar råvara, tränger in i träet och är enkel att underhålla." },
  { title: "Färg som håller länge", text: "Det mest miljövänliga är ofta den målning som inte behöver göras om i förtid. Därför väljs färg efter hållbarhet, inte efter lägsta pris per liter." },
  { title: "Rätt mängd, mindre spill", text: "Färgåtgången räknas noga, verktyg rengörs på rätt sätt och rester och tomma burkar lämnas till återvinning." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        trail={trail}
        eyebrow={`Om ${site.shortName}`}
        title="En målare, ett ansvar"
        lead={`${site.name} är ${site.owner}. Ett enmansföretag i Eslöv som sedan ${site.founded} målar hem och underhåller fastigheter i Mellanskåne.`}
      />

      <section aria-labelledby="historia" className="section container-page grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <PhotoSlot id="owner" className="reveal aspect-[4/5] rounded-md" sizes="(min-width: 1024px) 40vw, 100vw" priority />
        <div>
          <SectionHeading id="historia" eyebrow="Historien" title="Från Eslöv, för Eslöv med omnejd" />
          <div className="mt-5 space-y-4 text-lg text-muted">
            <p>
              {site.shortName} startades {site.founded} med en enkel tanke: att den som lovar jobbet också ska vara den
              som gör det. Företaget är registrerat för byggnadsmåleri och fastighetsservice, och just den
              kombinationen är poängen – måla, och sedan hålla efter.
            </p>
            <p>
              Som enmansföretag finns det inga mellanled. {site.ownerFirstName} tar samtalet, gör hembesöket, skriver
              offerten och utför arbetet. Det gör det lätt att hålla det som lovats, och lätt för dig att veta vem du
              ska ringa.
            </p>
            <p>
              De flesta uppdragen finns inom några mil från Eslöv: villor och lägenheter, gårdar och radhus, och
              fastigheter som behöver någon som återkommer år efter år.
            </p>
          </div>
          {site.showOwnerNotes && (
            <p className="mt-6 rounded-md border-2 border-dashed border-edge p-4 text-sm text-muted">
              <strong className="text-accent">Anteckning till ägaren:</strong> komplettera gärna med din egen bakgrund –
              utbildning, år i yrket och vad som fick dig att starta eget. Personliga detaljer bygger förtroende.
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="hantverk" className="section container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="hantverk"
            eyebrow="Hantverket"
            title={
              <>
                Ytor som håller
              </>
            }
          />
          <div className="mt-5 space-y-4 text-lg text-muted">
            <p>
              Det mesta av ett bra målningsjobb syns inte när det är klart. Det ligger i tvätten, skrapningen,
              spacklingen och slipningen – i allt som händer innan färgen kommer på.
            </p>
            <p>
              Noggrannhet är inte detsamma som att det tar lång tid. Det handlar om att göra saker i rätt ordning, låta
              färgen torka som den ska och inte lämna ett rum förrän skärningarna är raka.
            </p>
          </div>
          <CheckList
            className="mt-6 font-medium"
            items={[
              "Underarbetet får ta den tid det behöver",
              "Rätt färgsystem för underlaget – inte det som råkar finnas i bilen",
              "Golv, möbler och trädgård skyddas ordentligt",
              "Det städas efter varje arbetsdag",
            ]}
          />
        </div>
        <PhotoSlot id="ownerWork" className="reveal aspect-[4/3] rounded-md" />
      </section>

      <section aria-labelledby="material" className="bg-subtle">
        <div className="section container-page">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <SectionHeading
              id="material"
              eyebrow="Färg & material"
              title="Val som är bra för huset – och för miljön"
              lead="Du får alltid en rekommendation, men valet är ditt. Säg till om du har särskilda önskemål om märkning, innehåll eller fabrikat."
            />
            <PhotoSlot id="workshop" className="aspect-[16/9] rounded-md" />
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((item) => (
              <li key={item.title} className="reveal card p-6">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="foretaget" className="section container-page">
        <SectionHeading id="foretaget" eyebrow="Företaget" title="Fakta om bolaget" />
        <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Företagsnamn", site.name],
            ["Organisationsnummer", site.orgNr],
            ["Grundat", String(site.founded)],
            ["Verksamhet", site.activity],
            ["Skatt", "Godkänd för F-skatt, momsregistrerad"],
            ["Adress", `${site.address.street}, ${site.address.postalCode} ${site.address.city}`],
          ].map(([term, value]) => (
            <div key={term} className="border-t-2 border-brand pt-3">
              <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{term}</dt>
              <dd className="mt-1 text-lg font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaBand title={`Vill du prata med ${site.ownerFirstName}?`} />
    </>
  );
}
