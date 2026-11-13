import { BeforeAfterShowcase, ProjectGrid } from "@/components/Gallery";
import { CtaBand, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { beforeAfter, projects } from "@/lib/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const trail = [{ name: "Referenser", path: "/referenser" }];

export const metadata = pageMeta({
  title: "Referenser – måleriprojekt i Eslöv och Mellanskåne",
  description:
    "Referensprojekt från Jocke N Måleri i Eslöv: invändig målning, fasader, fönster och uppdrag åt bostadsrättsföreningar.",
  path: "/referenser",
});

export default function ReferencesPage() {
  const visibleProjects = projects.filter((project) => site.showOwnerNotes || !project.placeholder);
  const comparison = site.showOwnerNotes || !beforeAfter.placeholder ? beforeAfter : null;

  const hasRealProjects = projects.some((project) => !project.placeholder);

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        trail={trail}
        eyebrow="Referenser"
        title="Referenser"
        lead={hasRealProjects ? "Ett urval av utförda uppdrag. Filtrera på typ av jobb för att hitta något som liknar ditt." : undefined}
      />

      <section aria-label="Referensprojekt" className="section container-page">
        {visibleProjects.length > 0 ? (
          <ProjectGrid items={visibleProjects} />
        ) : (
          <p className="max-w-2xl text-lg text-muted">
            Referensprojekt med bilder läggs upp här löpande. Hör gärna av dig, så berättar {site.ownerFirstName} mer om
            tidigare jobb som liknar ditt.
          </p>
        )}
      </section>

      {comparison && (
        <section aria-labelledby="fore-efter" className="bg-subtle">
          <div className="section container-page">
            <SectionHeading id="fore-efter" eyebrow="Före & efter" title="Dra i reglaget och se skillnaden" />
            <div className="mt-8">
              <BeforeAfterShowcase item={comparison} />
            </div>
          </div>
        </section>
      )}

      <CtaBand title="Ska ditt hem bli nästa referens?" />
    </>
  );
}
