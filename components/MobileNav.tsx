"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { ActiveNavLinks, NavLinks } from "./NavLinks";

const mobileLink = "flex min-h-12 items-center text-lg font-medium";
const mobileActive = "font-semibold text-brand underline decoration-accent decoration-2 underline-offset-8";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobilmeny"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 items-center gap-2 rounded-md border border-edge px-3 font-semibold text-ink"
      >
        <Icon name={open ? "close" : "menu"} />
        <span className="max-[360px]:sr-only">{open ? "Stäng" : "Meny"}</span>
      </button>

      <nav
        id="mobilmeny"
        aria-label="Mobilmeny"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-6rem-5.5rem)] overflow-y-auto overscroll-contain whitespace-normal border-b border-line bg-canvas shadow-lg lg:max-h-[calc(100dvh-6rem)]"
      >
        <ul className="container-page divide-y divide-line py-2">
          <Suspense fallback={<NavLinks linkClassName={mobileLink} activeClassName={mobileActive} onNavigate={() => setOpen(false)} />}>
            <ActiveNavLinks linkClassName={mobileLink} activeClassName={mobileActive} onNavigate={() => setOpen(false)} />
          </Suspense>
        </ul>
        <div className="container-page hidden gap-3 pb-5 lg:grid lg:grid-cols-2">
          <a href={`tel:${site.phone.href}`} className="btn btn-outline">
            <Icon name="phone" /> Ring {site.phone.display}
          </a>
          <Link href="/kontakt#offert" onClick={() => setOpen(false)} className="btn btn-cta">
            Begär offert
          </Link>
        </div>
      </nav>
    </div>
  );
}
