# Jocke N Måleri AB – website

Marketing site for Jocke N Måleri AB (Eslöv). Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. All visitor-facing content is in Swedish.

## Setup

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # fill in the values, see "Email" below
npm run dev                  # http://localhost:3000
```

Other commands: `npm run build` (production build), `npm start` (serve the build), `npm run lint`.

## Before launch – checklist

Everything the owner must supply or confirm. The site is not ready to publish until these are done.

| What | Where |
| --- | --- |
| Real phone number and email (currently placeholders) | `lib/site.ts` → `phone`, `email` |
| Real domain | `NEXT_PUBLIC_SITE_URL` in Vercel (or `url` in `lib/site.ts`) |
| Confirm the liability insurance is in force (the "Ansvarsförsäkring" badge is on) | `lib/site.ts` → `trustBadges` |
| Replace the 10 Pexels stock photos (hero, owner, ownerWork, workshop, five service tiles, brf) with real ones | `lib/photos.ts` |
| Real reference projects and one real before/after pair | `lib/projects.ts` |
| Real reviews (optional) | `lib/reviews.ts` |
| Read through all Swedish copy; add personal background on "Om Jocke" | see "Changing text" |
| Check the privacy policy against how data is actually handled | `app/integritetspolicy/page.tsx` |
| Email delivery configured and tested | see "Email" |
| Turn off owner notes and placeholders | `lib/site.ts` → `showOwnerNotes: false` |

`showOwnerNotes` does not affect stock photos: the Pexels photos in `lib/photos.ts` stay visible, marked "Genrebild", until each is replaced.

`showOwnerNotes` controls the labelled placeholders and owner notes: labelled photo placeholders, example projects, the empty review box and the notes to the owner. With it set to `false`, unfilled photo slots become plain coloured panels, example projects disappear, and the review section is hidden until real reviews exist.

## Swapping photos

Every photo slot is listed in `lib/photos.ts`, with a description (`brief`) of the photo that belongs there.

Ten slots currently hold stock photos from Pexels, created with the `pexels(...)` helper. They carry the photographer's name and source link, and the site shows a small "Genrebild" label on each so that no visitor takes them for the company's own work. None shows a recognisable face. While the hero photo is stock, the name card on it is hidden.

To replace a stock photo with a real one:

1. Put the file in `public/images/`, for example `public/images/hero.jpg`.
2. Replace the whole `pexels(...)` call for that slot with a plain object: `{ src: "/images/hero.jpg", alt: "…", brief: "…", tone: "navy" }`. Leaving out `stock` removes the "Genrebild" label.
3. Make sure `alt` describes what the photo actually shows. Add `focus` (for example `"50% 30%"`) if the crop cuts off the subject.

The before/after pair and the reference projects are still placeholders, and must only ever show real jobs. Never put stock photos there.

Photos are resized and converted automatically by `next/image`. Upload reasonably large originals (about 2000 px on the long side); JPEG is fine. The hero and owner slots are portrait (4:5), service tiles are landscape or portrait depending on position, and before/after pairs are 4:3 and should be taken from the same angle.

The social sharing image is generated in `app/opengraph-image.tsx`. To use a photo instead, delete that file and add `app/opengraph-image.jpg` (1200 × 630).

## Changing text

| Content | File |
| --- | --- |
| Company facts, phone, email, navigation, process steps, service areas | `lib/site.ts` |
| Hero headline (one array entry per line) | `lib/site.ts` → `headline` |
| Services: tile text, page text, "what's included", FAQ, ROT text | `lib/services.ts` |
| Målarguide articles | `lib/guides.ts` |
| Reference projects and the single before/after pair | `lib/projects.ts` |
| Homepage sections (order is set in `app/page.tsx`) | `components/home/` |
| BRF page, Om Jocke, Kontakt, privacy policy | `app/<page>/page.tsx` |
| ROT rate and cap (check against Skatteverket every new year) | `lib/site.ts` → `rot` |

To add a guide article, copy an entry in `lib/guides.ts` and change `slug`, `title` and `blocks`. The page, sitemap entry and structured data are created automatically. The same applies to services in `lib/services.ts`.

### Reference projects and customer quotes

`lib/projects.ts` holds example entries marked `placeholder: true`. Replace them with real projects and remove the flag. Each project has a `quote` field that is `null` by default. **Never write a quote yourself** – only add one that the customer actually gave and has agreed to have published.

## Enabling trust badges

Badges are defined in `lib/site.ts` → `trustBadges`. F-skatt, Ansvarsförsäkring and ROT-avdrag are on.

Two more are prepared but **off by default**:

- `maleriforetagen` – "Medlem i Måleriföretagen i Sverige"
- `mvk` – "MVK-auktoriserad" (wet rooms)

Set `enabled: true` **only if the company actually holds that membership or authorisation**. Showing them otherwise is misleading marketing. If the MVK badge is enabled, wet-room painting should also be added as a service in `lib/services.ts`.

## Embedding real reviews

The review section sits directly under the hero and reads from `lib/reviews.ts`. It never shows invented content: with nothing configured it is hidden (or shows an owner note while `showOwnerNotes` is on).

**Option A – widget from Reco or a Google review service.** Get the iframe address from the provider and set:

```ts
embed: { provider: "Reco", src: "https://…", height: 420 },
```

The widget loads third-party content, so it is only loaded after the visitor accepts "Inbäddat innehåll" in the cookie banner. Until then they see a short explanation and a button.

**Option B – paste real reviews by hand.** Needs no consent and loads faster:

```ts
manual: [
  { author: "Anna S.", rating: 5, text: "…", date: "mars 2026", source: "Reco", url: "https://www.reco.se/…" },
],
```

Copy the text exactly as the customer wrote it and link to the original. The first three are shown.

Also set `recoUrl` and `googleUrl` to the company's profiles to show "Alla omdömen på …" links.

Star ratings are deliberately left out of the structured data. Google's rules do not allow a business to mark up reviews it has collected about itself from other sites.

## Email (contact form)

The form posts to `app/api/kontakt/route.ts`, which validates the input and sends an email through [Resend](https://resend.com), with the photos attached.

1. Create a Resend account and verify the sending domain.
2. Create an API key.
3. Set these variables in `.env.local` and in Vercel:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | The API key |
| `CONTACT_TO_EMAIL` | The address that should receive enquiries |
| `CONTACT_FROM_EMAIL` | A sender on the verified domain, e.g. `Jocke N Måleri <offert@dindoman.se>` |

Without these variables the form behaves differently depending on environment: in development the enquiry is printed in the terminal and the form shows success; in production the form shows an error and asks the visitor to call or email, so that no enquiry is silently lost.

Photos are shrunk in the browser (max 1600 px) before upload so that five photos fit within Vercel's 4.5 MB request limit. Spam protection is a hidden honeypot field; there is no rate limiting. If spam becomes a problem, add Vercel's firewall rules or a CAPTCHA.

## Cookies and consent

The site sets no cookies on its own. The banner (`components/CookieBanner.tsx`) stores the visitor's choice in `localStorage`, and non-essential categories are off until the visitor turns them on. Visitors can reopen it from "Cookieinställningar" in the footer.

No analytics is installed. To add one, read the choice with `useConsent()` from `lib/consent.ts` and load the script only when `consent.statistics` is `true` – `components/ReviewEmbed.tsx` shows the pattern.

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project**, import the repository. The defaults for Next.js are correct.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (for example `https://www.dindoman.se`, no trailing slash) and the three email variables.
4. Deploy, then add the domain under **Settings → Domains**.
5. After launch: submit `https://<domain>/sitemap.xml` in Google Search Console, and create or claim the Google Business Profile with the same name, address and phone number as on the site.

