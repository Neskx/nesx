import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

/** Fast rad längst ner på mobil: ring eller begär offert. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-canvas/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
      <a href={`tel:${site.phone.href}`} className="btn btn-primary gap-1.5 px-3 whitespace-nowrap">
        <Icon name="phone" /> Ring {site.ownerFirstName}
      </a>
      <Link href="/kontakt#offert" className="btn btn-cta px-3 whitespace-nowrap">
        Begär offert
      </Link>
    </div>
  );
}
