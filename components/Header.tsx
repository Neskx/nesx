import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { MobileNav } from "./MobileNav";
import { ActiveNavLinks, NavLinks } from "./NavLinks";

const navLink = "py-2 text-sm font-medium text-ink decoration-cta decoration-2 underline-offset-8 hover:underline";
const navActive = "font-semibold underline";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      alt={`${site.shortName} logotyp`}
      width={160}
      height={48}
      className={`h-10 w-auto ${light ? "brightness-0 invert" : ""}`}
      preload
    />
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <div className="container-page relative flex h-[4.5rem] items-center justify-between gap-4 whitespace-nowrap">
        <Link href="/" aria-label={`JN ${site.shortName} – till startsidan`} className="flex min-h-11 items-center rounded">
          <Logo />
        </Link>

        <nav aria-label="Huvudmeny" className="hidden xl:block">
          <ul className="flex items-center gap-4">
            <Suspense fallback={<NavLinks linkClassName={navLink} activeClassName={navActive} />}>
              <ActiveNavLinks linkClassName={navLink} activeClassName={navActive} />
            </Suspense>
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-4">
          <a
            href={`tel:${site.phone.href}`}
            className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-2 font-semibold text-brand hover:text-brand-strong"
          >
            <Icon name="phone" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              <span className="sr-only">Ring </span>
              {site.phone.display}
            </span>
          </a>
          <Link href="/kontakt#offert" className="btn btn-cta hidden md:inline-flex">
            Begär offert
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
