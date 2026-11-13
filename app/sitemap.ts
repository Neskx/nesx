import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified?: string) => ({
    url: `${site.url}${path}`,
    priority,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    page("", 1),
    page("/tjanster", 0.9),
    ...services.map((service) => page(`/tjanster/${service.slug}`, 0.9)),
    page("/brf-och-fastighetsagare", 0.8),
    page("/malarguide", 0.7),
    ...guides.map((guide) => page(`/malarguide/${guide.slug}`, 0.6, guide.updated)),
    page("/om-jocke", 0.6),
    page("/kontakt", 0.9),
    page("/integritetspolicy", 0.2),
  ];
}
