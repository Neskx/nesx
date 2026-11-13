import { ContactSection } from "@/components/ContactSection";
import { AreaList } from "@/components/home/ServiceArea";
import { JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

const trail = [{ name: "Kontakt", path: "/kontakt" }];

export const metadata = pageMeta({
  title: "Kontakt – begär offert på målning i Eslöv",
  description:
    "Kontakta Jocke N Måleri i Eslöv. Begär offert med foton, ring eller mejla Joakim direkt. Svar inom 24 timmar och fast pris efter kostnadsfritt hembesök.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <ContactSection headingLevel="h1" />

      <section aria-labelledby="omrade" className="section container-page">
        <h2 id="omrade" className="text-3xl sm:text-4xl">
          Här målar vi
        </h2>
        <div className="mt-8">
          <AreaList />
        </div>
      </section>
    </>
  );
}
