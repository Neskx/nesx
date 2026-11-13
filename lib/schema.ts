import { areas, site } from "./site";
import { services, type Service } from "./services";
import type { Guide } from "./guides";

const businessId = `${site.url}/#foretag`;

/** LocalBusiness/HousePainter – läggs i rotlayouten så att den finns på alla sidor. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": businessId,
    name: site.name,
    description:
      "Målare i Eslöv. Invändig målning, fasadmålning, fönsterrenovering, tapetsering och fastighetsservice i Mellanskåne.",
    url: site.url,
    telephone: site.phone.href,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.owner },
    taxID: site.orgNr,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: areas.map((a) => ({ "@type": "City", name: a.name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Måleritjänster",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/tjanster/${s.slug}` },
      })),
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${site.url}/tjanster/${service.slug}`,
    provider: { "@id": businessId },
    areaServed: areas.map((a) => ({ "@type": "City", name: a.name })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function articleSchema(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updated,
    datePublished: guide.updated,
    inLanguage: "sv-SE",
    mainEntityOfPage: `${site.url}/malarguide/${guide.slug}`,
    author: { "@type": "Person", name: site.owner },
    publisher: { "@id": businessId },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
