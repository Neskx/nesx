import Image from "next/image";
import { photos, type PhotoId, type PhotoTone } from "@/lib/photos";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

const tones: Record<PhotoTone, string> = {
  navy: "bg-[#2b4763] text-white",
  light: "bg-[#dfe4ea] text-ink",
  slate: "bg-[#5b6b7d] text-white",
  grey: "bg-[#c9d1da] text-ink",
};

type Props = {
  id: PhotoId;
  /** Ska innehålla bildformat (t.ex. aspect-[4/5]) och eventuell rundning. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Lägger platshållartexten högst upp, när bildens nederkant täcks av en bildtext. */
  noteAtTop?: boolean;
  /** Döljer platshållartexten, när två platshållare ligger ovanpå varandra. */
  hideNote?: boolean;
};

/**
 * Visar ett foto om `src` är satt i lib/photos.ts, annars en tydligt märkt
 * platshållare som beskriver vilket foto som ska ligga här.
 */
export function PhotoSlot({ id, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority, noteAtTop, hideNote }: Props) {
  const photo = photos[id];

  return (
    <div className={`relative overflow-hidden ${photo.src ? "bg-subtle" : `photo-texture ${tones[photo.tone]}`} ${className}`}>
      {photo.src ? (
        <>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={priority} className="object-cover" style={{ objectPosition: photo.focus }} />
        {"stock" in photo && photo.stock && (
          <span className="absolute bottom-2 right-2 rounded-sm bg-ink/70 px-2 py-0.5 text-xs font-medium text-white">Genrebild</span>
        )}
        </>
      ) : (
        site.showOwnerNotes && !hideNote && (
          <div className={`absolute inset-0 flex flex-col items-center gap-2 p-5 text-center ${noteAtTop ? "justify-start pt-8" : "justify-center"}`}>
            <Icon name="camera" className="size-7 opacity-80" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em]">Platshållare – byt mot foto</p>
            <p className="max-w-xs text-sm leading-snug">{photo.brief}</p>
            <p className="font-mono text-xs opacity-80">lib/photos.ts → {id}</p>
          </div>
        )
      )}
    </div>
  );
}
