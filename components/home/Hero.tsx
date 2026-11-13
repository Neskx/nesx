import { photos, type Photo } from "@/lib/photos";
import { headline, site } from "@/lib/site";
import { PhotoSlot } from "../PhotoSlot";
import { QuoteStarter } from "../QuoteStarter";

export function Hero() {
  const heroPhoto: Photo = photos.hero;

  return (
    <section>
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <h1 className="text-[clamp(2.2rem,9.5vw,3.75rem)] font-bold leading-[1.08]">
            {headline.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Måleri och fastighetsservice i Mellanskåne. {site.pricePromise}.
          </p>
          <div className="mt-8 max-w-md">
            <QuoteStarter />
          </div>
          <p className="mt-4 text-sm text-muted">{site.responsePromise} · ROT-avdrag direkt på fakturan</p>
        </div>

        <div className="relative">
          <PhotoSlot id="hero" priority className="aspect-[4/3] rounded-md lg:aspect-[4/5]" sizes="(min-width: 1024px) 46vw, 100vw" />
          {/* Namnskylten visas bara på ett riktigt foto av ägaren, aldrig på en bildbanksbild. */}
          {!heroPhoto.stock && (
            <p className="card absolute bottom-4 left-4 px-4 py-3 text-sm">
              <span className="block font-semibold">{site.owner}</span>
              <span className="text-muted">Målare och ägare</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
