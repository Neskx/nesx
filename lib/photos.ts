/**
 * Alla fotoplatser på webbplatsen.
 *
 * Så byter du ett foto:
 *   1. Lägg bilden i /public/images/ (t.ex. hero.jpg).
 *   2. Sätt `src` nedan till "/images/hero.jpg".
 *   3. Kontrollera att `alt` beskriver vad bilden faktiskt visar.
 *   4. Ta bort `stock` när bildbanksfotot är ersatt med ett eget.
 */

export type PhotoTone = "navy" | "light" | "slate" | "grey";

export type Photo = {
  src: string | null;
  alt: string;
  /** Beskrivning av vilket foto som bör ligga här (visas i platshållaren). */
  brief: string;
  tone: PhotoTone;
  /** Var motivet ligger i bilden (CSS object-position), så att beskärningen blir rätt. */
  focus?: string;
  /**
   * Sätts för bildbanksfoton (Pexels). Byt mot egna foton när de finns –
   * ta då bort `stock` så visas namnskylten i hero igen.
   */
  stock?: { photographer: string; url: string };
};

/** Bildbanksfoto från Pexels. `brief` beskriver det egna foto som bör ersätta det. */
const pexels = (
  file: string,
  alt: string,
  focus: string,
  photographer: string,
  url: string,
  brief: string,
  tone: PhotoTone = "light",
): Photo => ({
  src: `/images/${file}`,
  alt,
  brief,
  tone,
  focus,
  stock: { photographer, url },
});

export const photos = {
  hero: pexels(
    "hero.jpg",
    "Hand som målar en vit vägg med roller",
    "70% 50%",
    "Polina Tankilevitch",
    "https://www.pexels.com/photo/close-up-of-a-hand-painting-a-wall-with-a-roller-brush-during-renovation-5583116/",
    "Joakim i arbete – pensel eller roller i hand, arbetskläder, naturligt ljus. Stående format.",
    "light",
  ),
  owner: pexels(
    "owner.jpg",
    "Närbild på en färgstänkt hand som håller en pensel mot en vägg",
    "55% 50%",
    "Sergey Meshkov",
    "https://www.pexels.com/photo/person-holding-gray-paintbrush-8481710/",
    "Porträtt av Joakim, gärna framför firmabilen eller ett färdigt jobb. Stående format.",
  ),
  ownerWork: pexels(
    "ownerWork.jpg",
    "Hand som håller en spackelspade mot en slät beige vägg",
    "62% 62%",
    "Polina Tankilevitch",
    "https://www.pexels.com/photo/hand-with-trowel-renovating-wall-5583128/",
    "Närbild på hantverket: skärning mot list, kittning av fönster eller liknande.",
    "slate",
  ),
  workshop: pexels(
    "workshop.jpg",
    "Färgburkar, penslar och ett rollertråg på skyddspapper i solljus",
    "45% 45%",
    "Nataliya Vaitkevich",
    "https://www.pexels.com/photo/buckets-of-paint-on-the-floor-5641407/",
    "Färgburkar, penslar och material – gärna linoljefärg och kulörprover.",
    "grey",
  ),

  "service-invandig": pexels(
    "service-invandig.jpg",
    "Ljust vardagsrum med grågröna väggar, vita snickerier och högt fönster",
    "50% 35%",
    "Lisa Anna",
    "https://www.pexels.com/photo/sofa-in-a-living-room-19866404/",
    "Nymålat vardagsrum eller kök, färdigt resultat.",
    "grey",
  ),
  "service-fasad": pexels(
    "service-fasad.jpg",
    "Faluröd trävilla med vita knutar, spröjsade fönster och glasveranda en sommardag",
    "50% 45%",
    "Efrem Efre",
    "https://www.pexels.com/photo/scandinavian-house-in-efrem-sweden-24551050/",
    "Nymålad villafasad i trä, hela huset i bild.",
    "slate",
  ),
  "service-fonster": pexels(
    "service-fonster.jpg",
    "Mörkgrön dubbeldörr i trä på en vitmålad veranda på ett rött trähus",
    "50% 55%",
    "Damir K",
    "https://www.pexels.com/photo/green-door-of-house-24613676/",
    "Renoverat och nymålat fönster eller ytterdörr, närbild.",
    "navy",
  ),
  "service-tapet": pexels(
    "service-tapet.jpg",
    "Två händer spacklar en vit vägg med spackelspadar",
    "40% 35%",
    "Ksenia Chernaya",
    "https://www.pexels.com/photo/crop-man-working-with-putty-at-home-5691603/",
    "Tapetserad vägg med mönster, gärna med skarv i närbild.",
  ),
  "service-fastighet": pexels(
    "service-fastighet.jpg",
    "Ljust trapphus med vita väggar, stentrappa och ledstång",
    "50% 45%",
    "Yura Radochin",
    "https://www.pexels.com/photo/sunlit-staircase-with-potted-plant-38623398/",
    "Trapphus eller entré i flerfamiljshus efter underhållsmålning.",
    "navy",
  ),

  brf: pexels(
    "brf.jpg",
    "Innergård med gulputsade flerfamiljshus, balkonger och gröna träd",
    "40% 50%",
    "Ercan Evcimen",
    "https://www.pexels.com/photo/urban-courtyard-with-yellow-apartment-buildings-34347494/",
    "Flerfamiljshus eller trapphus hos en BRF-kund.",
    "navy",
  ),

  "ba-invandig-fore": pexels(
    "ba-fore.jpg",
    "Rum under renovering med verktyg, kablar och färgburkar",
    "50% 50%",
    "La Miko",
    "https://www.pexels.com/photo/a-room-undergoing-renovation-with-tools-supplies-wiring-and-paint-cans-3615721/",
    "FÖRE: rummet innan målning.",
  ),
  "ba-invandig-efter": pexels(
    "ba-efter.jpg",
    "Ljust tomt rum med trägolv och solljus genom fönstret",
    "50% 50%",
    "Peter Vang",
    "https://www.pexels.com/photo/spacious-empty-room-with-hardwood-floors-and-sunlight-35493905/",
    "EFTER: samma rum, samma vinkel.",
    "grey",
  ),
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
