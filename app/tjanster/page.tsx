import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProcessSteps } from "@/components/home/Sections";
import { PhotoSlot } from "@/components/PhotoSlot";
import { CtaBand, JsonLd, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";
import { services } from "@/lib/services";

const trail = [{ name: "Tjänster", path: "/tjanster" }];

export const metadata = pageMeta({
  title: "Tjänster – måleri och fastighetsservice i Eslöv",
  description:
    "Invändig målning, fasadmålning, fönster och snickerier, tapetsering och fastighetsservice i Eslöv och Mellanskåne. Fast pris och ROT-avdrag.",
  path: "/tjanster",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHero
        trail={trail}
        eyebrow="Tjänster"
        title="Måleri och underhåll – inne som ute"
        lead="Fem områden, en målare. Varje jobb börjar med ett kostnadsfritt hembesök och slutar med att vi går igenom resultatet tillsammans."
      />

      <div className="section container-page">
        <ul className="space-y-10">
          {services.map((service, index) => (
            <li key={service.slug} className="reveal card grid overflow-hidden md:grid-cols-2">
              <PhotoSlot
                id={service.photo}
                className={`aspect-[4/3] md:aspect-auto md:min-h-80 ${index % 2 ? "md:order-last" : ""}`}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="min-w-0 p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl">{service.title}</h2>
                <p className="mt-3 text-lg text-muted">{service.lead}</p>
                <ul className="mt-5 space-y-2">
                  {service.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Icon name="check" className="mt-1 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href={`/tjanster/${service.slug}`} className="btn btn-primary mt-7">
                  Mer om {service.title.toLowerCase()} <Icon name="arrow" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ProcessSteps />

      <CtaBand title="Osäker på vad som behöver göras?" text="Boka ett kostnadsfritt hembesök, så får du ett ärligt besked och ett fast pris." />
    </>
  );
}
