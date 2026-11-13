"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

/** Huvudmenyns länkar med markering av aktuell sida. */
export function NavLinks({
  linkClassName,
  activeClassName,
  onNavigate,
  pathname,
}: {
  linkClassName: string;
  activeClassName: string;
  onNavigate?: () => void;
  pathname?: string;
}) {
  return nav.map((item) => {
    const exact = pathname === item.href;
    const within = !exact && !!pathname?.startsWith(`${item.href}/`);
    const active = exact || within;
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={onNavigate}
          aria-current={exact ? "page" : within ? "true" : undefined}
          className={`${linkClassName} ${active ? activeClassName : ""}`}
        >
          {item.label}
        </Link>
      </li>
    );
  });
}

/** Läser adressen. Måste ligga i <Suspense> eftersom vissa sidor har dynamiska adresser. */
export function ActiveNavLinks(props: Omit<Parameters<typeof NavLinks>[0], "pathname">) {
  return <NavLinks {...props} pathname={usePathname()} />;
}
