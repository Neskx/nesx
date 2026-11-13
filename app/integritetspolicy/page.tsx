import { JsonLd, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const trail = [{ name: "Integritetspolicy", path: "/integritetspolicy" }];

export const metadata = pageMeta({
  title: "Integritetspolicy och cookies",
  description: "Så behandlar Jocke N Måleri AB personuppgifter och cookies på webbplatsen.",
  path: "/integritetspolicy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        trail={trail}
        title="Integritetspolicy och cookies"
        lead="Kort och utan krångel: vilka uppgifter som sparas, varför och hur länge."
      />

      <div className="section container-page">
        <div className="prose-guide max-w-2xl text-lg">
          {site.showOwnerNotes && (
            <p className="rounded-md border-2 border-dashed border-edge p-4 text-sm text-muted">
              <strong className="text-accent">Anteckning till ägaren:</strong> texten är ett utkast. Kontrollera att
              lagringstider och leverantörer stämmer med hur du faktiskt arbetar innan lansering.
            </p>
          )}

          <h2>Personuppgiftsansvarig</h2>
          <p>
            {site.name}, org.nr {site.orgNr}, {site.address.street}, {site.address.postalCode} {site.address.city}, är
            ansvarig för behandlingen av dina personuppgifter. Frågor skickas till{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
            .
          </p>

          <h2>Vilka uppgifter som behandlas</h2>
          <p>
            När du skickar en offertförfrågan sparas det du själv fyller i: namn, telefonnummer, e-postadress,
            postnummer, din beskrivning av jobbet och de foton du bifogar. Blir det ett uppdrag behandlas även adress
            och – om du vill använda ROT-avdrag – personnummer och fastighetsbeteckning, eftersom Skatteverket kräver det.
          </p>

          <h2>Varför och med vilken rättslig grund</h2>
          <ul className="list-disc space-y-2 pl-6 marker:text-accent">
            <li>För att svara på din förfrågan och lämna offert – med stöd av ditt samtycke och för att vidta åtgärder innan ett avtal ingås.</li>
            <li>För att utföra och fakturera uppdraget – för att fullgöra avtalet med dig.</li>
            <li>För bokföring och ROT-ansökan – för att uppfylla rättsliga skyldigheter.</li>
          </ul>

          <h2>Hur länge uppgifterna sparas</h2>
          <p>
            Förfrågningar som inte leder till uppdrag raderas inom tolv månader. Uppgifter som ingår i bokföringen
            sparas i sju år enligt bokföringslagen.
          </p>

          <h2>Vilka som tar del av uppgifterna</h2>
          <p>
            Uppgifterna säljs aldrig vidare. De hanteras av de tjänster som krävs för att driva webbplatsen och skicka
            e-post, samt av Skatteverket vid ROT-ansökan och av redovisningsbyrå för bokföring.
          </p>

          <h2>Dina rättigheter</h2>
          <p>
            Du har rätt att få veta vilka uppgifter som finns om dig, få dem rättade eller raderade och att återkalla
            ditt samtycke. Hör av dig på e-postadressen ovan. Är du missnöjd kan du vända dig till
            Integritetsskyddsmyndigheten (IMY).
          </p>

          <h2>Cookies</h2>
          <p>
            Webbplatsen fungerar utan cookies. Ditt cookieval sparas lokalt i din webbläsare. Statistik och inbäddat
            innehåll – till exempel omdömen från Reco eller Google – laddas bara om du aktivt har godkänt det, och du
            kan när som helst ändra ditt val under ”Cookieinställningar” längst ner på sidan.
          </p>
        </div>
      </div>
    </>
  );
}
