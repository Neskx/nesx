import type { Metadata } from "next";
import { site } from "./site";

/** Metataggar per sida: titel, beskrivning, kanonisk adress och Open Graph. */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url: path,
      siteName: site.name,
      locale: "sv_SE",
      type,
    },
  };
}
