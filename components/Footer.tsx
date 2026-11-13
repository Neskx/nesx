import Link from "next/link";
import { areas, nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { CookieSettingsButton } from "./CookieBanner";
import { Logo } from "./Header";

const linkClass = "inline-flex min-h-11 items-center text-white/85 underline-offset-4 hover:text-white hover:underline";

export function Footer() {
  return (
    <footer className="on-dark bg-brand-strong text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-white/85">
            Målare i Eslöv sedan {site.founded}. Måleri och fastighetsservice för villaägare, bostadsrättsföreningar och
            fastighetsägare i Mellanskåne.
          </p>
        </div>

        <nav aria-label="Tjänster">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Tjänster</h2>
          <ul className="mt-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/tjanster/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sidor">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Företaget</h2>
          <ul className="mt-3">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Kontakt</h2>
          <address className="mt-3 not-italic text-white/85">
            <a href={`tel:${site.phone.href}`} className={`${linkClass} font-semibold text-white`}>
              {site.phone.display}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            <p className="mt-3">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
            <p className="mt-3">Org.nr {site.orgNr}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-white/75 lg:flex-row lg:items-center lg:justify-between">
          <p>
            Vi målar i{" "}
            {areas.map((area, index) => (
              <span key={area.id}>
                {area.name}
                {index < areas.length - 2 ? ", " : index === areas.length - 2 ? " och " : ""}
              </span>
            ))}{" "}
            med omnejd. Godkänd för F-skatt.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/integritetspolicy" className={linkClass}>
                Integritetspolicy
              </Link>
            </li>
            <li>
              <CookieSettingsButton className={linkClass} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