`NEXT_PUBLIC_SITE_URL` is used for canonical links, the sitemap, Open Graph tags and structured data, so it must be the final public address. Redeploy after changing it.

## SEO

- `LocalBusiness`/`HousePainter` structured data on every page (`lib/schema.ts`), plus `Service`, `FAQPage`, `Article` and `BreadcrumbList` where relevant.
- Title, description, canonical link and Open Graph tags per page (`lib/meta.ts`).
- `sitemap.xml` and `robots.txt` are generated from `app/sitemap.ts` and `app/robots.ts`.
- Local sections for Eslöv, Lund, Höör, Hörby, Kävlinge and Malmö on the contact page (`areas` in `lib/site.ts`).

## Project structure

```
app/                     Routes (one folder per page), API route, sitemap, robots, share image
  api/kontakt/route.ts   Contact form endpoint
  tjanster/[slug]/       Service pages, generated from lib/services.ts
  malarguide/[slug]/     Guide articles, generated from lib/guides.ts
components/              Shared components
  home/                  Homepage sections
lib/                     Content and configuration – most edits happen here
public/images/           Photos
```

## Notes for developers

- This is Next.js 16 with `cacheComponents` enabled. Some APIs differ from older versions; the bundled docs are in `node_modules/next/dist/docs/`. Do not call `new Date()` or `Math.random()` while rendering Server Components – it breaks prerendering.
- Tailwind CSS 4 is configured in `app/globals.css` (`@theme`), not in a config file. The palette and the reusable classes (`container-page`, `section`, `eyebrow`, `btn` with `btn-cta` / `btn-primary` / `btn-outline` / `btn-light`, `link`, `field`, `label`, `card`, `reveal`) are defined there. The theme is deliberately minimal: white and cool-grey surfaces, navy (`brand`), and one blue (`cta`) reserved for actions.
- The homepage is kept short on purpose: hero, trust row, services, owner, one before/after, ROT calculator, BRF band, quote form. The process steps are on `/tjanster` and the service-area map and town texts on `/kontakt`.
- Postcode and service are shared between the hero quote starter and the quote form through `lib/quote-store.ts`.
- Validation rules live in `lib/validation.ts` and are used by both the form and the API route.
