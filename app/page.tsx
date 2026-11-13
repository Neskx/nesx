import Link from "next/link";
import { ContactSection } from "@/components/ContactSection";
import { BeforeAfterShowcase } from "@/components/Gallery";
import { Hero } from "@/components/home/Hero";
import { ReviewWidget } from "@/components/home/ReviewWidget";
import { BrfTeaser, OwnerSection, ServiceTiles, TrustBadges } from "@/components/home/Sections";
import { RotCalculator } from "@/components/RotCalculator";
import { SectionHeading } from "@/components/ui";
import { beforeAfter } from "@/lib/projects";
import { site } from "@/lib/site";

export default function HomePage() {
  const comparison = site.showOwnerNotes || !beforeAfter.placeholder ? beforeAfter : null;

  return (
    <>
      <Hero />
      <TrustBadges />
      <ReviewWidget />
      <ServiceTiles />
      <OwnerSection />

      {comparison && (
        <section aria-labelledby="fore-efter-rubrik" className="section container-page">
          <SectionHeading id="fore-efter-rubrik" eyebrow="Före & efter" title="Dra i reglaget och se skillnaden" />
          <div className="mt-8">
            <BeforeAfterShowcase item={comparison} />
          </div>
        </section>
      )}

      <section aria-labelledby="rot-rubrik" className="bg-subtle">
        <div className="section container-page">
          <SectionHeading id="rot-rubrik" eyebrow="ROT-avdrag" title="Vad kostar jobbet efter ROT?" />
          <div className="mt-8">
            <RotCalculator />
          </div>
          <p className="mt-6">
            <Link href="/malarguide/sa-fungerar-rot-avdraget" className="link">
              Så fungerar ROT-avdraget
            </Link>
          </p>
        </div>
      </section>

      <BrfTeaser />
      <ContactSection />
    </>
  );
}
