import { reviewConfig } from "@/lib/reviews";
import { ReviewEmbed } from "../ReviewEmbed";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-lg tracking-widest text-accent">
      <span aria-hidden="true">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
      <span className="sr-only">Betyg {rating} av 5</span>
    </p>
  );
}

/**
 * Omdömen direkt under hero. Visar enbart riktiga omdömen från Google/Reco
 * (lib/reviews.ts). Utan sådana visas ingenting.
 */
export function ReviewWidget() {
  const { embed, manual, recoUrl, googleUrl } = reviewConfig;
  const hasReviews = embed !== null || manual.length > 0;

  if (!hasReviews) return null;

  return (
    <section aria-labelledby="omdomen-rubrik" className="border-y border-line bg-white">
      <div className="container-page py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="omdomen-rubrik" className="text-2xl sm:text-3xl">
            Vad kunderna säger
          </h2>
          {(recoUrl || googleUrl) && (
            <p className="flex gap-5 text-sm">
              {recoUrl && (
                <a href={recoUrl} className="link" rel="noopener">
                  Alla omdömen på Reco
                </a>
              )}
              {googleUrl && (
                <a href={googleUrl} className="link" rel="noopener">
                  Alla omdömen på Google
                </a>
              )}
            </p>
          )}
        </div>

        <div className="mt-6">
          {embed ? (
            <ReviewEmbed embed={embed} />
          ) : (
            <ul className="grid gap-5 md:grid-cols-3">
              {manual.slice(0, 3).map((review) => (
                <li key={review.url} className="card flex flex-col p-6">
                  <Stars rating={review.rating} />
                  <blockquote className="mt-3 flex-1">”{review.text}”</blockquote>
                  <p className="mt-4 text-sm">
                    <span className="font-semibold">{review.author}</span>
                    <span className="text-muted"> · {review.date} · </span>
                    <a href={review.url} className="link" rel="noopener">
                      {review.source}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
